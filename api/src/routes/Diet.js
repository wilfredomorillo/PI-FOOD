const {Router} = require ('express')
const {Diet}= require ('../db')
const {axios}= require ('axios')

const {apikey}= process.env



const router= Router()


router.get('/', async(req , res)=>{
    try{
const infoDiet= await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}&addRecipeInformation=true&number=100`)

const tipos= infoDiet.data?.results.map((e)=>e.diets)
const newtipes= tipos.flat().concat('vegetarian', 'ketogenic')
const tipofinal= [...new Set(newtipes)]

for (let element in tipofinal) {
   Diet.findOrCreate({
    where:{
        title:tipofinal[element]
    }
   })
}
const newDiets = await Diet.findAll();
    res.status(200).json(newDiets);
}
catch(e){
    console.log(e)
}})



module.exports= router;

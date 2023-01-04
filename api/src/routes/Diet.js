const {Router} = require ('express')
const {Diet}= require ('../db')

const router= Router()


router.get('/', async(req , res)=>{

const listDiets=[
    "gluten free",
    "dairy free",
    "ketogenic",
    "lacto ovo vegetarian",
    "vegan",
    "pescatarian",
    "paleolithic",
    "primal",
    "fodmap friendly",
    "whole 30",
]
try{
    listDiets.forEach((e)=>{
        Diet.findOrCreate({
            where:{name:e}
        })
    })
    const all= await Diet.findAll()
    res.status(200).send(all)
}
catch(error){
    res.status(404).send('dieta no encontrada')
}
})


module.exports= router;

const { Router } = require('express');
const {infoApi, searcQuery, InfoDB}= require('../controlls/index')
require('dotenv').config();


const router = Router();

router.get('/recipes' ,async( req, res )=>{
    let {name}= req.query
    const allRecipe =  await infoApi()
if (name){
    try{
const RecipeApi= await searcQuery()
const RecipeDb= await InfoDB()
let allNameapi= RecipeApi.filter((el)=>el.name.toLowerCase().includes(name.toLocaleLowerCase()))
let allname= RecipeDb.concat(allNameapi)
allname.length ? res.status(200).send(allname.slice(0,15)): res.status(400).send('no tenemos recestas con este nombre')

}

    catch (e){
console.error(e)
    }}
    else{
       return res.send(allRecipe)
    }
})




module.exports = router;
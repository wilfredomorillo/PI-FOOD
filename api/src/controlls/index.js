const db = require('../db');
require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;
const {Recipe,Diet} = require('../db');


const APIrecipes = async function () {
    let recipes = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    let washed = await recipes.data.results.map(e => {
        return {
            id: e.id,
            name: e.title,
            image: e.image,
            dishTypes: e.dishTypes,
            healthScore: e.healthScore,
            summary: e.summary,
            diets: e.diets,
            steps: e.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }
            })
        }
        }) 
    return washed 
}

const DBrecipes = async function () {
    let recipes = await Recipe.findAll({
        include: [{
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }]})
    return recipes
}
const ALLRecipes = async function () {
    const DBrecipe = await DBrecipes() 
    const  APIrecipe= await APIrecipes()
 const todaInfo= DBrecipe.concat(APIrecipe)
 return todaInfo
}
const APIrecipesID = async function (idRecipe) {
    return await axios.get(`https://api.spoonacular.com/recipes/${parseInt(idRecipe)}/information?apiKey=${API_KEY}`)
}

const DBrecipesID = async function (id) {
    let recipe = await Recipe.findByPk(id, {
        include: {
            model:Diet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
    return recipe
}


module.exports = {
    APIrecipes,
    DBrecipes,
    APIrecipesID,
    DBrecipesID,
    ALLRecipes
}
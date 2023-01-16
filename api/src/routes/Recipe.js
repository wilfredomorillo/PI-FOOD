const { Router } = require('express');
require('dotenv').config();
const {Recipe,Diet} = require('../db');
const {DBrecipesID,APIrecipesID, ALLRecipes } = require('../controlls/index');


const router = Router();

router.get('/',async (req, res) => {
    try {
      let { name } = req.query;
      const recipes = await ALLRecipes();
      if (name) {
        let filtered = recipes.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()));
        if (filtered.length) {
          let washed = filtered.map(e => {
            return {
              image: e.image,
              name: e.name,
              diets: (typeof (e.diets[0]) === 'string') ? e.diets : e.diets.map(e => e.name),
              id: e.id,
              healthScore: e.healthScore
            };
          });
          return res.status(200).json(washed);
        }
        return res.status(404).json("No se encontraron recetas");
      } else {
        let washed = recipes.map(e => {
          return {
            image: e.image,
            name: e.name,
            diets: (typeof (e.diets[0]) === 'string') ? e.diets : e.diets.map(e => e.name),
            id: e.id,
            healthScore: e.healthScore
          };
        });
        return res.json(washed);
      }
    } catch (error) {
      return res.status(404).json(error.message);
    }
  })

router.get('/:idRecipe', async (req, res) => {
    try {
      let { idRecipe } = req.params;
      if (idRecipe.length === 36) {
        let DBrecipe = await DBrecipesID(idRecipe);
        DBrecipe = {
          id: DBrecipe.id,
          name: DBrecipe.name,
          summary: DBrecipe.summary,
          healthScore: DBrecipe.healthScore,
          steps: DBrecipe.steps,
          diets: DBrecipe.diets.map(e => e.name),
          image: DBrecipe.image,
          dishTypes: DBrecipe.dishTypes
        };
        if (DBrecipe)
          return res.json(DBrecipe);
      } else {
        let APIrecipe = await APIrecipesID(idRecipe);
        if (APIrecipe.data.id) {
          let washed = {
            name: APIrecipe.data.title,
            image: APIrecipe.data.image,
            dishTypes: APIrecipe.data.dishTypes,
            healthScore: APIrecipe.data.healthScore,
            summary: APIrecipe.data.summary,
            diets: APIrecipe.data.diets,
            steps: APIrecipe.data.analyzedInstructions[0]?.steps.map(e => {
              return {
                number: e.number,
                step: e.step
              };
            })
          };
          return res.json(washed);
        }
      }
      throw new Error;
    } catch (error) {
      res.status(404).json('Receta no encontrada');
    }
  })



  router.post('/', async  (req,res, next) => {
    try{
        const {name,summary,healthScore,steps,image, diet }= req.body;
        const NewReceta= await Recipe.create({
            name,
            summary,
            image,
            steps, 
            healthScore,
            diet,
        }) 
        const TypesDiets=  await Diet.findAll({
            where: {name:name}
        })
        NewReceta.addDiet(TypesDiets)
    
    res.send(NewReceta) 
    }catch(error){next (error)}
    });
    
    
    
    router.delete('/:id', async (req, res)=>{

      const {id}= req.params
      try{
  if (id){
      await Recipe.destroy({
          where: {id:id}
      })
      res.json({msg:'comida borrada'})
  }
  
  
      }catch(error)
      { console.log(error)}
  })

module.exports = router;


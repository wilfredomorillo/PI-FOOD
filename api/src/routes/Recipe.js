const { Router } = require('express');
const {ApiBD}= require('../controlls/index')
const { Recipe, Diet} = require('../db')
require('dotenv').config();


const router = Router();

router.get('/' ,async( req, res )=>{
    const {name}= req.query
    const allRecipe =  await ApiBD()
if (name){
    const NombreRecet= allRecipe.filter((n)=>
        n.name.toLowerCase().includes(name.toLowerCase())
    )
    if (NombreRecet.length) { return res.status(200).json(NombreRecet)
        
    }
    else {
        return res.status(400).send(`no hay recetas con ese nombre ${name}`)
    }
    }
    res.status(200).json(allRecipe)
})


router.get ('/:id', async(req ,res)=>{
    const { idReceta } = req.params;
    const infoRecipes = await ApiBD();
    let infoById = infoRecipes.filter((e) => e.id == idReceta);
    if (infoById.length > 0) res.status(200).json(infoById);
    else res.status(404).send("There is no recipe with that id");
});


router.post("/", async (req, res) => {
    let { name, summary, healthScore, image, steps, diets } = req.body;
    try {
      let found = await Recipe.findAll({ where: { name: name } });
      if (found.length > 0) {
        return res.status(400).json("The Recipe already exists");
      }
      const newRecipe = await Recipe.create({
        name,
        image,
        summary,
        healthScore,
        steps,
        diets,
      });
      const dietsInDb = await Diet.findAll({
        where: { name: diets },
      });
      newRecipe.addDiet(dietsInDb);
  
      res.status(201).json("Recipe created!");
    } catch (error) {
      res.status(404).send(error.message);
    }
  });



  router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await Recipe.destroy({ where: { id: id } });
      res.status(204);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.put("/put/:id", async (req, res) => {
    const { id } = req.params;
    const { name, summary, healthScore, image, steps, diets } = req.body;
    try {
      const recipeUpdate = await Recipe.findByPk(id);
      recipeUpdate.name = name;
      recipeUpdate.summary = summary;
      recipeUpdate.healthScore = healthScore;
      recipeUpdate.image = image;
      recipeUpdate.steps = steps;
      recipeUpdate.diets = diets;
      await recipeUpdate.save();
      res.status(200).json("Recipe successfully changed");
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
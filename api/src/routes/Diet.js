const { Router } = require('express');
require('dotenv').config();
const router = Router();



router.get('/diets', async (req,res) => {
    let types = [
        "gluten free",
        "dairy free",
        "paleolithic",
        "lacto ovo vegetarian",
        "primal",
        "whole 30",
        "fodmap friendly",
        "ketogenic",
        "pescatarian",
        "vegan"
    ]
    types.forEach(e=> {
        Diet.findOrCreate({
            where: { name: e }
        })
    });
    let dietTypes = await Diet.findAll()
    return res.send(dietTypes)
})


module.exports= router
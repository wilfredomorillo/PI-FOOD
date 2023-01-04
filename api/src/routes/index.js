const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Recipes =require ('./recipe.js')
const Diet = require('./Diet')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes',Recipes)
router.use('/Diet' , Diet)
//router.use('/Diet', Diet)
 
module.exports = router;

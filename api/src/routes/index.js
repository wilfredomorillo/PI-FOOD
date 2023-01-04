const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Recipeses =require ('./recipe.js')
const Diets = require('./Diet')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes',Recipeses)
router.use('/Diet' , Diets)
//router.use('/Diet', Diet)
 
module.exports = router;

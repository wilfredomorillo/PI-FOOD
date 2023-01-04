const axios= require('axios')
const { Recipe, Diet}= require('../db')
const apiKey= process.env

// hacer las instancias para importarlasprimero traer los datos de la api 

const infoApi= async()=>{
    const url= await axios.get(`https://api.spoonacular.com/recipes/complexSearchapiKey=${apiKey}&addRecipeInformation=true&number=100`)
     const {results}= url.data
    if(results.length>0){
        let respusta= await results?.map((r)=>{
           return {
            name: r.title,
            image: r.image,
            id: r.id,
            healthScore: r.healthScore,
            types: r.dishTypes?.map((element) => element),
            diets: r.diets?.map((element) => element),
            summary: r.summary
              .replace("<b>", " ")
              .replace("</b>", "")
              .replace("<b>", " ")
              .replace("</b>", "")
              .replace("<b>", " ")
              .replace("</b>", "")
              .replace("<b>", " ")
              .replace("</b>", "")
              .replace("<b>", " ")
              .replace("</b>", "")
              .replace("<b>", " ")
              .replace("</b>", "")
              .replace("<b>", " ")
              .replace("</b>", "")
              .replace("<b>", " ")
              .replace("</b>", "")
              .replace("<a href=", " ")
              .replace(">", " ")
              .replace("</a>", " ")
              .replace("<a href=", " ")
              .replace(">", " ")
              .replace("</a>", " ")
              .replace("<a href=", " ")
              .replace(">", " ")
              .replace("</a>", " ")
              .replace("<a href=", " ")
              .replace(">", " ")
              .replace("</a>", " "),
            steps:
              r.analyzedInstructions[0] && result.analyzedInstructions[0].steps
                ? r.analyzedInstructions[0].steps
                    .map((item) => item.step)
                    .join(" ")
                : "",
          };
        })
        return respusta
    } else{
        throw new Error('No existe')
    }

    }

    const infoDB= async()=>{
const DBdata= await Recipe.findAll({
    include:{
        model: Diet,
        through:{
            attribute:[]
        }
    }
});
if(DBdata){
    let response=await DBdata?.map((r)=>{
        return {
            id: r.id,
            name: r.name,
            summary: r.summary,
            healthScore: r.healthScore,
            image:
              r.image === ""
                ? "https://cdn.dribbble.com/users/1012566/screenshots/4187820/topic-2.jpg"
                : r.image,
            steps: r.steps,
            diets: r.diets?.map((diet) => diet.name),
            createdInDb: r.createdInDb,
          }
          
    })
    return response
}
    }
    const ApiBD = async()=>{
        const api= await infoApi()
        const BD= await infoDB()
        const allInfoRecipe=BD.concat(api)
        const allInfoOrder= allInfoRecipe.sort(function (a,b){
            if(a.id> b.id)return 1
            if(a.id< b.id)return -1
            return 0
        })
        return allInfoOrder
    };

 module.exports= { 
    ApiBD};
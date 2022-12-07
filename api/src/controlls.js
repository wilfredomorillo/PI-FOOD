const { default : axios}= require('axios')
const { Recipe, Diet}= require('../db')
const apiKey= process.env

// hacer las instancias para importarlasprimero traer los datos de la api 

const infoApi= async()=>{
    let url=`https://api.spoonacular.com/recipes/complexSearchapiKey=${apiKey}&addRecipeInformation=true&number=100`
    let comidas=[]
    try{
        for (let i = 0; i < 5; i++) {
          const respuesta = await axios.get(url)
          respuesta.data.result.map((a)=>{
            comidas.push({
                name:a.name,
                id: a.id,
                summary:a.summary,
                image: a.backgroun_image

            })
          }) 
          url=respuesta.data.next
            
        }
    }catch(error){
    console.log(error)
    };

   

    }

 const InfoDB= async()=>{
try{
    return await Recipe.findAll({
        include:[{
            model: Diet,
            attribute: ['name'],
            throught:{
                attribute:[]}
        }]
    })
}catch(e){
    console.error(e)
}

 }
const infoApiDB= async ()=>{

const dataApi= await infoApi()
const database= await InfoDB()
const lasdos= dataApi.concap(database)
return lasdos
}
const searcQuery= async(name)=>{
const infoSearh= await axios.get(`https://api.spoonacular.com/recipes/complexSearch/${name}`)
    try{
const comidas= infoSearh.data.results.map((a)=>{
return{
    name:a.name,
    id: a.id,
    summary:a.summary,
    image: a.backgroun_image
}

})
    return comidas
}catch(e){
        console.error(e)
    }


}

const ApiId= async(id)=>{
try{
    
    consdataid= await axios.get(`https://api.spoonacular.com/recipes/complexSearch/${id}`)

    if (id){
        const data= await id.data
        const info={
            name:data.name,
            id: data.id,
            summary:data.summary,
            image: data.backgroun_image
        }
   return info }

else { return 'ID no disponible'}


}

catch(e){
    console.error(e)
}}

const IdDB= async (id)=>{
    try{
        
return await Recipe.findByPk({
    include:[{
        model: Diet,
        attribute:['name'],
        throught:{
            attribute:[]
        }
    }]
})


    }
    catch(e){
        console.log(e)
    }
}


const TodoIds= async(id)=>{

    const Idap= await ApiId(id)
    const Idbds= await IdDB(id)

}


module.export ={
    infoApi,
    InfoDB,
    infoApiDB,
    searcQuery,
    
}
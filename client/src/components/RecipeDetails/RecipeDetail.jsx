import {React , useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import {getAllRecipesById,clean,deletes, cleaner} from "../../redux/actions/index";
import "./RecipeDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";


function RecipeDetail(props) {
  let { id } = useParams();
  let dispatch = useDispatch();
  let detail = useSelector((state) => state.recipeDetail);
  useEffect(() => {
    dispatch(getAllRecipesById(id));
  }, [dispatch, id]);

  function handleDelete(e){
    const ID = id.includes('-')
    if(ID){
    e.preventDefault()
    dispatch(clean())
    dispatch (deletes(id))
    dispatch(cleaner())
    alert('comida borrada')
    
    
    }else{
        alert('solo puedes eliminar tu comida')
    }
    
    }
  return (
    <>
      <Navbar />
      <div className="about-recipe">
        <Link to="/home">
          <button className="custom-button">Back Home</button>
        </Link>
        
        <h1 className="name">{detail.name}</h1>
        <ul>
          <li>
            <div>
              <img src={detail.image} alt={detail.name} className= "img-content" />
            </div>
          </li>
          <h3>Health Score:{detail.healthScore}</h3>
          <h3>Type of Diets</h3>
              <p>
                {detail.diets ? detail.diets + "," : detail.types}{" "}
              </p>
              <h3>Summary:</h3>
              <p>{detail.summary}</p>
              <h3>Steps:</h3>
              <p>
                {`${
                  detail.steps
                    ? detail.steps
                    : "Does not have step to do it :("
                }`}{" "}
              </p>
              
        </ul><Link to='/home'>
        <button onClick={(e)=>handleDelete(e)} className= "custom-button"><span>Eliminar</span></button>
              </Link>
      </div>
    </>
  );
}

export default RecipeDetail;

import React, { useState, useEffect } from "react";
import MenuCard from "../MenuCard/MenuCard";
import Filters from "../Filters/Filters.jsx";
import SearchBar from "../SearchBar/SearchBar";
import Navbar from "../Navbar/Navbar";
import Loader from "../Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes, getDiets } from "../../redux/actions/index";
import "./Home.css";
import Paginate from "../Paginate/Paginate";

function Home() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const msg = useSelector((state) => state.msg);

  const [order, setOrder] = useState("");
  const [resetFilter, setResetFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <SearchBar setCurrentPage={setCurrentPage} />
      <Filters
        setOrder={setOrder}
        setCurrentPage={setCurrentPage}
        resetFilter={resetFilter}
        setResetFilter={setResetFilter}
      />

      <Paginate
        recipesPerPage={recipesPerPage}
        recipes={recipes.length}
        paginado={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="card-god">
        {recipes.length > 0 ? (
          currentRecipes?.map((el) => (
            <MenuCard
              key={el.id}
              id={el.id}
              name={el.name}
              image={el.image}
              types={el.diets.length > 0 ? el.diets : el.types}
            />
          ))
        ) : !recipes.length ? (
          <div className="center-content">{msg}</div>
        ) : recipes.length === 0 ? (
          <Loader />
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default Home;

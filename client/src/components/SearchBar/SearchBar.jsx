import React from "react";
import { useState } from "react";
import {useDispatch} from 'react-redux'
import {getAllRecipesByName} from '../../redux/actions'
import './Searchbar.css'


function Searchbar(){

const [state, setState]= useState('')
const dispatch= useDispatch()

function handleChange(e){
    e.preventDefault()
    setState(e.target.value)
}


function handleSubmit(e){
e.preventDefault()
if(state.length>1){
    dispatch(getAllRecipesByName(state))
    setState('')
}
else{
    alert('No se esta la busquieda')
}
}

return(
    <>
    <div className="center">
    <input 
    type="text"
    placeholder='Insert name'
    onChange={e => handleChange(e)}
    value={state}
    className='form-input-search-bar'
    onKeyPress={e => e.key === 'Enter' && handleSubmit(e)}
            />
     
    <button
    type="submit"
    onClick={e=> handleSubmit(e)}
    className= 'form-submit-search'>
        <span><strong>Buscar!</strong></span>

    </button>
    
    </div>
    </>
)

}

export default Searchbar
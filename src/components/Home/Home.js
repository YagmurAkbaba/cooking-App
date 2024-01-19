import React, {useState, useEffect} from "react";
import Recipe from "../Recipe/Recipe";
import { Container } from "@mui/material";
import { blue } from "@mui/material/colors";


function Home(){
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [recipeList, setRecipeList] = useState([]);

    useEffect(() => {
        fetch("/recipe/getAllRecipes")
        .then(response => response.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setRecipeList(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
    }, [])

    if(error){
       return <div>Error!</div>;
    }else if(!isLoaded){
       return <div>Loading...</div>;
    }else{
        return (
            <div> 
                <Container fixed style={{display:"flex", flexWrap:"wrap", justifyContent:"center", alignItems:"center", marginTop:69, backgroundColor:"blue", minHeight:"100vh"}}>
                {recipeList.map(recipe => (
                    <Recipe title = {recipe.title} text = {recipe.text} userName = {recipe.userName} userId = {recipe.userId}></Recipe>
                     
                ))}
            </Container>
            </div>
            
        );
    }

}

export default Home;
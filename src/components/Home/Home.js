import React, {useState, useEffect} from "react";
import Recipe from "../Recipe/Recipe";
import { Container, IconButton } from "@mui/material";
import RecipeCreator from "../Recipe/RecipeCreator";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Alert from '@mui/material/Alert';
import AlertTitle from "@mui/material/AlertTitle";


function Home(){
    
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [recipeList, setRecipeList] = useState([]);
    const [recipeCreator, setRecipeCreator] = useState(false);
    const [isAlert, setIsAlert] = useState(false);

    const handleRecipeCreation = () => {
        if(!recipeCreator){
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setRecipeCreator(!recipeCreator);
    }

   const getRecipes=()=>{
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
   }
    useEffect(() => {
        getRecipes();
    }, [recipeList]);

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsAlert(false);
        }, 5000); // Set the duration in milliseconds (e.g., 5000 for 5 seconds)
    
        return () => {
          clearTimeout(timer);
        };
      }, [isAlert]);

    if(error){
       return <div style={{marginTop:82}}>Error!</div>;
    }else if(!isLoaded){
       return <div style={{marginTop:82}}>Loading...</div>;
    }else{
        return (
            <div style={{backgroundColor:"#FBF9F1"}}> 
                <Container fixed style={{display:"flex", flexWrap:"wrap", justifyContent:"center", alignItems:"center", marginTop:69, minHeight:"100vh"}}>
                <IconButton onClick={handleRecipeCreation} style={{position:"fixed", right: 350, top:100,}}>
                {!recipeCreator ? <AddCircleIcon style={{color:"#F4CE14", fontSize:50, fontWeight:"bold",}}></AddCircleIcon> : <RemoveCircleIcon style={{color:"#F4CE14", fontSize:50, fontWeight:"bold",}}></RemoveCircleIcon>}
                </IconButton>
                {recipeCreator ? 
                <RecipeCreator getRecipes={getRecipes} setRecipeCreator={setRecipeCreator} setIsAlert={setIsAlert}></RecipeCreator> : null}
                {recipeList.map(recipe => (
                    
                    <Recipe recipeId = {recipe.recipeId} ingredients={recipe.ingredients} title = {recipe.title} text = {recipe.text} userName = {recipe.userName} userId = {recipe.userId}></Recipe>
                     
                ))}
                {isAlert ? <Alert  variant="filled" severity="success" onClose={() => {setIsAlert(!isAlert)}} style={{position:"fixed", bottom:20}}>
                    <AlertTitle>Success</AlertTitle>
                        Recipe is posted successfully.
                    </Alert> : null}
            </Container>
            </div>
            
        );
    }

}

export default Home;
import React, {useState, useEffect, useCallback} from "react";
import { useParams } from "react-router-dom";
import Recipe from "../Recipe/Recipe";
import { Container, IconButton } from "@mui/material";
import RecipeCreator from "../Recipe/RecipeCreator";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Alert from '@mui/material/Alert';
import AlertTitle from "@mui/material/AlertTitle";
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

import TextField from '@mui/material/TextField';
import AddBoxIcon from '@mui/icons-material/AddBox';


function User() {
    // Use destructuring to get the specific parameter you want from the object
    const { userId } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [userRecipeList, setUserRecipeList] = useState([]);
    const [recipeCreator, setRecipeCreator] = useState(false);
    const [isAlert, setIsAlert] = useState(false);

    const handleRecipeCreation = () => {
        if(!recipeCreator){
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        setRecipeCreator(!recipeCreator);
    }

   const getUserRecipes= useCallback(()=>{
    fetch(`/recipe/getAllRecipes?userId=${userId}`)
        .then(response => response.json())
        .then(
            (result) => {
                setIsLoaded(true);
                setUserRecipeList(result);
                console.log("resssssuuuuulllllttt");
                console.log(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
   },[userId]);

    useEffect(() => {
        getUserRecipes();
    }, [userRecipeList, getUserRecipes]);

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
                <Container disableGutters maxWidth="false" style={{display:"flex", flexWrap:"wrap", justifyContent:"flex-start", alignItems:"center", marginTop:69, minHeight:"20vh"}}>
                <Avatar sx={{ bgcolor: "#F2BE22",  padding:5, margin:5}}>
                {!!localStorage.getItem("userName") ? localStorage.getItem("userName").charAt(0).toUpperCase() : "U"}
                </Avatar>
                <TextField
                    id="standard-read-only-input"
                    defaultValue={!!localStorage.getItem("userName") ? localStorage.getItem("userName") : "User Name"}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="standard"
                    />
                    <IconButton onClick={handleRecipeCreation} style={{marginLeft:"auto"}} title="Add recipe">
                    {!recipeCreator ? <AddBoxIcon style={{color:"#F4CE14", fontSize:50, fontWeight:"bold"}}></AddBoxIcon> : <RemoveCircleIcon style={{color:"#F4CE14", fontSize:50, fontWeight:"bold",}}></RemoveCircleIcon>}
                    </IconButton>
                    
                </Container>
                <Divider/>
                <Container fixed style={{display:"flex", flexWrap:"wrap", justifyContent:"center", alignItems:"center", minHeight:"80vh"}}>
                {recipeCreator ? 
                    <RecipeCreator getRecipes={getUserRecipes} setRecipeCreator={setRecipeCreator} setIsAlert={setIsAlert}></RecipeCreator> : null}
                    {userRecipeList.map(recipe => (
                        
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

export default User;
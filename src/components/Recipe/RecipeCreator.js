import React, {useEffect, useState} from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import SendIcon from '@mui/icons-material/Send';
import { OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";



let currentUserId = 3;
function RecipeCreator(props){
    const {getRecipes, setRecipeCreator,setIsAlert} =props;
    const [text, setText] = useState("");
    const [title, setTitle] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [isRecipeCreated, setIsRecipeCreated]= useState(false);

    const handleRecipeCreation = async() =>{
        await save();
        setIsRecipeCreated(true);
        setText("");
        setTitle("");
        setIngredients("");
        setRecipeCreator((prevState) => !prevState);
        getRecipes();
        setIsAlert(true);

    }

    const save = async() =>{
        try {
          const response = await fetch("/recipe/createRecipe", {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                  userId: currentUserId,
                  title: title,
                  text: text,
                  ingredients: ingredients
              }),
          });
      
          if (!response.ok) {
      
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const result = await response.json();
          console.log(result);
      
      } catch (error) {
          console.error("Error saving like:", error);
      }
      
      }

    const handleTitle = (value) =>{
        setTitle(value);
        setIsRecipeCreated(false);
    }
    const handleText = (value) =>{
        setText(value);
        setIsRecipeCreated(false);
    }

    const handleIngredients = (value) =>{
        setIngredients(value.split(","));
        setIsRecipeCreated(false);
    }

    return(         
        <Card sx={{ width: 600,  marginBottom: 1, marginTop:1}}>
        <CardHeader
          avatar={
            <Link to={`/user/getUserById/${currentUserId}`} style={{textDecoration:"none"}}>
            <Avatar sx={{ bgcolor: "#F2BE22" }} aria-label="recipe">
             R
            </Avatar>
            </Link>
          }
        //   action={
        //     <IconButton aria-label="settings">
        //       <MoreVertIcon />
        //     </IconButton>
        //   }
          title={<OutlinedInput id="outlined-adornment-amout" multiline placeholder="title" 
          inputProps={{maxSize:30}} fullWidth value={title} onChange={(input) =>handleTitle(input.target.value)}>

             </OutlinedInput>}
        //  subheader="September 14, 2016"
        />
        {/* <CardMedia
          component="img"
          height="60%"
          image="C:\Users\yağmur\Desktop\SpringBoot_Techcareer\cooking-app\public\paella.jpg"
          alt="Paella dish"
        /> */}
        <CardContent>
        <Typography variant="body2" color="text.secondary" >
          {<OutlinedInput id="outlined-adornment-amout" multiline placeholder="ingredients - seperate with ," 
          inputProps={{maxSize:500}} fullWidth value={ingredients} onChange={(input) =>handleIngredients(input.target.value)}>

            </OutlinedInput>}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{marginTop:10}}>
          {<OutlinedInput id="outlined-adornment-amout" multiline placeholder="text" 
          inputProps={{maxSize:500}} fullWidth value={text} onChange={(input) =>handleText(input.target.value)}>

            </OutlinedInput>}
          </Typography>
        </CardContent>  

        <CardActions disableSpacing>
          <IconButton onClick={handleRecipeCreation} aria-label="create recipe" style={{marginLeft:"auto", color:"#F4CE14"}}>
            <SendIcon/>
            
          </IconButton>
        </CardActions>     
      </Card>
    );
}
export default RecipeCreator;
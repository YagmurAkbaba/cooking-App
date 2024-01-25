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
import { InputAdornment, OutlinedInput } from "@mui/material";
import { Link } from "react-router-dom";




function CommentCreator(props){
    const {getComments, recipeId} =props;
    const [text, setText] = useState("");
    const [isCommentCreated, setIsCommentCreated]= useState(false);

    const handleCommentCreation = async() =>{
        await save();
        setIsCommentCreated(true);
        setText("");
        getComments();

    }

    const save = async() =>{
        try {
          const response = await fetch("/comment/createComment", {
              method: "POST",
              headers: { "Content-type": "application/json" },
              body: JSON.stringify({
                  userId: localStorage.getItem("currentUser"),
                  recipeId:recipeId,
                  text: text,
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


    const handleText = (value) =>{
        setText(value);
        setIsCommentCreated(false);
    }


    return(         
       <Card sx={{ width: "98%",  marginBottom: 1, marginTop:1, backgroundColor:"#FBF9F1"}}>
        <CardHeader style={{alignItems:"flex-start"}}
          avatar={
            <Link to={`/user/getUserById/${localStorage.getItem("currentUser")}`} style={{textDecoration:"none"}}>
            <Avatar sx={{ bgcolor: "#F2BE22" }} aria-label="recipe">
            {!!localStorage.getItem("userName") ? localStorage.getItem("userName").charAt(0).toUpperCase() : "U"}
            </Avatar>
            </Link>
          }
          title={<OutlinedInput id="outlined-adornment-amout" multiline placeholder="comment" 
          inputProps={{maxSize:300}} fullWidth value={text} onChange={(input) =>handleText(input.target.value)}
          endAdornment={
            <InputAdornment position="end">
                <IconButton onClick={handleCommentCreation} aria-label="create recipe" style={{marginLeft:"auto", color:"#F4CE14"}}>
            <SendIcon/>
            
          </IconButton> 
            </InputAdornment>
          }
          >
                 
             </OutlinedInput>}
        
          
        />
        
      </Card>
    );
}
export default CommentCreator;
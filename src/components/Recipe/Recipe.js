import React, {useEffect} from "react";
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
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";
import CommentCreator from "../Comment/CommentCreator";

let currentUserId = 3;
function Recipe(props){
    const {title, text, userName, userId, recipeId, ingredients} = props;
    const [expanded, setExpanded] = React.useState(false);
    const [showComment, setShowComment] = React.useState(false);
    const [liked, setLiked] = React.useState(false);
    const [likeList, setLikeList] = React.useState([]);
    const [likeCount, setLikeCount] = React.useState(likeList.length);
    const [likeId, setLikeId] = React.useState();
    const [commentList, setCommentList] = React.useState([]);

    

   useEffect(() => {
    getLikes();
}, []); 

const getLikes = () => {
  if (recipeId !== undefined && recipeId !== null) {
    fetch(`/like/getAllLikes?recipeId=${recipeId}`)
      .then(response => response.json())
      .then(
          (result) => {
              setLikeList(result);
              console.log(result);
          },
          (error) => {
              // setError(error);
              console.log(error);
          }
      )
  }else{
    console.log(recipeId);
    console.log("hata");
  }    
}


const getComments = () => {
  if (recipeId !== undefined && recipeId !== null) {
    fetch(`/comment/getAllComments?recipeId=${recipeId}`)
      .then(response => response.json())
      .then(
          (result) => {
              setCommentList(result);
              console.log(result);
          },
          (error) => {
              // setError(error);
              console.log(error);
          }
      )
  }else{
    console.log(recipeId);
    console.log("hata");
  }    
}

useEffect(() =>{
  getComments();
})

useEffect(() =>{
  setLikeCount(likeList.length);
  if (likeList.length > 0) {
    likeList.forEach((like) => {
        if(like.userId === currentUserId){
          setLiked(true);
          setLikeId(like.likeId);
          setLikeId(like.likeId);
        }
    });
  }
}, [likeList]);


const handleLike = async() => {
  
  try {
      if (liked && likeId) {
          await deleteLike(likeId);
          setLikeCount((prevCount) => prevCount - 1);
          setLiked(!liked);
      } else {
          await saveLike();
          setLikeCount((prevCount) => prevCount + 1);
          setLiked(!liked);
          
      }
      getLikes();
  } catch (error) {
      console.error("Error handling like:", error);
      // You might want to set an error state or provide feedback to the user
  }
    
}; 

const saveLike = async() =>{
  try {
    const response = await fetch("/like/createLike", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            recipeId: recipeId,
            userId: currentUserId
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

const deleteLike = async(likeId) =>{
try {    
  const response = await fetch(`/like/deleteLike/${likeId}`, {
      method: "DELETE"
  });

  

  if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
  }
  console.log(response);
  console.log("Like deleted successfully");
} catch (error) {
  console.error("Error deleting like:", error);
  // Handle error if needed
}

}





    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));

  const handleExpandClick = () => {
    if(showComment){
      setShowComment(false);
    }
    setExpanded(!expanded);};

    const handleCommentClick = () => {
      if(expanded){
        setExpanded(false);
      }
      setShowComment(!showComment);};





    return( 
        <Card sx={{ width: 600,  marginBottom: 1, marginTop:1}}>
        <CardHeader
          avatar={
            <Link to={`/user/getUserById/${userId}`} style={{textDecoration:"none"}}>
            <Avatar sx={{ bgcolor: "#F2BE22" }} aria-label="recipe">
              {userName.charAt(0).toUpperCase()}
            </Avatar>
            </Link>
          }
        //   action={
        //     <IconButton aria-label="settings">
        //       <MoreVertIcon />
        //     </IconButton>
        //   }
          title={title}
          subheader="September 14, 2016"
        />
        {/* <CardMedia
          component="img"
          height="60%"
          image="C:\Users\yağmur\Desktop\SpringBoot_Techcareer\cooking-app\public\paella.jpg"
          alt="Paella dish"
        /> */}
        <CardContent>
        <Typography variant="body2" color="text.secondary">
            {ingredients.join(",")}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{marginTop:10}}>
            {text}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton onClick={handleLike} aria-label="add to favorites">
            <FavoriteIcon style={liked ? {color:"#F4CE14"} : null}/>
            <div style={{fontSize:22, marginLeft:2, marginRight:2, marginTop:2, fontWeight:"bold", ...(likeCount===0 ? null : {color:"#F4CE14"})}}>{likeCount}</div>
          </IconButton>
          
          
          <IconButton aria-label="comments" onClick={handleCommentClick}>
            <ModeCommentOutlinedIcon/>
            </IconButton>
            
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
              aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
              medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
              occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
              large plate and set aside, leaving chicken and chorizo in the pan. Add
              pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
              stirring often until thickened and fragrant, about 10 minutes. Add
              saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes and
              peppers, and cook without stirring, until most of the liquid is absorbed,
              15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
              mussels, tucking them down into the rice, and cook again without
              stirring, until mussels have opened and rice is just tender, 5 to 7
              minutes more. (Discard any mussels that don&apos;t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then serve.
            </Typography>
          </CardContent>
        </Collapse>

        <Collapse in={showComment} timeout="auto" unmountOnExit>
        <CardContent>
          <CommentCreator getComments={getComments} recipeId={recipeId}></CommentCreator>
        {commentList.map(comment => (
                    
                    <Comment text={comment.text} userId = {comment.userId} userName={comment.userName}></Comment>
                     
                ))}
        
          </CardContent>
        </Collapse>
      </Card>
    );
}
export default Recipe;
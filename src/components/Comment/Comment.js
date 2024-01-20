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
import { OutlinedInput } from "@mui/material";

let currentUserId = 3;
function Comment(props){
    const {text, userName, userId} = props;

    return( 
        <Card sx={{ width: "98%",  marginBottom: 1, marginTop:1, backgroundColor:"#FBF9F1"}}>
        <CardHeader style={{alignItems:"flex-start"}}
          avatar={
            <Link to={`/user/getUserById/${userId}`} style={{textDecoration:"none"}}>
            <Avatar sx={{ bgcolor: "#F2BE22" }} aria-label="recipe">
              {userName.charAt(0).toUpperCase()}
            </Avatar>
            </Link>
          }
          title = {<OutlinedInput id="outlined-adornment-amout" multiline readOnly
           fullWidth value={text}  >

             </OutlinedInput>}
        //   action={
        //     <IconButton aria-label="settings">
        //       <MoreVertIcon />
        //     </IconButton>
        //   }
          
        />
      </Card>
    );
}
export default Comment;
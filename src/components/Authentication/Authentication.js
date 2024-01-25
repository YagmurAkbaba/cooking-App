import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, Input, Button, FormHelperText} from "@mui/material"
import { useNavigate } from "react-router";
import {OutlinedInput} from "@mui/material";
function Authentication() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
 
    const handleUsername = (value) => {
        setUsername(value)
    } 

    const handlePassword = (value) => {
        setPassword(value)
    } 

    const sendRequest = (path) => {
        if(path==="login"){
            sendLoginRequest(path);
        }else{
            sendRegisterRequest(path);
        }
    }

    const sendLoginRequest = async(path)=>{
        const requestData = {
            userName: username,
            password: password,
          };
          
          const queryString = new URLSearchParams(requestData).toString();
        
        try {
            const response = await fetch(`/auth/${path}?${queryString}`);

        
            const result = await response.json();
            console.log(result);
        
            // Assuming result has a userId property
            localStorage.setItem("currentUser", result.userId);
            localStorage.setItem("userName", username);
        } catch (error) {
            console.error("Error during fetch:", error);
        }

    }

    const sendRegisterRequest = async(path)=>{
        try {
            const response = await fetch("/auth/"+path, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    userName: username,
                    password: password,
                }),
            });
        
          
        
            const result = await response.json();
            console.log(result);
        
        } catch (error) {
            console.error("Error saving like:", error);
        }

     }

    const handleButton = (path) => {
        sendRequest(path)
        setUsername("")
        setPassword("")
        navigate("/")
        
    }


    return(
        <div style={{backgroundColor:"#FBF9F1", minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <FormControl>
            
            <OutlinedInput id="username" multiline placeholder="username" 
          inputProps={{maxSize:30}} fullWidth value={username} onChange={(input) =>handleUsername(input.target.value)}></OutlinedInput>
            
           <OutlinedInput id="password" multiline placeholder="password" 
          inputProps={{maxSize:30}} fullWidth value={password} onChange={(input) =>handlePassword(input.target.value)} style={{marginTop:20}}></OutlinedInput>
    
            <Button variant = "contained"
                style = {{marginTop : 40,
                background :"#F4CE14",
                color : 'white'}}
                onClick= {() => handleButton("register")}>Register</Button>
            <FormHelperText style={{margin:20}}>Are you already registered?</FormHelperText>
            <Button variant = "contained"
                style = {{
                background :"#F4CE14",
                color : 'white'}}
                onClick={() => handleButton("login")}>Login</Button>
            
        </FormControl>
        </div>
    );
}

export default Authentication;





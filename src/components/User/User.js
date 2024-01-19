import React from "react";
import { useParams } from "react-router-dom";

function User() {
    // Use destructuring to get the specific parameter you want from the object
    const { userId } = useParams();

    return (
        <div style={{marginTop:70}}>User!!! {userId}</div>
    );
}

export default User;
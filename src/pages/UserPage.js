import React, { useEffect,useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";

function UserPage(){
    const [authorized,setAuthorized]=useState(true)
    useEffect(() => {
        axios
        .get(`http://localhost:4001/vacations`)
        .then(res => {
          // console.log(res);
          console.log("success: ", res.data);
        //   if (res.data.result == "success")
        //     localStorage.setItem('token', res.data.token);
        //   else {
        //     if (res.data.reason == "user name taken")
        //       setModalShow(true)
        //   }
        })
        .catch(function (error) {
            if (error=="Error: Request failed with status code 403")
          console.log("error msg: ", error);
         
        });
      }, []);

    return (
        <div>
            <Header/>
            {authorized?<h1>UserPage</h1>:<Redirect to="/"/>}
            
        </div>
    )
}

export default UserPage;
import React, { useEffect, useState } from "react";
import { Switch, withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import VacationCard from "../components/VacationCard"
import Container from '@material-ui/core/Container';
import "./UserPage.css"

function UserPage(props) {
    const [authorized, setAuthorized] = useState(true)
    const [vacations, setVacations] = useState([])

    useEffect(() => {
        var userToken = localStorage.getItem("token");
        var header = `authorization: bearer ${userToken}`;
        axios
            .get(`http://localhost:4001/vacations`, { headers: { header } })
            .then(res => {
                // console.log(res);
                console.log("success: ", res.data);
                setVacations(res.data)
                console.log("vacations: ", vacations);
                //   if (res.data.result == "success")
                //     localStorage.setItem('token', res.data.token);
                //   else {
                //     if (res.data.reason == "user name taken")
                //       setModalShow(true)
                //   }
            })
            .catch(function (error) {
                if (error == "Error: Request failed with status code 403")
                    console.log("error msg: ", error);

            });
    }, []);

    return (
        <div>
            {console.log(props.location)}
            <Header user={props.location.state.username}/>
            {authorized
                ?
                <Container style={{marginBottom:"50px"}} disableGutters={false} className={"container"}>
                {vacations.map((vacation,index) => {
                    return <VacationCard 
                    description={ vacation.description} 
                    destination={vacation.destination} 
                    price={vacation.price}  
                    from_date={vacation.from_date}
                    to_date={vacation.to_date}
                    key={index} 
                    className={"card"}/>
                })}
                </Container>
                :
                <Redirect to="/" />}

        </div>
    )
}

export default withRouter(UserPage);
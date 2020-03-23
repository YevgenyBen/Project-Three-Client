import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import VacationCard from "../components/VacationCard"
import Container from '@material-ui/core/Container';
import "./UserPage.css"

function UserPage() {
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
            <Header />
            {authorized
                ?
                <Container disableGutters={true} className={"container"}>
                {vacations.map(() => {
                    return <VacationCard className={"card"}/>
                })}
                </Container>
                :
                <Redirect to="/" />}

        </div>
    )
}

export default UserPage;
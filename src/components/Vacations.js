import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import VacationCard from "../components/VacationCard"
import Container from '@material-ui/core/Container';
import { useSelector } from "react-redux";

function Vacations(props) {

    const [vacations, setVacations] = useState([])
    const [favacations, setFaVacations] = useState([])

    var flag = useSelector(state => state.updateReducer.update)
    let currentUser = useSelector(state => state.currentUserReducer.currentUser)
    // console.log('currentUser: ', currentUser);

    useEffect(() => {
        var userToken = localStorage.getItem("token");
        var header = `authorization: bearer ${userToken}`;
        axios
            .get(`http://localhost:4001/vacations/${currentUser} `, { headers: { header } })
            .then(res => {
                console.log("success: ", res.data.payload);
                setVacations(res.data.payload.allVacations)
                setFaVacations(res.data.payload.favoriteVacations)

            })
            .catch(function (error) {
                if (error === "Error: Request failed with status code 403")
                    console.log("error msg: ", error);

            });
    }, []);

    useEffect(() => {
        var userToken = localStorage.getItem("token");
        var header = `authorization: bearer ${userToken}`;
        axios
            .get(`http://localhost:4001/vacations/${currentUser} `, { headers: { header } })
            .then(res => {
                console.log("success: ", res.data.payload);
                setVacations(res.data.payload.allVacations)
                setFaVacations(res.data.payload.favoriteVacations)

            })
            .catch(function (error) {
                if (error === "Error: Request failed with status code 403")
                    console.log("error msg: ", error);


            });
    }, [flag])

    const aFavorite_vacations = vacations.filter((vac) => {
        return favacations.some((favac) => {
            return favac.v_id === vac.id
        });
    });

    const aNotFavorite_vacations = vacations.filter(function (objFromA) {
        return !favacations.find(function (objFromB) {
            return objFromA.id === objFromB.v_id
        })
    })
    return (
        <div>
            <Header user={currentUser} />
            {localStorage.getItem("token") != null
                ?
                <Container style={{ marginBottom: "50px" }} disableGutters={false} className={"container"}>
                    {aFavorite_vacations.map((vacation, index) => {

                        return <VacationCard
                            description={vacation.description}
                            destination={vacation.destination}
                            price={vacation.price}
                            from_date={vacation.from_date}
                            to_date={vacation.to_date}
                            id={vacation.id}
                            picture={vacation.picture}
                            key={index}
                            className={"card"}
                            color={"primary"}
                            mode={false}
                        />
                    })}
                    {aNotFavorite_vacations.map((vacation, index) => {
                        return <VacationCard
                            description={vacation.description}
                            destination={vacation.destination}
                            price={vacation.price}
                            from_date={vacation.from_date}
                            to_date={vacation.to_date}
                            id={vacation.id}
                            picture={vacation.picture}
                            key={index}
                            className={"card"}
                            color={"default"}
                            mode={true}
                        />
                    })}
                </Container>
                :
                <Redirect to="/" />}
        </div>
    )
}

export default Vacations
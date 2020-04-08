import React, { useEffect, useState } from "react";
import Graph from "../components/Graph"
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import axios from "axios";

function GraphHolder() {

    const [favcations, setFavacations] = useState([])

    useEffect(() => {
        var userToken = localStorage.getItem("token");
        var header = `authorization: bearer ${userToken}`;
        axios
            .get(`http://localhost:4001/vacations`, { headers: { header } })
            .then(res => {
                console.log("success: ", res.data.payload);
                setFavacations(res.data.payload)
            })
            .catch(function (error) {
                if (error === "Error: Request failed with status code 403")
                    console.log("error msg: ", error);

            });
    }, [])

    return (
        <Container maxWidth="md" style={{ marginTop: "5%" }}>
            <Paper elevation={10} style={{ width: "1000px", height: "700px" }}>
                <Graph data={favcations} />
            </Paper>
        </Container>
    )
}

export default GraphHolder
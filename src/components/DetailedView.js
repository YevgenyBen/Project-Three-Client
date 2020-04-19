import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import Container from '@material-ui/core/Container';
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import "./DetailedView.css"
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import CancelIcon from '@material-ui/icons/Cancel';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import socketIOClient from "socket.io-client";


import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,

    KeyboardDatePicker,
} from '@material-ui/pickers';



function DetailedView(props) {
    const currentUser = useSelector(state => state.currentUserReducer.currentUser)
    const [fromDate, setFromDate] = useState(props.edit ? new Date(props.currentVacation.from_date) : new Date());
    const [toDate, setToDate] = useState(props.edit ? new Date(props.currentVacation.to_date) : new Date());
    const [file, setFile] = useState({});
    const [validForm, setValidForm] = useState(false)
    const [vacation, setVacation] = useState({
        destination: props.edit ? props.currentVacation.destination : "",
        fromDate: props.edit ? Date.parse(props.currentVacation.from_date) : fromDate,
        toDate: props.edit ? Date.parse(props.currentVacation.to_date) : toDate,
        price: props.edit ? props.currentVacation.price : "",
        fileName: props.edit ? props.currentVacation.picture : "",
        description: props.edit ? props.currentVacation.description : "",
        id: props.edit ? props.currentVacation.id : "",
    });

    const socket = socketIOClient("http://localhost:4001");

    const handleFromDateChange = (date) => {
        setFromDate(date);
    };

    const handleToDateChange = (date) => {
        setToDate(date);
    };

    const handleChange = event => {
        event.persist()
        vacation[event.target.id] = event.target.value
        console.log(vacation)
        setVacation({ ...vacation, [event.target.id]: event.target.value })
    }

    useEffect(() => setValidForm(validateForm()), [toDate, fromDate, vacation.destination, vacation.price, vacation.fileName, vacation.description])

    const handleFileAdd = (event) => {

        if (event.target.files[0]) {
            const data = new FormData()
            data.append('file', event.target.files[0])
            // console.log(event.target.files[0])
            setFile(data)
            vacation.fileName = event.target.files[0].name
            setValidForm(validateForm())
        } else {
            vacation.fileName = ""
            setValidForm(validateForm())
        }
    }

    function validateForm() {

        if ((
            fromDate.getTime() < toDate.getTime())
            && (vacation.destination !== "")
            && (vacation.description !== "")
            && (vacation.price !== "")
            && (vacation.fileName !== "")) {
            return true
        } else {
            return false
        }
    }

    function appendLeadingZeroes(n) {
        if (n <= 9) {
            return "0" + n;
        }
        return n
    }

    const sendToServer = () => {

        vacation.fromDate = fromDate.getFullYear() + "-" + appendLeadingZeroes((fromDate.getMonth() + 1)) + "-" + appendLeadingZeroes(fromDate.getDate())
        vacation.toDate = toDate.getFullYear() + "-" + appendLeadingZeroes((toDate.getMonth() + 1)) + "-" + appendLeadingZeroes(toDate.getDate())
        var userToken = localStorage.getItem("token");
        var header = `authorization: bearer ${userToken}`;
        axios
            .post(`http://localhost:4001/vacations/upload`, file, { headers: { header } })
            .then(res => {
                axios.post(`http://localhost:4001/vacations`, { ...vacation }, { headers: { header } })
            }).then(res => {
                console.log(res);
                socket.emit("vacation added")
                props.handleClose()
            }).catch(function (error) {
                console.log("error: ", error);
            })
            .catch(function (error) {
                console.log("error: ", error);
            });
    }

    const sendUpdate = () => {
        vacation.fromDate = fromDate.getFullYear() + "-" + appendLeadingZeroes((fromDate.getMonth() + 1)) + "-" + appendLeadingZeroes(fromDate.getDate())
        vacation.toDate = toDate.getFullYear() + "-" + appendLeadingZeroes((toDate.getMonth() + 1)) + "-" + appendLeadingZeroes(toDate.getDate())
        var userToken = localStorage.getItem("token");
        var header = `authorization: bearer ${userToken}`;

        //picture was not chosen
        if (Object.keys(file).length === 0 && file.constructor === Object) {
            axios.post(`http://localhost:4001/vacations/update`, { ...vacation }, { headers: { header } })
                .then(res => {
                    console.log(res);
                    socket.emit("vacation edited")
                    props.handleClose()
                }).catch(function (error) {
                    console.log("error: ", error);
                })
        } else {
            axios
                .post(`http://localhost:4001/vacations/upload`, file, { headers: { header } })
                .then(res => {
                    axios.post(`http://localhost:4001/vacations/update`, { ...vacation }, { headers: { header } })
                }).then(res => {
                    console.log(res);
                    socket.emit("vacation edited")
                    props.handleClose()
                }).catch(function (error) {
                    console.log("error: ", error);
                })
                .catch(function (error) {
                    console.log("error: ", error);
                });
        }

    }


    return (
        <div>
            {/* {console.log(props.currentVacation)}
            {console.log(props.edit)} */}
            <Header user={currentUser} />
            <Container maxWidth="md" >
                <Paper elevation={10} style={{ padding: "15px", width: "400px", height: "600px", margin: "auto" }}>
                    <div className="form-holder">

                        <TextField
                            className="destination"
                            onChange={handleChange}
                            variant="outlined"
                            id="destination"
                            label="Destination"
                            name="destination"
                            autoComplete="destination"
                            required
                            value={vacation.destination}
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                style={{ paddingRight: "5px" }}
                                required
                                className="from-date"
                                autoOk
                                disableToolbar
                                variant="inline"
                                inputVariant="outlined"
                                format="yyyy-MM-dd"
                                margin="normal"
                                id="fromDate"
                                label="From Date"
                                value={props.edit ? Date.parse(props.currentVacation.from_date) : fromDate}
                                onChange={handleFromDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                style={{ paddingLeft: "5px" }}
                                required
                                autoOk
                                className="to-date"
                                disableToolbar
                                variant="inline"
                                inputVariant="outlined"
                                format="yyyy-MM-dd"
                                margin="normal"
                                id="toDate"
                                label="To Date"
                                value={props.edit ? Date.parse(props.currentVacation.to_date) : toDate}
                                onChange={handleToDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>

                        {!validForm ? <Alert variant="outlined" severity="info" className="error" style={{ marginBottom: "13px" }}>
                            Please fill all fields and make sure that "From Date" is before "To Date"
                        </Alert> : null}


                        <FormControl fullWidth required variant="outlined" className="price">
                            <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                            <OutlinedInput
                                id="price"
                                onChange={handleChange}
                                startAdornment={<InputAdornment position="start">&euro;</InputAdornment>}
                                labelWidth={60}
                                required
                                value={vacation.price}
                            />
                        </FormControl>

                        <div className="upload">
                            <Typography
                                variant="button"
                                display="block"
                                align="center"
                            >{props.edit ? props.currentVacation.picture : "Vacation Picture"}</Typography>
                            <Button
                                className="save"
                                variant="contained"
                                size="small"
                                startIcon={<CloudUploadIcon />}
                            >
                                <input type="file"
                                    onChange={handleFileAdd}
                                    id="picture"
                                    accept="image/*"
                                    required
                                />
                            </Button>
                        </div>


                        <TextField
                            required
                            className="description"
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            id="description"
                            label="Description"
                            name="description"
                            autoComplete="description"
                            multiline
                            rows="4"
                            value={vacation.description}

                        />
                        {validForm ?
                            <Button
                                className="save"
                                variant="contained"
                                size="large"
                                startIcon={<SaveIcon />}
                                onClick={props.edit ? sendUpdate : sendToServer}
                            >
                                Save
                        </Button> :
                            <Button
                                disabled
                                className="save"
                                variant="contained"
                                size="large"
                                startIcon={<SaveIcon />}
                                onClick={sendToServer}
                            >
                                Save
                        </Button>
                        }
                        <Button
                            className="cancel"
                            variant="contained"
                            size="large"
                            startIcon={<CancelIcon />}
                            onClick={props.handleClose}
                        >
                            Cancel
                        </Button>
                    </div>

                </Paper>
            </Container>
        </div >
    )
}

export default DetailedView;
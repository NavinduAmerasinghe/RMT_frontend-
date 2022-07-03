import React, { useEffect } from "react";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import axios from "axios"
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  //display date
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  }, //end date

  root: {
    display: "flex",
    "& > *": {},
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
 
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function Findtopic() {

 const  [findTopic, setfindTopic] = useState({reserchField :"",reserchTopic:"",supervisor:""})


  // const [findTopic, setfindTopic] = useState([]);

  // const [reserchField, setreserchField] = useState("");
  // const [reserchTopic, setreserchTopic] = useState("");
  // const [supervisor, setsupervisor] = useState("");
  
  // useEffect(() => {
  //   fetch("http://localhost:8000/findtopic/")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setfindTopic(data);
  //       console.log(data);
  //     });
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const url = 
    // const credentials = { reserchField, reserchTopic, supervisor}
    axios.post('http://localhost:8000/findtopic/', findTopic)
    .then((res) => {
      alert("Request Successfully send!");
    })
    .catch((error) => {
      console.log(error.message);
      alert(error.message);
    });
}
  const classes = useStyles();

  return (
    <React.Fragment>
      <main className={styles.signup_container1}>
        <div className={styles.signup_form_container1}>
          <div className={styles.right7}>
            <center>
              <Container component="main" maxWidth="xs">
                <Typography component="h1" variant="h5">
                <br></br>
                  <center><h2>Find a Reserch Topic</h2> </center><br></br>
                </Typography>
                <br />
                <form
                  className={classes.form}
                  onSubmit={e => handleSubmit(e)}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Select a Reserch Field"
                        sx={{ width: 395 }}
                       
                      >
                        <MenuItem value="">
                          <b>Reserch Field </b>
                        </MenuItem>

                        {/* {student
                          ? student.map((hot) => {
                              return (
                                <MenuItem value={hot.hotelName}>
                                  {hot.hotelName}
                                </MenuItem>
                              );
                            })
                          : null} */}
                      </Select>
                    </Grid>   
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="reserchTopic"
                        label="Enter Reserch Topic"
                        name="Enter Reserch Topic"
                        autoComplete="reserchTopic"
                        autoFocus
                        onChange={e => setfindTopic({ ...findTopic,reserchTopic:e.target.value })} 
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Select a Supervisor"
                        sx={{ width: 395 }}
                        
                      >
                        <MenuItem value="">
                          <b> Select a Supervisor </b>
                        </MenuItem>
                        {/* {student
                          ? student.map((hot) => {
                              return (
                                <MenuItem value={hot.hotelName}>
                                  {hot.hotelName}
                                </MenuItem>
                              );
                            })
                          : null} */}
                      </Select>
                    </Grid>


                  </Grid>
                  <br></br>
       
                  <Link to="/create">
                    <Button type="button"
              variant="outline-info"
              className={styles.green_btn}
            >Back</Button>
                  </Link>
                  
                  <Button type="submit" className={styles.green_btn}>
                    Send a Request to Supervisor
                  </Button>

                  {/* </Link> */}
                </form>
              </Container>
            </center>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
}

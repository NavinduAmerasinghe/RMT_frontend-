import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { green, pink } from "@material-ui/core/colors";

import { createTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";
import SoloAlert from "soloalert";
import axios from "axios";
import { MDBCol } from "mdbreact";
import "./styles.css";
import styles from "./styles.module.css";

import { Button, Modal } from "react-bootstrap";
// import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardHeader } from 'mdb-react-ui-kit';

const columns = [
  {
    id: "studentGrp",
    label: "Student Group",
    minWidth: 100,
    align: "left",
    main: "#f44336",
  },
  {
    id: "completness",
    label: "Completeness",
    minWidth: 170,
    align: "left",
  },
  {
    id: "corectness",
    label: "Correctness",
    minWidth: 170,
    align: "left",
  },

  {
    id: "plagiarism",
    label: "Plagiarism",
    minWidth: 170,
    align: "left",
  },
  {
    id: "total",
    label: "Total Marks",
    minWidth: 170,
    align: "left",
  },
  {
    id: "comments",
    label: "Comments",
    minWidth: 170,
    align: "left",
  },
];

function MarksTable(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [MarksTable("", "", "", "")];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: theme.spacing(0),
    width: theme.spacing(150),
    height: theme.spacing(60),
    marginTop: theme.spacing(0),
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  root2: {
    width: "100%",
    margin: theme.spacing(35),
    width: theme.spacing(157),
    height: theme.spacing(60),
    marginTop: theme.spacing(0),
  },
  green: {
    color: "#fff",
    backgroundColor: green[500],
  },
  container: {
    maxHeight: 450,
  },
}));

export default function MarkssTable() {
  const [docMarks, setDocMarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setfiltered] = useState([]);
  const [hotelName, sethotelName] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/docEvaluation/")
      .then((res) => res.json())
      .then((data) => {
        setDocMarks(data);
      });
  }, []);

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const handleChange = ({ currentTarget: input }) => {
    setDocMarks({ ...docMarks, [input.name]: input.value });
  };

  //color picker
  const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: "#f44336",
      },
    },
  });

  return (
    <div>
      {/* <div className={classes.root2}> */}
      {/* <div class="topnav">
        <a className="name" href="#home">
          Hotel.lk
        </a>
        <a href="" onClick={handleLogout}>
          Logout
        </a>
        <Link to="/login">Sign In</Link>
        <Link to="/signup">Register</Link>
        <a href="/main">Home</a>
      </div> */}
      <center>
        <h1 variant="h4" gutterBottom>
          Document Evaluation Details of Student Groups
        </h1>
        <div class="buttonn">
          <br></br>
        </div>
        <MDBCol md="6">
          <input
            class="form-control"
            id="myInput"
            type="text"
            placeholder="Search.."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </MDBCol>
        <hr />

        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {docMarks
                  .filter((value) => {
                    if (searchTerm === "") {
                      return value;
                    } else if (
                      value.studentGrp
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((docMarks, i) => (
                    <TableRow key={docMarks._id}>
                      <TableCell>{docMarks.studentGrp}</TableCell>
                      <TableCell>{docMarks.completness}</TableCell>
                      <TableCell>{docMarks.corectness}</TableCell>
                      <TableCell>{docMarks.plagiarism}</TableCell>
                      <TableCell>{docMarks.total}</TableCell>
                      <TableCell>{docMarks.comments}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </center>
    </div>
  );
}

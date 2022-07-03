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
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import { green, pink } from "@material-ui/core/colors";
import Avatar from "@material-ui/core/Avatar";
import FolderIcon from "@material-ui/icons/Folder";
import PageviewIcon from "@material-ui/icons/Pageview";
import AssignmentIcon from "@material-ui/icons/Assignment";

import { createTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import Typography from "@material-ui/core/Typography";

import { Link } from "react-router-dom";
import SoloAlert from "soloalert";
import axios from "axios";
import { MDBCol } from "mdbreact";

import jspdf from "jspdf";
import "jspdf-autotable";
import AdminPage from "../AdminPage/AdminPage";
import SearchIcon from "@mui/icons-material/Search";

const columns = [
  {
    id: "role",
    label: "User Role",
    minWidth: 0,
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "username",
    label: "User Name",
    minWidth: 0,
    align: "left",
    main: "#f44336",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 0,
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "phone",
    label: "Phone",
    minWidth: 0,
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "researchField",
    label: "Research Field",
    minWidth: 0,
    align: "left",
    // format: (value) => value.toLocaleString('en-US'),
  },
];

function BranchDetailsTable(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [BranchDetailsTable("", "", "", "")];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    margin: theme.spacing(0),
    width: theme.spacing(120),
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

export default function SupervisorDetails() {
  const [user, setuser] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setfiltered] = useState([]);
  const [supervisorRole, setsupervisorRole] = useState([]);

  //This useEffect function used to get all contract's data
  useEffect(() => {
    fetch("http://localhost:8000/api/auth/getUser/")
      .then((res) => res.json())
      .then((data) => {
        setuser(data);
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
      <AdminPage />
      <div className={classes.root2}>
        <Typography variant="h4" gutterBottom>
          User Role Details
          {/* <Avatar className={classes.green}>
        <AssignmentIcon />
      </Avatar> */}
        </Typography>

        <MDBCol md="6">
          <input
            class="form-control"
            id="myInput"
            type="text"
            placeholder="Search by Role.."
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </MDBCol>

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
                {user
                  .filter((value) => {
                    if (searchTerm === "") {
                      return value;
                    } else if (
                      value.role
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                  .map((u, i) => (
                    <TableRow key={u._id}>
                      <TableCell>{u.role}</TableCell>
                      <TableCell>{u.username}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>{u.phone}</TableCell>
                      <TableCell>{u.researchField}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
}

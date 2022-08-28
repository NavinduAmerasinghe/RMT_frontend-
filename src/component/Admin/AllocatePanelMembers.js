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

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import AdminPage from "../Admin/AdminPage/AdminPage";
import TextField from "@material-ui/core/TextField";

import Grid from "@material-ui/core/Grid";

const columns = [
  {
    id: "groupName",
    label: "groupName",
    minWidth: 80,
    align: "left",
    main: "#f44336",
  },
  {
    id: "panelMember",
    label: "Panel Member",
    minWidth: 80,
    align: "left",
  },
  {
    id: "feedback",
    label: "Feedback",
    minWidth: 80,
    align: "left",
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
    width: theme.spacing(150),
    height: theme.spacing(60),
    marginTop: theme.spacing(0),
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  root2: {
    width: "100%",
    margin: theme.spacing(60),
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

export default function GroupDetails() {
  const [allocatePanelMember, setAllocatePanelMember] = useState({
    groupName: "",
    panelMemberName: "",
    feedback: "",
  });
  const [panelMember, setpanelMember] = useState([]);
  const [creategroup, setCreategroup] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/allocatePanelMembers/", allocatePanelMember)
      .then((res) => {
        alert("Added Successfully!");
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  useEffect(() => {
    (async () => {
      const result = await axios.get("http://localhost:8000/creategroup");
      setCreategroup(result.data.data);
    })();
  }, []);
  console.log(creategroup);

  //This useEffect function used to get all panel member data
  useEffect(() => {
    (async () => {
      const result = await axios.get("http://localhost:8000/api/auth/getUser/");
      setpanelMember(result.data);
    })();
  }, []);
  console.log(panelMember);

  // function handlePanelMemeber(e) {
  //   e.preventDefault();
  //   setpanelMember({ ...panelMember, panelMember: e.target.value });
  // }

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    event.preventDefault();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    event.preventDefault();
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
          <center> Allocate Panel Members</center>
        </Typography>

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
                {creategroup.map((sup) => (
                  <TableRow key={sup._id}>
                    <TableCell>{sup.groupName}</TableCell>

                    <TableCell>
                      <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        label="Panel Member Name"
                        sx={{ width: 395 }}
                        onChange={(e) =>
                          setAllocatePanelMember({
                            ...allocatePanelMember,
                            panelMember: e.target.value,
                          })
                        }
                      >
                        <MenuItem value="">
                          <em>Select Panel Member </em>
                        </MenuItem>
                        {panelMember.map((pm) => {
                          return pm.role === "panelmember" ? (
                            <MenuItem value={pm.username}>
                              {pm.username}
                            </MenuItem>
                          ) : null;
                        })}
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Grid item xs={12}>
                        <TextField
                          variant="outlined"
                          required
                          fullWidth
                          id="feedback"
                          label="Feedback...."
                          name="feedback"
                          autoComplete="branchTell"
                          onChange={(e) =>
                            setAllocatePanelMember({
                              ...allocatePanelMember,
                              feedback: e.target.value,
                            })
                          }
                        />
                      </Grid>
                    </TableCell>
                    <TableCell>
                      <Link
                        to={"/allocatePanelMembers"}
                        type="submit"
                        class="btn btn-primary"
                      >
                        ADD
                        <button
                          onClick={(e) => {
                            handleSubmit(e);
                          }}
                          class="btn btn-primary"
                        ></button>
                      </Link>
                    </TableCell>
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

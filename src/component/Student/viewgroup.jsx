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


const columns = [
  {
    id: "groupName",
    label: "groupName",
    minWidth: 80,
    align: "left",
    main: "#f44336",
  },
  {
    id: "member1",
    label: "member1",
    minWidth: 80,
    align: "left",

  },
  {
    id: "member2",
    label: "member2",
    minWidth: 80,
    align: "left",

  },
  {
    id: "member3",
    label: "member3",
    minWidth: 80,
    align: "left",

  },
  {
    id: "member4",
    label: "member4",
    minWidth: 80,
    align: "left",

  },
  {
    id: "it1",
    label: "it1",
    minWidth: 80,
    align: "left",

  },
  {
    id: "it2",
    label: "it2",
    minWidth: 80,
    align: "left",

  },
  {
    id: "it3",
    label: "it3",
    minWidth: 80,
    align: "left",

  },
  {
    id: "it4",
    label: "it4",
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

export default function GroupDetails() {
  const [creategroup, setCreategroup] = useState([]);
  const [groupName, setgroupName] = useState([]);
  const [member1, setmember1] = useState([]);
  const [member2, setmember2] = useState([]);
  const [member3, setmember3] = useState([]);
  const [member4, setmember4] = useState([]);
  const [it1, setit1] = useState([]);
  const [it2, setit2] = useState([]);
  const [it3, setit3] = useState([]);
  const [it4, setit4] = useState([]);

  
  
  useEffect(() => {
    (async () => {
      const result = await axios.get("http://localhost:8000/creategroup");
      setCreategroup(result.data.data);
    })();
  }, []);
  console.log("hi",creategroup)




  async function delet(id) {
    SoloAlert.confirm({
      title: "Confirm Delete",
      body: "Are you sure",
      theme: "dark",
      useTransparency: true,
      onOk: async function () {
        try {
          const result = await (
            await axios.delete(
              `http://localhost:8000/creategroup/${id}`
            )
          ).status;
          console.log(result);

          if (result === 200) {
            SoloAlert.alert({
              title: "Welcome!",
              body: "Deletion is successful",
              icon: "success",
              theme: "dark",
              useTransparency: true,
              onOk: function () {
                window.location = "/view";
              },
            });
          }
        } catch (err) {
          SoloAlert.alert({
            title: "Oops!",
            body: "Something went wrong",
            icon: "error",
            theme: "dark",
            useTransparency: true,
            onOk: function () {},
          });
        }
      },
      onCancel: function () {
        SoloAlert.alert({
          title: "Oops!",
          body: "You canceled delete request",
          icon: "warning",
          theme: "dark",
          useTransparency: true,
          onOk: function () {},
        });
      },
    });
  }

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
      <div className={classes.root2}>
        <Typography variant="h4" gutterBottom>
          Group Details
         
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
                  <TableCell>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {creategroup.map((sup) => (

                  <TableRow key={sup._id}>
                    <TableCell>{sup.groupName}</TableCell>
                    <TableCell>{sup.member1}</TableCell>
                    <TableCell>{sup.member2}</TableCell>
                    <TableCell>{sup.member3}</TableCell>
                    <TableCell>{sup.member4}</TableCell>
                    <TableCell>{sup.it1}</TableCell>
                    <TableCell>{sup.it2}</TableCell>
                    <TableCell>{sup.it3}</TableCell>
                    <TableCell>{sup.it4}</TableCell>
                    <TableCell>
                      <Link
                        to={"/update/" + sup._id}
                        type="submit"
                        class="green_btn"
                      >
                        <i class="fa fa-trash"></i>  UPDATE
                      </Link>
                      
                      <button
                          type="submit"
                          class="green_btn"
                          onClick={(e) => {
                            delet(sup._id);
                          }}
                        >
                          <i class="fa fa-trash"></i> DELETE
                        </button>
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

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Signup = (props) => {
  const [data, setData] = useState({
    username: "",
    password: "",
    password2: "",
    email: "",
    phone: "",
    role: "",
    researchField: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password == data.password2) {
      try {
        const url = "http://localhost:8000/api/auth/register";
        const { data: res } = await axios.post(url, data);
        navigate("/login");
        console.log(res.message);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    } else {
      alert("Passwords do not match!");
    }
  };

  const handleRoleChange = async (e) => {
    e.preventDefault();
    await setData({ ...data, role: e.target.value });
    // if (this.state.role.includes("student")) {
    //   await setData({ isstudent: true });
    // } else {
    //   await setData({ isstudent: false });
    // }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h4>Already have an account ? </h4>
          <hr />
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign In
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>REGISTER</h1>

            <input
              type="username"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={data.username}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              onChange={handleChange}
              value={data.password2}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="phone"
              placeholder="Phone"
              name="phone"
              onChange={handleChange}
              value={data.phone}
              required
              className={styles.input}
            />
            <InputLabel id="role">Role</InputLabel>
            <Select
              // labelId="role"
              // value={data.role}
              // onChange={handleRoleChange}
              // label="Role"
              // className={styles.input}
              type="role"
              placeholder="Role"
              name="role"
              onChange={handleRoleChange}
              value={data.role}
              required
              className={styles.dropdown}
            >
              <MenuItem value={"admin"}>admin</MenuItem>
              <MenuItem value={"student"}>student</MenuItem>
              <MenuItem value={"supervisor"}>Supervisor</MenuItem>
              <MenuItem value={"cosupervisor"}>Co-Supervisor</MenuItem>
            </Select>
            {/* <input
              type="role"
              placeholder="Role"
              name="role"
              onChange={handleChange}
              value={data.role}
              required
              className={styles.input}
            /> */}

            {data.role == "supervisor" || data.role == "cosupervisor" ? (
              <input
                type="researchField"
                placeholder="Research Field"
                name="researchField"
                onChange={handleChange}
                value={data.researchField}
                required
                className={styles.input}
              />
            ) : null}

            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

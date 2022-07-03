import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Dashboard = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:9000/api/students/create";
      const { data: res } = await axios.post(url, data);
      navigate("/create");
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
  };

  return (
    <div className={styles.signup_container2}>
      <div className={styles.signup_form_container2}>
        <div className={styles.right2}>
          <form className={styles.form_container2} onSubmit={handleSubmit}>
            <br></br>
            <br></br>
            <h1>Dashboard</h1>
            <br></br>
            <br></br>

            <Link to="/create">
              <button
                type="button"
                variant="outline-info"
                className={styles.green_btn1}
              >
                Create a Group
              </button>
            </Link>
            <br></br>
            <Link to="/documentlist">
              <button
                type="button"
                variant="outline-info"
                className={styles.green_btn1}
              >
                Download Template
              </button>
            </Link>
            <br></br>
            <Link to="/viewpresentationmarks">
              <button
                type="button"
                variant="outline-info"
                className={styles.green_btn1}
              >
                View Presentation Marks
              </button>
            </Link>
            <br></br>
            <Link to="/dispalyStdDocMarks">
              <button
                type="button"
                variant="outline-info"
                className={styles.green_btn1}
              >
                View Document Marks
              </button>
            </Link>
            <br></br>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

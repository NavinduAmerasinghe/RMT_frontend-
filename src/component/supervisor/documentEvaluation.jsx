import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const AddDocumentMarks = () => {
  const [data, setData] = useState({
    studentGrp: "",
    completness: "",
    corectness: "",
    plagiarism: "",
    total: "",
    comments: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8000/api/docEvaluation/add";
      const { data: res } = await axios.post(url, data);
      navigate("/displayDocMarks");
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
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Document Evaluation</h1>

            <input
              type="text"
              placeholder="Student Group"
              name="studentGrp"
              onChange={handleChange}
              value={data.studentGrp}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Completeness"
              name="completness"
              onChange={handleChange}
              value={data.completness}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Correctness"
              name="corectness"
              onChange={handleChange}
              value={data.corectness}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Plagiarism"
              name="plagiarism"
              onChange={handleChange}
              value={data.plagiarism}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Total Marks"
              name="total"
              onChange={handleChange}
              value={data.total}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Comments (optional)"
              name="comments"
              onChange={handleChange}
              value={data.comments}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Add Evaluation
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDocumentMarks;

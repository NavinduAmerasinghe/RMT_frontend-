import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";

const updateDocEvaluation = () => {
  const [updateDocDetails, setUpdateDocDetails] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const [studentGrp, setStudentGrp] = useState("");
  const { id } = useParams();
  const [completness, setCompleteness] = useState("");
  const [corectness, setCorrectness] = useState("");
  const [plagiarism, setPlagiarism] = useState("");
  const [total, setTotal] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/api/docEvaluation/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUpdateDocDetails(data);
        console.log(data);
      });
  }, []);

  const [data, setData] = useState({
    studentGrp: "",
    completness: "",
    corectness: "",
    plagiarism: "",
    total: "",
    comments: "",
  });

  //   console.log(updateHotels.comments);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/api/docEvaluation/updateDocEvaluation/${id}`;
    const credentials = {
      studentGrp,
      completness,
      corectness,
      plagiarism,
      total,
      comments,
    };
    axios
      .put(url, credentials)
      .then((res) => {
        alert("Document Evaluation Updated Successfully!");
        window.location = "/displayDocMarks";
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.update_form_container}>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Update Evaluation Details</h1>

            <label>Student Group</label>
            <input
              type="text"
              placeholder={data.studentGrp}
              name="studentGrp"
              onChange={(e) => setStudentGrp(e.target.value)}
              defaultValue={updateDocDetails.studentGrp}
              className={styles.input}
            />

            <label>Completeness</label>
            <input
              type="text"
              placeholder={data.completness}
              name="completness"
              onChange={(e) => setCompleteness(e.target.value)}
              defaultValue={updateDocDetails.completness}
              className={styles.input}
            />

            <label>Correctness</label>
            <input
              type="text"
              placeholder={data.corectness}
              name="corectness"
              onChange={(e) => setCorrectness(e.target.value)}
              defaultValue={updateDocDetails.corectness}
              className={styles.input}
            />

            <label>Plagiarism</label>
            <input
              type="text"
              placeholder={data.plagiarism}
              name="plagiarism"
              onChange={(e) => setPlagiarism(e.target.value)}
              defaultValue={updateDocDetails.plagiarism}
              className={styles.input}
            />

            <label>Total Marks</label>
            <input
              type="text"
              placeholder={data.total}
              name="total"
              onChange={(e) => setTotal(e.target.value)}
              defaultValue={updateDocDetails.total}
              className={styles.input}
            />

            <label>Comments</label>
            <input
              type="text"
              placeholder={data.comments}
              name="comments"
              onChange={(e) => setComments(e.target.value)}
              defaultValue={updateDocDetails.comments}
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Add Hotel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default updateDocEvaluation;

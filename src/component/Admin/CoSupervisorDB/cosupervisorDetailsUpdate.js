import { React, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import AdminPage from "../AdminPage/AdminPage";

const updateDocEvaluation = () => {
  const [updatecosupervisorDetails, setUpdatecosupervisorDetails] = useState(
    []
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const [username, setUsername] = useState("");
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/api/auth/getUser/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUpdatecosupervisorDetails(data);
        console.log(data);
      });
  }, []);

  const [data, setData] = useState({
    username: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/api/auth/update/${id}`;
    const credentials = { username, email, phone };
    axios
      .put(url, credentials)
      .then((res) => {
        alert("Panel Member Updated Successfully!");
        window.location = "/co-supervisorDetails";
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  return (
    <div>
      <AdminPage />

      <div className={styles.card}>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <h1>Update Co Supervisor Details</h1>

          <label>Co Supervisor Name</label>
          <input
            type="text"
            placeholder={data.username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            defaultValue={updatecosupervisorDetails.username}
            className={styles.input}
          />

          <label>Co Supervisor Email</label>
          <input
            type="text"
            placeholder={data.email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            defaultValue={updatecosupervisorDetails.email}
            className={styles.input}
          />

          <label>Mobile No</label>
          <input
            type="text"
            placeholder={data.phone}
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
            defaultValue={updatecosupervisorDetails.phone}
            className={styles.input}
          />

          {error && <div className={styles.error_msg}>{error}</div>}
          <button type="submit" className={styles.green_btn}>
            Update CoSupervisor
          </button>
        </form>
      </div>
    </div>
  );
};

export default updateDocEvaluation;

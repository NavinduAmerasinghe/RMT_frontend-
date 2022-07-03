import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";

const Updategroup = () => {
  const [updateGroupDetails, setUpdateGroupDetails] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const [groupName, setgroupName] = useState("");
  const { id } = useParams();
  const [member1, setmember1] = useState("");
  const [member2, setmember2] = useState("");
  const [member3, setmember3] = useState("");
  const [member4, setmember4] = useState("");
  const [it1, setit1] = useState("");
  const [it2, setit2] = useState("");
  const [it3, setit3] = useState("");
  const [it4, setit4] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/creategroup/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUpdateGroupDetails(data);
        console.log(data);
      });
  }, []);

  const [data, setData] = useState({
    groupName: "",
    member1: "",
    member2: "",
    member3: "",
    member4: "",
    it1: "",
    it2: "",
    it3: "",
    it4: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `http://localhost:8000/creategroup/updategroup/${id}`;
    const credentials = {
      groupName,
      member1,
      member2,
      member3,
      member4,
      it1,
      it2,
      it3,
      it4,
    };
    axios
      .put(url, credentials)
      .then((res) => {
        alert("Group details Updated Successfully!");
        window.location = "/view";
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };
  console.log("hi", data.groupName);
  return (
    <div>
      <main className={styles.signup_container1}>
        <div className={styles.card}>
          <div className={styles.signup_form_container5}>
            <div className={styles.right6}>
              <form className={styles.form_container1} onSubmit={handleSubmit}>
                <h1>Update Group Details</h1>

                <label>Group Name</label>
                <input
                  type="text"
                  placeholder={data.groupName}
                  name="groupName"
                  onChange={(e) => setgroupName(e.target.value)}
                  defaultValue={updateGroupDetails.groupName}
                  className={styles.input}
                />
                <br></br>

                <label>Member1 (Leader)</label>
                <input
                  type="text"
                  placeholder={data.member1}
                  name="member1"
                  onChange={(e) => setmember1(e.target.value)}
                  defaultValue={updateGroupDetails.member1}
                  className={styles.input}
                />

                <label> Member1 IT number</label>
                <input
                  type="text"
                  placeholder={data.it1}
                  name="it1"
                  onChange={(e) => setit1(e.target.value)}
                  defaultValue={updateGroupDetails.it1}
                  className={styles.input}
                />
                <br></br>

                <label>member2</label>
                <input
                  type="text"
                  placeholder={data.member2}
                  name="member2"
                  onChange={(e) => setmember2(e.target.value)}
                  defaultValue={updateGroupDetails.member2}
                  className={styles.input}
                />
                <label> Member2 IT number</label>
                <input
                  type="text"
                  placeholder={data.it2}
                  name="it2"
                  onChange={(e) => setit2(e.target.value)}
                  defaultValue={updateGroupDetails.it2}
                  className={styles.input}
                />
                <br></br>

                <label>member3</label>
                <input
                  type="text"
                  placeholder={data.member3}
                  name="member3"
                  onChange={(e) => setmember3(e.target.value)}
                  defaultValue={updateGroupDetails.member3}
                  className={styles.input}
                />
                <label> Member3 IT number</label>
                <input
                  type="text"
                  placeholder={data.it3}
                  name="it3"
                  onChange={(e) => setit3(e.target.value)}
                  defaultValue={updateGroupDetails.it3}
                  className={styles.input}
                />
                <br></br>
                <label>member4</label>
                <input
                  type="text"
                  placeholder={data.member4}
                  name="member4"
                  onChange={(e) => setmember4(e.target.value)}
                  defaultValue={updateGroupDetails.member4}
                  className={styles.input}
                />
                <label> Member4 IT number</label>
                <input
                  type="text"
                  placeholder={data.it4}
                  name="it4"
                  onChange={(e) => setit4(e.target.value)}
                  defaultValue={updateGroupDetails.it4}
                  className={styles.input}
                />
                <br></br>

                {error && <div className={styles.error_msg}>{error}</div>}
                <button type="submit" className={styles.green_btn}>
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Updategroup;

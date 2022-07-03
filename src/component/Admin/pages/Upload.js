import React, { useState } from "react";
import Alert from "./Alert";
import AdminPage from "../AdminPage/AdminPage";
import styles from "./styles.module.css";
import Button from "@mui/material/Button";
// import Stack from "@mui/material/Stack";
// import BackupIcon from "@mui/icons-material/Backup";
import Backup from "@mui/icons-material/Backup";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function Upload() {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState();
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
      setErrMsg("something went wrong!");
    };
  };

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch("http://localhost:8000/api/upload", {
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });
      setFileInputState("");
      setPreviewSource("");
      setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      console.error(err);
      setErrMsg("Something went wrong!");
    }
  };
  return (
    <div>
      <AdminPage />
      <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
          <div className={styles.right}>
            <h1 className="title">Upload Presentation / Document Templates</h1>
            <br />
            <Alert msg={errMsg} type="danger" />
            <Alert msg={successMsg} type="success" />
            <form onSubmit={handleSubmitFile} className="form">
              <Grid container spacing={2}>
                <TextField
                  id="fileInput"
                  type="file"
                  name="image"
                  onChange={handleFileInputChange}
                  value={fileInputState}
                  className="form-input"
                />
                <Grid item xs={8}>
                  <Button
                    variant="contained"
                    type="submit"
                    endIcon={<Backup />}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
            {previewSource && (
              <img
                src={previewSource}
                alt="chosen"
                style={{ height: "300px" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

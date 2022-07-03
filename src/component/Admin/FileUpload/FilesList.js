import React, { useState, useEffect } from "react";
import download from "downloadjs";
import axios from "axios";
// import { API_URL } from "../utils/constants";
import Header from "../../Admin/FileUpload/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import AdminPage from "../AdminPage/AdminPage";

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/getAllFiles");
        setErrorMsg("");
        setFilesList(data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);

  const downloadFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`http://localhost:8000/download/${id}`, {
        responseType: "blob",
      });
      const split = path.split("/");
      const filename = split[split.length - 1];
      setErrorMsg("");
      return download(result.data, filename, mimetype);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while downloading file. Try again later");
      }
    }
  };

  return (
    <div className="container">
      <div className="main-content">
        <div className="files-container">
          {errorMsg && <p className="errorMsg">{errorMsg}</p>}
          <h1>Presentation/ Doc Tempaltes and Marking Schemas </h1>
          <table className="files-table">
            <thead>
              <tr>
                <th>
                  <center>Title</center>
                </th>
                <th>
                  <center>Description</center>
                </th>
                <th>
                  <center>Download File</center>
                </th>
              </tr>
            </thead>
            <tbody>
              {filesList.length > 0 ? (
                filesList.map(
                  ({ _id, title, description, file_path, file_mimetype }) => (
                    <tr key={_id}>
                      <td className="file-title" align="center">
                        {title}
                      </td>
                      <td className="file-description" align="center">
                        {description}
                      </td>
                      <td>
                        <button
                          className="button"
                          href="#/"
                          onClick={() =>
                            downloadFile(_id, file_path, file_mimetype)
                          }
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={3} style={{ fontWeight: "300" }}>
                    No files found. Please add some.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FilesList;

import React, { useState, useEffect } from "react";
import download from "downloadjs";
import axios from "axios";
// import { API_URL } from "../utils/constants";
// import "bootstrap/dist/css/bootstrap.min.css";
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
  const deleteFile = async (id, path, mimetype) => {
    try {
      const result = await axios.get(`http://localhost:8000/delete/${id}`);
      const split = path.split("/");
      const filename = split[split.length - 1];
      setErrorMsg("");
      return result.data, filename, mimetype;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMsg("Error while deleting file. Try again later");
      }
    }
  };

  return (
    <div>
      <AdminPage />
      <div className="filescontainer">
        <div className="files-container">
          {errorMsg && <p className="errorMsg">{errorMsg}</p>}
          <h3>Presentation/ Doc Tempaltes and Marking Schemas </h3>

          {/* <table className="files-table"> */}
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Download File</th>
                <th>Delete File</th>
              </tr>
            </thead>
            <tbody>
              {filesList.length > 0 ? (
                filesList.map(
                  ({ _id, title, description, file_path, file_mimetype }) => (
                    <tr key={_id}>
                      {/* <td className="file-title" align="center"> */}
                      <td style={{ margin: 5 }}>{title}</td>
                      {/* <td className="file-description" align="center"> */}
                      <td style={{ margin: 500 }}>{description}</td>
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
                      <td>
                        <button
                          className="button"
                          href="#/"
                          onClick={() =>
                            deleteFile(_id, file_path, file_mimetype)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  {/* <td colSpan={3} style={{ fontWeight: "300" }}> */}
                  <td>No files found. Please add some.</td>
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

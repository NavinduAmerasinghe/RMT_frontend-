import React from "react";
import axios from "axios";
import FileDownload from "js-file-download";

function Image(props) {
  const download = (e) => {
    e.preventDefault();
    axios({
      url: "http://localhost:8000/api/images",
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      console.log(res);
      FileDownload(res.data, "download.png");
    });
  };
  return (
    <div>
      <button onClick={(e) => download(e)}>Download</button>
    </div>
  );
}

export default Image;

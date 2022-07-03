import React, { useEffect, useState } from "react";
import { Image } from "cloudinary-react";
import AdminPage from "../AdminPage/AdminPage";
import Download from "./Download";

export default function Home() {
  const [imageIds, setImageIds] = useState();
  const loadImages = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/images");
      const data = await res.json();
      console.log(data);
      setImageIds(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    loadImages();
  }, []);
  return (
    <div>
      {/* <AdminPage /> */}
      <h1 className="title">Cloudinary Gallery</h1>
      <div className="gallery">
        {imageIds &&
          imageIds.map((imageId, index) => (
            <Image
              key={index}
              cloudName="navindu"
              publicId={imageId}
              width="300"
              crop="scale"
            />
          ))}
        {imageIds && imageIds.map((imageId, index) => <Download key={index} />)}
      </div>
    </div>
  );
}

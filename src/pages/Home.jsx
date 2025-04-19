import { useEffect, useState } from "react";
import axios from "axios";
import ImageTile from "../components/ImageTile";

function Home() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://ntqpnjtkm9.execute-api.ap-south-1.amazonaws.com/production/images"
      )
      .then((res) => setImages(res.data.images))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {images.map((url, idx) => (
        <ImageTile key={idx} url={url} />
      ))}
    </div>
  );
}

export default Home;

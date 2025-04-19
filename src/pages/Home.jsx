import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";

function Home() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get(
        "https://ntqpnjtkm9.execute-api.ap-south-1.amazonaws.com/production/images"
      )
      .then((res) => setImages(res.data.images))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {images.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`Image ${idx}`}
            className="cursor-pointer rounded-lg shadow hover:scale-105 transition "
            onClick={() => setSelectedImage(url)}
          />
        ))}
        <Modal
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageUrl={selectedImage}
        />
      </div>
    </>
  );
}

export default Home;

import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "../components/Modal";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

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
      <Navbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-16 bg-gradient-to-bl from-sky-950 to-sky-900 min-h-screen">
        {images.map((url, idx) => (
          <motion.div
            key={idx}
            className="aspect-square w-full overflow-hidden rounded-lg shadow hover:scale-105 transition cursor-pointer bg-slate-800" // fallback bg to preserve layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <img
              src={url}
              alt={`Image ${idx}`}
              className="object-cover w-full h-full"
              onClick={() => setSelectedImage(url)}
              onError={(e) => {
                e.currentTarget.style.display = "none"; // Hide the image if it fails to load
                e.currentTarget.parentElement.style.backgroundColor = "#1e293b"; // fallback background color
              }}
            />
          </motion.div>
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

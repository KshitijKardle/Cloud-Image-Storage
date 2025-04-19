import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Upload() {
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result.split(",")[1];

      try {
        await axios.post(
          "https://ntqpnjtkm9.execute-api.ap-south-1.amazonaws.com/production/upload",
          {
            fileName: file.name,
            fileContent: base64String,
            contentType: file.type,
          }
        );
        alert("Upload successful!");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } catch (err) {
        console.error(err);
        alert("Upload failed.");
      }
    };

    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-600 to-gray-800 text-white">
        <div
          className={`border-4 ${
            dragActive ? "border-blue-400" : "border-dashed border-gray-400"
          } rounded-lg p-8 w-80 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <p className="mb-4 text-lg">Drag & drop your image here</p>
          <p className="mb-2">or</p>
          <input
            type="file"
            className="hidden"
            id="fileInput"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label
            htmlFor="fileInput"
            className="bg-blue-500 px-4 py-2 rounded cursor-pointer"
          >
            Select File
          </label>
          {file && <p className="mt-4 text-green-300">Selected: {file.name}</p>}
        </div>

        <button
          onClick={handleUpload}
          className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Upload
        </button>
      </div>
    </>
  );
}

export default Upload;

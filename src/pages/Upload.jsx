import { useState } from "react";
import axios from "axios";

function Upload() {
  const [file, setFile] = useState(null);

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
      } catch (err) {
        console.error(err);
        alert("Upload failed.");
      }
    };

    reader.readAsDataURL(file);
    // redirect to home page after upload
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
}

export default Upload;

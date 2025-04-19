function ImageTile({ url }) {
  return (
    <div>
      <img
        src={url}
        alt="Uploaded"
        className="object-cover w-full h-64 rounded-lg shadow-lg"
      />
    </div>
  );
}

export default ImageTile;

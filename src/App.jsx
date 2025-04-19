import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <nav style={{ padding: "1rem", background: "#f0f0f0" }}>
        <Link to="/" style={{ marginRight: "1rem" }}>
          Home
        </Link>
        <Link to="/upload">Upload</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;

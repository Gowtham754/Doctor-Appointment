import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";

function App() {
  return (
    <div className="App">
      <div className="content">
        <RouterProvider router={router} />
      </div>

      <footer
        className="text-white mt-5 pt-4 pb-3"
        style={{
          backgroundColor: "#4B6CB7",
        }}
      >
        <div className="container text-center">
          <h5 className="fw-bold mb-2">MediCareBook</h5>
          <p className="small mb-3">
            Your trusted platform for booking appointments with certified medical professionals.
          </p>
          <hr className="border-light" />
          <div className="small">
            &copy; {new Date().getFullYear()} MediCareBook. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

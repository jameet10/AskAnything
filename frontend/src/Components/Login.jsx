import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/login/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      console.log("Login response:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        setMessage("Login successful!");
          navigate("/home");
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong");
    }
  };

  return (
    <div
      className="text-white p-5"
      style={{
        background: "linear-gradient(180deg, #d9ebec, #1638c0 )",
        width: "100vw",
        height: "100vh",
      }}
    >
      <h1 className="text-center pt-5 pb-4  fst-italic fw-bold text-primary" style={{ textShadow: "2px 2px 4px rgba(0, 115, 255, 0.5)" ,fontSize: '5rem'}} >AskAnything</h1>
      <div className="d-flex justify-content-center align-items-center">
        <div className="card shadow-lg mt-5" style={{ width: "20rem" ,height:'20rem'}}>
          <div className="card-body">
            <h5 className="card-title text-center">LogIn Page</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
            <p className="mt-3">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

    

import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
 export const API_URL = import.meta.env.VITE_API_URL;
function Questions()
{
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null; 
  const loggedInUserId = user?.id;
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category_id: "",
  });
    const [message, setMessage] = useState("");
  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

 const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          category_id: formData.category_id,
          user_id: loggedInUserId,
        }),
      });
      const data = await response.json();
      setMessage(data.message);
      setFormData({
        title: "",
        content: "",
        category_id: "",
      });
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong.");
    }
  };
    return(
        <>
           <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h3 className="text-center">Ask a Question</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">
                Question Title
              </label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter Question Title"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                rows="6"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Describe your question..."
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">
                Category
              </label>
              <select
                className="form-select"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required>
                <option value="">
                  Select Category
                </option>
                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Post Question</button>
          </form>
          <p className="mt-3 text-success">
            {message}
          </p>
        </div>
      </div>
    </div> 
        </>
    )
}
export default Questions;

 
    

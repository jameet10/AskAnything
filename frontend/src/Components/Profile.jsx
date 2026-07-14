import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import axios from 'axios';
    export const API_URL = import.meta.env.VITE_API_URL;
function Profile()
{
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
      useEffect(() => {
      axios.get(`${API_URL}/questions`)
            .then(res => setQuestions(res.data))
    }, []);
    useEffect(() => {
        axios.get(`${API_URL}/answers`)
            .then(res => setAnswers(res.data))
    }, []);
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null; 
const loggedInUserId = user?.id;
  //const loggedInUserId = 46;
   const [users, setUsers] = useState([]);
useEffect(() => {
    fetch(`${API_URL}/api/my-posts?userId=${loggedInUserId}`)
        .then(res => res.json())
        .then(data => setUsers(data))
        .catch(err => console.log(err));
}, [loggedInUserId]);
const totalQuestions = questions.filter(
    question => question.user_id === loggedInUserId
).length;
const totalAnswers = answers.filter(
    answer => answer.user_id === loggedInUserId
).length;
    return (
  <div className="container py-5">
    <h1 className="text-center fw-bold text-primary mb-5">
      My Profile
    </h1>
    <div className="row justify-content-center">
      {
        users.map(user => (
          <div className="col-lg-5 col-md-7" key={user.id}>
            <div className="card border-0 rounded-4">
              <div
                className="card-header text-center text-white py-4"
                style={{
                  background: "linear-gradient(135deg,#004aad,#4f8cff)"
                }}
              >
                <img
                  src={user.profile_image}
                  alt="Profile"
                  className="rounded-circle border border-4 border-white shadow"
                  style={{
                    width: "130px",
                    height: "130px",
                    objectFit: "cover"
                  }}
                />
               <h3 className="mt-3 fw-bold">
                  {user.username}
                </h3>
              </div>
              <div className="card-body px-4">
                <div className="mb-3">
                  <h6 className="text-muted">
                    Email
                  </h6>
                  <p className="fs-5">
                    {user.email}
                  </p>
                </div>
                <div className="mb-3">
                  <h6 className="text-muted">
                    Joined On
                  </h6>
                  <p>
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="d-grid mt-4">
                     <hr />

                <div className="row text-center">

                  <div className="col">
                    <h4 className="text-primary">
                      {totalQuestions || 0}
                    </h4>
                    <small className="text-muted">
                      Questions
                    </small>
                  </div>
                  <div className="col">
                    <h4 className="text-success">
                      {totalAnswers || 0}
                    </h4>
                    <small className="text-muted">
                      Answers
                    </small>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  </div>
);
}
export default Profile;


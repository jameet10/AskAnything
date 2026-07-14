import { useParams } from "react-router-dom";
import { useState ,useEffect } from "react";
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
function QuestionDetails()
{
     const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null; 
  const loggedInUserId = user?.id;
   const [questions, setQuestions] = useState(null);
    const [formData, setFormData] = useState({
    answer: "",
    user_id: "",
    question_id: "",
  });   
    const { id } = useParams();
 useEffect(() => {
    fetch(`http://localhost:5000/questions/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setQuestions(data);
        });
}, [id]);
       const [answers, setAnswers] = useState([]);
       useEffect(() => {
    fetch(`http://localhost:5000/questions/${id}/answers`)
        .then(res => res.json())
        .then(data => setAnswers(data));
}, [id]);
useEffect(() => {
    fetch("http://localhost:5000/users")
        .then(res => res.json())
        .then(data => setUsers(data));
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
        const response = await fetch(
            "http://localhost:5000/api/answers",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    answer: formData.answer,
                    user_id: loggedInUserId,
                    question_id: id,
                }),
            }
        );

        const data = await response.json();

        alert(data.message);

        // Clear textarea
        setFormData({
            answer: "",
            user_id: "",
            question_id: "",
        });

        // Reload answers
        fetch(`http://localhost:5000/questions/${id}/answers`)
            .then(res => res.json())
            .then(data => setAnswers(data));

    } catch (err) {
        console.log(err);
    }
};
  const handleDelete = async (answerId) => {
    try {
        const response = await fetch(
            `http://localhost:5000/api/answers/${answerId}`,
            {
                method: "DELETE",
            }
        );
        const data = await response.json();
        alert(data.message);
        fetch(`http://localhost:5000/questions/${id}/answers`)
            .then(res => res.json())
            .then(data => setAnswers(data));
    }
    catch (err) {
        console.log(err);
    }};
    return(
        <>
<section className="d-flex justify-content-center align-items-center mt-5">
                <div>
                    {
                        questions &&(
                                <div
                                    className="card mb-4"
                                    style={{ width: "50vw" }}
                                    key={questions.id}>
                                    <div className="card-body">
                                        <h4 className="card-title">
                                            {questions.title}
                                        </h4>
                                        </div>
                                        </div>
                                  )}</div></section>
                                  <h3 className="mb-3">Answers</h3>
                                  
                                  {
    answers.length > 0 ? (
        answers.map(answer => {

            const user = users.find(
                u => u.id === answer.user_id
            );

            return (
               
            <div className="card mb-3" key={answer.id}>
                <div className="card-body">
                    <p>{answer.answer}</p>
                    <small className="text-muted">
                        Answered by {user?.username}
                    </small>
                    {
                        answer.user_id === loggedInUserId && (
                            <button
                                className="btn btn-danger btn-sm float-end"
                                onClick={() => handleDelete(answer.id)}
                            >
                                Delete
                            </button>

                        )
                    }

                </div>

            </div>
            );

        })
    ) : (
        <p>No answers yet.</p>
    )
}
<div
    className="card mt-4"
    style={{ width: "50vw", margin: "auto" }}
>
    <div className="card-body">

        <h4 className="mb-3">Write Your Answer</h4>

        <form onSubmit={handleSubmit}>

            <div className="mb-3">

                <textarea
                    className="form-control"
                    rows="5"
                    name="answer"
                    value={formData.answer}
                    onChange={handleChange}
                    placeholder="Type your answer here..."
                    required
                ></textarea>

            </div>

            <button
                className="btn btn-primary"
                type="submit"
            >
                Submit Answer
            </button>

        </form>

    </div>
</div>
        </>
    )
}
export default QuestionDetails;

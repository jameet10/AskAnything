import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
    export const API_URL = import.meta.env.VITE_API_URL;
function Home() {
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [users, setUsers] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      axios.get(`${API_URL}/questions`)
            .then(res => setQuestions(res.data))
    }, []);
    useEffect(() => {
        axios.get(`${API_URL}/answers`)
            .then(res => setAnswers(res.data))
    }, []);
    useEffect(() => {
        axios.get(`${API_URL}/users`)
            .then(res => setUsers(res.data))
    }, []);
    useEffect(() => {
        axios.get(`${API_URL}/categories`)
            .then(res => setCategories(res.data))
    }, []);
    return (
        <>
            <section className="d-flex justify-content-center align-items-center mt-5">
                <div>
                    {
                        questions.map((question) => {
                            const user = users.find(
                                u => u.id === question.user_id
                            );
                            const category = categories.find(
                                c => c.id === question.category_id);
                            const questionAnswers = answers.filter(
                                a => a.question_id === question.id);

                            const firstAnswer = questionAnswers[0];
                            const answerUser = users.find(
                                u => u.id === firstAnswer?.user_id);

                            return (
                                <div
                                onClick={() => navigate(`/question/${question.id}`)}
                                    className="card mb-4"
                                    style={{ width: "50vw" }}
                                    key={question.id}>
                                    <div className="card-body">
                                        <h4 className="card-title">
                                            {question.title}
                                        </h4>
                                        <p className="card-text">
                                            {question.content}
                                        </p>
                                        <hr />
                                        <p>
                                            <strong>Asked By:</strong>{" "}
                                            {user ? user.username : "Loading..."}
                                        </p>
                                        {
                                            firstAnswer ? (
                                                <p>{firstAnswer.answer}</p>
                                            ) : (
                                                <p>No answers yet.</p>
                                            )
                                        }
                                        {
                                            firstAnswer && (
                                                <p>
                                                    <strong>Answered By:</strong> {answerUser?.username}
                                                </p>
                                            )
                                        }
                                        <span className="badge bg-primary h-25 mt-1">{category?.name}</span>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </section>
        </>
    );
}

export default Home;


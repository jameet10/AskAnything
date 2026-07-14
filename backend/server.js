const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
require("dotenv").config(); 
app.use(cors());
app.use(express.json());
app.use("/api",require("./routes/auth"));
const bcrypt = require("bcrypt");
 const PORT=process.env.PORT || 5000;
 app.get("/users", (req, res) => {
      db.query("SELECT * FROM users", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
      });
    });
     app.get("/questions", (req, res) => {
      db.query("SELECT * FROM questions", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
      });
    });
     app.get("/answers", (req, res) => {
      db.query("SELECT * FROM answers", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
      });
    });
     app.get("/categories", (req, res) => {
      db.query("SELECT * FROM categories", (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
      });
    });
     app.get("/categories/:id", (req, res) => {
       const id = req.params.id;
      db.query("SELECT * FROM questions where category_id = ?", [id],(err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
      });
    });
         app.get("/questions/:id", (req, res) => {
          const id = req.params.id;
      db.query("SELECT * FROM questions where id = ?", [id],(err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
      });
    });

    app.get("/questions/:id/answers", (req, res) => {
    const { id } = req.params;
    db.query(
        "SELECT * FROM answers WHERE question_id = ?",
        [id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json(result);
        }
    );
});
    app.get('/api/my-posts', (req, res) => {
  const userId = req.query.userId;
  db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});
app.get("/api/search", (req, res) => {
    const search = req.query.query;
    db.query(` SELECT * FROM questions WHERE title LIKE ?`, [`%${search}%`], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});
app.post("/api/answers", (req, res) => {
  const {question_id,answer, user_id } = req.body;
  db.query( ` INSERT INTO answers (question_id,answer, user_id) VALUES (?, ?, ?)`,
     [question_id,answer, user_id ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({
        message: "Answer posted successfully!"
      });
    }
  );
});
app.post("/api/questions", (req, res) => {
  const { title, content, category_id, user_id } = req.body;
  db.query( ` INSERT INTO questions(title, content, user_id, category_id) VALUES (?, ?, ?, ?)`,
     [title, content, user_id, category_id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }
      res.json({
        message: "Question posted successfully!"
      });
    }
  );
});
app.delete("/api/answers/:id", (req, res) => {
    const { id } = req.params;
    db.query(
        "DELETE FROM answers WHERE id = ?",
        [id],
        (err, result) => {
            if (err)
                return res.status(500).json(err);
            res.json({
                message: "Answer deleted successfully"
            });
        }
    );
});
app.listen(PORT, () => { console.log(`Server is running on port ${PORT}`); });
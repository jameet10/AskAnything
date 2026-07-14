const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const router = express.Router();
router.post("/register/users", async (req, res) => {
  console.log("Received form data:", req.body);
  const { username, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    db.query(sql, [username, email, hashPassword], (err, result) => {
      if (err) {
        console.error("DB Insert Error:", err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: "User registered successfully", userId: result.insertId });
    });
  } catch (error) {
    console.error("Hashing Error:", error);
    res.status(500).json({ error: "Password hashing failed" });
  }
});

router.post("/login/users", (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email=?",
        [email], async (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (result.length == 0) {
                return res.json({ message: "User Not Found" });
            }
            const user = result[0];
            const check = await bcrypt.compare(password, user.password);
            if (!check) {
                return res.json({ message: "Wrong Password" });
            } const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.json({ message: "Login Success", token });
        });
});
const auth = require("../middleware/auth");
router.get("/home", auth, (req, res) => {
    res.json({ message: "Welcome User", user: req.user });
});



module.exports = router;



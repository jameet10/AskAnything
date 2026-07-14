const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "No Token" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const verify = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verify; next();
    }
    catch { return res.status(401).json({ message: "Invalid Token" }); }
}; 
// const jwt = require("jsonwebtoken");

// // VERIFY TOKEN
// const verifyToken = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader) {
//     return res.status(401).json({
//       message: "Access denied. Please login first."
//     });
//   }

//   try {
//     const token = authHeader.split(" ")[1];

//     const verified = jwt.verify(token, process.env.JWT_SECRET);

//     req.user = verified;

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       message: "Invalid token"
//     });
//   }
// };

// // ADMIN CHECK
// const isAdmin = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     return res.status(403).json({
//       message: "Access denied. Admin only."
//     });
//   }
// };

// module.exports = { verifyToken, isAdmin };










const jwt = require("jsonwebtoken");

// ✅ VERIFY TOKEN
const verifyToken = (req, res, next) => {

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied. Please login first."
    });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // contains id + role

    next();

  } catch (error) {

    return res.status(401).json({
      message: "Invalid token"
    });

  }

};

// ✅ ADMIN CHECK
const isAdmin = (req, res, next) => {

  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Access denied. Admin only."
    });
  }

};

module.exports = { verifyToken, isAdmin };
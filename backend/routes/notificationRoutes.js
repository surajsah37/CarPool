const router = require("express").Router();
const { getNotifications } = require("../controllers/notificationController");
const { verifyToken } = require("../middleware/authMiddleware");

router.get("/", verifyToken, getNotifications);

module.exports = router;
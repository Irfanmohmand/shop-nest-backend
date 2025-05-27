const { login, signup, refresh, switchProfile } = require('../controllers/authController');

const router = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken');

router.post("/login", login);
router.post("/signup", signup);
router.get("/refresh", refresh);
router.get("/switch", verifyToken, switchProfile);

module.exports = router;

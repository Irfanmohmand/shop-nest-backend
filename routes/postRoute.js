const router = require("express").Router();
const { createPost, getAllPost, getMyPosts } = require("../controllers/postController");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/post/create", verifyToken, createPost);
router.get("/post/getAll", getAllPost);
router.get("/post/myPosts", verifyToken, getMyPosts);

module.exports = router;
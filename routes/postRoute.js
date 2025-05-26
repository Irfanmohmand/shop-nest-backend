const router = require("express").Router();
const { createPost,
  getAllPost,
  getMyPosts,
  deletePost,
  searchPosts,
  addToFavourites,
  removeFromFavourites,
  getFavourites
} = require("../controllers/postController");

const { verifyToken } = require("../middlewares/verifyToken");

router.post("/post/create", verifyToken, createPost);
router.get("/post/getAll", getAllPost);
router.get("/post/myPosts", verifyToken, getMyPosts);
router.delete("/post/delete/:id", verifyToken, deletePost);
router.get("/posts/search", searchPosts);
router.put("/post/addToFavourites/:postId", verifyToken, addToFavourites);
router.put("/post/removeFromFavourites/:postId", verifyToken, removeFromFavourites);
router.get("/posts/favourites", verifyToken, getFavourites)

module.exports = router;
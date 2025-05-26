const Post = require('../models/Post');
const User = require('../models/User');

const createPost = async (req, res) => {
  const authorId = req.id;
  const authorAccountType = req.accountType;

  if (authorAccountType == "buyer") return res.status(403).json({
    success: false,
    message: "Forbidden, only seller can post."
  });

  const { title, author, price, image, publicId } = req.body;

  try {

    const post = new Post({ title, author, price, image, publicId, authorId });
    await post.save();

    await User.findByIdAndUpdate(authorId, {
      $push: { uploads: post._id }
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully.",
      post
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }

};


const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find({});

    if (posts.length === 0) return res.status(404).json({
      success: false,
      message: "No posts found."
    });

    return res.status(200).json({
      success: true,
      data: posts
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
};


const getMyPosts = async (req, res) => {
  const authorId = req.id;
  const authorAccountType = req.accountType;
  try {

    if (authorAccountType === "buyer") {
      const { purchased } = await User.findById(authorId).populate("purchased");
      console.log(purchased);
      if (!purchased) return res.status(404).json({
        success: false,
        message: "No posts found."
      });

      return res.status(200).json({
        success: true,
        data: purchased
      })

    } else {
      const { uploads } = await User.findById(authorId).populate("uploads");
      if (!uploads) return res.status(404).json({
        success: false,
        message: "No posts found."
      });
      return res.status(200).json({
        success: true,
        data: uploads
      })
    }

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error."
    });
  };
};


const deletePost = async (req, res) => {
  const { id } = req.params;

  try {

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({
      success: false,
      message: "Posts not found."
    });

    const { authorId } = post;

    await User.findByIdAndUpdate(id, {
      $pull: { uploads: id }
    });

    // We will not do the same as some people purchased our products.
    // await Post.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully."
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
};


const searchPosts = async (req, res) => {
  const { search } = req.query;
  try {

    const posts = await Post.find({ title: { $regex: search, $options: "i" } });

    if (posts.length == 0) return res.status(404).json({
      success: false,
      message: "No posts found."
    });

    return res.status(200).json({
      success: true,
      data: posts
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


const addToFavourites = async (req, res) => {
  const { authorId } = req.id;
  const { postId } = req.params;

  try {

    const user = await User.findByIdAndUpdate(authorId, {
      $push: { favourites: postId },
    });

    if (!user) return res.status(404).json({
      success: false,
      message: "User not found."
    });

    return res.status(200).json({
      success: false,
      message: "Post added successfully."
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };

};



const removeFromFavourites = async (req, res) => {
  const { authorId } = req.id;
  const { postId } = req.params;

  try {

    const user = await User.findByIdAndUpdate(authorId, {
      $pull: { favourites: postId },
    });

    if (!user) return res.status(404).json({
      success: false,
      message: "User not found."
    });

    return res.status(200).json({
      success: false,
      message: "Post removed from faviourites."
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  };

};



const getFavourites = async (req, res) => {
  const { authorId } = req.id;
  try {

    const { favourites } = await User.findById(authorId).populate("favourites");

    if (!favourites) return res.status(404).json({
      success: false,
      message: "No favourites added"
    });

    return res.status(200).json({
      success: false,
      data: favourites
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = { createPost, getAllPost, getMyPosts, deletePost, searchPosts, addToFavourites, removeFromFavourites, getFavourites };

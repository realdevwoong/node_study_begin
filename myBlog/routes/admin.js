const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const adminLayout = "../views/layouts/admin";
const bcrpyt = require("bcrypt");
const User = require("../models/Users");
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;


/**
 * Check Login
 */

const checkLogin = (req, res, next) => {
  const token = req.cookies.token;

  // 토큰이 없으면 로그인 페이지로 이동
  if (!token) {
    res.redirect("/admin");
  } else {
    // 토큰이 있다면 토큰을 확인하고 사용자 정보를 요청에 추가
    try {
      const decoded = jwt.verify(token, jwtSecret); // 토큰 해석하기
      req.userId = decoded.userId; // 토큰의 사용자 ID를 요청에 추가
      next();
    } catch (error) {
      res.redirect("/admin");
    }
  }
};


/**
 * GET /admin
 * Admin page
 */
router.get(
  "/admin",
  asyncHandler(async (req, res) => {
    const locals = {
      title: "관리자 페이지",
    };

    res.render("admin/index", { locals, layout: adminLayout });
  })
);

/**
 * POST /admin
 * Check admin login
 */
router.post(
  "/admin",
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // if (username === "admin" && password === "admin") {
    //   res.send("Success");
    // } else {
    //   res.send("Fail");
    // }
    const user = await User.findOne({ username});
    if(!user){
      res.status(401).json({ message: "Invalid username or password" });
    }
    const isValidPassword = await bcrpyt.compare(password, user.password);
    if(!isValidPassword){
      res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign({id: user.id}, jwtSecret);

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/allPosts");
    })
);

/**
 * GET /register
 * Register administator
 */

router.get(
  "/register",
  asyncHandler(async (req, res) => {
    const locals = {
      title: "관리자 등록",
    };

    res.render("admin/index", { locals, layout: adminLayout });
  })
);

/**
 * GET /allPosts
 * Get all posts
 */
router.get(
  "/allPosts",
  checkLogin,
  asyncHandler(async (req, res) => {
    const locals = {
      title: "Posts",
    };
    const data = await Post.find().sort({ createdAt: "desc",updatedAt: "desc" });
    // 최신 순으로 정렬하려면 const data = await Post.find().sort({ createdAt: "desc" });
    res.render("admin/allPosts", {
      locals,
      data,
      layout: adminLayout,
    });
  })
);
/**
 * POST /register
 * Register administator
 */

// router.post(
//   "/register",
//   asyncHandler(async (req, res) => {
//     const hashedPassword = await bcrpyt.hash(req.body.password, 10);
//     const user = await User.create({
//       username: req.body.username,
//       password: hashedPassword,
//     });
//     res.json(`user created: ${user}`);
//   })
// );
router.get(
  "/logout",(req,res)=>{
    res.clearCookie("token");
    res.redirect("/admin");
  });

router.get(
  "/add",
  checkLogin,
  asyncHandler(async (req, res) => {
    const locals = {
      title: "게시물 작성",
    };
    res.render("admin/add", { locals, layout: adminLayout });
  })
)
/**
 * POST /add
 * Admin - Add Post
 */
router.post(
  "/add",
  checkLogin,
  asyncHandler(async (req, res) => {
    const { title, body } = req.body;

    const newPost = new Post({
      title: title,
      body: body,
    });

    await Post.create(newPost);

    res.redirect("/allPosts");
  })
);

/**
 * GET /edit/:id
 * Admin - Edit Post
 */
router.get(
  "/edit/:id",
  checkLogin,
  asyncHandler(async (req, res) => {
    const locals = {
      title: "게시물 편집",
    };

    const data = await Post.findOne({ _id: req.params.id });
    res.render("admin/edit", {
      locals,
      data,
      layout: adminLayout,
    });
  })
);

/**
 * PUT /edit/:id
 * Admin - Edit Post
 */
router.put(
  "/edit/:id",
  checkLogin,
  asyncHandler(async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      createdAt: Date.now(),
    });
    res.redirect("/allPosts");
  })
);

/**
 * DELETE /delete/:id
 * Admin - Delete Post
 */
router.delete(
  "/delete/:id",
  checkLogin,
  asyncHandler(async (req, res) => {
    await Post.deleteOne({ _id: req.params.id });
    // await Post.findByIdAndDelete(req.params.id);
    res.redirect("/allPosts");
  })
);
module.exports = router;

const router = require("express").Router();


const {
  home,
  signupPostController,
  signupGetController,
  loginGetController, 
  loginPostController,
  profileGetController,
  logoutPostController,
  mainGetController,
  privateGetController
} = require("../controllers/auth.controllers")

const {isLoggedin, isAnon} = require("../middleware/auth.middleware.js")

/* GET home page */
router.get("/", home)


//sign up controller
router.get ("/signup",isAnon, signupGetController )
router.post("/signup", isAnon, signupPostController);

//login controller
 router.get("/login",isAnon, loginGetController)
 router.post("/login", isAnon, loginPostController)

//profile controller
router.get("/profile", isLoggedin, profileGetController);


//logout controller
router.post("/logout", logoutPostController)

//private controller
router.get("/main", isLoggedin, mainGetController)
router.get ("/private", isLoggedin, privateGetController)


module.exports = router;
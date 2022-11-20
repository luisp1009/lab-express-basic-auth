const bcryptjs = require("bcryptjs");
const User = require("../models/User.model");
const session = require("express-session");
const MongoStore = require("connect-mongo");


// HOME
const home = (req, res, next) => {
  res.render("index");
};

//SIGN UP
const signupPostController = (req, res, next) => {
  const { username, password } = req.body;

  console.log(username);

  if (!username || !password) {
    res.render("signup.hbs", {
      errorMessage: "You did not enter any username or password",
    });
    return;
  }
  User.findOne({ username: username }).then((foundUser) => {
    if (foundUser) {
      res.send("User already exists");
      return;
    }
    return User.create({
      username: username,
      password: bcryptjs.hashSync(password),
    })
      .then((createdUser) => {
        console.log("heres the new user", createdUser);
        res.send(createdUser);
        
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  });
};

const signupGetController = (req, res, next) => {
  res.render("signup.hbs");
};


// login profile
const loginGetController = (req, res, next) => {
  res.render("login.hbs");
};

const loginPostController = (req, res, next) => {

const {username, password} = req.body

if (!username || !password){
res.render("login.hbs" , {
  errorMessage: "You did not enter any username or password"
});
return
}
 User.findOne({ username })
   .then((foundUser) => {
     if (!foundUser) {
       res.render("login.hbs", {
         errorMessage: "User does not exist",
       });
       return;
     }
     const isValidPassword = bcryptjs.compareSync(password, foundUser.password);

     if (!isValidPassword) {
       res.render("login.hbs", { errorMessage: "Wrong password" });
       return;
     }
     req.session.user = foundUser;
    res.redirect('/profile')
   })

   .catch((err) => {
     console.log(err);
     res.send(err);
   });


};

//profile controller
profileGetController = (req, res, next) => {
  console.log(req.session);
  res.render("profile.hbs", req.session.user);
};

//logout controller
logoutPostController = (req,res,next) => {
req.session.destroy(err => {
if (err) next (err)
res.redirect("/login")
})
}

const privateGetController = (req, res, next) => {
  res.render("private.hbs");
};

const mainGetController = (req, res, next) => {
  res.render("main.hbs");
};

module.exports = {
  home,
  signupPostController,
  signupGetController,
  loginGetController,
  loginPostController,
  profileGetController,
  logoutPostController,
  mainGetController,
  privateGetController
};

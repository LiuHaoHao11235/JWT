var express = require("express");
var router = express.Router();
const passport = require("passport");
const session = require("express-session");
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
router.use(
  session({
    secret: "secretidhere",
    resave: false,
    saveUninitialized: false,
  })
);
router.use(passport.initialize());
router.use(passport.session());
// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;

const jwt = require("jsonwebtoken");
const LocalStrategy = require("passport-local").Strategy;
const Users = [
  {
    username: "a250907790@gmail.com",
    password: "123456",
    info: { name: "LiuTongHao", age: "22", phonenumber: "0989272552" },
  },
  {
    username: "adam",
    password: "12345",
    info: { name: "adam", age: "50", phonenumber: "0955555555" },
  },
  {
    username: "han",
    password: "1234",
    info: { name: "han", age: "18", phonenumber: "09890111111" },
  },
];
function checkPassword(user, password) {
  return new Promise((resolve, reject) => {
    if (user.password === password) {
      resolve(user);
    }
    reject(null);
  });
}
// 透過 passport.use() 建立驗證機制
passport.use(
  new LocalStrategy(
    // 當請 passport 用此驗證機制驗證時，呼叫此 callback 函式驗證
    function (username, password, done) {
      const user = Users.find((user) => {
        return user.username === username;
      });
      if (user) {
        checkPassword(user, password)
          .then((state) => {
            done(null, state);
          })
          .catch((state) => {
            console.log(state);
            done(state, false);
          });
      } else {
        done(null, false);
      }
    }
  )
);
/* GET home page. */
const login_authenticate = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log("密碼驗證途中發生錯誤");
      return res.status(500).json({ message: "密碼驗證途中發生錯誤" });
    }
    if (!user) {
      console.log("密碼驗證失敗");
      const token = "";
      const data = {};
      const access = false;
      return res.status(401).json({ token, data, access });
    }
    // 處理驗證成功的情況
    req.logIn(user, (err) => {
      console.log("密碼驗證成功 sign jwt token");
      const { username, password } = req.body;
      const token = jwt.sign({ username, password }, "thisismynewproject");
      const data = user.info;
      const access = true;
      return res.status(200).json({ token, data, access });
    });
  })(req, res, next); //!用來呼叫(err, user, info)=>{...}這個passport.authenticate()的callback;
};
const jwt_authenticate = (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, "thisismynewproject", function (err, decoded) {
      if (err) {
        console.log("jwt token 驗證失敗!");
        next();
      }
      if (!err) {
        const { username, password } = decoded;
        const user = Users.find((user) => {
          return user.username === username;
        });
        if (user) {
          checkPassword(user, password)
            .then((user) => {
              const data = user.info;
              const access = true;
              console.log("jwt密碼驗證成功");
              return res.status(200).json({ data, access });
            })
            .catch((err) => {
              console.log("jwt密碼驗證失敗");
              return res.status(402);
            });
        } else {
          const token = "";
          const data = "unkownuser";
          const access = false;
          return res.status(401).json({ token, data, access });
        }
      }
    });
  } catch (err) {
    const token = "";
    console.log("還沒有token");
    next();
  }
};
router.post(
  "/login",
  (req, res, next) => {
    jwt_authenticate(req, res, next);
  },
  (req, res, next) => {
    login_authenticate(req, res, next);
  }
);

router.use(function (err, req, res, next) {
  console.error("this is middleware error", err);
  res.status(500).send("Something broke!");
});
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/adminpage", function (req, res, next) {
  res.render("index", { title: "adminPage" });
});
router.post("/loginPage", function (req, res, next) {
  res.render("index", { title: "loginPage" });
});
module.exports = router;

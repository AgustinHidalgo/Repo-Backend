import { Router } from "express";
import passport from "passport";
import UsersManager from "../dao/mongoManagers/usersManager.js";

const userRouter = Router();
const usersManager = new UsersManager();

userRouter.get("/registrogithub", passport.authenticate("github", { scope: ["user:email"] })
);
userRouter.get("/github", passport.authenticate("github"),(req,res)=>{
  res.send('AGUANTE MESSI')
});
//registro sin passport
userRouter.post("/registro", async (req, res) => {
  const newUser = await usersManager.createUser(req.body);
  if (newUser) {
    res.redirect("/");
  } else {
    res.redirect("/errorRegistro");
  }
});

userRouter.post("/login", async (req, res) => {
  const userData = req.body;
  if (
    userData.email === "adminCoder@coder.com" &&
    userData.password === "adminCod3r123"
  ) {
    req.session.user = userData;
    req.session.user.firstName = "Administrador";
    req.session.user.email = userData.email;
    req.session.role = "Admin";
    res.redirect("/products");
  } else {
    const user = await usersManager.loginUser(userData);
    if (user) {
      req.session.user = user;
      req.session.user.firstName = user.firstName;
      req.session.user.email = user.email;
      req.session.role = "Usuario";
      res.redirect("/products");
    } else {
      res.redirect("/errorLogin");
    }
  }
});

userRouter.get("/logout", async (req, res) => {
  req.session.destroy((error) => {
    if (error) console.log(error);
    else res.redirect("/");
  });
});

export default userRouter;
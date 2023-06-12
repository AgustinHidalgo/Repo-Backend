import config from "../config.js";
import { usersModel } from "../persistence/mongoDB/models/usersModel.js";
import { hashPassword, verifyToken } from "../utils.js";
import { transporter } from "../Utils/nodemailer.js";

class MailController {
  sendEmailResetPassword = async (req, res) => {
    const { email } = req.body;
    try {
      const existUser = await usersModel.findOne({ email });
      if (!existUser) {
        throw Error("La cuenta no existe");
      }
      const data = {
        from: config.MAILING_USER,
        to: email,
        subject: "Reset password",
        html: `<p>Check the next link to reset password <a href="http://localhost:8080/restart">Link</a></p>`,
      };
      const createEmail = await transporter.sendMail(data);
      res.status(200).json(createEmail);
      return createEmail;
    } catch (error) {
      res.status(404).send(error.message);
    }
  };

  resetPassword = async (req, res) => {
    try {
      const token = req.headers.authorization.split(" ").pop();
      const tokenData = await verifyToken(token);
      const userEmail = tokenData.user.email;
      const userId = tokenData.user._id
      const existUser = await usersModel.findOne({ userEmail });
      if (existUser) {
        const {password} = req.body;
        const newPassword = await hashPassword(password);
        const userData = await usersModel.findByIdAndUpdate(
          userId,
          { $set: { password: newPassword } }
        );
        console.log(userData)
        res
          .status(200)
          .send({ message: "User password has been reset", data: userData });
      } else {
        res.status(200).send({ message: "This link has been expired" });
      }
    } catch (error) {
      return error;
    }
  };
}

export default new MailController();
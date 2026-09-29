import getDb from "../db/db.js";
import jwt from "../utils/jwt.js";


const Login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        code: 400,
        success: false,
        message: "Please fill in all details",
      });
    }

    let db = await getDb();

    let foundUser = await db.get("SELECT * FROM users WHERE email = ?", email);
    if (!foundUser) {
      return res.status(404).send({
        code: 404,
        success: false,
        message: "User not found in the db",
      });
    }

    let token = jwt.generateToken(foundUser, "user");

    let userData = {
      name: foundUser.name,
      email: foundUser.email,
      phone: foundUser.phone,
      token: token,
    };

    return res.status(200).send({
      code: 200,
      success: true,
      message: "User found",
      data: userData,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, success: false, error: error.toString() });
  }
};

export default Login;

import getDb from "../db/db.js";
import hash from "../utils/util.js";

const Register = async (req, res) => {
  try {
    let { name, email, phone, password } = req.body;

    if (!name || !phone || !email || !password) {
      return res.status(400).send({
        code: 400,
        success: false,
        message: "Please fill in all details",
      });
    }

    let password_hash = await hash.hashPassword(password);
  

    let db = await getDb();

    let foundUser = await db.get("SELECT * FROM users WHERE email = ?", email);

    if (foundUser) {
      return res.status(409).send({
        code: 409,
        success: false,
        message: "User already exists, please login",
      });
    }
    await db.run(
      "INSERT INTO users (name,email,phone,password_hash) VALUES  (?,?,?,?)",
      [name, email, phone, password_hash],
    );

    let newUserData = {
      name: name,
      email: email,
      phoneNumber: phone,
    };

    return res.status(201).send({
      code: 201,
      success: true,
      message: "New user created",
      data: newUserData,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, success: false, error: error.toString() });
  }
};

export default Register;

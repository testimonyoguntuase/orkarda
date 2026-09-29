import getDb from "../db/db.js";
import hash from "../utils/util.js";

const bikemanRegister = async (req, res) => {
  try {
    let { name, email, phone, password, plate_number } = req.body;

    if (!name || !phone || !email || !password, !plate_number) {
      return res.status(400).send({
        code: 400,
        success: false,
        message: "Please fill in all details",
      });
    }

    let password_hash = await hash.hashPassword(password);
  

    let db = await getDb();

    let existingUser = await db.get("SELECT * FROM users WHERE email = ?", email);

    if (existingUser){
        return res.status(409).send({
        code: 409,
        success: false,
        message: "A previous user cannot be a bikeman !",
      }); 
    }

    let foundUser = await db.get("SELECT * FROM bikemen WHERE email = ?", email);

    if (foundUser) {
      return res.status(409).send({
        code: 409,
        success: false,
        message: "Bikeman already exists, please login",
      });
    }
    await db.run(
      "INSERT INTO bikemen (name,email,phone,plate_number,password_hash) VALUES  (?,?,?,?,?)",
      [name, email, phone,plate_number, password_hash],
    );

    let newUserData = {
      name: name,
      email: email,
      phoneNumber: phone,
      plateNumber : plate_number
    };

    return res.status(201).send({
      code: 201,
      success: true,
      message: "New bikeman created",
      data: newUserData,
    });
  } catch (error) {
    return res
      .status(500)
      .send({ code: 500, success: false, error: error.toString() });
  }
};

export default bikemanRegister;

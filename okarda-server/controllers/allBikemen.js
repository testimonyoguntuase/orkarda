import getDb from "../db/db.js";

const getAllBikeMen = async (req, res, next) => {
  try {
    let db = await getDb();

    let foundUser = await db.get("SELECT * FROM bikemen");

    if (!foundUser) {
      if (!foundUser) {
        return res.status(404).send({
          code: 404,
          success: false,
          message: "No Bikeman found in the db",
        });
      }
    }

    res
      .status(200)
      .send({
        code: 200,
        success: true,
        message: "Bikemen found",
        data: foundUser,
      });
  } catch {}
};

export default getAllBikeMen

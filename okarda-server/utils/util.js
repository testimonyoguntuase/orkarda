import bcrypt from "bcryptjs";

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
}


async function verifyLogin(inputPassword, storedHash) {
  const isMatch = await bcrypt.compare(inputPassword, storedHash);
  return isMatch; 
}


export default {hashPassword,verifyLogin}
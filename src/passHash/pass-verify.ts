import bcrypt from "bcrypt";

async function verifyPasword() {
  const myPassword = "admin12345";
  const hash = "$2b$10$6BsqWiPkRx84V6OoYeQ71uZaUAuL80JzLuAn805Otjq46k.ARCJbC";
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPasword();

import bcrypt from "bcrypt";


async function hashPasword() {
  const myPassword = "admin12345";
  const hash = await bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPasword();

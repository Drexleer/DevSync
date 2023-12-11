const User = require("../../models/User");
const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");

const userLogin = async (req, res) => {
  const { email, password, types } = req.body;

  let typesUser = "user";

  if (types !== undefined) {
    typesUser = types;
  }

  try {
    const admin = await Admin.findOne({ email });

    if (admin) {
      const passIsMatch = await bcrypt.compare(password, admin.password);

      if (!passIsMatch) {
        return res.status(400).json({ message: "Contraseña incorrecta" });
      }

      return res.status(200).json({ message: "Bienvenido" });
    }

    const user = await User.findOne({ email: email, types: typesUser });

    if (!user) return res.status(400).json({ message: "El usuario no existe" });

    const passIsMatch = await bcrypt.compare(password, user.password);

    if (!passIsMatch)
      return res.status(400).json({ message: "Contraseña incorrecta" });

    res.status(200).json({ message: "Bienvenido" });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

module.exports = userLogin;

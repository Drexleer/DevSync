const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();
const Email = process.env.EMAILCLIENT;
const Password = process.env.PASSWORDCLIENT;
const URL = 'http://localhost:5173' || process.env.URL;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: Email,
    pass: Password,
  },
});

// Función para generar un token

const generateToken = (id) => {
  const secretKey = 'MiClaveSecreta123';
  const payload = { id };
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secretKey, options);
};

const userRequestRecoveryPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ email });

    if (!userData) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const tokenRecovery = generateToken(userData._id);
    const expiresIn = new Date(Date.now() + 3600000); // 1 hora

    userData.tokenRecovery = tokenRecovery;
    userData.expiresIn = expiresIn;
    await userData.save();

    // Configuración del correo electrónico
    const mailOptions = {
      from: Email,
      to: userData.email,
      subject: 'Recuperación de contraseña',
      html: `
          <p>Hola ${userData.name},</p>
          <p>Has solicitado restablecer tu contraseña en DevSync. Utiliza el siguiente enlace para completar el proceso:</p>
          <p><a href="${URL}/reset-password?token=${tokenRecovery}">Restablecer Contraseña</a></p>
          <p>Este enlace es válido por 1 hora.</p>
          <p>Si no solicitaste este restablecimiento, ignora este correo electrónico.</p>
          <p>Gracias,</p>
          <p>El equipo de DevSync</p>
      `,
    };

    // enviar correo electrónico
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res
          .status(500)
          .json({ message: 'Error al enviar el correo electrónico' });
      } else {
        console.log('Correo electrónico enviado: ' + info.response);
        res.status(200).json({
          message:
            'Hemos enviado un enlace para restablecer tu contraseña a tu dirección de correo electrónico. Por favor, revisa tu bandeja de entrada y sigue las instrucciones proporcionadas en el correo para completar el proceso de restablecimiento de contraseña.',
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error al restablecer la contraseña' });
  }
};

module.exports = userRequestRecoveryPassword;

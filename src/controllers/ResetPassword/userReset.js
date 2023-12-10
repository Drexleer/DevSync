const User = require('../../models/User');

const userResetPassword = async (req, res) => {
  try {
    const { tokenRecovery, NewPassword } = req.body;

    const userData = await User.findOne({
      tokenRecovery: tokenRecovery,
      expiresIn: { $gt: new Date() },
    });

    if (!userData) {
      return res.status(404).json({ message: 'Token no valido o expirado' });
    }

    userData.password = NewPassword;
    userData.tokenRecovery = null;
    userData.expiresIn = null;
    await userData.save();

    res.status(200).json({
      message:
        '¡Contraseña restablecida con éxito! Puedes iniciar sesión con tu nueva contraseña.',
    });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = userResetPassword;

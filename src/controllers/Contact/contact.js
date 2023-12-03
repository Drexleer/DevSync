require("dotenv").config();
const Messages = require("../../models/Message");
const transporter = require("../../utils/nodemailer");

const newContact = async (req, res) => {
  const { email, name, message } = req.body;

  try {
    // Guardar el mensaje en la base de datos
    // const newMessage = await Messages.create({
    //   message,
    //   name,
    //   email,
    // });

    // Configura el contenido del correo electrónico para el administrador
    const clientEmailSend = {
      from: name,
      to: process.env.EMAILCLIENT,
      subject: `Nuevo mensaje del formulario de contacto`,
      text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
    };

    // console.log(clientEmailSend);

    await transporter.sendMail(clientEmailSend, (error, info) => {
      if (error) {
        console.log("Error al enviar el correo electrónico:", error);
      } else {
        console.log("Correo electrónico enviado:", info.response);
      }
    });

    const adminEmailSend = {
      from: process.env.EMAILCLIENT,
      to: email,
      subject: `Gracias por contartarme ${name}`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Abel&family=Lobster+Two:ital,wght@0,400;0,700;1,400;1,700&display=swap" />
        <style>
          body {
            width: 100%;
            height: auto;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Abel', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #ffffff;
          }
      
          container {
            width: 100%;
            height: auto;
            margin: 0 auto;
            text-align: center;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
      
          header {
            width: 100%;
            height: 4rem;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 1rem;
          }
      
          header img {
            width: 3rem;
            height: 3rem;
            margin-left: 1rem
          }
      
          header h4 {
            font-family: 'Lobster Two', sans-serif;
            font-size: 1.5rem;
          }
      
          main {
            padding: 20px 0;
          }
      
          main p {
            font-size: 1rem;
            line-height: 1.5;
            margin-bottom: 1rem;
          }
      
          footer {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 1rem;
            margin-top: 1rem;
          }
      
          .social{
            width: 2rem;
            height: 2rem;
            margin-left: 1rem
          }
        </style>
      </head>
      <body>
        <container style="">
          <header>
            <img src="cid:LogoHenry" alt="Imagen logo" />
          </header>
          <main>
            <p>Estimado/a ${name},</p>
            <p>
              Gracias por ponerte en contacto. Hemos recibido tu mensaje y queremos
              agradecerte sinceramente por tomarte el tiempo de compartir tus
              inquietudes con nososotros. Tu interés es de suma importancia.
            </p>
            <p>Nos comprometemos a ponenrnos en contacto contigo en breve.</p>
            <p>
              Muchas gracias por tu paciencia, si tienes alguna pregunta adicional, no dudes en responder a este correo
              electrónico.
            </p>
            <p>Atentamente,</p>
            <p>Equipo Henry</p>
          </main>
          <footer>
            <a href="https://www.facebook.com/soyhenryok/" target="_blank"><img src="cid:Facebook" alt="Imagen Facebook" class="social" /></a>
            <a href="https://www.instagram.com/soyhenry_ok/?hl=es" target="_blank"><img src="cid:Instagram" alt="Imagen Instagram" class="social" /></a>
            <a href="https://www.linkedin.com/school/henryok/" target="_blank"><img src="cid:Linkedin" alt="Imagen Linkedin" class="social" /></a>
          </footer>
        </container>
      </body>
      </html>`,
      attachments: [
        {
          filename: "LogoHenry.png",
          path: "./src/controllers/Contact/image/LogoHenry.png",
          cid: "LogoHenry",
        },
        {
          filename: "Facebook.png",
          path: "./src/controllers/Contact/image/Facebook.png",
          cid: "Facebook",
        },
        {
          filename: "Instagram.png",
          path: "./src/controllers/Contact/image/Instagram.png",
          cid: "Instagram",
        },
        {
          filename: "Linkedin.png",
          path: "./src/controllers/Contact/image/Linkedin.png",
          cid: "Linkedin",
        },
      ],
    };

    // console.log(adminEmailSend);

    await transporter.sendMail(adminEmailSend, (error, info) => {
      if (error) {
        console.log("Error al enviar el correo electrónico:", error);
      } else {
        console.log("Correo electrónico enviado:", info.response);
      }
    });

    console.log("Correo Enviado");
    res.status(200).json({
      success: true,
      message:
        "¡Correo electrónico enviado con éxito! Por favor, espera en tu bandeja de entrada la respuesta del administrador. ¡Gracias por tu mensaje!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { newContact };

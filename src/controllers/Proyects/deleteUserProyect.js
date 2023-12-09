const Proyect = require("../../models/Proyects");
const User = require("../../models/User");

const deleteUserProyect = async (req, res) => {
  const { proyectId, participantsId } = req.body;

  try {
    const createByFound = await Proyect.findById(proyectId)
      .populate("createdBy")
      .populate("participants")
      .exec();

    if (!createByFound) {
      return res.status(404).json({
        message: "No se encontro el proyecto",
      });
    }

    const createByObjectId = createByFound.createdBy._id.toString();

    if (createByObjectId === participantsId) {
      return res.status(200).json({
        message:
          "El usuario es el creador del Proyecto no puede ser borrado del proyecto",
      });
    }

    const participantsObjectId = createByFound.participants.filter(
      (participant) => participant._id.toString() !== participantsId
    );

    if (participantsObjectId.length === createByFound.participants.length) {
      return res.status(404).json({ message: "El usuario no se encontro" });
    }

    const deleteUser = await Proyect.findByIdAndUpdate(
      proyectId,
      { participants: participantsObjectId },
      { new: true }
    );

    const participantDelete = await User.findById(participantsId);

    console.log(participantDelete);

    const adminEmailSendToCreateBy = {
      from: process.env.EMAILCLIENT,
      to: createByFound.createdBy.email,
      subject: `${participantDelete.userName} ya no es parte del proyecto`,
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
            <p>Estimado/a ${createByFound.createdBy.userName},</p>
            <p>
              Le informamos que el participante ${participantDelete.userName} ha sido desvinculado del proyecto ${createByFound.name}
            </p>
            <p>
              Cualquier cosa no dude en contactarnos
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
          path: "./src/controllers/Proyects/image/LogoHenry.png",
          cid: "LogoHenry",
        },
        {
          filename: "Facebook.png",
          path: "./src/controllers/Proyects/image/Facebook.png",
          cid: "Facebook",
        },
        {
          filename: "Instagram.png",
          path: "./src/controllers/Proyects/image/Instagram.png",
          cid: "Instagram",
        },
        {
          filename: "Linkedin.png",
          path: "./src/controllers/Proyects/image/Linkedin.png",
          cid: "Linkedin",
        },
      ],
    };

    await transporter.sendMail(adminEmailSendToCreateBy, (error, info) => {
      if (error) {
        console.log("Error al enviar el correo electrónico:", error);
      } else {
        console.log("Correo electrónico enviado:", info.response);
      }
    });

    const adminEmailSendToParticipant = {
      from: process.env.EMAILCLIENT,
      to: participantDelete.email,
      subject: `${participantDelete.name} ${participantDelete.lastName} ya no es parte del proyecto`,
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
            <p>Estimado/a ${participantDelete.userName},</p>
            <p>
              Le informamos que ha sido desvinculado del proyecto ${createByFound.name}
            </p>
            <p>
              Cualquier cosa no dude en contactarnos
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
          path: "./src/controllers/Proyects/image/LogoHenry.png",
          cid: "LogoHenry",
        },
        {
          filename: "Facebook.png",
          path: "./src/controllers/Proyects/image/Facebook.png",
          cid: "Facebook",
        },
        {
          filename: "Instagram.png",
          path: "./src/controllers/Proyects/image/Instagram.png",
          cid: "Instagram",
        },
        {
          filename: "Linkedin.png",
          path: "./src/controllers/Proyects/image/Linkedin.png",
          cid: "Linkedin",
        },
      ],
    };

    await transporter.sendMail(adminEmailSendToParticipant, (error, info) => {
      if (error) {
        console.log("Error al enviar el correo electrónico:", error);
      } else {
        console.log("Correo electrónico enviado:", info.response);
      }
    });

    res
      .status(200)
      .json({ message: "El usuario ha sido borrado del proyecto", deleteUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteUserProyect;

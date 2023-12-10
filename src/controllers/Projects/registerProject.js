const Project = require('../../models/Projects');
const User = require('../../models/User');

const registerProject = async (req, res) => {
  const { projectId, participantsId } = req.body;

  try {
    const createByFound = await Project.findById(projectId)
      .populate('createdBy')
      .populate('participants')
      .exec();

    if (!createByFound) {
      return res.status(404).json({
        message: 'No se encontro el proyecto',
      });
    }

    // Pasa de ObjectId a String para validar si es el creador del Proyecto
    const createByObjectId = createByFound.createdBy._id.toString();

    if (createByObjectId === participantsId) {
      return res
        .status(200)
        .json({ message: 'El usuario es el creador del Proyecto' });
    }

    const participantsObjectId = createByFound.participants.find(
      (participant) => participant._id.toString() === participantsId
    );

    if (participantsObjectId) {
      return res.status(200).json({
        message: 'El usuario ya esta registrado como participante del proyecto',
      });
    }

    const newRegister = await Project.findByIdAndUpdate(
      projectId,
      { $push: { participants: participantsId } },
      { new: true }
    );

    const participantDelete = await User.findById(participantsId);

    console.log(participantDelete);

    const adminEmailSendToCreateBy = {
      from: process.env.EMAILCLIENT,
      to: createByFound.createdBy.email,
      subject: `${participantDelete.userName} ahora es parte del proyecto`,
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
              Le informamos que el participante ${participantDelete.userName} ha sido incluido en el proyecto ${createByFound.name}
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
          filename: 'LogoHenry.png',
          path: './src/controllers/Projects/image/LogoHenry.png',
          cid: 'LogoHenry',
        },
        {
          filename: 'Facebook.png',
          path: './src/controllers/Projects/image/Facebook.png',
          cid: 'Facebook',
        },
        {
          filename: 'Instagram.png',
          path: './src/controllers/Projects/image/Instagram.png',
          cid: 'Instagram',
        },
        {
          filename: 'Linkedin.png',
          path: './src/controllers/Projects/image/Linkedin.png',
          cid: 'Linkedin',
        },
      ],
    };

    await transporter.sendMail(adminEmailSendToCreateBy, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo electrónico:', error);
      } else {
        console.log('Correo electrónico enviado:', info.response);
      }
    });

    const adminEmailSendToParticipant = {
      from: process.env.EMAILCLIENT,
      to: participantDelete.email,
      subject: `${participantDelete.name} ${participantDelete.lastName} ya sos parte del proyecto ${createByFound.name}`,
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
              Le informamos que ha registrado exitosamente en el proyecto ${createByFound.name}
            </p>
            <p>
              Pongase en contacto con ${createByFound.createdBy.userName} que es el creador del proyecto.
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
          filename: 'LogoHenry.png',
          path: './src/controllers/Projects/image/LogoHenry.png',
          cid: 'LogoHenry',
        },
        {
          filename: 'Facebook.png',
          path: './src/controllers/Projects/image/Facebook.png',
          cid: 'Facebook',
        },
        {
          filename: 'Instagram.png',
          path: './src/controllers/Projects/image/Instagram.png',
          cid: 'Instagram',
        },
        {
          filename: 'Linkedin.png',
          path: './src/controllers/Projects/image/Linkedin.png',
          cid: 'Linkedin',
        },
      ],
    };

    await transporter.sendMail(adminEmailSendToParticipant, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo electrónico:', error);
      } else {
        console.log('Correo electrónico enviado:', info.response);
      }
    });

    res
      .status(200)
      .json({ message: 'El usuario fue registrado al proyecto', newRegister });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = registerProject;

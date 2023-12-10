const Project = require('../../models/Projects');
const transporter = require('../../utils/nodemailer');

const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const createByFound = await Project.findById(id)
      .populate('createdBy')
      .populate('participants')
      .exec();

    const deleteProject = await Project.findByIdAndDelete(id);

    const adminEmailSend = {
      from: process.env.EMAILCLIENT,
      to: createByFound.createdBy.email,
      subject: `Proyecto ${createByFound.name} eliminado con exito`,
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
              Le informamos que ha borrado exitosamente el proyecto: ${createByFound.name}
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

    await transporter.sendMail(adminEmailSend, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo electrónico:', error);
      } else {
        console.log('Correo electrónico enviado:', info.response);
      }
    });

    res.status(200).json({ message: 'El proyecto ha sido eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = deleteProject;

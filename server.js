const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const app = express();

// Configuración de CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Ruta principal - servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para enviar correo
app.post('/enviar', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    console.log('Recibida solicitud de envío:', req.body);

    if (!name || !email || !message) {
      return res.status(400).json({ 
        status: 'error', 
        message: 'Todos los campos son requeridos' 
      });
    }

    // Configurar el correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `Nuevo mensaje de contacto de ${name}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        Mensaje: ${message}
      `
    };

    // Enviar el correo
    console.log('Enviando correo...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado:', info.messageId);

    res.status(200).json({ 
      status: 'success', 
      message: 'Correo enviado exitosamente' 
    });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Error al enviar el correo',
      error: error.message 
    });
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error', 
    message: 'Algo salió mal en el servidor' 
  });
});

// Puerto para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

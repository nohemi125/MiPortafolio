require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const app = express();

// Configuración de CORS más permisiva
const corsOptions = {
  origin: ['http://127.0.0.1:5500', 'http://localhost:5500', 'https://miportafolio-3a6l.onrender.com', 'https://miportafolio.onrender.com'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));

// Middleware para parsear JSON y URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Verificar variables de entorno
console.log('Verificando variables de entorno...');
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('Error: Las variables de entorno EMAIL_USER y EMAIL_PASS son requeridas');
  process.exit(1); // Terminar el proceso si faltan las variables
}

// Configuración del transporter de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // Ignorar errores de certificado
  }
});

// Verificar la conexión del transporter
transporter.verify(function(error, success) {
  if (error) {
    console.error('Error al verificar el transporter:', error);
  } else {
    console.log('Servidor listo para enviar correos');
  }
});

// Ruta principal - servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para enviar correo
app.post('/enviar', async (req, res) => {
  // Configurar headers CORS específicamente para esta ruta
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');

  try {
    const { name, email, message } = req.body;
    console.log('Recibida solicitud de envío:', { name, email, message });

    if (!name || !email || !message) {
      console.error('Campos faltantes en la solicitud');
      return res.status(400).json({ 
        status: 'error', 
        message: 'Todos los campos son requeridos' 
      });
    }

    // Configurar el correo
    const mailOptions = {
      from: `"Formulario de Contacto" <${process.env.EMAIL_USER}>`,
      replyTo: email, // Esto permite que cuando respondas, el correo vaya al remitente original
      to: process.env.EMAIL_USER,
      subject: `Nuevo mensaje de contacto de ${name}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        Mensaje: ${message}
      `,
      html: `
        <h3>Nuevo mensaje de contacto</h3>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${message}</p>
      `
    };

    // Enviar el correo
    console.log('Intentando enviar correo...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente:', info.messageId);

    res.status(200).json({ 
      status: 'success', 
      message: 'Correo enviado exitosamente' 
    });
  } catch (error) {
    console.error('Error detallado al enviar correo:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Error al enviar el correo',
      error: error.message 
    });
  }
});

// Ruta para manejar solicitudes OPTIONS (preflight)
app.options('*', cors(corsOptions));

// Manejo de errores
app.use((err, req, res, next) => {
  console.error('Error en el servidor:', err.stack);
  res.status(500).json({ 
    status: 'error', 
    message: 'Algo salió mal en el servidor' 
  });
});

// Puerto para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  console.log('Variables de entorno configuradas:', {
    EMAIL_USER: process.env.EMAIL_USER ? 'Configurado' : 'No configurado',
    EMAIL_PASS: process.env.EMAIL_PASS ? 'Configurado' : 'No configurado'
  });
});

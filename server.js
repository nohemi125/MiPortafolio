const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
require('dotenv').config();

// Configuración de CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Ruta para procesar el formulario
app.post('/enviar', async (req, res) => {
  console.log('Recibida solicitud de envío:', req.body);
  
  const { name, email, message } = req.body;

  // Validación de datos
  if (!name || !email || !message) {
    console.error('Datos incompletos:', { name, email, message });
    return res.status(400).json({ 
      ok: false, 
      message: 'Por favor, completa todos los campos' 
    });
  }

  try {
    console.log('Configurando transporter...');
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
       
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
        
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verificar la conexión
    await transporter.verify();
    console.log('Conexión con Gmail verificada correctamente');

    console.log('Enviando correo...');
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'nohemimorelounal@gmail.com', 
      subject: 'Nuevo mensaje desde el form de portafolio',
      html: `
        <h2>Nuevo mensaje</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Mensaje:</strong> ${message}</p>
      `,
    });

    console.log('Correo enviado:', info.messageId);
    res.status(200).json({ 
      ok: true, 
      message: 'Mensaje enviado con éxito',
      messageId: info.messageId 
    });
  } catch (error) {
    console.error('Error detallado al enviar:', error);
    res.status(500).json({ 
      ok: false, 
      message: 'Error al enviar el mensaje',
      error: error.message 
    });
  }
});


// Puerto para Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

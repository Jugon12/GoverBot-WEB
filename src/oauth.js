const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');
const uuidv4 = require('uuid').v4
const cookieParser = require('cookie-parser'); // Importa cookie-parser

const port = process.env.PORT || 1500;
const app = express();

const sessions = {}
const corsOptions = {
  origin: 'http://localhost:5500',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser())

app.get('/api/auth/discord/redirect', async (req, res) => {
  const { code } = req.query;
  if (code) {
    const formData = new URLSearchParams({
      client_id: process.env.clientID,
      client_secret: process.env.clientSecret,
      grant_type: 'authorization_code',
      code: code.toString(),
      redirect_uri: 'http://localhost:1500/api/auth/discord/redirect'
    });

    try {
      const output = await axios.post('https://discord.com/api/oauth2/token',
        formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        });
        
      if (output.data) {
        const access = output.data.access_token;
        const userinfo = await axios.get('https://discord.com/api/users/@me', {
          headers: {
            'Authorization': `Bearer ${access}`,
          }
        });

        const sessionId = uuidv4()
        sessions[sessionId] = userinfo.data
        res.cookie('session', sessionId, {domain: null, path: '/', httpOnly: false})
        res.redirect('http://localhost:5500/Dashboard');
      }
    } catch (error) {
      console.error('Error en la solicitud a la API de Discord:', error);
      res.status(500).send('Error en la solicitud a la API de Discord');
    }
  }
});


app.get('/api/session', (req, res) => {
    const sessionId = req.cookies.session
    const userSession = sessions[sessionId]

    if(!userSession){
      return res.status(401).send('Invalid session')
    }

    res.status(200).json(userSession)
});

app.get('/api/session/end', (req, res) => {
  console.log(`Ending session with ID ${sessionId}: Session Expired`)
  const sessionId = req.cookies.session
  delete sessions[sessionId]; // Eliminar la sesión
  res.clearCookie('session');
});



app.listen(port, () => { console.log(`Backend running on port ${port}`) });

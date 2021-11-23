const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const router = express.Router();
const BigCommerce = require('node-bigcommerce');


const {CLIENT_ID, CLIENT_SECRET, AUTH_CALLBACK, PORT} = process.env;

 
const bigCommerce = new BigCommerce({
  logLevel: 'info',
  clientId: CLIENT_ID,
  secret: CLIENT_SECRET,
  callback: AUTH_CALLBACK,
  responseType: 'json',
  headers: { 'Accept-Encoding': '*' }, // Override headers (Overriding the default encoding of GZipped is useful in development)
  apiVersion: 'v3' // Default is v2
});


app.get('/test', (req, res) => {
    res.send('Hello World!')
  })
app.get('/auth', (req, res, next) => {
    bigCommerce.authorize(req.query)
      .then(data => res.render('integrations/auth', { title: 'Authorized!', data: data }))
      .catch(next);
    });

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
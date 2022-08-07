const express = require('express')
const hbs = require('hbs');
require('dotenv').config();

const app = express()
const port= process.env.PORT;

//Servir contenido estatico
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.render('home', {
//     title: 'Welcome!',
//     desc: "Lorem ipsum dolor..."
//   });
// });

// app.get('/generic', (req, res) => {
//   res.render('generic', {
//     title: 'generic!',
//     desc: "Lorem ipsum dolor..."
//   });
// });
// app.get('/elements', (req, res) => {
//   res.render('elements', {
//     title: 'elements!',
//     desc: "Lorem ipsum dolor..."
//   });
// });

// app.get('/hola-mundo', (req, res) => {
//   res.send('Hello World')
// });

//Ruta para cualquier url que no esta definida
// app.get('*', (req, res) => {
//   res.sendFile(__dirname + '/public/404.html')
// });

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
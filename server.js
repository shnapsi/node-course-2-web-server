const express = require ('express');
const hbs = require ('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=> {
  var now = new Date().toString();
  var  log = (`${now}: ${req.method} ${req.url}`);

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=> {
  return text.toUpperCase();
});
app.get('/', (request, response)=> {
//  response.send('<h1>Hello Express</h1>');
// response.send({
//   name: 'Gidi',
//   likes: [
//     'Running',
//     'Swimming'
//   ]
// });
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    WelcomeMessage: 'Hello and Welcome...'
  });
});

app.get('/about', (req, res) => {
//  res.send('Welcome to the about page');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Something bad happened...'
  })
});
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

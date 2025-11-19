const path = require('path');
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/wedding', (req, res) => res.render('wedding'));
app.get('/vendors/:type', (req, res) => res.render(`vendors/${req.params.type}`));


app.listen(5000, () => console.log(`Express server running http://localhost:${port}`));
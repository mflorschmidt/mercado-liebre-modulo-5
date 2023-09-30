const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const mainRoutes = require('./routes/mainRoutes');
const userRouter = require('./routes/usersRoutes');
const logs = require('./middlewares/logs.js');
const session = require('express-session');


app.use(express.static('public'));

app.use(express.urlencoded({extended: false}));

app.use(methodOverride('_method'));
app.use(logs);
app.use(session({secret: 'secreto'}));

app.set('views', path.join(__dirname, "../views"));
app.set('view engine', 'ejs');



app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000')
});

app.use(mainRoutes);
app.use('/user', userRouter);

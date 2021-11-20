const express = require('express');
const path = require('path');
const cors = require('cors');

const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const { database } = require('./db/dbconfig');
var sessionStore = new MySQLStore(database);


const app = express();

var corsOption = {
    origin: '*'
};


app.set('port', process.env.PORT || 4000);

app.use(session({
    key: 'scmapp_session_name',
    secret: 'scmapp_session_key',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
app.use(cors(corsOption));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use('/api', require('./routers/user'));

app.listen(app.get('port'), ()=>{
    console.log('server on port: ', app.get('port'));
});
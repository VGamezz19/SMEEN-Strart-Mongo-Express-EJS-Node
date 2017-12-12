var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override");
    http            = require("http"),
    server          = http.createServer(app),
    mongoose        = require('mongoose'),
    URI             = process.env.MONGODB_URI || 'localhost/userPasaPalabra',
    PORT            = process.env.PORT || 5000,
    path            = require('path'),
    engines         = require('consolidate'),
    db              = mongoose.connection;


require('../routes/routes-user-example.js')(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
//================MONGODB==================//
mongoose.connect(URI)
db.on('error', console.error.bind(console, 'connection error:'));
//==================API + Aplicacion==================//
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', __dirname + '/view');
app.engine('ejs', engines.mustache);
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('pasa-palabra'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
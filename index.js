var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override");
    http            = require("http"),
    server          = http.createServer(app),
    mongoose        = require('mongoose'),
    URI             = process.env.MONGODB_URI || 'mongodb://localhost/startFastNode',
    PORT            = process.env.PORT || 5000,
    path            = require('path'),
    engines         = require('consolidate'),
    db              = mongoose.connection;


require('./config/routes/routes-user-example')(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
//================MONGODB==================//
mongoose.connect(URI,{ useMongoClient: true }, (err, res) =>{
    if (err) return console.log("Error MongoDB -->",err.message)
    return console.log("Succes! MongoDB run fine")
})
//==================API + Aplicacion==================//
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', __dirname + '/view');
app.engine('ejs', engines.mustache);
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('body'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
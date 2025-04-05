const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('./data/database.js');
const passport = require('passport');
const gHubStrat = require('passport-github2').Strategy;
const cors = require('cors');
const session = require('express-session');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
swaggerDocument.host = process.env.SWAGGER_HOST;
swaggerDocument.schemes = process.env.SWAGGER_SCHEMES;

const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    .use(session({
        secret: toString(Math.floor(Math.random() * 10000000000000)),
        resave: false,
        saveUninitialized: true
    }))
    .use(passport.initialize()).use(passport.session())
    .use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization");
        res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, OPTIONS, DELETE");
        next();
    })
    .use(cors({ methods: ['POST','GET','UPDATE','DELETE','PUT','PATCH']}))
    .use(cors({ origin: '*'}))
    .use('/', require('./routes'))
    .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    passport.use(new gHubStrat({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
    },
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
})

passport.deserializeUser((user, done) => {
    done(null, user);
})

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out")})

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false }),
(req, res) => {
    req.session.user = req.user;
    res.redirect('/')
})

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.id, `Caught Exception ${err}\nException Origin: ${origin}`);
});

mongo.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => { console.log(`Database is listening. Node running on port ${port}`) });
    }
});
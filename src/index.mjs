import express, { response } from "express";
import "dotenv/config"
import routes from "./routes/index.mjs";
import { mongoose } from "mongoose";
import {engine} from "express-handlebars";
import passport from "passport";
import localStrategy from "passport-local";
import bcrypt from "bcrypt";
import session from "express-session";
import { User } from "./mongoose/schemas/user.mjs";
import path, { dirname, extname } from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log('DirName:',__dirname);

const DB_URI = process.env.DB_URI;
mongoose
    .connect(DB_URI, {useNewUrlParser:true, useUnifiedTopoLogy:true})
    .then( ()=>console.log('DB Conectado!') )
    .catch( (err)=>console.log(`Error:${err}`) );

app.engine('hbs', engine({extname:'.hbs'}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname+'/public'));
app.use(
    session({
        secret:"veryGoodSecret",
        revase:false,
        saveUnitInitialized:true
    })
);
app.use(express.urlencoded({extended: false}));

app.use(express.json());
app.use(routes);

//passport
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser( (user, done)=>{
    done(null, user.id)
} );
passport.deserializeUser( (id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user);
    });
} );
passport.use( new localStrategy( (userName, passport, done)=>{
    User.findOne( 
        {userName: userName},
        (err, user)=>{
            if( err ) return done(err);
            if( !user ) return done(null, false,{ message:'Usuario incorrecto!' });

            bcrypt.compare( password, user.password, (err, res)=>{
                if(err) return done(err);
                if( res===false ) return done(null, false, {message:'Contraseña imcorrecta!'});
                return done(nul, user);
            } );
        }
     );
} ) );

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Runnin on port ${PORT}`);
});



//Creación middleware
const logginMiddleware = (request, response, next)=>{
    console.log(`${request.method}-${request.url}`);
    next();
}

app.get('/v0/', (req, res)=>res.render('index', {tittle:'Store'}));

//De la siguiente manera se puede usar el middleware en todas las peticiones
//->app.use(logginMiddleware);
//Ejemplo con query paramas
//EL middleware tambien se puede usar dentro de la petición, como segundo parámetro

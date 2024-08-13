import express from "express";
import "dotenv/config";
import routes from "./routes/index.mjs";
import { mongoose } from "mongoose";
import {engine} from "express-handlebars";
import session from "express-session";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import MongoStore from "connect-mongo";
import passport from "passport";
import cokieParser from "cookie-parser";
import { isAuthenticated } from "./utils/middlewares.mjs";

//import 'foundation-sites/dist/css/foundation.min.css';
//import 'foundation-sites/dist/js/foundation.min';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_URI = process.env.DB_URI;
mongoose
    .connect(DB_URI, {useNewUrlParser:true, useUnifiedTopoLogy:true})
    .then( ()=>console.log('DB Conectado!') )
    .catch( (err)=>console.log(`Error:${err}`) );

    //Middleware
app.engine('hbs', engine({
    defaultLayout: 'main',
    extname:'hbs',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials'),
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}));
app.set('view engine', 'hbs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(cokieParser("helloworld"));
app.use(
    session({
        secret:"pharMana",
        saveUnitInitialized:true,
        revase:false,
        cookie:{
            maxAge: 60000 * 60,
        },
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
        })
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: false}));


app.use(routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Runnin on port ${PORT}`);
});

app.get(
    '/v0',
    isAuthenticated,
    (request, response)=>{
        response.redirect('/v0/login');
    }
);

//De la siguiente manera se puede usar el middleware en todas las peticiones
//->app.use(logginMiddleware);
//Ejemplo con query paramas
//EL middleware tambien se puede usar dentro de la petición, como segundo parámetro

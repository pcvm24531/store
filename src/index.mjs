import express, { response } from "express";
import "dotenv/config"
import routes from "./routes/index.mjs";
import { mongoose } from "mongoose";

const app = express();

const DB_URI = process.env.DB_URI;
mongoose
    .connect(DB_URI)
    .then( ()=>console.log('DB Conectado!') )
    .catch( (err)=>console.log(`Error:${err}`) );

app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Runnin on port ${PORT}`);
})

//Creación middleware
const logginMiddleware = (request, response, next)=>{
    console.log(`${request.method}-${request.url}`);
    next();
}

app.get('/v0/', (req, res)=>res.send({msg:'Hello'}));

//De la siguiente manera se puede usar el middleware en todas las peticiones
//->app.use(logginMiddleware);
//Ejemplo con query paramas
//EL middleware tambien se puede usar dentro de la petición, como segundo parámetro

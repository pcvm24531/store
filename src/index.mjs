import express, { response } from "express";
import "dotenv/config"
import usersRouter from "./routes/users.mjs";
import productsRouter from "./routes/products.mjs";

const app = express();
app.use(express.json());
app.use(usersRouter);
app.use(productsRouter);

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





import { Router } from "express";

const router = Router();

router.get(
    '/v0/home', 
    (request, response)=>{
        const usuario = request.session.user.name;
        response.render('home',{tittle:'Bienvenido', usuario:usuario});
    }
);
export default router;
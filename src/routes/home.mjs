import { Router } from "express";

const router = Router();

router.get(
    '/v0/home', 
    (request, response)=>{
        if(request.session.user){
            const usuario = request.session.user.name;
            response.render('home',{tittle:'Bienvenido', usuario:usuario});
        }
        response.redirect('/v0/login');
    }
);
export default router;
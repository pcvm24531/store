import { Router } from "express";

const router = Router();

router.get(
    '/home', 
    (request, response)=>{
        if( request.session.user ) {
            const usuario = request.session.user.name;
            response.render(
                'home',
                {
                    tittle:'Bienvenido',
                     usuario:usuario,
                     admin:(request.session.user.position==='admin'?true:false),
                });
        } else {
            response.redirect('/login');
        }
    }
);
export default router;
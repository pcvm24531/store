import { Router } from "express";

const router = Router();

router.get(
    '/v0/home', 
    (request, response)=>{
        console.log(request.session.user);        
        if( request.session.user ) {
            const usuario = request.session.user.name;
            response.render(
                'home',
                {
                    tittle:'Bienvenido',
                     usuario:usuario,
                     admin:(request.session.user.position==='Dueño'?true:false)
                });
        } else {
            response.redirect('/v0/login');
        }
    }
);
export default router;
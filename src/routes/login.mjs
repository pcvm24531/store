import { Router } from "express";

const router = Router();

router.get(
    '/v0/login',
    (request, response)=>{
        request.sessionStore.get(request.session.id, (err, sessionData)=>{
            if(err){
                console.log(err);
                throw err;
            }
            console.log(sessionData);
        });
        request.session.visited=true;
        console.log(request.session);
        response.status(200).render('login', {tittle:'Login'});
    }
);
export default router;
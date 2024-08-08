import { Router } from "express";
import { isAuthenticated } from "../utils/middlewares.mjs";

const router = Router();

router.get(
    '/v0/login',
    (request, response)=>{
        request.sessionStore.get(request.session.id, (err, sessionData)=>{
            if(err){
                console.log(err);
                throw err;
            }
        });
        request.session.visited=true;
        response.status(200).render('login', {tittle:'Login'});
    }
);
export default router;
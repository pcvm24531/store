import { Router } from "express";
import { isAuthenticated } from "../utils/middlewares.mjs";

const router = Router();

router.get(
    '/v0/login',
    isAuthenticated,
    (request, response)=>{
        const error = request.query.error ? request.query.error : '';
        request.sessionStore.get(request.session.id, (err, sessionData)=>{
            if(err){
                console.log(err);
                throw err;
            }
        });
        request.session.visited=true;
        response.status(200).render(
            'login', 
            {
                tittle:'Login',
                error: error,
            });
    }
);
export default router;
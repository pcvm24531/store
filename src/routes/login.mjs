import { Router } from "express";

const router = Router();

router.get(
    '/v0/login',
    (request, response)=>{
        response.status(200).render('login', {tittle:'Login'});
    }
);
export default router;
import { Router } from "express";

const router = Router();

router.get(
    '/v0/home',
    (request, response)=>{
        response.status(200).render('index', {msg:'This is home'});
    }
);
export default router;
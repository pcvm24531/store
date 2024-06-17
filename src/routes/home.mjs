import { Router } from "express";

const router = Router();

router.get(
    '/v0',
    (request, response)=>{
        //response.status(200).render('index', {msg:'This is home'});
        response.status(200).send('Hola, pcvm');

    }
);
export default router;
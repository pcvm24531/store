import { Router } from "express";
import {mockProducts} from "../utils/constants.mjs";

const router = Router();


router.get(
    '/v0/products',
    (request, response)=>{
        response.status(200).send(mockProducts);
    }
);
export default router;
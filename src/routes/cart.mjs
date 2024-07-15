import { Router } from "express";
import {  } from "../mongoose/schemas/user.mjs";

const router = Router();

router.post(
    "/v0/cart",
    (request, response)=>{
        if( !request.session.user ) return response.sendStatus(401);
        const{body: item}=request;

        const {cart} = request.session;
        
        if( cart ){
            cart.push(item);
        }else{
            request.session.cart = [item];
        }
        console.log(request.session.cart);
        return response.status(201).send(item);
    }
);
router.get(
    "/v0/cart",
    (request, response)=>{
        if( !request.session.user ) return response.sendStatus(401);
        return response.send(request.session.cart ?? []);
    }
);
export default router;
import { Router } from "express";
import { User } from "../mongoose/schemas/user.mjs";

const router = Router();

router.post(
    '/v0/auth',
    async (request, response)=>{
        const{ 
            body:{
                username,
                password
            } 
        } = request;
        const users = await User.find();
        const findUser = users.find( (user)=>user.userName===username );
        
        if( !findUser || findUser.password !== password) return response.status(401).send({msg:"Bad credential"});

        request.session.user = findUser;
        return response.status(200).send(findUser);
    }
);
router.get(
    "/v0/auth/status",
    (request, response)=>{console.log(request.session.user);
        request.sessionStore.get(request.sessionID, (err, session)=>{
            console.log(session);
        });
        return request.session.user 
        ? response.status(200).send(request.session.user) 
        : response.status(401).send({msg:"No autentificado!"});
    }
);
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
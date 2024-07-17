import { Router } from "express";
import { User } from "../mongoose/schemas/user.mjs";
import passport from "passport";
import localStrategy from "passport-local";
import session from "express-session";
import {  } from "../utils/local-strategy.mjs";

const router = Router();

router.use(passport.initialize());
router.use(passport.session());

router.post(
    '/v0/auth',
    passport.authenticate("local"),
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
    (request, response)=>{
        console.log(`Dentro de /v0/auth/status endpoit`);
        console.log(request.user);
        request.sessionStore.get(request.sessionID, (err, session)=>{
            console.log(session);
        });
        return request.session.user 
        ? response.status(200).send(request.session.user) 
        : response.status(401).send({msg:"No autentificado!"});
    }
);
router.post(
    "/v0/auth/logout",
    (request, response)=>{
        if(!request.user) return response.sendStatus(401);

        request.logout( (err)=>{
            if (err) return response.sendStatus(400);

            response.send(200);
        } );
    }
);

export default router;
import { Router } from "express";
import { User } from "../mongoose/schemas/user.mjs";
import passport from "passport";
import { comparePassword } from "../utils/helpers.mjs";

const router = Router();

router.use(passport.initialize());
router.use(passport.session());

router.post(
    '/v0/auth',
    async (request, response)=>{
        const{ 
            body:{
                username,
                password
            } 
        } = request;
        const findUser = await User.findOne( { userName: username } );
        
        if( comparePassword(password, findUser.password) ) return response.status(401).send({msg:"Datos de acceso incorrectos!"});

        request.session.user = findUser;
        //return response.status(200).send(findUser);
        response.render('home',{title:'Home'});
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
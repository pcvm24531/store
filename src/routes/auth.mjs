import { Router } from "express";
import { User } from "../mongoose/schemas/user.mjs";
import passport from "passport";
import { comparePassword } from "../utils/helpers.mjs";

const router = Router();

router.use(passport.initialize());
router.use(passport.session());

router.post(
    '/auth',
    async (request, response)=>{
        const{ 
            body:{
                username,
                password
            } 
        } = request;
        const findUser = await User.findOne( { userName: username } );
        //Si no existe usuario retornamos al login
        if( !findUser ){
            return response.redirect(`/login?error=Datos de acceso incorrectos!`);
        }
        
        //Si la contraseña recibida es la misma a la de la DB
        if( !comparePassword(password, findUser.password) ){
            return response.redirect(`/login?error=La contraseña es incorrecta!`);
        }

        request.session.user = findUser;
        response.redirect('home');
    }
);
router.get(
    "/auth/status",
    (request, response)=>{
        console.log(`Dentro de /auth/status endpoit`);
        console.log(request.user);
        request.sessionStore.get(request.sessionID, (err, session)=>{
            console.log(session);
        });
        return request.session.user 
        ? response.status(200).send(request.session.user) 
        : response.status(401).send({msg:"No autentificado!"});
    }
);
router.get(
    "/auth/logout",
    (request, response)=>{
        if(!request.session.user) return response.sendStatus(401);
        request.logout( (err)=>{
            if (err) return response.sendStatus(400);
            response.redirect('/login');
        } );
    }
);

export default router;
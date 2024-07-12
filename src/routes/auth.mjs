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
        const users = await User.find();console.log(users);
        const findUser = users.find( (user)=>user.userName===username );
        
        if( !findUser || findUser.password !== password) return response.status(401).send({msg:"Bad credential"});

        request.session.user = findUser;
        return response.status(200).send(findUser);
    }
);
router.get(
    "/v0/auth/status",
    (request, response)=>{
        request.sessionStore.get(request.sessionID, (err, session)=>{
            console.log(session);
        });
        return request.session.user 
        ? response.status(200).send(request.session.user) 
        : response.status(401).send({msg:"Not Authenticated"});
    }
);
export default router;
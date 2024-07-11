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
        //const findUser = await User.find( (user)=> user.userName===username );
        const users = await User.find();
        const findUser = users.find( (user)=>user.userName===username );
        console.log(findUser);
        if( !findUser || findUser.password !== password) return response.status(401).send({msg:"Bad credential"});

        request.session.user = findUser;
        return response.status(200).send(findUser);
    }
);
export default router;
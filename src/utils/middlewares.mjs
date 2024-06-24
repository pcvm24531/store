import { User } from "../mongoose/schemas/user.mjs";
import { mockUsers,mockProducts } from "./constants.mjs";

//Buscar usuario por id
export const resolveIndexByUserId = async (request, response, next)=>{
    const{
        body,
        params: { id },
    } = request;
    const paramID = parseInt( id );
    if( isNaN(paramID) ) return response.sendStatus(400);
    try {
        const users = await User.find();
        const findUserIndex = users.findIndex( (user)=>user.id===paramID );        
        if(findUserIndex === -1) return response.status(403).send({msg:"not found"});
        request.findUserIndex = findUserIndex;
        next();
    } catch (error) {
        console.log(`Error: ${error}`);
        response.sendStatus(500);
    }    
};

//buscar product por id
export const resolveIndexByProductsId = async (request, response, next)=>{
    const {
        body,
        params:{id}
    } = request;
    const productID = parseInt( id );
    if( isNaN(productID) ) return response.status(400).send({msg:"bad request"});
    try {
        const users = await User.find();
        const findProductIndex = users.findIndex( (product)=>product.id===productID );
        if( findProductIndex === -1 ) return response.status(403).send({msg:"not found"});
        request.findProductIndex = findProductIndex;
        next();
    } catch (error) {
        console.log(`Error: ${error}`);
        response.sendStatus(500);
    }
}

export const isLoggedIn = ( request, response, next )=>{
    if( request.isAuthenticated() ) return next();
    response.redirect('/login');
}

import { mockUsers,mockProducts } from "./constants.mjs";

export const resolveIndexByUserId = (request, response, next)=>{
    const{
        body,
        params: { id },
    } = request;
    const paramID = parseInt( id );
    if( isNaN(paramID) ) return response.sendStatus(400);
    const findUserIndex = mockUsers.findIndex( (user)=>user.id===paramID );
    if(findUserIndex === -1) return response.sendStatus(404);
    request.findUserIndex = findUserIndex;
    next();
};

export const resolveIndexByProductsId = (request, response, next)=>{
    const {
        body,
        params:{id}
    } = request;
    const productID = parseInt( id );
    if( isNaN(productID) ) return response.status(400).send({msg:"bad request"});

    const findProductIndex = mockProducts.findIndex( (product)=>product.id===productID );
    if( findProductIndex === -1 ) return response.status(403).send({msg:"not found"});
    request.findProductIndex = findProductIndex;
    next();
}
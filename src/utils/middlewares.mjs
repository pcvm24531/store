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
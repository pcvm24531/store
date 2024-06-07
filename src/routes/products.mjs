import { Router } from "express";
import {mockProducts} from "../utils/constants.mjs";
import { resolveIndexByProductsId, resolveIndexByUserId } from "../utils/middlewares.mjs";
import { createProductsValidationSchema } from "../utils/validationSchemas.mjs";
import { checkSchema, matchedData, validationResult } from "express-validator";

const router = Router();


router.get(
    '/v0/products',
    (request, response)=>{
        response.status(200).send(mockProducts);
    }
);
router.get(
    '/v0/products/:id',
    resolveIndexByProductsId,
    ( request, response )=>{
        const productIndex = parseInt(request.findProductIndex);
        response.status(202).send(mockProducts[productIndex]);
    }
);
router.post(
    '/v0/products',
    checkSchema(createProductsValidationSchema),
    (request, response)=>{
        const result = validationResult(request);
        if( !result.isEmpty() ) return response.status(400).send( {error: result.array()} );

        const data = matchedData(request);
        const newProduct = {id: mockProducts[mockProducts.length-1].id+1, ...data};
        mockProducts.push(newProduct);
        response.status(202).send(newProduct);
    }
);
//Funcion para actualizar los datos de un producto
router.patch(
    '/v0/products/:id',
    resolveIndexByProductsId,
    (request, response)=>{
        const productIndex = parseInt(request.findProductIndex);
        const data = request.body;
        mockProducts[ productIndex ] = {...mockProducts[productIndex], ...data}
        response.status(202).send(mockProducts[productIndex]);
    }
);

router.delete(
    '/v0/products/:id',
    resolveIndexByProductsId,
    (request, response)=>{
        const productIndex = parseInt(request.findProductIndex);
        mockProducts.splice(productIndex, 1);
        response.status(202).send({msg:`Producto eliminado.`});
    }
);

export default router;
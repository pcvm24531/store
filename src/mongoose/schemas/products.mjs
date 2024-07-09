import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        comercialName:{
            type: mongoose.Schema.Types.String,
            required: true,
        },
        genericName:{
            type: mongoose.Schema.Types.String,
            required: true,
        },
        productCode:{
            type: mongoose.Schema.Types.String,
            required: true,
        },
        description:{
            type: mongoose.Schema.Types.String,
            required: true,
        },
        provider:{
            type: mongoose.Schema.Types.String,
            requided: true,
        },
        storageConditions:{
            type:mongoose.Schema.Types.String,
        },
        stock:{
            type: mongoose.Schema.Types.Number,
        },
        locationStore:{
            type: mongoose.Schema.String,
        },
        purchasePrice:{
            type: mongoose.Schema.Types.Double,
        },
        salePrice:{
            type: mongoose.Schema.Types.Double,
            required: true,
        }
    }
);

export const Products = mongoose.model('Product', ProductSchema);
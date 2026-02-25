import Joi from "joi";
import { Category } from "../models/categoryEnum"

// Post operation schemas organized by request part
export const ItemSchemas = {
    // POST /posts - Create new item
    create: {
        body: Joi.object({
            name: Joi.string().min(2).max(80).required().messages({
                "any.required": "Item Name is required",
                "string.empty": "Item Name cannot be empty",
            }),
            sku: Joi.string().pattern(/^[A-Z]{3}[0-9]{4}$/).required().messages({
                "any.required": "Item SKU is required",
                "string.empty": "Item SKU cannot be empty",
                "string.pattern.base": "Item SKU must follow pattern"
            }),
            quantity: Joi.number().positive().required().messages({
                "any.required": "Must supply Item Quantity",
                "number.positive": "Item count must be positive"
            }),
            price: Joi.number().positive().precision(2).required().messages({
                "any.required": "Item Price is required",
                "number.positive": "Item price must be a positive number",
                "number.precision": "Item price should only go to 2 decimal places"
            }),
            category: Joi.string().valid(...Object.values(Category)).required().messages({
                "any.required": "Item category is required",
                "string.empty": "Item category cannot be empty",
                "any.only": "Item category must be a valid category"
            })
        }),
    },
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "ID is required",
                "string.empty": "ID cannot be empty",
            })
        }),
        body: Joi.object({
            name: Joi.string().min(2).max(80).messages({
                "string.empty": "Item Name cannot be empty"
            }),
            quantity: Joi.number().positive().messages({
                "number.positive": "Item count must be positive"
            }),
            price: Joi.number().positive().precision(2).messages({
                "number.positive": "Item price must be a positive number",
                "number.precision": "Item price should only go to 2 decimal places"
            }),
            category: Joi.string().valid(...Object.values(Category)).messages({
                "string.empty": "Item category cannot be empty",
                "any.only": "Item category must be a valid category"
            })
        }).min(1)
    },
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "ID is required",
                "string.empty": "ID cannot be empty",
            })
        })
    },
    deleteById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "ID is required",
                "string.empty": "ID cannot be empty",
            })
        })
    }
};
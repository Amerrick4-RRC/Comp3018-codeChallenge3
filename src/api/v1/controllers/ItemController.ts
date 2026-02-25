import { Request, Response } from "express";
import { HealthCheckResponse } from "../models/healthCheck";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { createNewItem, getByItemId, getAllItems, deleteItemWithId, updateItemById } from "../services/itemServices"
import { CreateItem, UpdateItem } from "../models/itemStructure"


export const getItems = async (req: Request, res: Response) => {
    try {
        const items = await getAllItems();
        res.status(HTTP_STATUS.OK).json({ Listing: items });
    }
    catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server Error" });
    }
};

export const getSelectedItem = async (req: Request, res: Response) => {
    try {
        let id = req.params.id as string;
        let result = await getByItemId(id);

        res.status(HTTP_STATUS.OK).json({ Item : result });
    }
    catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server Error" });
    }
};

export const createItem = async (req: Request, res: Response) => {

    try {
        const newItem: CreateItem = {
            name: req.body.name,
            sku: req.body.sku,
            quantity: req.body.quantity,
            price: req.body.price,
            category: req.body.category
        }
        let result = await createNewItem(newItem);

        res.status(HTTP_STATUS.CREATED).json({ Item: result });
    }
    catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Internal server Error" });
    }
};

export const updateItemWithId = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    try {
        const change: Partial<UpdateItem> = req.body;

        let result = await updateItemById(id, change)
        res.status(HTTP_STATUS.OK).json({ update: result })
    }
    catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: `Could not find ${id}` })
    }
};

export const deleteItemById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    try {
        await deleteItemWithId(id)
        res.status(HTTP_STATUS.OK).json({message: `Successful deletion of ${id}`})
    }
    catch (error) {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: `Could not find ${id}` })
    }
};

export const getHealth = (req: Request, res: Response): void => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    };
    res.status(HTTP_STATUS.OK).json(healthData)
} 
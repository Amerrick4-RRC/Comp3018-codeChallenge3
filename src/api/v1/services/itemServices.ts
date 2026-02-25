import {addItem, getItemById, getAllItemsList, updateItem, deleteItemById} from "../repositories/itemRepository"
import { CreateItem, UpdateItem } from "../models/itemStructure"
import { Item } from "../models/itemStructure"

export const createNewItem = async (item: CreateItem): Promise<Item> => {
    let results = await addItem(item);
    return results;
};

export const getByItemId = async (id: string ): Promise<Item> => {
    let results = await getItemById(id);
    return results;
};

export const getAllItems = async (): Promise<Item[]> =>{
    let results = await getAllItemsList();
    return results;
};

export const updateItemById = async (id: string, update: Partial<UpdateItem>): Promise<Item> => {
    let results = await updateItem(id, update);
    return results;
};

export const deleteItemWithId = async (id: string): Promise<void> =>{
    await deleteItemById(id);
    return;
}
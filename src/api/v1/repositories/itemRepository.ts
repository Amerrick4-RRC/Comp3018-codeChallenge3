import { db } from "../../../config/firebaseConfig";
import { DocumentReference } from "firebase-admin/firestore";
import * as models from "../models/itemStructure";

export const addItem = async (item: models.CreateItem): Promise<models.Item> => {

    const docRef: DocumentReference = db.collection("items").doc();

    const addition: models.Item = {
        name: item.name,
        sku: item.sku,
        quantity: item.quantity,
        price: item.price,
        category: item.category,
        createdAt: new Date(),
        updatedAt: new Date(),
        id: docRef.id
    }

    await docRef.set(addition);

    console.log("Document added");
    return addition;
};

export const getItemById = async (id: string): Promise<models.Item> => {
    const docRef: DocumentReference = db.collection("items").doc(id);

    const item = await docRef.get();

    if (item.exists) {
        console.log("document found")
        return item.data() as models.Item;
    }
    else {
        console.log("document not found")
        throw new Error("Item not found")
    };
};

export const getAllItemsList = async (): Promise<models.Item[]> => {
    try {
        const snapshot = await db.collection("items").get()
        const itemListing: models.Item[] = snapshot.docs.map(doc => ({ ... (doc.data() as models.Item) }))

        return itemListing;
    }
    catch (error) {
        throw new Error("Failed to fetch")
    };
};

export const updateItem = async (id: string, update: Partial<models.UpdateItem>): Promise<models.Item> => {
    const docRef: DocumentReference = db.collection("items").doc(id);

    try {
        const updates = {
            ...update,
            updatedAt: new Date()
        };

        await docRef.update(updates);

        const snapshot = await docRef.get();

        if (!snapshot.exists) {
            throw new Error("Item not found");
        }

        return {
            ...(snapshot.data() as models.Item),
            id: snapshot.id
        };

    } catch (error) {
        throw new Error("Item not found");
    }

};

export const deleteItemById = async (id: string): Promise<void> => {
    const docRef: DocumentReference = db.collection("items").doc(id);
    const snapshot = await docRef.get();

    if (!snapshot.exists) {
        console.log("document not found");
        throw new Error("Item not found");
    }

    await docRef.delete();
    console.log("Item deleted")
};
import {
  createNewItem,
  getByItemId,
  updateItemById
} from "../src/api/v1/services/itemServices";

import * as repo from "../src/api/v1/repositories/itemRepository";

// Mock the entire repository module
jest.mock("../src/api/v1/repositories/itemRepository");

describe("Item Service Tests", () => {

  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Create product - verifies service calls repository correctly", async () => {
    // Arrange
    const mockItem = {
      name: "Hammer",
      sku: "H123",
      quantity: 10,
      price: 15,
      category: "Tools"
    };

    const createdItem = { ...mockItem, id: "abc123" };

    // Mock repository response
    (repo.addItem as jest.Mock).mockResolvedValue(createdItem);

    // Act
    const result = await createNewItem(mockItem);

    // Assert
    expect(repo.addItem).toHaveBeenCalledTimes(1);
    expect(repo.addItem).toHaveBeenCalledWith(mockItem);
    expect(result).toEqual(createdItem);
  });

  it("Get product by ID - returns null for non-existent ID", async () => {
    // Arrange
    const id = "does-not-exist";

    // Mock repository to return null
    (repo.getItemById as jest.Mock).mockResolvedValue(null);

    // Act
    const result = await getByItemId(id);

    // Assert
    expect(repo.getItemById).toHaveBeenCalledTimes(1);
    expect(repo.getItemById).toHaveBeenCalledWith(id);
    expect(result).toBeNull();
  });

  it("Update product - verifies partial update works", async () => {
    // Arrange
    const id = "item123";
    const update = { quantity: 20 }; // partial update

    const updatedItem = {
      id,
      name: "Hammer",
      sku: "H123",
      quantity: 20,
      price: 15,
      category: "Tools"
    };

    // Mock repository update
    (repo.updateItem as jest.Mock).mockResolvedValue(updatedItem);

    // Act
    const result = await updateItemById(id, update);

    // Assert
    expect(repo.updateItem).toHaveBeenCalledTimes(1);
    expect(repo.updateItem).toHaveBeenCalledWith(id, update);
    expect(result.quantity).toBe(20);
    expect(result).toEqual(updatedItem);
  });
});
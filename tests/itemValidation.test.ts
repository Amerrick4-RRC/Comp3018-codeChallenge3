import { ItemSchemas } from "../src/api/v1/validation/ItemSchemas";
import { Category } from "../src/api/v1/models/categoryEnum";

describe("Item Validation Schema - Create Item", () => {

  it("Valid product data - all fields valid, should pass", () => {
    // Arrange
    const validData = {
      name: "Hammer",
      sku: "HMR1234",
      quantity: 10,
      price: 19.99,
      category: Category.TLS
    };

    // Act
    const { error } = ItemSchemas.create.body.validate(validData);

    // Assert
    expect(error).toBeUndefined();
  });

  it("Invalid SKU pattern - wrong format should fail", () => {
    // Arrange
    const invalidSkuData = {
      name: "Hammer",
      sku: "123-HMR", 
      quantity: 10,
      price: 19.99,
      category: Category.TLS
    };

    // Act
    const { error } = ItemSchemas.create.body.validate(invalidSkuData);

    // Assert
    expect(error).toBeDefined();
    expect(error?.details[0].message).toContain("Item SKU must follow pattern");
  });

  it("Negative quantity - should fail validation", () => {
    // Arrange
    const invalidQuantityData = {
      name: "Hammer",
      sku: "HMR1234",
      quantity: -5, 
      price: 19.99,
      category: Category.TLS
    };

    // Act
    const { error } = ItemSchemas.create.body.validate(invalidQuantityData);

    // Assert
    expect(error).toBeDefined();
    expect(error?.details[0].message).toContain("Item count must be positive");
  });

  it("Invalid category - should fail with enum error", () => {
    // Arrange
    const invalidCategoryData = {
      name: "Hammer",
      sku: "HMR1234",
      quantity: 10,
      price: 19.99,
      category: "Food" 
    };

    // Act
    const { error } = ItemSchemas.create.body.validate(invalidCategoryData);

    // Assert
    expect(error).toBeDefined();
    expect(error?.details[0].message).toContain("Item category must be a valid category");
  });

});
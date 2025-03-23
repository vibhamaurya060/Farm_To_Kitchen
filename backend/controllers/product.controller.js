const productModel = require("../models/product.model");


// Create a new product
const createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, category, images } = req.body;
        const newProduct = await productModel.create({
            farmer: req.user.id,
            name,
            description,
            price,
            quantity,
            category,
            images
        });
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find().populate("farmer", "name contactInfo");
        res.status(200).json({products: products});
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
};

// Get product by ID
const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id).populate("farmer", "name contactInfo");
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error: error.message });
    }
};

const getProductByCategory = async (req, res) => {
    try {
      const category = req.query.category;
      console.log("Category received from request:", category); // Debugging
  
      if (!category) {
        return res.status(400).json({ error: "Category is required" });
      }
  
      // Fetch products
      const products = await productModel.find({ category: String(category) });
      // ✅ Correct

  
      console.log("Products found:", products); // Debugging
      res.json(products);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }; 

   
  
// Update product
const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

// Delete product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};

module.exports={createProduct, getAllProducts, getProductById, getProductByCategory, updateProduct, deleteProduct}
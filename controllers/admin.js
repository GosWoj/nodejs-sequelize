import { Product } from "../models/product.js";

export const getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    path: "/admin/add-product",
    pageTitle: "Add Product",
    editing: false,
  });
};

export const postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const image = req.body.image;
  const description = req.body.description;
  const product = new Product(null, name, price, image, description);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
};

export const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  const id = req.params.id;
  Product.fetchProduct(id, (product) => {
    if (!product) {
      return res.redirect("/");
    }

    res.render("admin/edit-product", {
      path: "/admin/edit-product",
      pageTitle: "Edit Product",
      editing: editMode,
      product: product,
    });
  });
};

export const postEditProduct = (req, res, next) => {
  const {
    productID,
    name: updatedName,
    price: updatedPrice,
    image: updatedImage,
    description: updatedDescription,
  } = req.body;
  // const productID = req.body.productID;
  // const updatedName = req.body.name;
  // const updatedPrice = req.body.price;
  // const updatedImage = req.body.image;
  // const updatedDescription = req.body.description;
  const updatedProduct = new Product(
    productID,
    updatedName,
    updatedPrice,
    updatedImage,
    updatedDescription
  );
  updatedProduct.save();
  res.redirect("/admin/products");
};

export const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      path: "/admin/products",
      pageTitle: "Products",
      products: products,
    });
  });
};

export const postDeleteProduct = (req, res, next) => {
  const productID = req.body.productID;
  Product.delete(productID);
  res.redirect("/admin/products");
};

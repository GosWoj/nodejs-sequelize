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
  // const product = new Product(null, name, price, image, description);
  // product
  //   .save()
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((error) => console.log(error));
  Product.create({
    name: name,
    price,
    image,
    description,
  })
    .then((data) => {
      console.log("PRODUCT CREATED");
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};

export const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }

  const id = req.params.id;
  // Product.fetchProduct(id, (product) => {
  //   if (!product) {
  //     return res.redirect("/");
  //   }

  //   res.render("admin/edit-product", {
  //     path: "/admin/edit-product",
  //     pageTitle: "Edit Product",
  //     editing: editMode,
  //     product: product,
  //   });
  // });
  Product.findByPk(id)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        path: "/admin/edit-product",
        pageTitle: "Edit Product",
        editing: editMode,
        product: product,
      });
    })
    .catch((error) => console.log(error));
};

export const postEditProduct = (req, res, next) => {
  const {
    productID,
    name: updatedName,
    price: updatedPrice,
    image: updatedImage,
    description: updatedDescription,
  } = req.body;

  // const updatedProduct = new Product(
  //   productID,
  //   updatedName,
  //   updatedPrice,
  //   updatedImage,
  //   updatedDescription
  // );
  // updatedProduct.save();
  Product.findByPk(productID)
    .then((product) => {
      product.name = updatedName;
      product.price = updatedPrice;
      product.image = updatedImage;
      product.description = updatedDescription;
      //To change data in the database
      return product.save();
    })
    //By adding "return" and another .then(),
    //The last catch will catch errors for both promises
    .then((data) => {
      console.log("PRODUCT UPDATED");
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};

export const getProducts = (req, res, next) => {
  // Product.fetchAll((products) => {
  //   res.render("admin/products", {
  //     path: "/admin/products",
  //     pageTitle: "Products",
  //     products: products,
  //   });
  // });
  Product.findAll()
    .then((products) => {
      res.render("admin/products", {
        path: "/admin/products",
        pageTitle: "Products",
        products: products,
      });
    })
    .catch((error) => console.log(error));
};

export const postDeleteProduct = (req, res, next) => {
  const productID = req.body.productID;
  // Product.delete(productID);
  Product.findByPk(productID)
    .then((product) => {
      return product.destroy();
    })
    .then((data) => {
      console.log("PRODUCT DELETED");
      res.redirect("/admin/products");
    })
    .catch((error) => console.log(error));
};

import { Product } from "../models/product.js";
import { Cart } from "../models/cart.js";

export const getIndex = (req, res, next) => {
  // Product.fetchAll()
  //   .then(([rows, fieldData]) => {
  //     res.render("shop/index", {
  //       path: "/",
  //       pageTitle: "Shop",
  //       products: rows,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        path: "/",
        pageTitle: "Shop",
        products: products,
      });
    })
    .catch((error) => console.log(error));
};

export const getProduct = (req, res, next) => {
  const id = req.params.id;
  // Product.fetchProduct(id)
  //   .then(([product]) => {
  //     res.render("shop/product", {
  //       pageTitle: product[0].name,
  //       product: product[0],
  //     });
  //   })
  //   .catch((error) => console.log(error));
  Product.findByPk(id)
    .then((product) => {
      res.render("shop/product", {
        pageTitle: product.name,
        product: product,
      });
    })
    .catch((error) => console.log(error));

  //Can also look for product using restriction as "where"
  // Product.findAll({ where: { id: id } })
  //   .then((products) => {
  //     res.render("shop/product", {
  //       pageTitle: products[0].name,
  //       product: products[0],
  //     });
  //   })
  //   .catch((error) => console.log(error));
};

export const getProducts = (req, res, next) => {
  // Product.fetchAll()
  //   .then(([rows]) => {
  //     res.render("shop/product-list", {
  //       path: "/products",
  //       pageTitle: "Products",
  //       products: rows,
  //       hasProducts: rows.length > 0,
  //       activeShop: true,
  //       productCSS: true,
  //     });
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        path: "/products",
        pageTitle: "Products",
        products: products,
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
      });
    })
    .catch((error) => console.log(error));
};

export const getCart = (req, res, next) => {
  // Cart.getCart((cart) => {
  //   Product.fetchAll((products) => {
  //     const cartProducts = [];
  //     for (const product of products) {
  //       const cartProductData = cart.products.find(
  //         (prod) => prod.id === product.id
  //       );
  //       if (cartProductData) {
  //         cartProducts.push({
  //           productData: product,
  //           quantity: cartProductData.quantity,
  //         });
  //       }
  //     }
  //     res.render("shop/cart", {
  //       path: "/cart",
  //       pageTitle: "Cart",
  //       products: cartProducts,
  //     });
  //   });
  // });
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          res.render("shop/cart", {
            path: "/cart",
            pageTitle: "Cart",
            products: products,
          });
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
};

export const postCart = (req, res, next) => {
  const id = req.body.productID;
  let fetchedCart;
  let quantity = 1;
  // Product.fetchProduct(id, (product) => {
  //   Cart.addProduct(id, product.price);
  // });
  // res.redirect("/cart");
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({
        where: {
          id: id,
        },
      });
    })
    .then((products) => {
      let product;

      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const prevQuantity = product.cartItem.quantity;
        quantity = prevQuantity + 1;
        return product;
      } else {
        return Product.findByPk(id);
      }
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: {
          quantity,
        },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((error) => console.log(error));
};

export const postCartDeleteItem = (req, res, next) => {
  const productID = req.body.productID;
  Product.fetchProduct(productID, (product) => {
    Cart.deleteProduct(productID, product.price);
    res.redirect("/cart");
  });
};

export const getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

export const getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Orders",
  });
};

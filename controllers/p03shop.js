const Product = require("../models/p03product");
const Cart = require("../models/p03cart");

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("p03/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getProduct = (req, res) => {
  const prodId = req.params.productId;
  Product.findMyId(prodId, (product) => {
    res.render("p03/shop/product-detail", {
      product: product,
      pageTitle: product.title,
    });
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("p03/shop/product-list", {
      prods: products,
      pageTitle: "All Products",
      path: "/products",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("p03/shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res) => {
  const prodId = req.body.productId;
  Product.findMyId(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.postCartDeleteItem = (req, res) => {
  const prodId = req.body.productId;
  Product.findMyId(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res) => {
  res.render("p03/shop/orders", {
    pageTitle: "Your Orders",
  });
};

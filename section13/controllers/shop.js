const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()
    .then( products => {
      console.log(products);
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });

  } ).catch(error => console.log(error));
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId).then((product) => {
    res.render('shop/product-detail', {product: product, pageTitle: product.title, path: '/products'});
  }).catch(error => console.log(error));
  
};

exports.getIndex = (req, res, next) => {
  Product.find().then( products => {
    console.log('GET ALL PRODUCTS: ', products);
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });

  } ).catch(error => console.log(error));
 
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      console.log(user.cart.items);
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products
      })
    }).catch(error => console.log(error));
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;

  Product.findById(productId).then((product) => {
    return req.user.addToCart(product);
  }).then( result => {
    console.log(result);
    res.redirect('/cart');
  }).catch(error => console.log(error));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user.removeFromCart(productId).then(result => {
    res.redirect('/cart');
  }).catch(error => console.log(error));
};

exports.getOrders = (req, res, next) => {
  Order.find({'user.userId':req.user._id})
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    }).catch(error => console.log(error));
  
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .then(user => {
      const products = user.cart.items.map( i =>{
        return {quantity: i.quantity, product: {...i.productId._doc}};
      });
      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      });
      order.save();
    }).then(result => {
      return req.user.clearCart();
    }).then(() => {
      res.redirect('/orders');
  }).catch(error => console.log(error));
};


exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

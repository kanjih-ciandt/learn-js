const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then( products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });

  } ).catch(error => console.log(error));
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  // Product.findAll({where: {id: productId}}}).then().catch();
  Product.findById(productId).then((product) => {
    res.render('shop/product-detail', {product: product, pageTitle: product.title, path: '/products'});
  }).catch(error => console.log(error));
  
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then( products => {
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
    .getCart()
    .then(products => {
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
  Product.deleteById(productId).then( result => {
    console.log('Deleted product');
    res.redirect('/cart');
  }).catch(error => console.log(error));
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({include: ['products']})
  .then(orders => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders
    });
  }).catch(error => console.log(error));
  
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user.getCart().then(cart => {
    fetchedCart = cart;
    return cart.getProducts();
  }).then(products => {
    return req.user.createOrder().then(order => {
      return order.addProducts(products.map(product => {
        product.orderItem = {quantity: product.cartItem.quantity};
        return product;
      }));
    }).catch(error => console.log(error));
  }).then(result => {
    return fetchedCart.setProducts(null);
    
  }).then(result => {
    res.redirect('/orders');
  }).catch(error => console.log(error));
};


exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

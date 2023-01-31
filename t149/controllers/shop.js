const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.findAll().then( products => {
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
  Product.findByPk(productId).then((product) => {
    res.render('shop/product-detail', {product: product, pageTitle: product.title, path: '/products'});
  }).catch(error => console.log(error));
  
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then( products => {
    console.log('GET ALL PRODUCTS: ', products);
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });

  } ).catch(error => console.log(error));
 
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then(cart => {
    console.log('CART: ', cart);
    return cart.getProducts();
  }).then(products => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
    });
  }).catch(error => console.log(error));
    
  // Cart.getCart(cart => {
  //   Product.fetchAll(products => {
  //     const cartProducts = [];
  //     for (product of products) {
  //       const cartProductData = cart.products.find(prod => prod.id === product.id);
  //       if (cartProductData) {
  //         cartProducts.push({productsData: product, qty: cartProductData.qty});
  //       }
  //     }
  //     res.render('shop/cart', {
  //       path: '/cart',
  //       pageTitle: 'Your Cart',
  //       products: cartProducts
  //     });
  //   });
  // });
  
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart().then(cart => {
    fetchedCart = cart;
    return cart.getProducts({where: {id: productId}});
  }).then(products => {
    let product;
    if (products.length > 0) {
      product = products[0];
    }
    
    if (product) {
      const oldQuantity = product.cartItem.quantity;
      newQuantity = oldQuantity + 1;
      return product;
      
    }
    return Product.findByPk(productId);
    
  }).then(product => {
    return fetchedCart.addProduct(product, {
      through: {quantity: newQuantity}
    });
  }).then(() => {
    res.redirect('/cart');
  }).catch(error => console.log(error));

  // Product.findById(productId, (product) => {
  //   Cart.addProduct(productId, product.price);
  // })
  // res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user.getCart().then(cart => {
    return cart.getProducts({where: {id: productId}});
  } ).then(products => {
    const product = products[0];
    return product.cartItem.destroy();
  } ).then(result => {
    res.redirect('/cart');
  } ).catch(error => console.log(error)); 
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({includes: ['products']})
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

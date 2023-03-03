const stripe = require("stripe")(
  "sk_test_51MhZdyAFuVSl5U0iQ9SCD1scDknRoZgoDf1STIXKxxSUVPrgPZqtb4V6sM6ZC7ycjMLeVWZhp5rKVqmyu4nfUt5J00nOIv94n3"
);

const Order = require("../models/order-model");
const User = require("../models/user-model");

async function getOrders(req, res) {
  try {
    const orders = await Order.findAllForUser(res.locals.uid);
    res.render("customer/orders/all-orders", {
      orders: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function addOrder(req, res, next) {
  let userDocument;
  try {
    userDocument = await User.findById(res.locals.uid);
  } catch (error) {
    return next(error);
  }

  const order = new Order(cart, userDocument);

  try {
    await order.save();
  } catch (error) {
    next(error);
    return;
  }

  req.session.cart = null;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: "{{PRICE_ID}}",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
}

module.exports = {
  getOrders: getOrders,
  addOrder: addOrder,
};

const express = require('express');
const cors = require('cors');
const { resolve } = require('path');

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

let taxRate = 5;
let discountPercentage = 10;
let loyaltyRate = 2;

// function calculate and rerurn tota cart price
function cartTotalPrice(newItemPrice, cartTotal) {
  return newItemPrice + cartTotal;
}

//Endpoint 1: Takes a newItemPrice and cartTotal as a query parameter and returns total cart value.
app.get('/cart-total', (req, res) => {
  let newItemPrice = parseFloat(req.query.newItemPrice);
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(cartTotalPrice(newItemPrice, cartTotal).toString());
});

// function calculate and rerurn tota cart price based on isMember true/false
function calculateTotalCartPrice(cartTotal, isMember) {
  if (isMember) {
    return cartTotal - (cartTotal * discountPercentage) / 100;
  } else {
    return cartTotal;
  }
}

//Endpoint 2: Takes a cartTotal and isMember as a query parameter and returns final price after applying the discount.
app.get('/membership-discount', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  let isMember = req.query.isMember === 'true';
  res.send(calculateTotalCartPrice(cartTotal, isMember).toString());
});

// function calculate and rerurn tota cart tax
function calculateTaxForTotalCart(cartTotal) {
  return (cartTotal = (cartTotal * taxRate) / 100);
}

//Endpoint 3: Takes a cartTotal as a query parameter and returns the tax applied on the Cart Total.
app.get('/calculate-tax', (req, res) => {
  let cartTotal = parseFloat(req.query.cartTotal);
  res.send(calculateTaxForTotalCart(cartTotal).toString());
});

// function calculate the delivery time based on the distance
function calculateDeliveryTime(shippingMethod, distance) {
  if (shippingMethod === 'express') {
    return distance / 100;
  } else if (shippingMethod === 'standard') {
    return distance / 50;
  } else {
    return distance / 0;
  }
}

//Endpoint 4: Takes a shippingMethod and distance as a query parameter and returns the number of days for delivering the package.
app.get('/estimate-delivery', (req, res) => {
  let shippingMethod = req.query.shippingMethod;
  let distance = parseFloat(req.query.distance);
  res.send(calculateDeliveryTime(shippingMethod, distance).toString());
});

// function calculate the shipment cose based on the weight
function calculateShippingCost(weight, distance) {
  return weight * distance * 0.1;
}

//Endpoint 5: Takes  weight and distance as query parameters and returns the shipping cost of the packages.
app.get('/shipping-cost', (req, res) => {
  let weight = parseFloat(req.query.weight);
  let distance = parseFloat(req.query.distance);
  res.send(calculateShippingCost(weight, distance).toString());
});

// function calculate the loyalti point based on the purchaseAmount
function calculateShippingCost(purchaseAmount) {
  return purchaseAmount * loyaltyRate;
}

//Endpoint 6: Takes purchaseAmount as query parameters and returns the loyalty points.
app.get('/loyalty-points', (req, res) => {
  let purchaseAmount = parseFloat(req.query.purchaseAmount);

  res.send(calculateShippingCost(purchaseAmount).toString());
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

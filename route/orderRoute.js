const express = require('express');
const Verifytoken = require('../Verifytoken');
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus, getOneOrder } = require('../controlOrders');

const RouterOrder = express.Router();

// العميل
RouterOrder.route('/').post(Verifytoken, createOrder);
RouterOrder.route('/my').get(Verifytoken, getMyOrders);
RouterOrder.route('/all').get(Verifytoken, getAllOrders);
RouterOrder.route('/:id').get(Verifytoken, getOneOrder);
RouterOrder.route('/:id/status').patch(Verifytoken, updateOrderStatus);

module.exports = RouterOrder;

const express = require('express');
const Verifytoken = require('../Verifytoken');
const { createOrder, getMyOrders, getAllOrders, updateOrderStatus } = require('../controlOrders');

const RouterOrder = express.Router();

// العميل
RouterOrder.route('/').post(Verifytoken, createOrder);
RouterOrder.route('/my').get(Verifytoken, getMyOrders);

// الموظفين
RouterOrder.route('/all').get(Verifytoken, getAllOrders);
RouterOrder.route('/:id/status').patch(Verifytoken, updateOrderStatus);

module.exports = RouterOrder;

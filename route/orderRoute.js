const express = require('express');
const Verifytoken = require('../Verifytoken');
const {
    createOrder, getMyOrders, getOneOrder, getAllOrders,
    updateOrderStatus, addItemToOrder, removeItemFromOrder
} = require('../controlOrders');

const RouterOrder = express.Router();

RouterOrder.post('/', Verifytoken, createOrder);
RouterOrder.get('/my', Verifytoken, getMyOrders);
RouterOrder.get('/all', Verifytoken, getAllOrders);
RouterOrder.get('/:id', Verifytoken, getOneOrder);
RouterOrder.patch('/:id/status', Verifytoken, updateOrderStatus);
RouterOrder.post('/:id/add-item', Verifytoken, addItemToOrder);
RouterOrder.post('/:id/remove-item', Verifytoken, removeItemFromOrder);

module.exports = RouterOrder;
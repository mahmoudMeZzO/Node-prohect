const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserA',
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
  },
  items: [
    {
      productId: String,
      name: String,
      age: Number,
      quantity: { type: Number, default: 1 },
    }
  ],
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'delivering', 'delivered'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Order', OrderSchema);

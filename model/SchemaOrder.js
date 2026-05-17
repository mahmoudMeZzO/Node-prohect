const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: false,
  },
  userEmail: {
    type: String,
    required: false,
  },
  items: [
    {
      productId: String,
      name: String,
      age: Number,
      quantity: { type: Number, default: 1 },
    }
  ],
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

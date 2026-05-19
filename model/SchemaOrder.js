const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false,
    default: '',
  },
  userEmail: {
    type: String,
    required: false,
    default: '',
  },
  // بيانات التوصيل الإجبارية
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  phone:     { type: String, required: true },
  address:   { type: String, required: true },
  notes:     { type: String, default: '' },

  items: [
    {
      productId: String,
      name:      String,
      age:       Number,
      quantity:  { type: Number, default: 1 },
    }
  ],
  status: {
    type: String,
    enum: ['pending', 'preparing', 'delivering', 'delivered', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Order', OrderSchema);

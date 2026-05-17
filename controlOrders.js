const Order = require('./model/SchemaOrder');
const Verifytoken = require('./Verifytoken');

// إنشاء أوردر جديد (للعميل)
const createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'العربة فاضية' });
    }
    const order = new Order({
      userId: req.user.id,
      userEmail: req.user.emile,
      items,
      status: 'pending',
    });
    await order.save();
    return res.status(201).json({ message: 'تم تأكيد الأوردر', order });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// جلب أوردرات العميل نفسه
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ orders });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// جلب كل الأوردرات (للموظفين)
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    return res.status(200).json({ orders });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// تغيير حالة الأوردر (للموظفين)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const allowed = ['pending', 'preparing', 'delivering', 'delivered'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: 'حالة غير صحيحة' });
    }
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return res.status(404).json({ message: 'الأوردر مش موجود' });
    return res.status(200).json({ message: 'تم التحديث', order });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = { createOrder, getMyOrders, getAllOrders, updateOrderStatus };

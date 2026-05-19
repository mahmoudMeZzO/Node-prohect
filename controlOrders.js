const Order = require('./model/SchemaOrder');

// إنشاء أوردر جديد
const createOrder = async (req, res) => {
  try {
    const { items, firstName, lastName, phone, address, notes } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ message: 'العربة فاضية' });
    if (!firstName || !lastName || !phone || !address)
      return res.status(400).json({ message: 'من فضلك ادخل الاسم والتليفون والعنوان' });

    // نجيب الـ userId والـ email من الـ token
    const userId    = String(req.user?.id    || req.user?._id  || '');
    const userEmail = String(req.user?.emile || req.user?.email || '');

    const order = new Order({
      userId,
      userEmail,
      firstName,
      lastName,
      phone,
      address,
      notes: notes || '',
      items,
      status: 'pending',
    });

    await order.save();
    return res.status(201).json({ message: 'تم تأكيد الأوردر', order });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// جلب أوردرات اليوزر الحالي بس
const getMyOrders = async (req, res) => {
  try {
    const userId    = String(req.user?.id    || req.user?._id  || '');
    const userEmail = String(req.user?.emile || req.user?.email || '');

    // نجيب بالـ userId أو بالـ email — أيهما يجيب نتايج
    let orders = await Order.find({ userId }).sort({ createdAt: -1 });
    if (orders.length === 0 && userEmail) {
      orders = await Order.find({ userEmail }).sort({ createdAt: -1 });
    }

    return res.status(200).json({ orders });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// جلب أوردر واحد
const getOneOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'الأوردر مش موجود' });
    return res.status(200).json({ order });
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

// تغيير حالة الأوردر
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ['pending', 'preparing', 'delivering', 'delivered', 'cancelled'];
    if (!allowed.includes(status))
      return res.status(400).json({ message: 'حالة غير صحيحة' });

    const order = await Order.findByIdAndUpdate(
      req.params.id, { status }, { new: true }
    );
    if (!order) return res.status(404).json({ message: 'الأوردر مش موجود' });
    return res.status(200).json({ message: 'تم التحديث', order });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = { createOrder, getMyOrders, getOneOrder, getAllOrders, updateOrderStatus };

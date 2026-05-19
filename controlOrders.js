const Order = require('./model/SchemaOrder');

// إنشاء أوردر جديد
const createOrder = async (req, res) => {
  try {
    const { items, firstName, lastName, phone, address, notes } = req.body;

    if (!items || items.length === 0)
      return res.status(400).json({ message: 'العربة فاضية' });
    if (!phone || !address)
      return res.status(400).json({ message: 'من فضلك ادخل التليفون والعنوان' });

    // الـ emile دايماً موجود في الـ token
    const userEmail = req.user?.emile || req.user?.email || '';
    const userId = String(req.user?.id || req.user?._id || '');

    const order = new Order({
      userId,
      userEmail,
      firstName: firstName || '',
      lastName: lastName || '',
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

// جلب أوردرات اليوزر بالـ email (الأضمن)
const getMyOrders = async (req, res) => {
  try {
    const userEmail = req.user?.emile || req.user?.email || '';
    const userId = String(req.user?.id || req.user?._id || '');

    // نجيب بالـ email أو بالـ userId
    const orders = await Order.find({
      $or: [
        { userEmail: userEmail },
        { userId: userId },
      ]
    }).sort({ createdAt: -1 });

    return res.status(200).json({ orders });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// جلب أوردر واحد — بس لو بتاع اليوزر
const getOneOrder = async (req, res) => {
  try {
    const userEmail = req.user?.emile || req.user?.email || '';
    const userId = String(req.user?.id || req.user?._id || '');
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: 'الأوردر مش موجود' });

    // تأكيد إن الأوردر بتاع اليوزر ده
    const isOwner = order.userEmail === userEmail || order.userId === userId;
    if (!isOwner) return res.status(403).json({ message: 'مش مسموح' });

    return res.status(200).json({ order });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// جلب كل الأوردرات (للموظفين فقط)
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

// إضافة منتج للأوردر (طالما pending أو preparing)
const addItemToOrder = async (req, res) => {
  try {
    const { item } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'الأوردر مش موجود' });
    if (!['pending', 'preparing'].includes(order.status))
      return res.status(400).json({ message: 'مش ممكن تعدل الأوردر في المرحلة دي' });

    const exists = order.items.find(i => i.productId === item.productId);
    if (exists) {
      exists.quantity += 1;
    } else {
      order.items.push({ ...item, quantity: item.quantity || 1 });
    }
    await order.save();
    return res.status(200).json({ message: 'تمت الإضافة', order });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

// حذف منتج من الأوردر
const removeItemFromOrder = async (req, res) => {
  try {
    const { productId } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'الأوردر مش موجود' });
    if (!['pending', 'preparing'].includes(order.status))
      return res.status(400).json({ message: 'مش ممكن تعدل الأوردر في المرحلة دي' });

    order.items = order.items.filter(i => i.productId !== productId);
    if (order.items.length === 0)
      return res.status(400).json({ message: 'الأوردر لازم يكون فيه منتج واحد على الأقل' });

    await order.save();
    return res.status(200).json({ message: 'تم الحذف', order });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports = {
  createOrder, getMyOrders, getOneOrder, getAllOrders,
  updateOrderStatus, addItemToOrder, removeItemFromOrder
};
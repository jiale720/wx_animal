Page({
  data: {
    cartItems: [],
    totalPrice: 0
  },
  onLoad(options) {
    const cartItems = JSON.parse(options.cartItems);
    const totalPrice = parseFloat(options.totalPrice);
    this.setData({
      cartItems,
      totalPrice
    });
  },
  submitOrder() {
    // 这里可以添加提交订单的逻辑
    wx.showToast({
      title: '订单提交成功',
      icon: 'success'
    });
    wx.navigateBack();
  }
})
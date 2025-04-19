Component({
  properties: {
    // 初始数量
    initialQuantity: {
      type: Number,
      value: 1
    },
    // 减号图标
    minusIcon: {
      type: String,
      value: '-'
    },
    // 加号图标
    plusIcon: {
      type: String,
      value: '+'
    }
  },
  data: {
    quantity: null
  },
  attached() {
    this.setData({
      quantity: this.properties.initialQuantity
    });
  },
  methods: {
    decreaseQuantity() {
      const currentQuantity = this.data.quantity;
      if (currentQuantity > 0) {
        this.setData({
          quantity: currentQuantity - 1
        });
        this.triggerEvent('quantityChange', this.data.quantity);
      }
    },
    increaseQuantity() {
      const currentQuantity = this.data.quantity;
      if(currentQuantity >= 99){
        this.setData({
          quantity: 99
        });
      }else{
        this.setData({
          quantity: currentQuantity + 1
        });
      }
      this.triggerEvent('quantityChange', this.data.quantity);
    }
  }
});
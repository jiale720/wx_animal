Page({
  data: {
    showMask: false,//遮罩层开关
    currentTab: 0,
    titleHeight: 0,
    tabHeight:0,
    activeType: null,
    cartItems: [
      {
        code: 1,
        name: '商品1',
        price: 10,
        img: '../images/pig1.jpg',
        specification: "10支/盒",
        count:1
      },
      {
        code: 2,
        name: '商品2',
        price: 20,
        image: '../images/pig1.jpg',
        specification: "10支/盒",
        count:1
      }
    ],
    totalPrice: 0,
    totalQuantity: 0,
    showCartPopup: false,
    showProductDetails: false,
    selectedProduct: null,
    dishList: [
      {
        code: 1,
        name: '菜疙瘩',
        img: '../images/pig1.jpg',
        specification: "10支/盒",
        price: 12,
        type:"PIG"
      },
      {
        code: 2,
        name: '驴蹄子面',
        img: '../images/pig1.jpg',
        specification: "10支/盒",
        desc: '近期100+人已下单',
        price: 16,
        type:"PIG"
      },
      {
        code: 3,
        name: '煎饼',
        img: '../images/pig1.jpg',
        specification: "10支/盒",  
        price: 7.5,
        type:"OTHER"
      },
      {
        code: 4,
        name: '搓搓',
        img: '../images/pig1.jpg',
        specification: "10支/盒",
        price: 16,
        type:"FEED"
      },
      {
        code: 5,
        name: '菜团子',
        img: '../images/pig1.jpg',
        specification: "10支/盒",
        price: 14.5,
        type:"FEED"
      },
      {
        code: 6,
        name: '菜团子',
        img: '../images/pig1.jpg',
        specification: "10支/盒",
        price: 14.5,
        type:"PIG"
      },
      {
        code: 7,
        name: '菜团子',
        img: '../images/pig1.jpg',
        specification: "10支/盒",
        price: 14.5,
        type:"SHEET"
      },
      {
        code: 8,
        name: '菜团子',
        img: '../images/pig1.jpg',
        specification: "10支/盒",
        price: 14.5,
        type:"SHEET"
      },
      {
        code: 9,
        name: '菜团子',
        img: '../images/pig1.jpg',
        specification: "10支/盒",
        price: 14.5,
        type:"CATTLE"
      },
      {
        code: 10,
        name: '菜团子',
        img: '../images/pig1.jpg',
        specification: "10支/盒",
        price: 14.5,
        type:"CATTLE"
      },
      {
        code: 11,
        name: '菜团子',
        img: '../images/pig1.jpg',
        specification: "10支/盒",
        price: 14.5,
        type:"CATTLE"
      },
      {
        code: 12,
        name: '菜团子',
        img: '../images/pig1.jpg',
        specification: "10支/盒",
        price: 14.5,
        type:"OTHER"
      },
      {
        code: 13,
        name: '菜团子',
        img: '../images/pig1.jpg',
        specification: "10支/盒",
        price: 14.5,
        type:"OTHER"
      },
      {
        code: 14,
        name: '菜团子',
        img: '../images/pig1.jpg',
        specification: "10支/盒",
        price: 14.5,
        type:"OTHER"
      }
    ],
    typeList:[
      {
        name:"猪药",
        value:"PIG"
      },
      {
        name:"牛药",
        value:"CATTLE"
      },
      {
        name:"羊药",
        value:"SHEET"
      },
      {
        name:"饲料",
        value:"FEED"
      },
      {
        name:"其他",
        value:"OTHER"
      }
    ],
    typePositions: {},
    blankSpaceHeight: 0
  },
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentTab: index
    });
  },
  // 滑动切换
  onSwiperChange(e) {
    const index = e.detail.current;
    this.setData({
      currentTab: index
    });
  },
  goToDetailPage: function(e) {
    wx.navigateTo({
      url: `/pages/detail/detail`
    });
  },
  goBack() {
    wx.navigateBack();
  },
  onReady() {
    this.getTitleHeight();
  },
  getTitleHeight(){
    const query = wx.createSelectorQuery();
    let height = 0;
    query.selectAll('.sticky-element').boundingClientRect((rects) => {
        if (rects) {
          rects.forEach((rect, index) => {
            height = rect.height;
          });
        }
          this.setData({
            tabHeight: height
          },() => {
            // 当 titleHeight 更新后，调用依赖 titleHeight 的方法
            this.getTypePositions();
        });
      });
      query.selectAll('.store-info').boundingClientRect((rects) => {
        if (rects) {
          rects.forEach((rect, index) => {
            height = rect.height;
          });
        }
          this.setData({
            titleHeight: height
          },() => {
            // 当 titleHeight 更新后，调用依赖 titleHeight 的方法
            this.getTypePositions();
        });
      });
    query.exec();
  },
  getTypePositions() {
    const query = wx.createSelectorQuery();
    const typePositions = {}; 
    const heights = [];
    this.data.typeList.forEach((type) => {
        query.select(`.type-${type.value}`).boundingClientRect((rect) => {
            if (rect) {
                typePositions[type.value] = rect.top;
            }
        });
        if(this.data.typeList[this.data.typeList.length-1].value === type.value){
          query.select(`.${type.value}`).boundingClientRect((rect) => {
            if (rect) {
              heights.push(rect.height);
            }
          }); 
        }   
    });
    const tabHeight = this.data.tabHeight;
    query.selectViewport().boundingClientRect((viewportRect) => {
      if (viewportRect) {
        const totalHeight = heights.reduce((sum, height) => sum + height, 0);
        //这里控制右侧的类型元素可以在下滑时保持在顶部，-10 是为了防止类型名称被搜索框覆盖住
        const blankSpaceHeight = viewportRect.height-totalHeight-tabHeight-10;
        this.setData({
          typePositions,
          blankSpaceHeight:blankSpaceHeight
        });
      }
    }).exec();
  },

  onRightViewScroll(e) {
    const scrollTop = e.detail.scrollTop;
    const { typeList, typePositions } = this.data;
    const height = this.data.titleHeight+this.data.tabHeight;
    let activeType = null;
    typeList.forEach((type) => {
        if (typePositions[type.value] && typePositions[type.value] <= scrollTop+height+40) {
            activeType = type.value;
        }
    });
    this.setData({
        activeType
    });
  },
  onParentViewTap() {
    //阻止冒泡
  },
  onQuantityChange(e) {
    const totalQuantity = e.detail;
    const product = e.currentTarget.dataset.product; // 获取当前商品信息
    this.addToCart(product);

    this.setData({
      totalQuantity: totalQuantity
    });
    console.log('当前数量是:', totalQuantity);
  },
  onTypeClick(e) {
    //这个方法控制点击左侧类型标签时，右侧可以跳转到对应的类型
    const titleHeight = this.data.titleHeight;
    const tabHeight = this.data.tabHeight;
    const type = e.currentTarget.dataset.type;
    const position = this.data.typePositions[type] - titleHeight-tabHeight;
    if (position) {
      this.setData({
        scrollTop: position // 设置 scrollTop 来滚动到目标位置
      });
      this.setData({
        activeType: type
      });
    }
  },
  // 添加商品到购物车
  addToCart(goods) {
    // const product = e.currentTarget.dataset.product;
    let cartItems = this.data.cartItems;
    let cartItem = cartItems.find(item => item.code === goods.code);
    if (cartItem) {
      cartItem.count += 1;
    } else {
      cartItem = {
        code: goods.code,
        name: goods.name,
        specification: goods.specification,
        price: goods.price,
        count: 1,
        img: goods.image
      };
      cartItems.push(cartItem);
    }
    this.calculateTotal();
    this.setData({
      cartItems
    });
  },
  // 计算总价和总数量
  calculateTotal() {
    let totalPrice = 0;
    let totalQuantity = 1;
    this.data.cartItems.forEach(item => {
      totalPrice += item.price * item.quantity;
      totalQuantity += item.quantity;
    });
    this.setData({
      totalPrice,
      totalQuantity
    });
  },
  // 修改商品数量
  changeQuantity(e) {
    const productId = e.currentTarget.dataset.productId;
    const delta = parseInt(e.currentTarget.dataset.delta);
    let cartItems = this.data.cartItems;
    const itemIndex = cartItems.findIndex(item => item.productId === productId);
    if (itemIndex > -1) {
      cartItems[itemIndex].quantity += delta;
      if (cartItems[itemIndex].quantity <= 0) {
        cartItems.splice(itemIndex, 1);
      }
      this.setData({
        cartItems
      });
      this.calculateTotal();
      if (cartItems.length === 0) {
        this.setData({
          showCartPopup: false
        });
      }
    }
  },
  // 清空购物车
  clearCart() {
    this.setData({
      cartItems: [],
      totalPrice: 0,
      totalQuantity: 0,
      showCartPopup: false,
      showMask:false
    });
  },
  // 隐藏购物车弹框
  hideCartPopup() {
    this.setData({
      showCartPopup: false
    });
  },
  // 显示购物车详情
  showCartDetails() {
    if (this.data.totalQuantity > 0) {
      let isShow = this.data.showCartPopup;
      let showMask = this.data.showMask;

      if(isShow === true){
        isShow = false;
        showMask = false;
      }else{
        isShow = true;
        showMask = true;
      }
      this.setData({
        showCartPopup: isShow,
        showMask: showMask
      });
    }
    console.log(this.data.showCartPopup);
  },
  // 显示商品详情界面
  showProductDetails(product) {
    this.setData({
      showProductDetails: true,
      selectedProduct: product
    });
  },
  // 隐藏商品详情界面
  hideProductDetails() {
    this.setData({
      showProductDetails: false
    });
  },
  // 跳转到订单页面
  showOrderPopup() {
    const cartItems = JSON.stringify(this.data.cartItems);
    const totalPrice = this.data.totalPrice;
    wx.navigateTo({
      url: `/pages/order/order?cartItems=${cartItems}&totalPrice=${totalPrice}`
    });
  },

  // 关闭弹出框
  closeMask() {
    this.setData({
      showMask: false,
      showCartPopup: false
    });
  },

  preventTouchMove(e) {
    // 不做任何操作，仅阻止事件冒泡
  },
 
})
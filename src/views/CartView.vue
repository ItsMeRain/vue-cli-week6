<template>
  <h2>購物車</h2>
  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody v-for="item in products" :key="item.title">
      <tr>
        <td style="width: 200px">
          <div style="height: 100px; background-size: cover; background-position: center" :style="{ backgroundImage:  `url(${item.imageUrl})` }">
          </div>
        </td>
        <td>
        {{ item.title}}
        </td>
        <td>
          <div class="h5" v-if="item.price===item.origin_price">{{ item.price }} 元</div>
          <div v-else>
            <del class="h6">原價 {{ item.origin_price }} 元</del>
            <div class="h5">現在只要 {{ item.price }} 元</div>
          </div>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <button type="button" class="btn btn-outline-secondary" @click="openModal(item)" :disable="loadingItem===item.id">
            <i class="fas fa-spinner fa-pulse" v-if="loadingItem===item.id"></i>
            查看更多
            </button>
            <button type="button" class="btn btn-outline-danger" @click="postCart(item)" :disabled="loadingItem===item.id">
            <i class="fas fa-spinner fa-pulse" v-if="loadingItem===item.id"></i>
            加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      tempProduct: {},
      carts: [],
      tempCart: {},
      loadingItem: ''
    }
  },
  methods: {
    getProducts () {
      this.$http.get(`${process.env.VUE_APP_API}v2/api/${process.env.VUE_APP_PATH}/products/all`)
        .then(res => {
          this.products = res.data.products
        })
        .catch(err => {
          console.log(err.data)
        })
    },
    postCart (item, qty = 1) {
      this.tempProduct = item
      this.loadingItem = item.id
      this.$http.post(`${process.env.VUE_APP_APIl}/api/${process.env.VUE_APP_PATH}/cart`, { data: { product_id: this.tempProduct.id, qty: qty } })
      // 相同產品會 + qty數量
        .then(res => {
          // console.log(res.data);
          this.loadingItem = ''
          this.getCart()
        })
        .catch(err => {
          console.log(err.data)
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>

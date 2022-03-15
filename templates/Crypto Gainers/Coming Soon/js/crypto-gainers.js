/*
Theme Name: CRYPTO GAINERS
Description: Top Crypto Gainers (24h)
Author: SquirrelLabs
Author URI: https://themeforest.net/user/squirrellabs/portfolio?ref=SquirrelLab
Version: 1.0
License: https://themeforest.net/licenses/standard
*/

'use strict';

var TICKER_URL = 'https://api.coinmarketcap.com/v1/ticker/';
var Card = Vue.component('card', {
  template: '#card-template',
  props: {
    assets: { type: Array }
  },
  data: function data() {
    return { selected: null };
  },
  computed: {
    current: function current() {
      return this.selected || this.assets[0];
    }
  },
  methods: {
    loadAsset: function loadAsset(asset) {
      this.selected = asset;
    }
  }
});

new Vue({
  el: '#app',
  components: {
    Card: Card
  },
  data: function data() {
    return { assets: [] };
  },
  mounted: function mounted() {
    var _this = this;

    axios(TICKER_URL).then(function (_ref) {
      var data = _ref.data;

      _this.assets = data.filter(function (a) {
        return a.percent_change_1h > 0;
      }).sort(function (a, b) {
        return a.rank - b.rank;
      }).slice(0, 10).sort(function (a, b) {
        return b.percent_change_1h - a.percent_change_1h;
      });
      
    }).catch(console.error);
  }
});
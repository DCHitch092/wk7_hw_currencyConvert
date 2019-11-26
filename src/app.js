import Vue from 'vue';

document.addEventListener("DOMContentLoaded", () => {

  new Vue ({
    el: "#app",

    data: {
      baseAmount: 0,
      currencies:[],
      currenciesKeys:[],
      currenciesValues:[],
      selectedCurrency: null,
      targetCurrency: null,
      baseCurrency: "EUR"
    },

    computed: {
      exchangeValue: function (){
        return this.getExchangeValue(this.targetCurrency, this.baseAmount, this.baseCurrency)
      }
    },

    mounted() {
      this.getCurrencies()
    },

    methods: {
      getExchangeValue: function(targetName, baseValue, baseCurrency) {
        // console.log('targetName:', targetName);
        // console.log('baseValue:', baseValue);
        // console.log('baseCurrency:', baseCurrency);
        const convertKey = this.currenciesKeys.findIndex((country) => country == targetName);
        const convertValue = this.currenciesValues[convertKey];
        return convertValue * baseValue;
      },
      getCurrencies: function(base) {
        fetch(`https://api.exchangeratesapi.io/latest?base=${this.baseCurrency}`)
        .then(response => response.json())
        .then((data) => {
          this.currencies = data;
          this.currenciesKeys = Object.keys(this.currencies.rates);
          this.currenciesValues = Object.values(this.currencies.rates);
          this.baseCurrency = this.currencies.base;
        }
      )}

    }})

})

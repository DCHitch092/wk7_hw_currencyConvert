import Vue from 'vue';

document.addEventListener("DOMContentLoaded", () => {

  new Vue ({
    el: "#app",

    data: {
      baseAmount: 0,
      selectedCurrency: null,
      targetCurrency: null,
      baseCurrency: null
    },

    computed: {
      currencies: function(){
        return this.getCurrencies(this.baseCurrency)
      },
      currenciesKeys: function(){
        return this.getKeys()
      },
      currenciesValues: function(){
        return this.getValues()
      },
      exchangeValue: function (){
        return this.getExchangeValue(this.targetCurrency, this.baseAmount, this.baseCurrency)
      }

        }
    },

    mounted() {
      this.getCurrencies(this.baseCurrency = "EUR")
    },

    methods:{
      getExchangeValue: function(targetName, baseValue, baseCurrency) {
        // console.log('targetName:', targetName);
        // console.log('baseValue:', baseValue);
        // console.log('baseCurrency:', baseCurrency);
        const convertKey = this.currenciesKeys.findIndex((country) => country == targetName);
        const convertValue = this.currenciesValues[convertKey];
        return convertValue * baseValue;
      },
      getCurrencies: function(base) {
        const fetchString = "https://api.exchangeratesapi.io/latest?base=" + base
        fetch(fetchString)
        .then(response => response.json())
        .then(data => this.currencies = data;)
          // this.currenciesKeys = Object.keys(this.currencies.rates);
          // this.currenciesValues = Object.values(this.currencies.rates);
          // this.baseCurrency = this.currencies.base;)
        },
        getKeys: function(){
          this.currenciesKeys = Object.keys(this.currencies.rates);
        },
        getValues: function() {
          this.currenciesValues = Object.keys(this.currencies.rates);
        }
      }
    }
  )
}
)

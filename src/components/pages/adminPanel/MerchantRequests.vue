<template>
  <div class="merchant-request">
    <h1>Pending Merchant Requests</h1>
    <div class="decision-message" v-if="message">{{message}} </div>
    <div v-for="(merchant) in merchants" :key="merchant.id" class="mrp-parent">
      <merchant-request-prop :merchant="merchant" @decision-response="decisionResponse"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MerchantRequestProp from '@/components/props/admin/merchantRequestProp.vue';

export default {
  name: 'MerchantRequest',
  components: { MerchantRequestProp },
  data() {
    return {
      merchants: [],
      message: null,
    };
  },
  methods: {
    getPendingMerchants() {
      const url = `${process.env.VUE_APP_API_URL}admin/get-pending-merchants`;
      axios.get(url)
        .then((response) => {
          this.merchants = response.data;
        });
    },
    decisionResponse(decision) {
      this.merchants = this.merchants.filter((merchant) => merchant.id !== decision.merchant.id);
      this.message = decision.message;
    },
  },
  mounted() {
    this.getPendingMerchants();
  },
};
</script>

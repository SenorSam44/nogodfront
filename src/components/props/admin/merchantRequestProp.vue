<template>
  <div class="merchant-request-prop">
    <div>
      <div>Name: {{ `${merchant.first_name} ${merchant.last_name}` }}</div>
      <div>Email: {{ merchant.email }}</div>
      <div>Gender: {{ merchant.gender }}</div>
    </div>
    <div class="decision-buttons">
      <button class="btn btn-success" @click="approveMerchant">Approve</button>
      <button class="btn btn-danger" @click="rejectMerchant">Reject</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'merchantRequestProp',
  props: {
    merchant: {
      type: Object,
    },
  },
  methods: {
    approveMerchant() {
      const data = {
        merchant_id: this.merchant.id,
        merchant_email: this.merchant.email,
        decision: 1,
      };

      this.sendDecision(data);
    },
    rejectMerchant() {
      const data = {
        merchant_id: this.merchant.id,
        merchant_email: this.merchant.email,
        decision: 0,
      };

      this.sendDecision(data);
    },

    sendDecision(data) {
      const url = `${process.env.VUE_APP_API_URL}admin/decide-pending-merchants`;

      axios.post(url, data)
        .then((response) => {
          const decision = {
            message: response.data.message,
            merchant: this.merchant,
          };
          this.$emit('decision-response', (decision));
        });
    },

  },
};
</script>

<style scoped>

</style>

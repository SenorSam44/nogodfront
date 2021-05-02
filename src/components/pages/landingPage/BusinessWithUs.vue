<template>
  <div class="business-with-us">
    <h1>Business With Us</h1>
    <div class="account-types">
      <div class="business-options">
        <div v-if="selected_account.description" class="business-description">
          {{ selected_account.description }}
        </div>
        <b-form-group label="Individual radios">
          <b-form-radio-group
            id="radio-slots"
            v-model="selected"
            :options="accountOptions"
            :aria-describedby="accountOptions"
            name="account-options"
            @change="onAccountSelect"
            stacked>
          </b-form-radio-group>
        </b-form-group>
        <b-button v-if="selected_account.registrationUrl"
                  :to="selected_account.registrationUrl" >
          Go to {{selected_account.text}} form
          <b-icon-arrow-right></b-icon-arrow-right>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BusinessWithUs',
  data() {
    return {
      selected: null,
      selected_account: [],
      accountOptions: [
        {
          text: 'Merchant',
          value: 'merchant',
          description: 'We sell you product as it should be.',
          registrationUrl: 'be-a-merchant',
        },
        {
          text: 'Local Entrepreneur',
          value: 'local_entrepreneur',
          description: 'Be a local entrepreneur and let us help your business grow',
          registrationUrl: 'be-a-local-entrepreneur',
        },
        {
          text: 'Book Seller',
          value: 'book_seller',
          description: 'Find the most popular book worms here!',
          registrationUrl: 'be-a-book-seller',
        },
      ],
      description: null,
    };
  },
  methods: {
    onAccountSelect(selected) {
      this.accountOptions.forEach((selectedOption, index) => {
        if (selected === this.accountOptions[index].value) {
          this.selected_account = this.accountOptions[index];
        }
      });
    },
  },
};
</script>

<style scoped>

</style>

<template>
  <div id="be-a-book-seller">
    <div v-if="errors"
         class="bg-danger text-white py-2 px-4 pr-0 rounded font-bold mb-4 shadow-lg">
      <ul v-for="(v, k) in errors" :key="k">
        <li v-for="error in v" :key="error" class="text-sm">
          {{ error }}
        </li>
      </ul>
    </div>
    <div v-if="successMessage"
         class="bg-success text-white py-2 px-4 pr-0 rounded font-bold mb-4 shadow-lg">
      {{ successMessage }}
    </div>
    <b-form @submit.stop.prevent="onSubmit" class="main-form">
      <!--      <b-form-group id="register-input-group-name"-->
      <!--                    label="Name" label-for="register-input-first-name">-->
      <b-form-group id="register-input-group-first-name">
        <b-form-input
          id="register-input-first-name"
          name="register-input-first-name"
          v-model="$v.form.firstName.$model"
          :state="validateState('firstName')"
          placeholder="First Name"
          aria-describedby="input-first-name-live-feedback">
        </b-form-input>

        <b-form-invalid-feedback
          id="input-first-name-live-feedback"
        >This is a required field and must be at least 3 characters.
        </b-form-invalid-feedback>
      </b-form-group>

      <!--      <b-form-group id="register-input-group-name"-->
      <!--                    label="Name" label-for="register-input-name">-->
      <b-form-group id="register-input-group-last-name">
        <b-form-input
          id="register-input-last-name"
          name="register-input-last-name"
          v-model="$v.form.lastName.$model"
          :state="validateState('lastName')"
          placeholder="Last Name"
          aria-describedby="input-last-name-live-feedback">
        </b-form-input>

        <b-form-invalid-feedback
          id="input-last-name-live-feedback"
        >This is a required field and must be at least 3 characters.
        </b-form-invalid-feedback>
      </b-form-group>

      <!--      <b-form-group id="register-input-group-email"-->
      <!--                    label="Email" label-for="register-input-email">-->
      <b-form-group id="register-input-group-email">
        <b-form-input
          id="register-input-email"
          name="register-input-email"
          v-model="$v.form.email.$model"
          :state="validateState('email')"
          placeholder="Email"
          aria-describedby="input-email-live-feedback">
        </b-form-input>

        <b-form-invalid-feedback
          id="input-email-live-feedback"
        >This is a required field and must be a valid email address
        </b-form-invalid-feedback>
      </b-form-group>

      <!--      <b-form-group id="register-input-group-password"-->
      <!--                    label="Password" label-for="register-input-password">-->

      <b-form-group id="register-input-group-password">
        <b-form-input
          id="register-input-password"
          name="register-input-password"
          type="password"
          v-model="$v.form.password.$model"
          :state="validateState('password')"
          placeholder="Password"
          aria-describedby="input-password-live-feedback">
        </b-form-input>

        <b-form-invalid-feedback
          id="input-password-live-feedback">
          Password should have at least 6 characters
        </b-form-invalid-feedback>
      </b-form-group>

      <!--      <b-form-group id="register-input-group-cpassword"-->
      <!--                    label="Confirm password" label-for="register-input-cpassword">-->
      <b-form-group id="register-input-group-cpassword">
        <b-form-input
          id="register-input-cpassword"
          name="register-input-cpassword"
          type="password"
          v-model="$v.form.cpassword.$model"
          :state="validateState('cpassword')"
          placeholder="Confirm password"
          aria-describedby="input-cpassword-live-feedback">
        </b-form-input>

        <b-form-invalid-feedback
          id="input-cpassword-live-feedback"
        >Password doesn't match
        </b-form-invalid-feedback>
      </b-form-group>

      <!--      <b-form-group id="register-input-group-gender"-->
      <!--                    label="gender" label-for="register-input-gender">-->
      <b-form-group id="register-input-group-gender">
        <b-form-select
          id="register-input-gender"
          name="register-input-gender"
          v-model="$v.form.gender.$model"
          :options="genders"
          :state="validateState('gender')"
          aria-describedby="input-gender-live-feedback">
        </b-form-select>

        <b-form-invalid-feedback id="input-gender-live-feedback">
          This is a required field.
        </b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate';
import {
  required, minLength, email, sameAs,
} from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  data() {
    return {
      successMessage: null,
      errors: null,
      genders: [
        {
          value: null,
          text: 'Choose gender',
        },
        {
          value: 'male',
          text: 'Male',
        },
        {
          value: 'female',
          text: 'Female',
        },
      ],
      form: {
        firstName: null,
        lastName: null,
        gender: null,
        email: null,
        password: null,
        cpassword: null,
      },
    };
  },
  validations: {
    form: {
      gender: {
        required,
      },
      firstName: {
        required,
        minLength: minLength(3),
      },
      lastName: {
        required,
        minLength: minLength(3),
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      cpassword: {
        required,
        sameAs: sameAs('password'),
      },
    },
  },
  methods: {
    validateState(name) {
      const {
        $dirty,
        $error,
      } = this.$v.form[name];
      return $dirty ? !$error : null;
    },

    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }

      const url = `${process.env.VUE_APP_API_URL}book-seller-register`;
      const data = {
        firstName: this.form.firstName,
        lastName: this.form.lastName,
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.cpassword,
        gender: this.form.gender,
        type: 'book_seller',
        url,
      };
      this.$store.dispatch('registerOrLogin', data)
        .then(() => {
          // this.successMessage = response.data;
          // this.resetForm();
          let nextUrl = '/me';
          if (this.$route.query.nextUrl != null) {
            nextUrl = this.$route.query.nextUrl;
          }
          this.$router.push(nextUrl)
            .catch(() => {
              this.$router.push('/me');
            });
        })
        .catch((error) => {
          // console.log(error);
          // this.error = error.data.errors;
          this.errors = error;
        });
    },
    resetForm() {
      this.form = {
        firstName: null,
        lastName: null,
        gender: null,
        email: null,
        password: null,
        cpassword: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
  },
  mounted() {
  },
};
</script>

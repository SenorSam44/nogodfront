<template>
  <div id="admin-login">
    <div class="social-buttons">
      Admin Login
    </div>
    <div v-if="errors"
         class="bg-danger text-white py-2 px-4 pr-0 rounded font-bold mb-4">
      <div v-for="(v, k) in errors" :key="k">
        <p v-for="error in v" :key="error" class="text-sm">
          {{ error }}
        </p>
      </div>
    </div>
    <b-form @submit.stop.prevent="onSubmit" class="main-form">
      <b-form-group id="login-input-group-email">
        <b-form-input
          id="login-input-email"
          name="login-input-email"
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

      <b-button type="submit" variant="primary">Login</b-button>
      <b-button class="ml-2 float-right" @click="resetForm()">Reset Password</b-button>
    </b-form>
  </div>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, email } from 'vuelidate/lib/validators';
// import axios from 'axios';

export default {
  mixins: [validationMixin],
  data() {
    return {
      errors: null,
      form: {
        email: null,
        password: null,
      },
    };
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
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
    resetForm() {
      this.form = {
        email: null,
        password: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    onSubmit() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      const url = `${process.env.VUE_APP_API_URL}login`;
      const data = {
        email: this.form.email,
        password: this.form.password,
        url,
        type: 'admin',
      };
      this.$store.dispatch('registerOrLogin', data)
        .then(() => {
          let nextUrl = '/admin/dashboard';
          if (this.$route.query.nextUrl != null) {
            nextUrl = this.$route.query.nextUrl;
          }
          this.$router.push(nextUrl)
            .catch(() => {
              this.$router.push('/admin');
            });
        })
        .catch((err) => {
          this.errors = err;
        });
    },
  },
};
</script>

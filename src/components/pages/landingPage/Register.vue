<template>
  <div id="register">
    <div class="social-buttons">
      <b-button class="facebook-button">
        <div class="icon-wrapper"><b-icon-facebook/> </div>
        <span>Login with Facebook</span>
      </b-button>
      <b-button class="google-button">
        <div class="icon-wrapper"><b-icon-google class="google-icon"/> </div>
        <span>Login with Google</span>
      </b-button>

      <div class="horizontal-or-line">
        <hr>
        <span> OR </span>
        <hr>
      </div>
    </div>
    <div v-if="errors"
         class="bg-danger text-white py-2 px-4 pr-0 rounded font-bold mb-4 shadow-lg">
      <ul v-for="(v, k) in errors" :key="k">
        <li v-for="error in v" :key="error" class="text-sm">
          {{ error }}
        </li>
      </ul>
    </div>
    <b-form @submit.stop.prevent="onSubmit" class="main-form">
      <!--      <b-form-group id="register-input-group-name"-->
      <!--                    label="Name" label-for="register-input-name">-->
      <b-form-group id="register-input-group-name">
        <b-form-input
          id="register-input-name"
          name="register-input-name"
          v-model="$v.form.name.$model"
          :state="validateState('name')"
          placeholder="Name"
          aria-describedby="input-name-live-feedback">
        </b-form-input>

        <b-form-invalid-feedback
          id="input-name-live-feedback"
        >This is a required field and must be at least 6 characters.
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
      <b-button class="ml-2" @click="resetForm()">Reset</b-button>
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
        name: null,
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
      name: {
        required,
        minLength: minLength(6),
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

    resetForm() {
      this.form = {
        name: null,
        gender: null,
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

      const url = `${process.env.VUE_APP_API_URL}register`;
      const data = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
        password_confirmation: this.form.cpassword,
        gender: this.form.gender,
        type: 'user',
        url,
      };
      this.$store.dispatch('registerOrLogin', data)
        .then(() => {
          let nextUrl = '/';
          if (this.$route.query.nextUrl != null) {
            nextUrl = this.$route.query.nextUrl;
          }
          this.$router.push(nextUrl)
            .catch(() => {
              this.$router.push('/');
            });
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },
  mounted() {
  },
};
</script>

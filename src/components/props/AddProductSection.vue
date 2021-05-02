<template>
  <div class="add-product-section">
    <h1> Add Product </h1>
    <b-form @submit.stop.prevent="onAddProduct" class="add-product-form">

      <b-form-group>
        <b-form-input
          v-model="$v.form.name.$model"
          :state="validateNameState('name')"
          placeholder="Name">
        </b-form-input>
        <b-form-invalid-feedback>
          Product name should be at least 6 character long
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group>
        <b-form-input
          type="number"
          v-model="$v.form.price.$model"
          :state="validateNumberState('price')"
          placeholder="Price">
        </b-form-input>
        <b-form-invalid-feedback>
          Price should be a valid number
        </b-form-invalid-feedback>
      </b-form-group>

      <div class="discount-field d-flex">
        <b-form-group class="discount-group flex-grow-1">
          <b-form-input
            type="number"
            v-model="$v.form.discount.$model"
            :state="validateNumberState('discount')"
            placeholder="Discount">
          </b-form-input>
          <b-form-invalid-feedback>
            Discount should be a valid number
          </b-form-invalid-feedback>
        </b-form-group>

        <div v-if="form.price && form.discount" class="price-after-discount flex-grow-1">
          Price after discount: {{ form.price - form.discount }} tk <br>
          Discount percentage:
          {{ (form.discount / form.price * 100).toFixed(2) }}%
        </div>
      </div>

      <b-form-group>
        <b-form-input
          type="number"
          v-model="$v.form.stock.$model"
          :state="validateNumberState('stock')"
          placeholder="Stock Quantity">
        </b-form-input>
        <b-form-invalid-feedback>
          Stock quantity should be a valid number
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group>
        <b-form-input
          type="number"
          v-model="$v.form.deliveryCharge.$model"
          :state="validateNumberState('deliveryCharge')"
          placeholder="Delivery Charge">
        </b-form-input>
        <b-form-invalid-feedback>
          stock should be a valid number
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Owner">
        <multiselect
          class="no-focus"
          v-model="form.owner_id"
          :max-height="600"
          placeholder="Search for owner"
          label="name" track-by="owner_id"
          :options="ownerOptions"
          :loading="ownerIsLoading"
          :multiple="false"
          :searchable="true"
          :taggable="false"
          @tag="addOwner"
          @search-change="findOwner">
        </multiselect>
      </b-form-group>

      <b-form-group>
        <b-form-textarea
          class="my-3"
          v-model="$v.form.details.$model"
          :state="validateNameState('details')"
          rows="5"
          placeholder="Add Product Details">
        </b-form-textarea>
        <b-form-invalid-feedback>
          Write at least 20 character
        </b-form-invalid-feedback>
      </b-form-group>

      <b-form-group label="Add Image:">
        <b-form-file
          id="apsFileUploadButton"
          v-model="image_url"
          style="display: none"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
          @change="addImageInArray">
        </b-form-file>

        <b-modal
          id="cropper-modal"
          class="mb-5 d-flex"
          centered
          no-close-on-backdrop
        >

          <cropper
            style="max-width: 100%"
            :src="image_url"
            :stencilProps="{ aspectRatio: 3/2 }"
            :auto-zoom="true"
            @change="change"
          />

          <template #modal-footer>
            <b-button class="m-2 px-4 py-2" size="sm" variant="primary" @click="cropImage">
              Crop
            </b-button>
          </template>
        </b-modal>
        <div class="image-preview">
          <div :key="index" v-for="(image, index) in form.images" class="image-button-template">
            <img v-if="image" :src="image" class="previewed-img"/>
            <!--            <template .previewed-image>-->
            <!--              -->
            <!--            </template>-->
          </div>
          <button type="button" @click="triggerFileInput"
                  class="btn add-image-button">
            <b-icon-plus style="width: 50%; height: 50%" class="text-white"/>
          </button>
        </div>
        <!--        <b-form-invalid-feedback>-->
        <!--          Choose at least one-->
        <!--        </b-form-invalid-feedback>-->
      </b-form-group>

      <b-form-group label="Add tags">
        <multiselect
          class="no-focus"
          v-model="form.tags"
          tag-placeholder="Add this as new tag"
          placeholder="Search or add a tag"
          label="name"
          track-by="code"
          :options="tagOptions"
          :multiple="true"
          :searchable="true"
          :taggable="true"
          @tag="addTag">
        </multiselect>
      </b-form-group>

      <b-form-group label="Colors">
        <multiselect
          class="no-focus"
          v-model="form.colors"
          tag-placeholder="Add this as new tag"
          placeholder="Search or add a tag"
          label="name" track-by="code"
          :options="colorOptions"
          :multiple="true"
          :searchable="true"
          :taggable="true"
          @tag="addColor">
        </multiselect>
      </b-form-group>

      <b-form-group label="Add sizes">
        <multiselect
          class="no-focus"
          v-model="form.sizes"
          tag-placeholder="Add this as new size"
          placeholder="Search or add a size"
          label="name" track-by="code"
          :options="sizeOptions"
          :multiple="true"
          :searchable="true"
          :taggable="true"
          @tag="addSize">
        </multiselect>
      </b-form-group>

      <b-button class="mt-5" type="submit" variant="primary">Add Product</b-button>
      <b-button class="ml-2 mt-5 float-right" @click="resetForm()">Reset Form</b-button>
    </b-form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, minLength, numeric } from 'vuelidate/lib/validators';
import Multiselect from 'vue-multiselect';
import axios from 'axios';
import { Cropper } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export default {
  name: 'addProductSection',
  mixins: [validationMixin],
  components: {
    Multiselect,
    Cropper,
  },
  data() {
    return {
      cropped_image: null,
      image_url: null,
      tagOptions: [
        {
          name: 'Vue.js',
          code: 'vu',
        },
        {
          name: 'Javascript',
          code: 'js',
        },
        {
          name: 'Open Source',
          code: 'os',
        },
      ],
      colorOptions: [],
      sizeOptions: [],
      ownerOptions: [
        {
          id: '1',
          name: 'Owner 1',
        },
        {
          id: '2',
          name: 'Owner 2',
        },
        {
          id: '3',
          name: 'Owner 3',
        },
      ],
      ownerIsLoading: false,
      form: {
        name: null,
        price: null,
        stock: null,
        deliveryCharge: null,
        details: null,
        discount: null,
        owner_id: null,
        images: [],
        tags: [],
        colors: [],
        sizes: [],
      },
    };
  },
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(6),
      },
      price: {
        required,
        numeric,
      },
      stock: {
        required,
        numeric,
      },
      discount: {
        required,
        numeric,
      },
      deliveryCharge: {
        required,
        numeric,
      },
      details: {
        required,
        minLength: minLength(20),
      },
    },
  },
  methods: {
    validateNameState(name) {
      const {
        $dirty,
        $error,
      } = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    validateNumberState(number) {
      const {
        $dirty,
        $error,
      } = this.$v.form[number];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        name: null,
        price: null,
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    onAddProduct() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
      const data = {
        name: this.form.name,
        price: this.form.price,
        stock: this.form.stock,
        deliveryCharge: this.form.deliveryCharge,
      };

      const token = localStorage.getItem('access_token');
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;

      const url = `${process.env.VUE_APP_API_URL}product`;
      axios.post(url, data)
        .then((response) => {
          console.log(response);
        });
      //   let nextUrl = '/';
      //   if (this.$route.query.nextUrl != null) {
      //     nextUrl = this.$route.query.nextUrl;
      //   }
      //   this.$router.push(nextUrl)
      //     .catch(() => {
      //       this.$router.push('/');
      //     });
    },

    addImageInArray(e) {
      const { files } = e.target;
      if (files.length === 0) {
        this.image_url = null;
        return;
      }
      const reader = new FileReader();
      reader.onload = (ex) => {
        // this.image_url = ex.target.result;
        // this.form.images.push(ex.target.result);
        this.image_url = ex.target.result;
        this.$bvModal.show('cropper-modal');
      };
      reader.readAsDataURL(files[0]);
    },

    triggerFileInput() {
      document.querySelector('#apsFileUploadButton')
        .click();
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000)),
      };
      this.tagOptions.push(tag);
      this.form.tags.push(tag);
    },
    addColor(newColor) {
      const color = {
        name: newColor,
        code: newColor.substring(0, 2) + Math.floor((Math.random() * 10000000)),
      };
      this.colorOptions.push(color);
      this.form.colors.push(color);
    },
    addSize(newSize) {
      const size = {
        name: newSize,
        code: newSize.substring(0, 2) + Math.floor((Math.random() * 10000000)),
      };
      this.sizeOptions.push(size);
      this.form.sizes.push(size);
    },
    addOwner(selectedOwner) {
      this.form.owner = selectedOwner.id;
    },
    change({ canvas }) {
      this.cropped_image = canvas.toDataURL();
    },
    cropImage() {
      this.image_url = this.cropped_image;
      this.form.images.push(this.cropped_image);
      this.$bvModal.hide('cropper-modal');
    },
    findOwner(query) {
      this.ownerIsLoading = true;
      // ajax call for query
      console.log(query);
    },
  },
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

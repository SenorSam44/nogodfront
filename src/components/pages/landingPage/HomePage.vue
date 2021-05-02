<template>
  <div class="home">
    <carousal/>
    <div class="featured-product-section">
      <h4>Featured Products</h4>
      <div class="feature-products">
        <div :key="featuredProduct.id"
             v-for="featuredProduct in featuredProducts"
             class="product-thumb">
          <div class="discount">{{ featuredProduct.discount }}</div>
          <img :src="featuredProduct.img">
          <div class="bottom-center-info">
            <div class="name">{{ featuredProduct.name }}</div>
            <div class="price">{{ featuredProduct.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Carousal from '@/components/props/Carousal.vue';

export default {
  name: 'HomePage',
  components: {
    Carousal,
  },
  data() {
    return {
      featuredProducts: [
        {
          id: 1,
          name: 'product 1',
          img: 'https://placeimg.com/200/200/any?1',
          price: 200,
          discount: '20%',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore earum officia quisquam sequi. Alias amet architecto, assumenda aut consequuntur cumque distinctio dolore, doloremque ea excepturi fuga fugit in ipsam iure minima nam neque non nostrum obcaecati odit officiis omnis quo ratione rem, repellat repellendus tenetur veniam vero vitae voluptas.\n',
        },
        {
          id: 2,
          name: 'product 2',
          img: 'https://placeimg.com/200/200/any?2',
          price: 200,
          discount: '20%',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore earum officia quisquam sequi. Alias amet architecto, assumenda aut consequuntur cumque distinctio dolore, doloremque ea excepturi fuga fugit in ipsam iure minima nam neque non nostrum obcaecati odit officiis omnis quo ratione rem, repellat repellendus tenetur veniam vero vitae voluptas.\n',
        },
        {
          id: 3,
          name: 'product 3',
          img: 'https://placeimg.com/200/200/any?3',
          price: 200,
          discount: '20%',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore earum officia quisquam sequi. Alias amet architecto, assumenda aut consequuntur cumque distinctio dolore, doloremque ea excepturi fuga fugit in ipsam iure minima nam neque non nostrum obcaecati odit officiis omnis quo ratione rem, repellat repellendus tenetur veniam vero vitae voluptas.\n',
        },
        {
          id: 4,
          name: 'product 4',
          img: 'https://placeimg.com/200/200/any?4',
          price: 200,
          discount: '20%',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore earum officia quisquam sequi. Alias amet architecto, assumenda aut consequuntur cumque distinctio dolore, doloremque ea excepturi fuga fugit in ipsam iure minima nam neque non nostrum obcaecati odit officiis omnis quo ratione rem, repellat repellendus tenetur veniam vero vitae voluptas.\n',
        },
      ],
    };
  },
  methods: {},
};
</script>

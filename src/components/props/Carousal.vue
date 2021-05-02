<template>
  <VueSlickCarousel :dots="false"
                    :arrows="true"
                    :focusOnSelect="true"
                    :infinite="true"
                    :slidesToShow="3"
                    :slidesToScroll="1"
                    :touchThreshold="5"
                    :autoplay="true"
                    :autoplaySpeed="3000"
                    :speed="1500">

    <template #prevArrow>
      <b-icon-chevron-left class="prev"></b-icon-chevron-left>
    </template>
    <!--    <template slot="prev">-->
    <!--      <b-icon-chevron-left class="prev"></b-icon-chevron-left>-->
    <!--    </template>-->
    <div :key="carousel_item.name"
         v-for="carousel_item in carousel_items">
      <div class="owl-carousel-inner">
        <div class="carousel-inner-top">
          <img :src="carousel_item.img">
        </div>
        <div class="carousel-inner-bottom">
          <div class="inner-name"> {{ carousel_item.name }}</div>
          <div class="inner-description"> {{ carousel_item.description }}</div>
        </div>
      </div>
    </div>
    <template #nextArrow>
      <b-icon-chevron-right class="next"></b-icon-chevron-right>
    </template>
  </VueSlickCarousel>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css';

export default {
  components: {
    VueSlickCarousel,
  },
  data() {
    return {
      carousel_items: [
        {
          name: 'product 1',
          img: 'https://placeimg.com/200/200/any?1',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore earum officia quisquam sequi. Alias amet architecto, assumenda aut consequuntur cumque distinctio dolore, doloremque ea excepturi fuga fugit in ipsam iure minima nam neque non nostrum obcaecati odit officiis omnis quo ratione rem, repellat repellendus tenetur veniam vero vitae voluptas.\n',
        },
        {
          name: 'product 2',
          img: 'https://placeimg.com/200/200/any?2',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore earum officia quisquam sequi. Alias amet architecto, assumenda aut consequuntur cumque distinctio dolore, doloremque ea excepturi fuga fugit in ipsam iure minima nam neque non nostrum obcaecati odit officiis omnis quo ratione rem, repellat repellendus tenetur veniam vero vitae voluptas.\n',
        },
        {
          name: 'product 3',
          img: 'https://placeimg.com/200/200/any?3',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore earum officia quisquam sequi. Alias amet architecto, assumenda aut consequuntur cumque distinctio dolore, doloremque ea excepturi fuga fugit in ipsam iure minima nam neque non nostrum obcaecati odit officiis omnis quo ratione rem, repellat repellendus tenetur veniam vero vitae voluptas.\n',
        },
        {
          name: 'product 4',
          img: 'https://placeimg.com/200/200/any?4',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore earum officia quisquam sequi. Alias amet architecto, assumenda aut consequuntur cumque distinctio dolore, doloremque ea excepturi fuga fugit in ipsam iure minima nam neque non nostrum obcaecati odit officiis omnis quo ratione rem, repellat repellendus tenetur veniam vero vitae voluptas.\n',
        },
        {
          name: 'product 5',
          img: 'https://placeimg.com/200/200/any?5',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore earum officia quisquam sequi. Alias amet architecto, assumenda aut consequuntur cumque distinctio dolore, doloremque ea excepturi fuga fugit in ipsam iure minima nam neque non nostrum obcaecati odit officiis omnis quo ratione rem, repellat repellendus tenetur veniam vero vitae voluptas.\n',
        },
        {
          name: 'product 6',
          img: 'https://placeimg.com/200/200/any?6',
          description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque dolore earum officia quisquam sequi. Alias amet architecto, assumenda aut consequuntur cumque distinctio dolore, doloremque ea excepturi fuga fugit in ipsam iure minima nam neque non nostrum obcaecati odit officiis omnis quo ratione rem, repellat repellendus tenetur veniam vero vitae voluptas.\n',
        },
      ],
    };
  },
  methods: {
  },
  mounted() {
  },
};
</script>

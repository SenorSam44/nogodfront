<template>
  <div id="admin-product-board">
    <div class="float-md-left left-section">
      <add-product-section/>
    </div>
    <div class="float-md-right">
      Something
    </div>
  </div>
</template>
<script>
import AddProductSection from '@/components/props/AddProductSection.vue';

export default {
  components: { AddProductSection },
};
</script>

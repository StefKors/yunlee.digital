<template>
  <div class="slice full_width_image">
    <prismic-image :field="slice?.primary?.image_content" />
  </div>
</template>

<script>
export default {
  props: ['slice']
}
</script>

<style scoped>
.slice.full_width_image img {
  width: 100%;
  max-height: 80svh;
}
</style>

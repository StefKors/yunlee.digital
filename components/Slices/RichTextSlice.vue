<template>
  <div class="slice rich_text">
    <prismic-rich-text :field="slice?.primary?.rich_content" />
  </div>
</template>

<script>
export default {
  props: ['slice']
}
</script>

<style scoped>
.slice.rich_text {
  text-transform: none;
  margin: 1rem auto;
}
</style>

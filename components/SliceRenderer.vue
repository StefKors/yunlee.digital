<template>
  <div class="container">
    <div class="slices">
      <div class="slide_wrapper" v-for="(slice, i) in slices" :key="slice.id">
        <RichTextSlice v-if="slice.slice_type == 'rich_text'" :slice="slice" />
        <EmbedSlice v-if="slice.slice_type == 'youtube_embed'" :slice="slice" />
        <FullWidthImage
          v-if="slice.slice_type == 'full_width_image'"
          :slice="slice"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EmbedSlice from '../components/Slices/EmbedSlice.vue'
import FullWidthImage from '../components/Slices/FullWidthImage.vue'
import RichTextSlice from '../components/Slices/RichTextSlice.vue'

export default {
  props: ['slices'],
  components: {
    RichTextSlice,
    FullWidthImage,
    EmbedSlice
  }
}
</script>

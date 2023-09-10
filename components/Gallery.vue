<template>
  <div v-if="project.gallery" class="media" v-dragscroll>
    <div v-for="(item, i) in project.gallery" :key="i">
      <a :href="item.image.url" target="_blank">
        <img
          v-if="item.image.url"
          :src="`${item.image.url},w=600&h=600`"
          :alt="item.image.alt"
        />
      </a>
    </div>
  </div>
</template>
<script>
// import { dragscroll } from 'vue-dragscroll'

export default {
  props: {
    project: {},
  },
  // directives: {
  //   dragscroll
  // }
}
</script>
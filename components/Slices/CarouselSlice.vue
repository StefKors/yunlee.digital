<template>
  <div v-if="slice?.items" class="carousel">
    <agile :autoplay="false">
      <template slot="prevButton">
        <div class="button previous">
          <img src="/ChevronLeft.svg" />
        </div>
      </template>
      <div
        v-for="(item, i) in slice?.items"
        :key="i"
        class="image_wrapper slide"
      >
        <a :href="item?.image.url" target="_blank">
          <img
            class="image"
            v-if="item?.image?.url"
            :src="`${item?.image?.url},w=600&h=600`"
            :alt="item?.image?.alt"
          />
        </a>
      </div>

      <template slot="nextButton">
        <div class="button next">
          <img src="/ChevronRight.svg" />
        </div>
      </template>
    </agile>
  </div>
</template>
<script>
import { VueAgile } from 'vue-agile'

export default {
  components: {
    agile: VueAgile
  },
  props: {
    slice: {}
  }
}
</script>
<style lang="scss">
$bg: #151515;
$pink: #f29a9d;
$pink-10: #f29a9d30;
$blue: #15a09b;
$transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 400ms;
.carousel {
  // align-items: center;
  // justify-content: center;
  /* position: relative;
  display: flex;
  align-items: stretch;
  flex-direction: row;
  transition: $transition;
  overflow-x: scroll; */
  padding-top: 1rem;
  max-width: 1200px;

  &::-webkit-scrollbar {
    display: none;
  }

  .image {
    max-height: 650px;
    transition: $transition;
  }

  .button {
    color: $blue;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    transition: ease 200ms;
    user-select: none;
    align-items: center;
    justify-content: left;
    display: flex;
    background-color: #262626;
    margin: 0.5rem;
    border: none;

    &.disabled {
      opacity: 0.5;
      filter: grayscale(1);
    }

    &:hover {
      color: $pink;
    }

    &.active {
      background-color: $pink-10;
      color: $pink;
    }
  }
}

.agile--ssr .agile__slides > * {
  overflow: hidden;
  width: 0;
}

.agile--ssr .agile__slides > *:first-child {
  width: 100%;
}
</style>

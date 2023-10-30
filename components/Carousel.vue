<template>
  <div v-if="project.gallery" class="carousel">
    <div
      class="button previous"
      v-on:click="previous"
      :class="position == 0 ? 'disabled' : ''"
    >
      <img src="/ChevronLeft.svg" />
    </div>
    <div
      v-for="(item, i) in project.gallery"
      :key="i"
      v-if="i == position"
      class="image_wrapper"
    >
      <a :href="item.image.url" target="_blank">
        <img
          class="image"
          v-if="item.image.url"
          :src="`${item.image.url},w=600&h=600`"
          :alt="item.image.alt"
        />
      </a>
    </div>
    <div
      class="button next"
      v-on:click="next"
      :class="position == project.gallery.length - 1 ? 'disabled' : ''"
    >
      <img src="/ChevronRight.svg" />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    project: {}
  },
  data() {
    return {
      position: 0
    }
  },
  methods: {
    next() {
      // don't go past end
      if (this.position >= this.project?.gallery?.length - 1) {
        return
      }

      this.position = this.position + 1
    },
    previous() {
      // don't go past 0
      if (this.position <= 0) {
        return
      }

      this.position = this.position - 1
    }
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
  position: relative;
  display: flex;
  align-items: stretch;
  flex-direction: row;
  transition: $transition;
  overflow-x: scroll;
  cursor: grab;
  padding-top: 1rem;

  &::-webkit-scrollbar {
    display: none;
  }

  .image {
    max-height: 650px;
    transition: $transition;
  }

  div + div {
    padding: 0 0.2rem;
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
  .image_wrapper {
    position: relative;
  }
}
</style>

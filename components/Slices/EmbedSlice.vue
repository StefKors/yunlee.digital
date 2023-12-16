<template>
  <div class="slice youtube_embed">
    <div class="html_content" :data-provider="provider" v-html="html"></div>
  </div>
</template>

<script>
export default {
  props: ['slice'],

  computed: {
    html() {
      return (
        this.slice?.primary?.embed_field?.html ??
        this.slice?.primary?.youtube_embed?.html
      )
    },
    provider() {
      return (
        this.slice?.primary?.embed_field?.provider_name?.toLowerCase() ??
        this.slice?.primary?.youtube_embed?.provider_name?.toLowerCase()
      )
    }
  }
}
</script>

<style>
/* Youtube hack to make it responsive */
.html_content[data-provider^='youtube'] iframe {
  width: 100%;
}
.html_content[data-provider^='youtube'] {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}
.html_content[data-provider^='youtube'] iframe,
.html_content[data-provider^='youtube'] object,
.html_content[data-provider^='youtube'] embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* vimeo hack to make it responsive */
.html_content[data-provider^='vimeo'] iframe {
  width: 100%;
}
.html_content[data-provider^='vimeo'] {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
}
.html_content[data-provider^='vimeo'] iframe,
.html_content[data-provider^='vimeo'] object,
.html_content[data-provider^='vimeo'] embed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

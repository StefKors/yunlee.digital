<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Yun Ingrid Eel, Homepage',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'About our company Nuxt.js '
        }
      ]
    }
  }
}
</script>
<style>
@font-face {
  font-family: 'GT-America';
  src: url('/GTAmerica/GT-America-Standard-Regular.woff2');
  font-weight: normal;
}

@font-face {
  font-family: 'GT-America';
  src: url('/GTAmerica/GT-America-Standard-Bold.woff2');
  font-weight: bold;
}

html {
  font-size: 22px;
  line-height: 1.5;
  scroll-behavior: smooth;
}

body {
  background-color: #151515;
  color: #f29a9d;
  text-transform: uppercase;
  font-family: 'GT-America', sans;
  font-weight: bolder;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>

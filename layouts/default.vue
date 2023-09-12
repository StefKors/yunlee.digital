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
<style lang="scss">
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
$bg: #151515;
$pink: #f29a9d;
$pink-10: #f29a9d30;
$blue: #3d87ca;
$blue: #15a09b;
$transition: cubic-bezier(0.175, 0.885, 0.32, 1.275) 400ms;

hr {
  color: $pink;
  margin-top: 3rem;
}

p:first-of-type {
  margin-top: 0;
}

a {
  color: $blue;
  text-decoration: none;
}

article {
  padding: 2rem;

  .introduction {
    max-width: 1200px;
    font-size: 2rem;

    @media screen and (max-width: 480px) {
      font-size: 1.8rem;
    }
  }

  .filters {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
    padding: 1rem 0;
    color: $blue;

    .filter {
      background-color: #262626;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      transition: ease 200ms;
      user-select: none; 

      &:hover {
        color: $pink;
      }

      &.active {
        background-color: $pink-10;
        color: $pink;
      }
    }
  }

  .index {
    padding: 2rem 0;
    margin-left: -30%;
    overflow: hidden;

    white-space: nowrap;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    transition: opacity 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);

    a {
      color: inherit;
    }

    .group {
      width: auto;
      font-size: 2rem;

      @media screen and (max-width: 480px) {
        font-size: 1.8rem;
      }

      & + .group {
        margin-left: 4rem;
      }

      .item {
        cursor: pointer;
        &:hover {
          .date {
            transform: translate3d(0px, 0, 0);
            transition: 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
            opacity: 0.5;
          }
        }

        .date {
          transform: translate3d(50px, 0, 0);
          transition: 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
          opacity: 0;
          color: $blue;
          display: inline-block;
        }
      }
    }
  }

  .projects {
    padding: 0rem;

    .project {
      .title {
        font-size: 4rem;
        font-weight: bold;
        line-height: 4rem;
        padding: 1rem 0;
        color: $blue;
        max-width: 80vw;

        @media screen and (max-width: 480px) {
          font-size: 2rem;
          line-height: 2rem;
        }

        .date {
          display: block;
          font-size: 2rem;

          @media screen and (max-width: 480px) {
            font-size: 1.5rem;
          }
        }
      }

      .type {
        color: $blue;
      }

      .item {
        text-transform: none;
        padding-bottom: 3rem;
        font-weight: normal;

        position: relative;

        display: flex;
        flex-direction: row;
        gap: 1rem;

        .description {
          max-width: 450px;
        }

        .single-media {
          max-width: 150%;
          position: relative;
          display: flex;
          flex-direction: row;
          transition: $transition;
          overflow-x: scroll;
          padding-top: 1rem;

          &::-webkit-scrollbar {
            display: none;
          }

          img {
            opacity: 0.5;
            max-height: 450px;
            transition: $transition;
            border-radius: 8px;

            &:hover {
              opacity: 1;
              transition: $transition;
            }
          }

          div + div {
            padding: 0 0.2rem;
          }
        }

        .media {
          max-width: 150%;
          position: relative;
          display: flex;
          flex-direction: row;
          transition: $transition;
          overflow-x: scroll;
          cursor: grab;
          padding-top: 1rem;

          &::-webkit-scrollbar {
            display: none;
          }

          img {
            opacity: 0.5;
            max-height: 450px;
            transition: $transition;

            &:hover {
              opacity: 1;
              transition: $transition;
            }
          }

          div + div {
            padding: 0 0.2rem;
          }
        }
      }
    }
  }

  .cta {
    color: $pink;
    padding: 2rem;
    border-radius: 4px;
    text-align: center;
    max-width: 45rem;
    margin: 0 auto;

    h1 {
      font-weight: bold;
    }

    p {
      max-width: 35rem;
      margin: 0 auto;
    }

    button {
      background: $pink;
      color: $bg;
      border-radius: 4px;
      padding: 0.5rem 1rem;
      border: none;
      margin: 2rem 0 0 0;
    }
  }
}

.show {
  opacity: 1 !important;
  transition: $transition;

  img {
    right: 0px !important;
  }
}
</style>

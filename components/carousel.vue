<template>
  <v-carousel
    cycle
    height="300"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(item,i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>
<script>
  export default {
    data () {
      return {
          items: [
          {
            src: 'images/ecole.jpg',
          },
          {
            src: 'images/dg.jpeg',
          },
          {
            src: 'images/dde.jpeg',
          },
         
          {
            src: 'images/ddef.jpeg',
          },
         
        ],

      }
    },
  }
</script>

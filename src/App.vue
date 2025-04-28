<template>
    <div id="app">
      <v-app ref="app">
        <v-main>
          <v-container>
            <router-view/>
          </v-container>
        </v-main>
      </v-app>
  </div>
</template>

<script>

  export default {

    name: 'App',

    data: () => ({

    }),

    async mounted () {

      const bgimg = await import('./assets/default-wallpaper.png');

      let bgimgpath = bgimg.default

      console.log('porra')
      console.log('bgimg', bgimg)
      console.log('bgimgpath', bgimgpath)

      console.log(this.$refs.app.$el)

      // this.$refs.app.$el.style.backgroundColor = 'black'
      this.$refs.app.$el.style.backgroundImage = `url(${bgimgpath})`

    }
  }
  
</script>

<style>
 * {
  user-select: none;
 }
  div.v-application {
    overflow: hidden;
      background-position: center; 
      background-repeat: no-repeat;
      background-size: cover;
  }
</style>

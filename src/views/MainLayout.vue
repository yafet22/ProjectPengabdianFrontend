<template>
  <div>
    <v-app-bar
      color="#3A4D8C"
      dark
      fixed
      class="elevation-0"
    >
      <div class="header" >
        <v-spacer></v-spacer>
        <v-toolbar-title class="toolbar-title">DASHBOARD</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- <img :src="require('@/assets/logo.svg')" class="photo-profile"/> -->
      </div>
    </v-app-bar>
    <div class="main-body">
        <v-container class="fill-height" fluid >
               <router-view></router-view>
        </v-container>
    </div>
    <div class="nav-bottom">
      <v-bottom-navigation
        :value="activeBtn"
        grow
        color="white"
        background-color="#3A4D8C"
        class="elevation-0"
        dark
        fixed
        style="max-width: 480px;left:unset"
      >
        <v-btn active-class="v-btn--active" @click="$router.push({ name : 'main' })">
          <span>Home</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn active-class="v-btn--active" @click="$router.push({ name : 'public' })">
          <span>Publik</span>
          <v-icon>mdi-hospital-building</v-icon>
        </v-btn>

        <v-btn @click="$router.push({ name : 'maps' })">
          <span>Maps</span>
          <v-icon>mdi-google-maps</v-icon>
        </v-btn>
        

        <v-btn @click="$router.push({ name : 'profile' })">
          <span>Profile</span>
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
       isMain : true, 
    }
  },
  methods:{
  
  }
}
</script>

<style>
.photo-profile{
    height:32px;
    width:32px;
    border-radius: 50%;
    z-index: 100;
}
</style>
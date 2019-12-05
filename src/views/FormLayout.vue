<template>
  <div>
    <v-app-bar
      color="#3A4D8C"
      dark
      fixed
      class="elevation-0"
    >
      <div class="header" >
        <v-btn style="width:24px;height:24px" @click="$router.go(-1)" text icon>
        <v-icon color="white" >mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title class="toolbar-title">DATA KEPEMILIKAN</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn style="width:24px;height:24px" @click="$router.push({ name : 'main'})" text icon>
        <v-icon color="white">mdi-home</v-icon>
        </v-btn>
        <!-- <img :src="require('@/assets/logo.svg')" class="photo-profile"/> -->
      </div>
    </v-app-bar>
    <div class="main-body">
        <v-container class="fill-height" fluid >
               <router-view></router-view>
        </v-container>
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
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
        <v-btn active-class="v-btn--active">
          <span>Home</span>
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn>
          <span>Maps</span>
          <v-icon>mdi-google-maps</v-icon>
        </v-btn>

        <v-btn>
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
       form : {
           username : null,
           password : null,
           client_id : 2,
           client_secret : "zJtx0VQwnRgplW9Pu6OzyBo5txVmEI8c23knUY1l",
           grant_type : "password"
       },
       isMain : true, 
    }
  },
  methods:{
      login(){
        var uri = this.$apiLogin + '/token'
            this.$http.post(uri,this.form).then(response =>{
                if(response.data.access_token){
                    localStorage.setItem('token',response.data.access_token)
                    this.$router.push({ name : 'main'})
                }
                else{
                    alert("Terjadi Kesalahan")
                }
            }
        )
      },
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
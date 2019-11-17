<template>
  <div>
    <v-app-bar
      color="#3A4D8C"
      dark
      fixed
      class="elevation-0"
    >
      <div class="header">
        <v-spacer></v-spacer>
            <v-toolbar-title class="toolbar-title">LOGIN PENGGUNA</v-toolbar-title>
        <v-spacer></v-spacer>
      </div>
    </v-app-bar>
    <div class="main-body">
        <v-container class="fill-height" fluid >
           <v-row align="center" justify="center" style="padding:20px;margin-top:60px">
              <img :src="require('@/assets/house1.svg')"/>
              <div class="form">
                <v-text-field
                  v-model="form.username"
                  height=20
                  outlined
                  label="Email"
                  prepend-inner-icon="mdi-email"
                  color="indigo"
                ></v-text-field>
                <v-text-field
                  v-model="form.password"
                  height=20
                  outlined
                  label="Password"
                  type="password"
                  prepend-inner-icon="mdi-lock"
                  color="indigo"
                ></v-text-field>
                <v-btn @click="login()" dark block color="#FFB802" height=50 class="elevation-0" style="margin-top:30px">
                    LOGIN
                </v-btn>
                <div class="text-center" id="message">
                    <span>Belum Mempunyai Akun? <a>Sign Up</a></span>
                </div>
              </div>
           </v-row> 
        </v-container>
    </div>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="true"
      :timeout="3000"
    >
      {{ text }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import store from '../store'
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
       snackbar: false, 
       color: null,
       text: '', 
    }
  },
  methods:{
      login(){
        var uri = this.$apiLogin + '/token'
            this.$http.post(uri,this.form).then(response =>{
                if(response.data.access_token){
                    store.commit('loginUser')
                    this.snackbar = true; //mengaktifkan snackbar
                    this.color = 'green'; //memberi warna snackbar
                    this.text = 'Berhasil Login'; //memasukkan pesan ke snackbar
                    localStorage.setItem('token',response.data.access_token)
                    this.$router.push({ name : 'main'})
                }
                else{
                    this.snackbar = true; //mengaktifkan snackbar
                    this.color = 'red'; //memberi warna snackbar
                    this.text = 'Akun tidak terdaftar'; //memasukkan pesan ke snackbar
                }
           }).catch(error =>{
              this.snackbar = true;
              this.text = error.response.data.message;
              this.color = 'red';
              this.load = false;
          })
      },
  }
}
</script>

<style>

</style>
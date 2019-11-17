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
            <v-toolbar-title class="toolbar-title">PENDAFTARAN PENGGUNA</v-toolbar-title>
        <v-spacer></v-spacer>
      </div>
    </v-app-bar>
    <div class="main-body">
        <v-container class="fill-height" fluid >
           <v-row align="center" justify="center" style="padding:20px;margin-top:28px">
              <img :src="require('@/assets/house2.svg')"/>
              <div class="form">
                <v-text-field
                  v-model="form.name"
                  height=20
                  outlined
                  label="Nama"
                  prepend-inner-icon="mdi-account-circle"
                  color="indigo"
                ></v-text-field>
                <v-text-field
                  v-model="form.email"
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
                <v-btn @click="register()" dark block color="#FFB802" height=50 class="elevation-0" style="margin-top:30px">
                    SIGN UP
                </v-btn>
                <div class="text-center" id="message">
                    <span>Sudah Punya Akun? <a>Login</a></span>
                </div>
              </div>
           </v-row> 
        </v-container>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
       form : {
           name : null,
           email : null,
           password : null,
       }, 
    }
  },
   methods:{
      register(){
        var uri = this.$apiUrl + '/user'
            this.$http.post(uri,this.form).then(response =>{
                if(response.status===201){
                    this.$router.push({ name : 'login'})
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

</style>
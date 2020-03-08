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
                  label="Nama Kelompok"
                  prepend-inner-icon="mdi-account-circle"
                  color="indigo"
                  required 
                ></v-text-field>
                <v-text-field
                  v-model="form.unit"
                  height=20
                  outlined
                  label="Nama Unit"
                  prepend-inner-icon="mdi-link-variant"
                  color="indigo"
                  required 
                ></v-text-field>
                <v-text-field
                  v-model="form.village"
                  height=20
                  outlined
                  label="Nama Padukuhan"
                  prepend-inner-icon="mdi-home-flood"
                  color="indigo"
                  required 
                ></v-text-field>
                <v-text-field
                  v-model="form.dpl"
                  height=20
                  outlined
                  label="Nama DPL"
                  prepend-inner-icon="mdi-face"
                  color="indigo"
                  required 
                ></v-text-field>
                <v-text-field
                  v-model="form.adpl"
                  height=20
                  outlined
                  label="Nama ADPL"
                  prepend-inner-icon="mdi-face-agent"
                  color="indigo"
                  required 
                ></v-text-field>
                <v-text-field
                  v-model="form.email"
                  height=20
                  outlined
                  label="Email"
                  prepend-inner-icon="mdi-email"
                  color="indigo"
                  required 
                ></v-text-field>
                <v-text-field
                  v-model="form.password"
                  height=20
                  outlined
                  label="Password"
                  type="password"
                  prepend-inner-icon="mdi-lock"
                  color="indigo"
                  required 
                ></v-text-field>
                <v-btn @click="register()" dark block color="#FFB802" height=50 class="elevation-0" style="margin-top:30px">
                    SIGN UP
                </v-btn>
                <div class="text-center" id="message" style="margin-bottom:60px">
                    <span>Sudah Punya Akun?<router-link :to="{name: 'login'}" style="text-decoration: none">Login</router-link></span>
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
export default {
  data () {
    return {
       form : {
           name : null,
           email : null,
           unit : null,
           village : null,
           adpl : null,
           dpl : null,
           password : null,
       }, 
       snackbar: false, 
       color: null,
       text: '', 
    }
  },
   methods:{
      register(){
        var uri = this.$apiUrl + '/user'
            this.$http.post(uri,this.form).then(response =>{
                if(response.status===201){
                    this.snackbar = true; //mengaktifkan snackbar
                    this.color = 'green'; //memberi warna snackbar
                    this.text = 'Berhasil Mendaftar'; //memasukkan pesan ke snackbar
                    this.$router.push({ name : 'login'})
                }
                else{
                    alert("Terjadi Kesalahan")
                }
            }).catch(error =>{
              this.snackbar = true;
              this.text = error.response.data.errors;
              this.color = 'red';
              this.load = false;
          })
      },
  }
}
</script>

<style>

</style>
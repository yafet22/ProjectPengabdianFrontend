<template>
  <div style="width: 100%;">
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
        <v-toolbar-title class="toolbar-title">PROFILE</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn style="width:24px;height:24px" @click="$router.push({ name : 'main'})" text icon>
        <v-icon color="white">mdi-home</v-icon>
        </v-btn>
        <!-- <img :src="require('@/assets/logo.svg')" class="photo-profile"/> -->
      </div>
    </v-app-bar>
      <div style="width: 100%;margin-bottom:120px">
            <v-card
            class="mx-auto elevation-0"
            color="#FFFFFF"
            light
            style="border: 1px solid rgba(151, 151, 151, 0.25);box-sizing: border-box;border-radius: 4px;"
            >
            <div class="form-header" style="border-top-left-radius: 4px;border-top-right-radius: 4px;">
                <div class="form-header-title">
                    User Profile
                </div>
            </div>
            <div class="card-body">
            <v-card-text style="padding:24px">
                <v-text-field
                  v-model="form.name"
                  height=20
                  outlined
                  label="Nama Kelompok"
                  prepend-inner-icon="mdi-account-circle"
                  color="indigo"
                ></v-text-field>
                <v-text-field
                  v-model="form.unit"
                  height=20
                  outlined
                  label="Nama Unit"
                  prepend-inner-icon="mdi-link-variant"
                  color="indigo"
                ></v-text-field>
                <v-text-field
                  v-model="form.village"
                  height=20
                  outlined
                  label="Nama Padukuhan"
                  prepend-inner-icon="mdi-home-flood"
                  color="indigo"
                ></v-text-field>
                <v-text-field
                  v-model="form.dpl"
                  height=20
                  outlined
                  label="Nama DPL"
                  prepend-inner-icon="mdi-face"
                  color="indigo"
                ></v-text-field>
                <v-text-field
                  v-model="form.adpl"
                  height=20
                  outlined
                  label="Nama ADPL"
                  prepend-inner-icon="mdi-face-agent"
                  color="indigo"
                ></v-text-field>
                <v-text-field
                  v-model="form.password"
                  height=20
                  outlined
                  label="Password Lama"
                  type="password"
                  prepend-inner-icon="mdi-lock"
                  color="indigo"
                ></v-text-field>
                <v-text-field
                  v-model="form.newpassword"
                  height=20
                  outlined
                  label="Password Baru"
                  type="password"
                  prepend-inner-icon="mdi-lock"
                  color="indigo"
                ></v-text-field>
                <div style="display: flex; justify-content: flex-end">
                <v-btn tile small color="#FFFFFF" style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 120px;height: 39px;margin-right:15px" class="elevation-0">
                    Cancel
                </v-btn>
                <v-btn tile dark small color="#FFB802" style="border-radius: 2px;width: 120px;height: 39px;" @click="update()"   class="elevation-0">
                    Simpan
                </v-btn>
                </div>
            </v-card-text>
            </div>
            </v-card>
            <v-btn block tile small color="red" style="height:40px;color:#FFFFFF;margin-top:16px;" @click="logout()" class="elevation-0">
            Log Out
            </v-btn>
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
import store from '../../store'
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
           newpassword : null,
       }, 
        snackbar: false, 
        color: null,
        text: '',
        inset: false, 
    }
  },
  methods:{
      getData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        var uri = this.$apiUrl + '/my'
            this.$http.get(uri,config).then(response =>{
                this.form=response.data.data;
            }
        )
      },
      update(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        var uri = this.$apiUrl + '/update-profile'
            this.$http.post(uri,this.form,config).then(response =>{
                this.snackbar = true; //mengaktifkan snackbar
                this.color = 'green'; //memberi warna snackbar
                this.text = 'Berhasil'; //memasukkan pesan ke snackbar
            }).catch(error =>{
                this.snackbar = true;
                this.text = error.response.data;
                this.color = 'red';
                this.load = false;
            })
      },
      logout(){
          localStorage.removeItem('token')
          store.commit('logoutUser')
          this.$router.push({ name: 'login' })
      }
  },
  mounted(){
      this.getData();
  },
}
</script>

<style lang="scss">
.v-icon {
    color: #DADADA !important;
}
.form-header{
  background-color:#DADADA;
  height: 45px;
  .form-header-title{
    -moz-box-align: center;
    align-items: center;
    -moz-box-pack: justify;
    margin: 0px auto;
    display: flex;
    justify-content: center;

    font-family: Roboto; //harusnya poppins
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 47px;

    /* or 392% */
    display: flex;
    align-items: center;
    text-align: center;

    color: #1D1D1D;
  }
}
</style>


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
        <v-toolbar-title class="toolbar-title">BANGUNAN PUBLIK</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn style="width:24px;height:24px" @click="$router.push({ name : 'main'})" text icon>
        <v-icon color="white">mdi-home</v-icon>
        </v-btn>
        <!-- <img :src="require('@/assets/logo.svg')" class="photo-profile"/> -->
      </div>
    </v-app-bar>
      <div class="item-top">
          <span class="item-title">Data Bangunan</span>
          <v-btn class="item-add" text icon @click="$router.push({ name : 'publicForm'})">
          <v-icon color="orange" >mdi-plus-circle</v-icon>
          </v-btn>
      </div>
      <div v-if="publics.length<1" class="item-list isEmpty">
          <span>Tidak Terdapat Data</span>
      </div>
      <div v-else class="item-list">
          <div v-for="(data) in publics" :key="data.id">
          <v-list-item >
              <v-list-item-icon>
                  <v-icon large color="indigo">mdi-hospital-building</v-icon>
              </v-list-item-icon>

              <v-list-item-content @click="$router.push({ name : 'publicDetail',params:{id: data.id}})">
                  <v-list-item-title>{{ data.identity }}</v-list-item-title>
                  <v-list-item-subtitle>{{ data.address }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                  <v-menu bottom left>
                    <template v-slot:activator="{ on }">
                      <v-btn class="item-add" text icon  v-on="on">
                      <v-icon color="#B0BEC5">mdi-dots-vertical</v-icon>
                      </v-btn>  
                    </template>

                    <v-list>
                      <v-list-item>
                        <v-list-item-title @click="$router.push({ name : 'publicFormEdit',params:{public: data.id}})" >Edit</v-list-item-title>
                      </v-list-item>
                      <v-list-item >
                        <v-list-item-title @click="deletePublic(data.id)" >Delete</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
              </v-list-item-action>
          </v-list-item>     
          </div>
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
        owner:{},
        ownerId: null,
        publics:[],
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
        var uri = this.$apiUrl + '/my/publicbuilding';
            this.$http.get(uri,config).then(response =>{
                this.publics=response.data.data;
                localStorage.setItem('publics',JSON.stringify(this.publics));
            }
        )
      },
      deletePublic(id)
      {
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        var uri = this.$apiUrl + '/publicbuilding/' + id;
            this.$http.delete(uri,config).then(response =>{
              this.snackbar = true; //mengaktifkan snackbar
              this.color = 'green'; //memberi warna snackbar
              this.text = 'Berhasil'; //memasukkan pesan ke snackbar
              this.getData();
            }).catch(error =>{
              this.snackbar = true;
              this.text = error.response.data.message;
              this.color = 'red';
              this.load = false;
          })
      }
  },
  mounted(){
    this.publics=JSON.parse(localStorage.getItem('publics') || "[]");  
    this.getData();
  },
}
</script>

<style lang="scss">

</style>


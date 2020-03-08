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
        <v-toolbar-title class="toolbar-title">INPUT DATA</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn style="width:24px;height:24px" @click="$router.push({ name : 'main'})" text icon>
        <v-icon color="white">mdi-home</v-icon>
        </v-btn>
        <!-- <img :src="require('@/assets/logo.svg')" class="photo-profile"/> -->
      </div>
    </v-app-bar>
    <div class="main-body">
        <v-container class="fill-height" fluid>
            <div class="item-top">
                <span class="item-title">Data Rumah</span>
                <v-btn class="item-add" text icon @click="$router.push({ name : 'houseForm',params:{id: ownerId}})">
                <v-icon color="orange" >mdi-plus-circle</v-icon>
                </v-btn>
            </div>
            <div v-if="houses.length<1" class="item-list isEmpty">
                <span>Tidak Terdapat Data</span>
            </div>
            <div v-else class="item-list">
                <div v-for="(house) in houses" :key="house.id">
                <v-list-item >
                    <v-list-item-icon>
                        <v-icon large color="indigo">mdi-home</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content @click="$router.push({ name : 'houseDetail',params:{id: house.id}})">
                        <v-list-item-title>{{ house.identity }}</v-list-item-title>
                        <v-list-item-subtitle>{{ house.address }}</v-list-item-subtitle>
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
                              <v-list-item-title @click="$router.push({ name : 'houseFormEdit',params:{id: ownerId,house: house.id}})">Edit</v-list-item-title>
                            </v-list-item>
                            <v-list-item >
                              <v-list-item-title @click="deleteHouse(house.id)">Delete</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                    </v-list-item-action>
                </v-list-item>  
                 
                </div>
            </div>
            <div class="item-top">
                <span class="item-title">Data Lahan</span>
                <v-btn class="item-add" text icon @click="$router.push({ name : 'landForm',params:{id: ownerId}})">
                <v-icon color="orange" >mdi-plus-circle</v-icon>
                </v-btn>
            </div>
            <div v-if="landList.length<1" class="item-list isEmpty" style="">
                <span>Tidak Terdapat Data</span>
            </div>
            <div v-else class="item-list" style="">
                <div v-for="(land) in landList" :key="land.id">
                <v-list-item >
                    <v-list-item-icon>
                        <v-icon large color="indigo">mdi-pier</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content @click="$router.push({ name : 'landDetail',params:{id: land.id}})">
                        <v-list-item-title>{{ land.identity }}</v-list-item-title>
                        <v-list-item-subtitle>{{ land.type }}</v-list-item-subtitle>
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
                              <v-list-item-title @click="$router.push({ name : 'landFormEdit',params:{id: ownerId,land: land.id}})">Edit</v-list-item-title>
                            </v-list-item>
                            <v-list-item >
                              <v-list-item-title @click="deleteLand(land.id)">Delete</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                    </v-list-item-action>
                </v-list-item>  
                 
                </div>
            </div>
            <div class="item-top">
                <span class="item-title">Data Ternak</span>
                <v-btn class="item-add" text icon @click="$router.push({ name : 'livestockForm',params:{id: ownerId}})">
                <v-icon color="orange" >mdi-plus-circle</v-icon>
                </v-btn>
            </div>
            <div v-if="livestockList.length<1" class="item-list isEmpty">
                <span>Tidak Terdapat Data</span>
            </div>
            <div v-else class="item-list" style="margin-bottom:64px">
                <div v-for="(livestock) in livestockList" :key="livestock.id">
                <v-list-item >
                    <v-list-item-icon>
                        <v-icon large :color="livestock.gender=='Betina' ? 'pink' : 'indigo'">mdi-cow</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content @click="$router.push({ name : 'landDetail',params:{id: livestock.id}})">
                        <v-list-item-title>{{ livestock.identity }}</v-list-item-title>
                        <v-list-item-subtitle>{{ livestock.type}}</v-list-item-subtitle>
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
                              <v-list-item-title @click="$router.push({ name : 'livestockFormEdit',params:{id: ownerId,land: livestock.id}})">Edit</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="deleteLivestock(livestock.id)">
                              <v-list-item-title>Delete</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                    </v-list-item-action>
                </v-list-item>   
                </div>
            </div>
            <!-- <div class="item-top">
                <span class="item-title">Data Ternak</span>
                <v-btn class="item-add" text icon @click="$router.push({ name : 'livestockForm',params:{id: ownerId}})">
                <v-icon color="orange" >mdi-plus-circle</v-icon>
                </v-btn>
            </div>
            <div v-if="livestocks.length<1" class="item-list isEmpty">
                <span>Tidak Terdapat Data</span>
            </div>
            <div v-else class="item-list" style="margin-bottom:64px">
                <div v-for="(livestock) in livestocks" :key="livestock.id">
                <v-list-item >
                    <v-list-item-icon>
                        <v-icon large :color="livestock.gender=='Betina' ? 'pink' : 'indigo'">mdi-cow</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ livestock.identity }}</v-list-item-title>
                        <v-list-item-subtitle>{{ livestock.species + ' | ' + livestock.gender }}</v-list-item-subtitle>
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
                              <v-list-item-title @click="$router.push({ name : 'livestockFormEdit',params:{id: ownerId,livestock: livestock.id}})">Edit</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="deleteLivestock(livestock.id)">
                              <v-list-item-title>Delete</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                    </v-list-item-action>
                </v-list-item>   
                </div>
            </div> -->
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
        owner:{},
        ownerId: null,
        lands:[],
        houses:[],
        snackbar: false, 
        color: null,
        text: '',
        inset: false, 
    }
  },
  computed:{
    livestockList(){
      return this.lands.filter((row, index) => {
        return row.type.toLowerCase().includes("Peternakan".toLowerCase())     
      })
    },
    landList(){
      return this.lands.filter((row, index) => {
        return !row.type.toLowerCase().includes("Peternakan".toLowerCase())     
      })
    }
  },
  methods:{
      getData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        var uri = this.$apiUrl + '/inputs/'+this.$route.params.id;
            this.$http.get(uri,config).then(response =>{
                this.ownerId=response.data.data.id;;
                this.lands=response.data.data.land.data;
                this.houses=response.data.data.house.data;
            }
        )
      },
      deleteLivestock(id)
      {
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        var uri = this.$apiUrl + '/livestock/' + id;
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
      },
      deleteLand(id)
      {
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        var uri = this.$apiUrl + '/land/' + id;
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
      },
      deleteHouse(id)
      {
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        var uri = this.$apiUrl + '/house/' + id;
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
    this.getData();
  },
}
</script>

<style lang="scss">

</style>


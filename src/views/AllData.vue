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
    <div class="main-body" style="margin-bottom:104px">
        <v-toolbar
        dense
        style="width:100%;margin-top:12px;margin-bottom:12px"
        class="elevation-0"
        color="#FCFCFC"
        >
            <v-text-field
                v-model="search"
                style="width:100%"
                hide-details
                placeholder="Cari Data"
                append-icon="mdi-magnify"
                single-line
            ></v-text-field>
        </v-toolbar>
        <div v-if="owners.length<1" style="text-align: center;color: #B0BEC5;margin-top: 36px;">
            <span>Belum Terdapat Data</span>
        </div>
        <div v-for="(owner) in  ownerList" :key="owner.id">
          <v-list-item >
            <v-list-item-icon>
                <v-icon large color="indigo">mdi-account-box</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ owner.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ owner.created_at.slice(0,10)}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action style="display:inline">
             <v-btn tile small color="#F6B931" style="width:60px;height:20px;font-size:7px" @click="$router.push({ name : 'ownerDetail',params:{id: owner.id}})" dark class="elevation-0">DETAIL</v-btn>
             <v-menu bottom left>
                <template v-slot:activator="{ on }">
                <v-btn class="item-add" text icon  v-on="on">
                <v-icon color="#B0BEC5">mdi-dots-vertical</v-icon>
                </v-btn>  
                </template>
                <v-list>
                <v-list-item>
                    <v-list-item-title @click="$router.push({ name : 'ownerFormEdit',params:{id: owner.id}})" >Edit</v-list-item-title>
                </v-list-item>
                <v-list-item >
                    <v-list-item-title @click="deleteOwner(owner.id)" >Delete</v-list-item-title>
                </v-list-item>
                </v-list>
            </v-menu>
            </v-list-item-action>
          </v-list-item>
            <v-divider :inset="inset"></v-divider>
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
        owners:[],
        snackbar: false, 
        color: null,
        text: '',
        inset: false, 
        search: ''
    }
  },
  computed:{
    ownerList(){
      return this.owners.filter((row, index) => {
        if(this.search != '') return row.name.toLowerCase().includes(this.search.toLowerCase())     
        return true
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
        var uri = this.$apiUrl + '/my'
            this.$http.get(uri,config).then(response =>{
                this.username=response.data.data.name;
                this.owners=response.data.data.owner.data;
                localStorage.setItem('alldata',JSON.stringify(this.owners));
            }
        )
      }, 
  },
  mounted(){
      this.owners=JSON.parse(localStorage.getItem('alldata') || "[]");  
      this.getData()
  },
}
</script>

<style lang="scss">

</style>


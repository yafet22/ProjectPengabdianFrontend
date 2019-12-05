<template>
  <div style="width: 100%">
    <v-card
    class="mx-auto elevation-0"
    color="#3F5498"
    dark
    style="box-shadow: 0px 2px 38px rgba(0, 0, 0, 0.153334);border-radius: 6px;"
    >
    <div class="card-header">
    <v-card-text style="padding-right:24px;padding-left:24px">
    <v-row>
        <v-col col="6">
            <div id="header-title">
            Jumlah Terdaftar     
            </div>
            <div id="header-subtitle">
            {{ total_datas }}   
            </div>    
        </v-col>
        <v-col col="6">
            <v-btn tile small color="#F6B931" class="elevation-0" style="float: right;">
            Aktif
            </v-btn>
        </v-col>
    </v-row>
    </v-card-text>
    </div>
    <div class="card-body">
    <v-card-text style="padding:24px">
        <v-row style="padding:2px">
            <v-col col="6">
                <div id="body-title">
                Nama Pengguna     
                </div>
                <div id="body-subtitle">
                Gerald of Rivia     
                </div>    
            </v-col>
            <v-col col="6">
                <v-btn @click="logout()" tile block small color="#90C30F" style="width:92px;height:24px;float:bottom;position: relative;bottom:-20px;" class="elevation-0">
                Log Out
                </v-btn>
            </v-col>
        </v-row>
            <v-divider :inset="inset"  class="my-1"></v-divider>
            <v-row style="padding:2px">
            <v-col col="4">
                <div class="total-title">
                    Total Rumah
                </div>
                <div class="total-amount">
                    44
                </div>      
            </v-col>
            <v-col col="4">
                <div class="total-title">
                    Total Lahan
                </div>
                <div class="total-amount">
                    {{ total_lands }}
                </div>  
            </v-col>
            <v-col col="4">
                <div class="total-title">
                    Total Ternak
                </div> 
                <div class="total-amount">
                    {{ total_livestocks }}
                </div> 
            </v-col>
        </v-row>
        <v-btn tile block small color="#FFFFFF" style="height:40px;color:#01305E;margin-top:32px" @click="$router.push({ name : 'ownerForm'})" class="elevation-0">
            Input Data Baru
        </v-btn>
    </v-card-text>
    </div>
    </v-card>
    <div style="margin-top:20px;margin-bottom:104px">
        <h3>Data Terbaru</h3>
        <div v-if="owners.length<1" style="text-align: center;color: #B0BEC5;margin-top: 36px">
            <span>Belum Terdapat Data</span>
        </div>
        <div v-for="(owner) in owners" :key="owner.id">
          <v-list-item >
            <v-list-item-icon>
                <v-icon large color="indigo">mdi-account-box</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
                <v-list-item-title>{{ owner.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ owner.created_at.slice(0,10)}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
            <v-btn tile small color="#F6B931" style="width:60px;height:20px;font-size:7px" @click="$router.push({ name : 'ownerDetail',params:{id: owner.id}})" dark class="elevation-0">DETAIL</v-btn>
            </v-list-item-action>
          </v-list-item>
            <v-divider :inset="inset"></v-divider>
        </div>       
    </div>
  </div>
</template>

<script>
import store from '../../store'
export default {
  data () {
    return {
       owners:[],
       total_datas:0,
       total_livestocks:0,
       total_lands:0,
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
        var uri = this.$apiUrl + '/my/inputs'
            this.$http.get(uri,config).then(response =>{
                this.owners=response.data.data;
                localStorage.setItem('data',JSON.stringify(this.owners));
            }
        )
      },
      countData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        var uri = this.$apiUrl + '/my/datas'
            this.$http.get(uri,config).then(response =>{
                this.total_datas=response.data.total_datas;
                this.total_lands=response.data.total_lands;
                this.total_livestocks=response.data.total_livestocks;
                localStorage.setItem('total_datas',this.total_datas)
                localStorage.setItem('total_lands',this.total_lands)
                localStorage.setItem('total_livestocks',this.total_livestocks)
                // this.owners=response.data.data;
                // localStorage.setItem('data',JSON.stringify(this.owners));
            }
        )
      },
      logout(){
          localStorage.removeItem('token')
          store.commit('logoutUser')
          this.$router.push({ name: 'login' })
      }
  },
  mounted(){
    this.total_datas = localStorage.getItem('total_datas');
    this.total_lands = localStorage.getItem('total_lands');
    this.total_livestocks = localStorage.getItem('total_livestocks');
    this.owners=JSON.parse(localStorage.getItem('data') || "[]");  
    this.countData();
    this.getData();
  },
}
</script>

<style lang="scss">
.card-header{
  background-color:rgba(0, 0, 0, .120);
    #header-title{
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 14px;
        color: #FFFFFF;
        mix-blend-mode: normal;
        opacity: 0.7;
    }
    #header-subtitle{
        margin-top: 8px;
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 23px;

        color: #FFFFFF;
    }
}
.card-body{
    #body-title{
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 11px;

        /* identical to box height */

        color: #FFFFFF;

        mix-blend-mode: normal;
        opacity: 0.7;
    }
    #body-subtitle{
        margin-top: 12px;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 17px;

        /* identical to box height */

        color: #FFFFFF;
    }
    .total-title{
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 12px;
        line-height: 11px;

        /* identical to box height */

        color: #FFFFFF;

        mix-blend-mode: normal;
        opacity: 0.7;
    }
    .total-amount{
        margin-top: 10px;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 13px;
        /* identical to box height */

        color: #FFFFFF;
    }
}
</style>


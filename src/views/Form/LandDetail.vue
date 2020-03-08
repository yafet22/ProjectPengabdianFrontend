<template>
  <div style="width: 100%">
      <h2 style="text-align:center">Data Lahan</h2>
      <gmap-map :center="center" :zoom="18" :options="optionmaps " style="width: 100%;margin-top:16px;height:200px" @click="markerPlace($event)">
        <gmap-polygon :options="options" :paths="paths" :draggable="false" :editable="false">
        </gmap-polygon>
      </gmap-map>
      <div class="detail-box">
          <div class="detail-text">
            <span>
                Identitas : 
            </span>
            {{ data.identity }}
          </div>
          <div class="detail-text">
            <span>
                Type : 
            </span>
            {{ data.type }}
          </div>
          <div class="detail-text">
            <span>
                Luas Lahan : 
            </span>
            {{ data.size }}
          </div>
          <div class="detail-text">
            <span>
                Deskripsi : 
            </span>
            {{ data.description }}
          </div>
      </div> 
       <div v-if="livestocks.length>0" class="item-top" >
            <span class="item-title" style="color:black">Data Ternak :</span>
        </div>
       <div v-if="livestocks.length>0"  class="item-list" style="margin-bottom:64px;margin-top: 0px;">
            <div v-for="(livestock) in livestocks" :key="livestock.id">
            <v-list-item light >
                <v-list-item-icon>
                    <v-icon large :color="livestock.gender=='Betina' ? 'pink' : 'indigo'">mdi-cow</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ livestock.species + " " + livestock.gender }}</v-list-item-title>
                    <v-list-item-subtitle>{{"Jumlah : " + livestock.amount }}</v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                    <v-menu disabled bottom left>
                        <template v-slot:activator="{ on }">
                        <v-btn class="item-add" text icon  v-on="on">
                        <v-icon color="#B0BEC5">mdi-dots-vertical</v-icon>
                        </v-btn>  
                        </template>

                        <v-list>
                        <v-list-item>
                            <v-list-item-title @click="editLivestock(livestock)" >Edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title  @click="deleteLivestock(livestock)" >Delete</v-list-item-title>
                        </v-list-item>
                        </v-list>
                    </v-menu>
                </v-list-item-action>
            </v-list-item>   
            </div>
       </div>
  </div>
</template>

<script>
export default {
    data () {
    return {
        data : {
           identity : null,
           size : null,
           type : null,
           fillColor : null,
           strokeColor : null,
           owner_id : null,
           description : null,
        },
        optionmaps : {
          scrollwheel: true, mapTypeControl: false, draggable: true, disableDoubleClickZoom: true,zoomControl: false                      
        },
        livestocks: [],
        center: { lat:-7.779047, lng: 110.416957 },
        marker: false,
        options : {strokeColor: '#3F5498',fillColor: '#3F5498',strokeWeight: 1},
        paths: [],
    }
  },
  methods:{
    getPostData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.$http.get(this.$apiUrl + '/land/'+this.$route.params.id,config).then(response =>{
            this.data = response.data.data
            this.livestocks = response.data.data.livestock.data
            this.paths = response.data.data.polygon.data
            this.options.fillColor = response.data.data.fillColor
            this.options.strokeColor = response.data.data.strokeColor
            if(response.data.data.polygon.data.length>0)
            {
              this.center = response.data.data.polygon.data[0]
            }
            if(this.paths.length!=0)
            {
              this.marker = false
            }
        })
    },
  },
  mounted(){
    this.getPostData()
  },
}
</script>

<style>

</style>
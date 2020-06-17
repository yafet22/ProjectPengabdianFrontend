<template>
  <div style="width: 100%">
      <h2 style="text-align:center">Data Rumah</h2>
      <gmap-map :center="center" :zoom="18" :options="optionmaps " style="width: 100%;margin-top:16px;height:200px" @click="markerPlace($event)">
        <gmap-polygon :options="optionsConstruction" style="z-index:100" :paths="constructionPaths" :draggable="false" :editable="false" @paths_changed="updateEditedConstruction($event)">
        </gmap-polygon>
        <gmap-polygon :options="options" :paths="paths" :draggable="false" :editable="false">
        </gmap-polygon>
      </gmap-map>
      <div class="detail-box">
          <div class="detail-text">
            <span>
                Identitas : 
            </span>
            {{ data.identity}}
          </div>
          <div class="detail-text">
            <span>
                Alamat : 
            </span>
            {{ data.address}}
          </div>
          <div class="detail-text">
            <span>
                Tahun Pemangunan : 
            </span>
            {{ data.construction_year }}
          </div>
          <div class="detail-text">
            <span>
                Luas Bangunan : 
            </span>
            {{ data.construction_size }}
          </div>
          <div class="detail-text">
            <span>
                Luas Tanah : 
            </span>
            {{ data.land_size }}
          </div>
          <div class="detail-text">
            <span>
                Luas Lantai : 
            </span>
            {{ data.floor_size }}
          </div>
          <div class="detail-text">
            <span>
                Jumlah Lantai : 
            </span>
            {{ data.floors_number }}
          </div>
          <div class="detail-text">
            <span>
                Arah Hadap : 
            </span>
            {{ data.side_facing }}
          </div>
          <div class="detail-text">
            <span>
                Jumlah Laki-laki Dewasa : 
            </span>
            {{ data.number_of_adult_male }}
          </div>
          <div class="detail-text">
            <span>
                Jumlah Perempuan Dewasa : 
            </span>
            {{ data.number_of_adult_female }}
          </div>
          <div class="detail-text">
            <span>
                Jumlah Anak Laki-laki : 
            </span>
            {{ data.number_of_boys }}
          </div>
          <div class="detail-text">
            <span>
                Jumlah Anak Perempuan : 
            </span>
            {{ data.number_of_girls }}
          </div>
          <div class="detail-text">
            <span>
                Jumlah Pasutri : 
            </span>
            {{ data.number_of_married_couples }}
          </div>
          <div class="detail-text">
            <span>
                Designer : 
            </span>
            {{ data.designer }}
          </div>
          <div class="detail-text">
            <span>
                Pembangun Rumah : 
            </span>
            {{ data.constructor }}
          </div>
          <div class="detail-text">
            <span>
                Septic Tank : 
            </span>
            {{ data.septic_tank }}
          </div>
          <div class="detail-text">
            <span>
                Penyaring Lemak : 
            </span>
            {{ data.grease_trap }}
          </div>
          <div class="detail-text">
            <span>
                Pengelolaan Air Hujan : 
            </span>
            {{ data.rain_water_managment }}
          </div>
          <div class="detail-text">
            <span>
                Kloset Leher Angsa : 
            </span>
            {{ data.kloset_leher_angsa }}
          </div>
      </div> 
        <div class="item-top">
            <span class="item-title" style="color:black">Ruangan : </span>
        </div>
        <div class="item-list" style="margin-bottom:60px">
            <div v-for="(room) in rooms" :key="room.id">
            <v-list-item @click="editRoom(room.id)">
                <v-list-item-icon>
                    <v-icon large color="indigo">mdi-window-shutter-open</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ room.category }}</v-list-item-title>
                    <v-list-item-subtitle>{{ room.size }}</v-list-item-subtitle>
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
                            <v-list-item-title @click="editRoom(room.id)" >Edit</v-list-item-title>
                        </v-list-item>
                        <v-list-item >
                            <v-list-item-title @click="deleteRoom(room.id)" >Delete</v-list-item-title>
                        </v-list-item>
                        </v-list>
                    </v-menu>
                </v-list-item-action>
            </v-list-item>  
                
            </div>
        </div>

        <v-dialog v-model="dialog" persistent max-width="390">
      <v-card>
        <v-card-title class="headline" style="margin-bottom:8px">Tambah Data Ruangan</v-card-title>
        <v-card-text >
          <div class="detail-text" style="color:black">
            <span>
                Kategori : 
            </span>
            {{ data2.category}}
          </div> 
          <div class="detail-text" style="color:black">
            <span>
                Apakah diperlukan cahaya buatan pada ruang ini :  
            </span>
            {{ data2.artificial_light}}
          </div> 
          <div class="detail-text" style="color:black">
            <span>
                Apakah diperlukan pendingin buatan pada ruang ini :  
            </span>
            {{ data2.artificial_cooler}}
          </div> 
          <div class="detail-text" style="color:black">
            <span>
                Luas Ruangan :  
            </span>
            {{ data2.size}}
          </div> 
            <div class="item-top">
                <span class="item-title" style="color:black">Jendela/Ventilasi : </span>
            </div>
            <div  class="item-list" style="margin-bottom:24px">
                <div v-for="(window) in windows" :key="window.id">
                <v-list-item  >
                    <v-list-item-icon>
                        <v-icon large color="indigo">mdi-window-closed-variant</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ window.type }}</v-list-item-title>
                        <v-list-item-subtitle>{{ window.placement }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-menu disabled bottom left>
                          <template v-slot:activator="{ on }">
                            <v-btn class="item-add" text icon v-on="on">
                            <v-icon color="#B0BEC5">mdi-dots-vertical</v-icon>
                            </v-btn>  
                          </template>

                          <v-list>
                            <v-list-item>
                              <v-list-item-title @click="editWindow(window)" >Edit</v-list-item-title>
                            </v-list-item>
                            <v-list-item >
                              <v-list-item-title @click="deleteWindow(window)" >Delete</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                    </v-list-item-action>
                </v-list-item>  
                 
                </div>
            </div> 
          <div style="display: flex; justify-content: flex-end">
            <v-btn dark tile small color="#FFFFFF" style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 120px;height: 39px;" @click="dialog=false" class="elevation-0">
              Close
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    data () {
    return {
        data : {
           identity : null,
           address : null,
           construction_year : null,
           land_size : null,
           construction_size : null,
           floor_size : null,
           floors_number : null,
           side_facing : null,
           number_of_adult_male : null,
           number_of_adult_female : null,
           number_of_boys : null,
           number_of_girls : null,
           number_of_married_couples : null,
           designer : null,
           septic_tank : "Ya",
           grease_trap : "Ya",
           rain_water_managment : "Ya",
           kloset_leher_angsa : "Ya",
           fillColor : null,
           strokeColor : null,
           owner_id : null,
        },
        optionmaps : {
          scrollwheel: true, mapTypeControl: false, draggable: true, disableDoubleClickZoom: true,zoomControl: false                      
        },
        data2 : {},
        center: { lat:-7.779047, lng: 110.416957 },
        marker: false,
        options : {strokeColor: '#3F5498',fillColor: '#3F5498',strokeWeight: 1},
        optionsConstruction : {strokeColor: '#98963F',fillColor: '#98963F',strokeWeight: 1},
        paths: [],
        constructionPaths: [],
        rooms: [],
        windows: [],
        idRoom : null,
        dialog : false
    }
  },
  methods:{
    getPostData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.$http.get(this.$apiUrl + '/house/'+this.$route.params.id,config).then(response =>{
            this.data = response.data.data
            this.paths = response.data.data.polygon.data
            this.constructionPaths = response.data.data.polygon_building.data
            this.rooms = response.data.data.room.data
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
    getRoomData()
    {
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.$http.get(this.$apiUrl + '/room/'+this.idRoom,config).then(response =>{
            this.data2 = response.data.data
            this.windows = response.data.data.window.data
        })
    },
    editRoom(id)
    {
      this.idRoom=id
      this.getRoomData()
      this.dialog=true
    },
  },
  mounted(){
    this.getPostData()
  },
}
</script>

<style>

</style>
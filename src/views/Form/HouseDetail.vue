<template>
  <div style="width: 100%">
      <v-tabs
        fixed-tabs
        light
        color="#3A4D8C"
        style="margin-bottom:12px"
      >
        <v-tab @click="$router.push({ name : 'houseQuality',params:{id: houseID}})">
          Kualitas
        </v-tab>
        <v-tab @click="$router.push({ name : 'houseData',params:{id: houseID}})">
          Data Rumah
        </v-tab>
      </v-tabs>
      <router-view></router-view>
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
        dialog : false,
        houseID : null,
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
    // this.getPostData()
    this.houseID = this.$route.params.id;
  },
}
</script>

<style>

</style>
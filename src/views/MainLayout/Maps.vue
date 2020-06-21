<template>
  <div style="width: 100%">
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
        <v-toolbar-title class="toolbar-title">MAPS</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn style="width:24px;height:24px" @click="$router.push({ name : 'main'})" text icon>
        <v-icon color="white">mdi-home</v-icon>
        </v-btn>
        <!-- <img :src="require('@/assets/logo.svg')" class="photo-profile"/> -->
      </div>
    </v-app-bar>
    <div style="width: 100%;margin-bottom:128px">
    <gmap-map :center="center" :zoom="16" style="width: 100%;height:calc(75vh)">
        <gmap-info-window  :position="infoWindowPos" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
            <div style="padding:8px">
                <h4>{{infoContent}}</h4>
                <img style="width:120px;height:120px;margin-top:8px" :src="$imageUrl + '/images/'+thumbnail">
            </div>  
        </gmap-info-window>
        <gmap-polygon v-for="(land) in lands" :key="land.id" :options="{ fillColor:land.fillColor,strokeColor:land.strokeColor,strokeWeight: 1 } " @click="toggleInfoWindow(land,land.id)" :clickable="true" :paths="land.polygon.data" :draggable="false" :editable="false">
        </gmap-polygon>
        <gmap-polygon v-for="(house) in houses" :key="house.id+99" :options="optionsConstruction" :paths="house.polygon_building.data" :draggable="false" :editable="false">
        </gmap-polygon>
        <gmap-polygon v-for="(house) in houses" :key="house.id" :options="{ fillColor:house.fillColor,strokeColor:house.strokeColor,strokeWeight: 1 } " @click="toggleInfoWindow(house,house.id)" :clickable="true" :paths="house.polygon.data" :draggable="false" :editable="false">
        </gmap-polygon>
        <gmap-polygon v-for="(data) in publics" :key="data.id" :options="{ fillColor:data.fillColor,strokeColor:data.strokeColor,strokeWeight: 1 } " @click="toggleInfoWindow(data,data.id)" :clickable="true" :paths="data.polygon.data" :draggable="false" :editable="false">
        </gmap-polygon>
    </gmap-map>
    <v-toolbar
      dense
      floating
      style="position: absolute;top: 85px;left: 38px;"
      color="elevation-0"
    >
      <gmap-autocomplete
        @place_changed="setPlace"
        hide-details
        single-line
      ></gmap-autocomplete>
      <v-btn icon @click="geolocation()">
        <v-icon>mdi-crosshairs-gps</v-icon>
      </v-btn>
    </v-toolbar>
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
        lands:[],
        houses:[],
        constructionPaths:[],
        snackbar: false, 
        color: null,
        text: '',
        center: { lat:-7.779047, lng: 110.416957 },
        optionsConstruction : {strokeColor: '#98963F',fillColor: '#98963F',strokeWeight: 1},
        inset: false, 
        infoContent: '',
        infoWindowPos: {
            lat: 0,
            lng: 0,
        },
        infoWinOpen: false,
        currentMidx: null,
        thumbnail: null,
        currentLocation : { lat : 0, lng : 0},
        //optional: offset infowindow so it visually sits nicely on top of our marker
    }
  },
  methods:{
     async getAllData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        await this.$http.get(this.$apiUrl + '/my/land',config).then(response =>{
            this.lands = response.data.data
        })
    },
    async getHouseData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        await this.$http.get(this.$apiUrl + '/my/house',config).then(response =>{
            this.houses = response.data.data
        })
    },
    async getPublicData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        await this.$http.get(this.$apiUrl + '/my/publicbuilding',config).then(response =>{
            this.publics = response.data.data
        })
    },
    toggleInfoWindow(marker, idx) {
        this.infoWindowPos = this.get_polygon_centroid(marker.polygon.data);
        if(marker.image)
        {
            this.thumbnail = marker.image.data[0].filename
        }  
        else
        {
            this.thumbnail = "notfound.png"
        }
        this.infoContent = marker.identity;
        //check if its the same marker that was selected if yes toggle
        if (this.currentMidx == idx) {
            this.infoWinOpen = !this.infoWinOpen;
        }
        //if different marker set infowindow to open and reset current marker index
        else {
            this.infoWinOpen = true;
            this.currentMidx = idx;
        }
    },
    get_polygon_centroid(pts) {
        var first = pts[0], last = pts[pts.length-1];
        if (first.lat != last.lat || first.lng != last.lng) pts.push(first);
        var twicearea=0,
        lat=0, lng=0,
        nPts = pts.length,
        p1, p2, f;
        for ( var i=0, j=nPts-1 ; i<nPts ; j=i++ ) {
            p1 = pts[i]; p2 = pts[j];
            f = (p1.lng - first.lng) * (p2.lat - first.lat) - (p2.lng - first.lng) * (p1.lat - first.lat);
            twicearea += f;
            lat += (p1.lat + p2.lat - 2 * first.lat) * f;
            lng += (p1.lng + p2.lng - 2 * first.lng) * f;
        }
        f = twicearea * 3;
        return { lat:lat/f + first.lat, lng:lng/f + first.lng };
    },
    setPlace(place) {
        this.center.lat =  place.geometry.location.lat()
        this.center.lng =  place.geometry.location.lng()
    },
    geolocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  },
  mounted(){
      this.geolocation()
      this.getAllData()
      this.getHouseData()
      this.getPublicData()
  },
}
</script>

<style lang="scss">

</style>


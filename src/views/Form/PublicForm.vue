<template>
  <div style="width: 100%">
    <div class="infoMap" v-if="mapMode==true">
      Pilih lokasi berdasarkan marker lalu atur bentuk bangunan
    </div>
    <gmap-map :center="center" :zoom="18" :options="mapMode==false? optionmaps : optionmaps2 " :style="mapMode==false? 'height:200px' : 'height:528px'" style="width: 100%;margin-bottom:16px" @click="markerPlace($event)">
        <gmap-polygon :options="options" :paths="paths" :draggable="true" :editable="true" @paths_changed="updateEdited($event)">
        </gmap-polygon>
        <gmap-polygon :options="optionsConstruction" style="z-index:100" :paths="constructionPaths" :draggable="true" :editable="true" @paths_changed="updateEditedConstruction($event)">
        </gmap-polygon>
        <gmap-polygon v-for="(building) in buildings" :key="building.id+99" :options="optionsConstruction" :paths="building.polygon_building.data" :draggable="false" :editable="false">
        </gmap-polygon>
        <gmap-polygon v-for="(building) in buildings" :key="building.id" :options="{ fillColor:building.fillColor,strokeColor:building.strokeColor,strokeWeight: 1 } " :paths="building.polygon.data" :draggable="false" :editable="false">
        </gmap-polygon>
        <gmap-marker v-if="marker==true && mapMode==true"
            :position="center" :draggable="true" @dragend="markerPlace($event)">
        </gmap-marker>
        <gmap-marker v-else-if="marker==true && mapMode==false"
            :position="center" :draggable="false" @dragend="markerPlace($event)">
        </gmap-marker>
    </gmap-map>
    <v-toolbar
    v-if="mapMode==true"
      dense
      floating
      style="position: absolute;top: 105px;left: 38px;"
      color="elevation-0"
    >
      <gmap-autocomplete
        @place_changed="setPlace"
        hide-details
        single-line
        placeholder="Masukan Alamat"
      ></gmap-autocomplete>
      <v-btn icon>
        <v-icon>mdi-crosshairs-gps</v-icon>
      </v-btn>
    </v-toolbar>
    <div v-if="mapMode==true">
      <v-text-field
          v-model="form.land_size"
          height=20
          outlined
          label="Luas Tanah (meter persegi)"
          prepend-inner-icon="mdi-map-outline"
          color="indigo"
          light
      ></v-text-field>
      <v-text-field
          v-model="form.construction_size"
          height=20
          outlined
          label="Luas Bangunan (meter persegi)"
          prepend-inner-icon="mdi-office-building"
          color="indigo"
          light
          :rules="constructionSizeRule"
      ></v-text-field>
    </div>
    <div v-if="mapMode==true" style="display:flex">
    <v-btn tile small color="#3F51B5" style="height:40px;color:#FFFFFF;margin-bottom:16px;margin-right:8px" @click="setMarker()" class="elevation-0">
      Set Tanah
    </v-btn>
    <v-btn :disabled="isValid" tile small color="warning" style="height:40px;color:#FFFFFF;margin-bottom:16px;margin-right:8px"  @click="setConstruction();isConstructionAvail=true" class="elevation-0">
      Set Bangunan
    </v-btn>
    <v-btn
      tile small color="teal" class="white--text elevation-0" @click="dialog=true" style="height:40px;color:#FFFFFF;margin-bottom:16px;margin-left:auto"
    >
      <v-icon color="white">mdi-format-color-fill</v-icon>
    </v-btn>
    </div>
    <div v-if="mapMode==true" style="display: flex;">
    <v-btn tile small color="red" style="height:40px;color:#FFFFFF;margin-bottom:16px;margin-right:8px" @click="clearMarker()" class="elevation-0">
      Clear Tanah
    </v-btn>
    <v-btn tile small color="black" style="height:40px;color:#FFFFFF;margin-bottom:16px;margin-right:8px" @click="clearMarkerConstruction()" class="elevation-0">
      Clear Bangunan
    </v-btn>
    </div>
    <v-btn v-if="mapMode==false" @click="mapMode=true" block dark tile small color="#3A4D8C" style="margin-bottom:16px;border-radius: 2px;width: 120px;height: 39px;" class="elevation-0">
      Tentukan Denah
    </v-btn>
    <v-btn v-else @click="mapMode=false" block dark tile small color="#FFB802" style="border: 1px solid rgba(151, 151, 151, 0.45);box-sizing: border-box;border-radius: 2px;width: 120px;height: 39px;margin-right:15px;margin-bottom:60px" class="elevation-0">
      Tambahkan Denah
    </v-btn>
    <v-card
    v-if="mapMode==false"
    class="mx-auto elevation-0"
    color="#FFFFFF"
    dark
    style="border: 1px solid rgba(151, 151, 151, 0.25);box-sizing: border-box;border-radius: 4px;margin-bottom: 68px"
    >
    <div class="form-header" style="border-top-left-radius: 4px;border-top-right-radius: 4px;">
        <div class="form-header-title">
            {{ title }}
        </div>
    </div>
    <div class="card-body">
    <v-card-text style="padding:24px">
        <v-text-field
            v-model="form.identity"
            height=20
            outlined
            label="Identitas Lahan"
            prepend-inner-icon="mdi-pier"
            color="indigo"
            light
        ></v-text-field>
        <v-select
        v-model="form.disaster_status"
        :items="disasterStatus"
        label="Status Kebencanaan"
        outlined
        light
        ></v-select>
        <v-select
        v-model="form.type"
        :items="types"
        label="Jenis Bangunan"
        outlined
        light
        ></v-select>
         <v-select
        v-model="form.function"
        :items="functions"
        label="Fungsi Bangunan"
        outlined
        light
        ></v-select>
        <v-select
        v-model="form.genset"
        :items="choices"
        label="Apakah Terdapat Genset"
        outlined
        light
        ></v-select>
        <v-select
        v-model="form.water_sources"
        :items="waters"
        label="Sumber Air"
        outlined
        light
        ></v-select>
        <v-text-field
            v-model="form.owner"
            height=20
            outlined
            label="Pemilik"
            prepend-inner-icon="mdi-account-key"
            color="indigo"
            light
        ></v-text-field>
        <v-text-field
            v-model="form.address"
            height=20
            outlined
            label="Alamat"
            prepend-inner-icon="mdi-map-marker"
            color="indigo"
            light
        ></v-text-field>
        <v-select
            v-model="form.construction_year"
            :items="years"
            label="Tahun Pembangunan"
            outlined
            light
        ></v-select>
        <v-text-field
            v-model="form.land_size"
            height=20
            outlined
            label="Luas Tanah (meter persegi)"
            prepend-inner-icon="mdi-map-outline"
            color="indigo"
            disabled
            light
        ></v-text-field>
        <v-text-field
            v-model="form.construction_size"
            height=20
            outlined
            label="Luas Bangunan (meter persegi)"
            prepend-inner-icon="mdi-office-building"
            color="indigo"
            disabled
            light
        ></v-text-field>
        <v-text-field
            v-model="form.number_of_bathrooms"
            height=20
            outlined
            label="Jumlah Kamar Mandi"
            prepend-inner-icon="mdi-paper-roll"
            color="indigo"
            light
        ></v-text-field>
        <v-text-field
            v-model="form.reservoir_size"
            height=20
            outlined
            label="Ukuran Tandon"
            prepend-inner-icon="mdi-cube"
            color="indigo"
            light
        ></v-text-field>
        <v-text-field
            v-model="form.width_of_building_entrance"
            height=20
            outlined
            label="Lebar Jalan Masuk (meter)"
            prepend-inner-icon="mdi-road-variant"
            color="indigo"
            light
        ></v-text-field>
        <div style="display: flex; justify-content: flex-end">
          <v-btn tile small color="#FFFFFF" style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 120px;height: 39px;margin-right:15px" class="elevation-0">
            Cancel
          </v-btn>
          <v-btn tile small color="#FFB802" style="border-radius: 2px;width: 120px;height: 39px;" @click="store()" class="elevation-0">
            Simpan
          </v-btn>
        </div>
    </v-card-text>
    </div>
    </v-card>
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
    <v-dialog v-model="dialog" persistent max-width="390">
      <v-card>
        <v-card-title class="headline" style="margin-bottom:8px">Setting Polygon Marker</v-card-title>
        <v-card-text>
            <v-text-field
                v-model="options.strokeColor"
                height=20
                outlined
                label="Warna Garis"
                prepend-inner-icon="mdi-format-color-fill"
                color="indigo"
                light
                @click="showColor1=true"
            ></v-text-field>
            <div v-if="showColor1">
              <v-color-picker
              v-model="options.strokeColor"
              :hide-canvas="false"
              :hide-inputs="false"
              :hide-mode-switch="true"
              :mode.sync="mode"
              class="mx-auto elevation-0"
              ></v-color-picker>
              <v-btn tile dark block small color="red" style="border-radius: 2px;width: 120px;height: 39px;margin-bottom:12px" @click="showColor1=false" class="elevation-0">
                Close
              </v-btn>
            </div>
            <v-text-field
                v-model="options.fillColor"
                height=20
                outlined
                label="Warna Isi"
                prepend-inner-icon="mdi-format-color-fill"
                color="indigo"
                light
                @click="showColor2=true"
            ></v-text-field>
            <div v-if="showColor2">
              <v-color-picker
              v-model="options.fillColor"
              :hide-canvas="false"
              :hide-inputs="false"
              :hide-mode-switch="true"
              :mode.sync="mode"
              class="mx-auto elevation-0"
              ></v-color-picker>
              <v-btn tile dark block small color="red" style="border-radius: 2px;width: 120px;height: 39px;margin-bottom:12px" @click="showColor2=false" class="elevation-0">
                Close
              </v-btn>
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
import {gmapApi} from 'vue2-google-maps'
import store from '../../store'
export default {
  data () {
    return {
        form : {
           identity : null,
           type : null,
           owner : null,
           address : null,
           function : null,
           construction_year : null,
           construction_size : null,
           land_size : null,
           number_of_bathrooms : null,
           genset : null,
           water_sources : null,
           reservoir_size : null,
           width_of_building_entrance : null,
           fillColor : null,
           strokeColor : null,
           disaster_status : null,
        }, 
        address : "",
        land_length : null,
        land_width : null,
        land_size : null,
        temp_land_size : null,
        lands:[],
        houses:[],
        buildings:[],
        showColor1:false,
        showColor2:false,
        dialog: false,
        center: { lat:-7.779047, lng: 110.416957 },
        optionmaps : {
          scrollwheel: false, mapTypeControl: false, draggable: false, disableDoubleClickZoom: true,zoomControl: false                      
        },
        optionmaps2 : {
          scrollwheel: true, mapTypeControl: true, draggable: true, disableDoubleClickZoom: false,zoomControl: true, clickableIcons: false                     
        },
        options : {strokeColor: '#3F5498',fillColor: '#3F5498',strokeWeight: 1},
        optionsConstruction : {strokeColor: '#98963F',fillColor: '#98963F',strokeWeight: 1},
        paths: [],
        constructionPaths: [],
        allPaths: [],
        mode: 'hexa',
        marker: false,
        choices : ["Ya","Tidak"],
        waters : ["Sumur","PDAM"],
        types : ["Bangunan Publik"],
        functions : ["Kantor Polisi","Balai Desa","Balai Dusun","Balai RT","Balai RW","Puskesmas","Lainnya"],
        date: new Date().toISOString().substr(0, 10),
        disasterStatus : ["rendah","sedang","tinggi"],
        modal: false,
        snackbar: false, 
        color: null,
        edited: false,
        text: '', 
        title: 'MASUKAN DATA BANGUNAN',
        typeInput: 'new',
        mapMode: false,
        editedConstruction : false,
        isConstructionAvail : false,
        constructionSizeRule : [
           value => value<=this.form.land_size || 'Tidak boleh melebihi luas tanah', 
        ],
    }
  },
  computed : {
    google: gmapApi,
    years () {
      const year = new Date().getFullYear()
      return Array.from({length: year - 1900}, (value, index) => 1901 + index)
    },
    isValid(){
      if(this.form.land_size < this.form.construction_size || this.form.land_size==null || this.form.construction_size==null){
        return true
      }else{
        return false
      }
    },
    minLat(){
      var minLat
      if(this.edited){
        minLat = this.paths[0][0].lat
        for (let i=0; i<this.paths[0].length; i++) {
          if(minLat>= this.paths[0][i].lat){
            minLat = this.paths[0][i].lat;
          }
        }
      }else{
        minLat = this.paths[0].lat
        for (let i=0; i<this.paths.length; i++) {
          if(minLat>= this.paths[i].lat){
            minLat = this.paths[i].lat;
          }
        }
      }
      
      return minLat
    },
    maxLat(){
      var maxLat
      if(this.edited){
        maxLat = this.paths[0][0].lat
        for (let i=0; i<this.paths[0].length; i++) {
          if(maxLat<= this.paths[0][i].lat){
            maxLat = this.paths[0][i].lat;
          }
        }
      }else{
        maxLat = this.paths[0].lat
        for (let i=0; i<this.paths.length; i++) {
          if(maxLat<= this.paths[i].lat){
            maxLat = this.paths[i].lat;
          }
        }
      }
      
      return maxLat
    },
    minLng(){
      var minLng
      if(this.edited){
        minLng = this.paths[0][0].Lng
        for (let i=0; i<this.paths[0].length; i++) {
          if(minLng>= this.paths[0][i].lng){
            minLng = this.paths[0][i].lng;
          }
        }
      }else{
        minLng = this.paths[0].lng
        for (let i=0; i<this.paths.length; i++) {
          if(minLng>= this.paths[i].lng){
            minLng = this.paths[i].lng;
          }
        }
      }
      
      return minLng
    },
    maxLng(){
      var maxLng
      if(this.edited){
        maxLng = this.paths[0][0].lng
        for (let i=0; i<this.paths[0].length; i++) {
          if(maxLng<= this.paths[0][i].lng){
            maxLng = this.paths[0][i].lng;
          }
        }
      }else{
        maxLng = this.paths[0].lng
        for (let i=0; i<this.paths.length; i++) {
          if(maxLng<= this.paths[i].lng){
            maxLng = this.paths[i].lng;
          }
        }
      }
      
      return maxLng
    },
  },
  methods:{
    store(){
      var config = {
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
          }
      }
      var payload 
      if(this.edited==true)
      {
        payload = {
          identity: this.form.identity,
          disaster_status : this.form.disaster_status,
          type: this.form.type,
          owner : this.form.owner,
          address : this.form.address,
          function : this.form.function,
          construction_year : this.form.construction_year,
          construction_size : this.form.construction_size,
          land_size : this.form.land_size,
          number_of_bathrooms : this.form.number_of_bathrooms,
          genset : this.form.genset,
          water_sources : this.form.water_sources,
          reservoir_size : this.form.reservoir_size,
          width_of_building_entrance : this.form.width_of_building_entrance,
          fillColor: this.options.fillColor,
          strokeColor: this.options.strokeColor,
          polygons: this.paths[0]
        }
      }
      else if(this.edited==false)
      {
        payload = {
          identity: this.form.identity,
          disaster_status : this.form.disaster_status,
          type: this.form.type,
          owner : this.form.owner,
          address : this.form.address,
          function : this.form.function,
          construction_year : this.form.construction_year,
          construction_size : this.form.construction_size,
          land_size : this.form.land_size,
          number_of_bathrooms : this.form.number_of_bathrooms,
          genset : this.form.genset,
          water_sources : this.form.water_sources,
          reservoir_size : this.form.reservoir_size,
          width_of_building_entrance : this.form.width_of_building_entrance,
          fillColor: this.options.fillColor,
          strokeColor: this.options.strokeColor,
          polygons: this.paths
        }
      }
      if(this.editedConstruction == true){
        payload.polygons_building = this.constructionPaths[0]
      }else{
        payload.polygons_building = this.constructionPaths
      }
      // this.form.owner_id = this.$route.params.id;
      if (this.typeInput === 'new') {
        var uri = this.$apiUrl + '/publicbuilding'
      } else {
        var uri = this.$apiUrl + '/publicbuilding/'+this.$route.params.public;
      }
      this.$http.post(uri,payload,config).then(response =>{
        this.snackbar = true; //mengaktifkan snackbar
        this.color = 'green'; //memberi warna snackbar
        this.text = 'Berhasil'; //memasukkan pesan ke snackbar
        this.$router.push({ name : 'public' })
        }).catch(error =>{
        this.snackbar = true;
        this.text = error.response.data.errors;
        this.color = 'red';
        this.load = false;
      })
    },
    getPostData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.$http.get(this.$apiUrl + '/publicbuilding/'+this.$route.params.public,config).then(response =>{
            this.form = response.data.data
            this.paths = response.data.data.polygon.data
            this.constructionPaths = response.data.data.polygon_building.data
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
            this.isConstructionAvail=true
        })
    },
    async getAllData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        await this.$http.get(this.$apiUrl + '/land',config).then(response =>{
            this.lands = response.data.data
        })
    },
    async getHouseData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        await this.$http.get(this.$apiUrl + '/house',config).then(response =>{
            this.houses = response.data.data
        })
    },
    async getPublicData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        await this.$http.get(this.$apiUrl + '/publicbuilding',config).then(response =>{
            this.buildings = response.data.data
        })
    },
    // updateEdited(mvcArray) {
    //   for( var i = 0; i < this.buildings.length; i++){ 
    //     if ( this.buildings[i].id == this.$route.params.public) {
    //       this.buildings.splice(i, 1); 
    //     }
    //   }
    //   let paths = [];
    //   for (let i=0; i<mvcArray.getLength(); i++) {
    //     let path = [];
    //     for (let j=0; j<mvcArray.getAt(i).getLength(); j++) {
    //       let point = mvcArray.getAt(i).getAt(j);
    //       path.push({lat: point.lat(), lng: point.lng()});
    //     }
    //     paths.push(path);
    //   }
    //   this.edited = true
    //   // this.edited = paths;
    //   this.paths = paths;
    // },
    updateEdited(mvcArray) {
      for( var i = 0; i < this.buildings.length; i++){ 
        if ( this.buildings[i].id == this.$route.params.public) {
          this.buildings.splice(i, 1); 
        }
      }
      this.constructionPaths = []
      let paths = [];
      var pathArea = [];
      for (let i=0; i<mvcArray.getLength(); i++) {
        let path = [];
        for (let j=0; j<mvcArray.getAt(i).getLength(); j++) {
          let point = mvcArray.getAt(i).getAt(j);
          path.push({lat: point.lat(), lng: point.lng()});
          pathArea.push(new this.google.maps.LatLng(point.lat(), point.lng()));
        }
        paths.push(path);
      }
      this.land_size = Math.floor(this.google.maps.geometry.spherical.computeArea(pathArea))
      this.form.land_size = Math.floor(this.google.maps.geometry.spherical.computeArea(pathArea))
      this.edited = true
      // this.edited = paths;
      this.paths = paths;
      setTimeout(function(){ 
        const $ = require('jquery');
        // We declare it globally
        window.$ = $;
        // $('.div[style*="opacity: 0.5]').hide();
        $("body").find('div[style*="opacity: 0.5"]').hide() }, 1000)
      if(this.isConstructionAvail){
        var x = this
        setTimeout(function() {
            x.setConstruction();
        }, 2000);
      }
    },
    updateEditedConstruction(mvcArray) {
      for( var i = 0; i < this.buildings.length; i++){ 
        if ( this.buildings[i].id == this.$route.params.public) {
          this.buildings.splice(i, 1); 
        }
      }
      if(this.edited){
        this.paths = this.paths[0]
        this.edited = false
      }
      let paths = [];
      var pathArea = [];
      for (let i=0; i<mvcArray.getLength(); i++) {
        let path = [];
        for (let j=0; j<mvcArray.getAt(i).getLength(); j++) {
          let point = mvcArray.getAt(i).getAt(j);
          if((point.lat()<this.minLat||point.lat()>this.maxLat) 
          || (point.lng()<this.minLng||point.lng()>this.maxLng) ){
            path=this.constructionPaths[0]
            pathArea = [new this.google.maps.LatLng(this.constructionPaths[0][0].lat,this.constructionPaths[0][0].lng),
                        new this.google.maps.LatLng(this.constructionPaths[0][1].lat,this.constructionPaths[0][1].lng),
                        new this.google.maps.LatLng(this.constructionPaths[0][2].lat,this.constructionPaths[0][2].lng),
                        new this.google.maps.LatLng(this.constructionPaths[0][3].lat,this.constructionPaths[0][3].lng)]
            break;
          }else{
            path.push({lat: point.lat(), lng: point.lng()});
            pathArea.push(new this.google.maps.LatLng(point.lat(), point.lng()));
          }
        }
        paths.push(path);
      }
      this.form.construction_size = Math.floor(this.google.maps.geometry.spherical.computeArea(pathArea))
      this.editedConstruction = true
      // this.edited = paths;
      setTimeout(function(){ 
        const $ = require('jquery');
        // We declare it globally
        window.$ = $;
        // $('.div[style*="opacity: 0.5]').hide();
        $("body").find('div[style*="opacity: 0.5"]').hide() }, 1000)
      this.constructionPaths = paths;
    },
    updateMarker(mvcArray) {
      let paths = [];
      for (let i=0; i<mvcArray.getLength(); i++) {
        let path = [];
        for (let j=0; j<mvcArray.getAt(i).getLength(); j++) {
          let point = mvcArray.getAt(i).getAt(j);
          path.push({lat: point.lat(), lng: point.lng()});
        }
        paths.push(path);
      }
      this.center = paths;
    },
    markerPlace(e){
			this.center.lat = e.latLng.lat()
			this.center.lng = e.latLng.lng()
    },
    clearMarker()
    {
      for( var i = 0; i < this.buildings.length; i++){ 
        if ( this.buildings[i].id == this.$route.params.public) {
          this.buildings.splice(i, 1); 
        }
      }
      this.marker=true
      this.paths=[]
      this.constructionPaths=[]
    },
    clearMarkerConstruction()
    {
      this.constructionPaths=[]
    },
    // setMarker()
    // {
    //   //Patokan
    //   // {lat:-7.780047, lng: 110.415957 },{lat:-7.780047, lng: 110.417957 },{lat:-7.778047, lng: 110.417957 },{lat:-7.778047, lng: 110.415957 } 
    //   this.marker=false
    //   this.paths=[]
    //   this.paths.push({lat : this.center.lat - 0.0001, lng : this.center.lng - 0.0001})
    //   this.paths.push({lat : this.center.lat - 0.0001, lng : this.center.lng + 0.0001})
    //   this.paths.push({lat : this.center.lat + 0.0001, lng : this.center.lng + 0.0001})
    //   this.paths.push({lat : this.center.lat + 0.0001, lng : this.center.lng - 0.0001})
    // },
    setMarker()
    {
      //Patokan
      // {lat:-7.780047, lng: 110.415957 },{lat:-7.780047, lng: 110.417957 },{lat:-7.778047, lng: 110.417957 },{lat:-7.778047, lng: 110.415957 } 
      // 1 meter = 0.0000050
      this.marker=false
      this.paths=[]
      this.paths.push({lat : this.center.lat - (Math.sqrt(this.form.land_size)*0.0000045125), lng : this.center.lng - (Math.sqrt(this.form.land_size)*0.0000045125)})
      this.paths.push({lat : this.center.lat - (Math.sqrt(this.form.land_size)*0.0000045125), lng : this.center.lng + (Math.sqrt(this.form.land_size)*0.0000045125)})
      this.paths.push({lat : this.center.lat + (Math.sqrt(this.form.land_size)*0.0000045125), lng : this.center.lng + (Math.sqrt(this.form.land_size)*0.0000045125)})
      this.paths.push({lat : this.center.lat + (Math.sqrt(this.form.land_size)*0.0000045125), lng : this.center.lng - (Math.sqrt(this.form.land_size)*0.0000045125)})
      // var x = this
      
      setTimeout(function(){ 
        const $ = require('jquery');
        // We declare it globally
        window.$ = $;
        // $('.div[style*="opacity: 0.5]').hide();
        $("body").find('div[style*="opacity: 0.5"]').hide() }, 1000)
      // const $ = require('jquery');
      // // We declare it globally
      // window.$ = $;
      // // $('.div[style*="opacity: 0.5]').hide();
      // $("body").find('div[style*="opacity: 0.5"]').hide()
      // $("div").children( 'style*="opacity: 0.5"' ).hide()
      // this.land_size = this.google.maps.geometry.spherical.computeArea(path)
    },
    setConstruction()
    {
      if(this.edited){
        this.paths = this.paths[0]
        this.edited=false
      }
      var center = this.get_polygon_centroid(this.paths)
      console.log(center)
      //Patokan
      // {lat:-7.780047, lng: 110.4125957 },{lat:-7.780047, lng: 110.417957 },{lat:-7.778047, lng: 110.417957 },{lat:-7.778047, lng: 110.4125957 } 
      // 1 meter = 0.0000050
      this.constructionPaths=[]
      this.constructionPaths.push({lat : center.lat - (Math.sqrt(this.form.construction_size)*0.0000045125), lng : center.lng - (Math.sqrt(this.form.construction_size)*0.0000045125)})
      this.constructionPaths.push({lat : center.lat - (Math.sqrt(this.form.construction_size)*0.0000045125), lng : center.lng + (Math.sqrt(this.form.construction_size)*0.0000045125)})
      this.constructionPaths.push({lat : center.lat + (Math.sqrt(this.form.construction_size)*0.0000045125), lng : center.lng + (Math.sqrt(this.form.construction_size)*0.0000045125)})
      this.constructionPaths.push({lat : center.lat + (Math.sqrt(this.form.construction_size)*0.0000045125), lng : center.lng - (Math.sqrt(this.form.construction_size)*0.0000045125)})
      // this.land_size = this.google.maps.geometry.spherical.computeArea(path)
    },
    setPlace(place) {
			this.center.lat =  place.geometry.location.lat()
      this.center.lng =  place.geometry.location.lng()
      this.form.address = place.formatted_address
    },
    geolocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    },
    get_polygon_centroid(pts) {
        var first = pts[0];
        // if (first.lat != last.lat || first.lng != last.lng) pts.push(first);
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
    setLength(){
        if(this.edited){
          this.paths=this.paths[0]
        }
        var range = this.land_length - this.getDistance(this.paths[0],this.paths[1])
        // this.paths[0].lat = this.paths[0].lat-(range*0.0000050)
        this.paths[0].lng = this.paths[0].lng-(range*0.0000050)
        // this.paths[1].lat = this.paths[1].lat-(range*0.0000050)
        this.paths[1].lng = this.paths[1].lng+(range*0.0000050)
        // this.paths[2].lat = this.paths[2].lat+(range*0.0000050)
        this.paths[2].lng = this.paths[2].lng+(range*0.0000050)
        // this.paths[3].lat = this.paths[3].lat+(range*0.0000050)
        this.paths[3].lng = this.paths[3].lng-(range*0.0000050)
        var temp = this.paths
        this.paths = []
        var x = this
        setTimeout(function() {
           x.paths = temp
        }, 100);
        this.edited = false
    },
  },
  mounted(){
      this.getPublicData()
      if (this.$route.params.public){
          this.title = "UBAH DATA BANGUNAN"
        //   this.links.push({text: this.$route.params.slug, disabled: false, to:{name: 'DetailEvent', params:{slug: this.$route.params.slug}}})
          this.typeInput = 'edit'
        //   this.changeImg = 3
        //   this.links.push({text: 'Update', disabled: true})
          this.getPostData()
      }
      else{
        this.marker=true
      }
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


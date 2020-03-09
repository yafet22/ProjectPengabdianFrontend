<template>
  <div style="width: 100%">
    <div class="infoMap" v-if="mapMode==true">
      Pilih lokasi berdasarkan marker lalu atur bentuk bangunan
    </div>
    <gmap-map :center="center" :zoom="18" :options="mapMode==false? optionmaps : optionmaps2 " :style="mapMode==false? 'height:200px' : 'height:528px'" style="width: 100%;margin-bottom:16px" @click="markerPlace($event)">
        <gmap-polygon :options="options" :paths="paths" :draggable="true" :editable="true" @paths_changed="updateEdited($event)">
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
      ></gmap-autocomplete>
      <v-btn icon>
        <v-icon>mdi-crosshairs-gps</v-icon>
      </v-btn>
    </v-toolbar>
    <div v-if="mapMode==true" style="display: flex;">
    <v-btn tile small color="#3F51B5" style="height:40px;color:#FFFFFF;margin-bottom:16px;margin-right:8px" @click="setMarker()" class="elevation-0">
      Tetapkan Lokasi
    </v-btn>
    <v-btn tile small color="red" style="height:40px;color:#FFFFFF;margin-bottom:16px;margin-right:8px" @click="clearMarker()" class="elevation-0">
      Clear
    </v-btn>
    <v-btn
      tile small color="teal" class="white--text elevation-0" @click="dialog=true" style="height:40px;color:#FFFFFF;margin-bottom:16px;margin-left:auto"
    >
      <v-icon color="white">mdi-settings</v-icon>
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
            label="Luas Tanah"
            prepend-inner-icon="mdi-map-outline"
            color="indigo"
            light
        ></v-text-field>
        <v-text-field
            v-model="form.construction_size"
            height=20
            outlined
            label="Luas Bangunan"
            prepend-inner-icon="mdi-office-building"
            color="indigo"
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
            label="Lebar Jalan Masuk"
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
        paths: [],
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
    }
  },
  computed : {
    years () {
      const year = new Date().getFullYear()
      return Array.from({length: year - 1900}, (value, index) => 1901 + index)
    }
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
    updateEdited(mvcArray) {
      for( var i = 0; i < this.buildings.length; i++){ 
        if ( this.buildings[i].id == this.$route.params.public) {
          this.buildings.splice(i, 1); 
        }
      }
      let paths = [];
      for (let i=0; i<mvcArray.getLength(); i++) {
        let path = [];
        for (let j=0; j<mvcArray.getAt(i).getLength(); j++) {
          let point = mvcArray.getAt(i).getAt(j);
          path.push({lat: point.lat(), lng: point.lng()});
        }
        paths.push(path);
      }
      this.edited = true
      // this.edited = paths;
      this.paths = paths;
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
    },
    setMarker()
    {
      //Patokan
      // {lat:-7.780047, lng: 110.415957 },{lat:-7.780047, lng: 110.417957 },{lat:-7.778047, lng: 110.417957 },{lat:-7.778047, lng: 110.415957 } 
      this.marker=false
      this.paths=[]
      this.paths.push({lat : this.center.lat - 0.0001, lng : this.center.lng - 0.0001})
      this.paths.push({lat : this.center.lat - 0.0001, lng : this.center.lng + 0.0001})
      this.paths.push({lat : this.center.lat + 0.0001, lng : this.center.lng + 0.0001})
      this.paths.push({lat : this.center.lat + 0.0001, lng : this.center.lng - 0.0001})
    },
    setPlace(place) {
			this.center.lat =  place.geometry.location.lat()
			this.center.lng =  place.geometry.location.lng()
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


<template>
  <div style="width: 100%">
    <gmap-map :center="center" :zoom="16" :style="mapMode==false? 'height:200px' : 'height:528px'" style="width: 100%;margin-bottom:16px" @click="markerPlace($event)">
        <gmap-polygon :options="options" :paths="paths" :draggable="true" :editable="true" @paths_changed="updateEdited($event)">
        </gmap-polygon>
        <gmap-polygon v-for="(land) in lands" :key="land.id" :options="{ fillColor:land.fillColor,strokeColor:land.strokeColor,strokeWeight: 1 } " :paths="land.polygon.data" :draggable="false" :editable="false">
        </gmap-polygon>
        <gmap-marker v-if="marker==true"
            :position="center" :draggable="true" @dragend="markerPlace($event)">
        </gmap-marker>
    </gmap-map>
    <v-toolbar
    v-if="mapMode==true"
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
      <v-btn icon>
        <v-icon>mdi-crosshairs-gps</v-icon>
      </v-btn>
    </v-toolbar>
    <div v-if="mapMode==true" style="display: flex;">
    <v-btn tile small color="#3F51B5" style="height:40px;color:#FFFFFF;margin-bottom:16px;margin-right:8px" @click="setMarker()" class="elevation-0">
      Set Marker
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
      Adjust Map
    </v-btn>
    <v-btn v-else @click="mapMode=false" block dark tile small color="#FFFFFF" style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 120px;height: 39px;margin-right:15px" class="elevation-0">
      Done
    </v-btn>
    <v-card
    v-if="mapMode==false"
    class="mx-auto elevation-0"
    color="#FFFFFF"
    dark
    style="border: 1px solid rgba(151, 151, 151, 0.25);box-sizing: border-box;border-radius: 4px;margin-bottom: 60px"
    >
    <div class="form-header" style="border-top-left-radius: 4px;border-top-right-radius: 4px;">
        <div class="form-header-title">
            {{ title }}
        </div>
    </div>
    <div class="card-body">
        <v-stepper light v-model="e1" class="elevation-0">
            <v-stepper-header class="elevation-0">
            <v-stepper-step :complete="e1 > 1" step="1" ></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2"></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3"></v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step step="4"></v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
            <v-card-text style="padding:24px" v-if="e1 == 0" >
            <v-text-field
                v-model="form.identity"
                height=20
                outlined
                label="Identitas Rumah"
                prepend-inner-icon="mdi-pier"
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
            <v-select
                v-model="form.side_facing"
                :items="compass"
                label="Arah Hadap Bangunan"
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
                v-model="form.floor_size"
                height=20
                outlined
                label="Luas Lantai"
                prepend-inner-icon="mdi-home-floor-l"
                color="indigo"
                light
            ></v-text-field>
            <v-text-field
                v-model="form.floors_number"
                height=20
                outlined
                label="Jumlah Lantai"
                prepend-inner-icon="mdi-home-floor-1"
                color="indigo"
                light
            ></v-text-field>
            <div style="display: flex; justify-content: flex-end">
                <v-btn tile small color="#FFFFFF" style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 120px;height: 39px;margin-right:15px" class="elevation-0">
                    Cancel
                </v-btn>
                <v-btn tile dark small color="#FFB802" style="border-radius: 2px;width: 120px;height: 39px;" @click="e1=2" class="elevation-0">
                    Next
                </v-btn>
            </div>
            </v-card-text>

            <v-card-text style="padding:24px" step="2" v-else-if="e1==2" >
            <v-text-field
                v-model="form.number_of_adult_male"
                height=20
                outlined
                label="Jumlah Laki-laki Dewasa"
                prepend-inner-icon="mdi-human-male"
                color="indigo"
                light
            ></v-text-field>
            <v-text-field
                v-model="form.number_of_adult_female"
                height=20
                outlined
                label="Jumlah Perempuan Dewasa"
                prepend-inner-icon="mdi-human-female"
                color="indigo"
                light
            ></v-text-field>
            <v-text-field
                v-model="form.number_of_boys"
                height=20
                outlined
                label="Jumlah Anak Laki-laki"
                prepend-inner-icon="mdi-human-male-boy"
                color="indigo"
                light
            ></v-text-field>
            <v-text-field
                v-model="form.number_of_girls"
                height=20
                outlined
                label="Jumlah Anak Perempuan"
                prepend-inner-icon="mdi-human-male-girl"
                color="indigo"
                light
            ></v-text-field>
            <v-text-field
                v-model="form.number_of_married_couples"
                height=20
                outlined
                label="Jumlah Pasutri"
                prepend-inner-icon="mdi-human-male-female"
                color="indigo"
                light
            ></v-text-field>
            <div style="display: flex; justify-content: flex-end">
                <v-btn tile small color="#FFFFFF" style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 120px;height: 39px;margin-right:15px" class="elevation-0">
                    Cancel
                </v-btn>
                <v-btn tile dark small color="#FFB802" style="border-radius: 2px;width: 120px;height: 39px;" @click="e1=3" class="elevation-0">
                    Next
                </v-btn>
            </div>
            </v-card-text>
            <v-card-text style="padding:24px" step="3" v-else-if="e1==3" >
            <v-select
                v-model="form.designer"
                :items="designers"
                label="Siapa yang merancang rumah anda?"
                outlined
                light
            ></v-select>
            <v-select
                v-model="form.constructor"
                :items="designers"
                label="Siapa yang membangun rumah anda?"
                outlined
                light
            ></v-select>
            <v-select
                v-model="form.septic_tank"
                :items="choices"
                label="Apakah rumah Anda telah dilengkapi Septic Tank?"
                outlined
                light
            ></v-select>
            <v-select
                v-model="form.kloset_leher_angsa"
                :items="choices"
                label="Apakah kloset Anda merupakan kloset pabrikasi leher angsa?"
                outlined
                light
            ></v-select>
            <v-select
                v-model="form.grease_trap"
                :items="choices"
                label="Apakah bak cuci piring Anda dilengkapi Bak Penangkap Lemak?"
                outlined
                light
            ></v-select>
             <v-select
                v-model="form.rain_water_managment"
                :items="choices"
                label="Apakah rumah anda dilengkapi Pengelolaan Air Hujan?"
                outlined
                light
            ></v-select>
            <div style="display: flex; justify-content: flex-end">
                <v-btn tile small color="#FFFFFF" style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 120px;height: 39px;margin-right:15px" class="elevation-0">
                    Cancel
                </v-btn>
                <v-btn tile dark small color="#FFB802" style="border-radius: 2px;width: 120px;height: 39px;" @click="store()" class="elevation-0">
                    Finish
                </v-btn>
            </div>
            </v-card-text>
            </v-stepper-items>
        </v-stepper>
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
           constructor : null,
           septic_tank : "Ya",
           grease_trap : "Ya",
           rain_water_managment : "Ya",
           kloset_leher_angsa : "Ya",
           fillColor : null,
           strokeColor : null,
           owner_id : null,
        },
        compass: ["Utara","Barat Laut","Barat","Barat Daya","Selatan","Tenggara","Timur","Timur Laut"], 
        e1:0,
        lands:[],
        showColor1:false,
        showColor2:false,
        dialog: false,
        center: { lat:-7.779047, lng: 110.416957 },
        options : {strokeColor: '#3F5498',fillColor: '#3F5498',strokeWeight: 1},
        paths: [],
        allPaths: [],
        mode: 'hexa',
        marker: false,
        designers : ["Sendiri","Tukang","Arsitek/Teknik Sipil/Kontraktor","Lainnya"],
        choices : ["Ya","Tidak"],
        date: new Date().toISOString().substr(0, 10),
        modal: false,
        snackbar: false, 
        color: null,
        edited: false,
        text: '', 
        title: 'MASUKAN DATA RUMAH',
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
          fillColor: this.options.fillColor,
          strokeColor: this.options.strokeColor,
          owner_id: this.$route.params.id,
          address : this.form.identity,
          construction_year : this.form.construction_year,
          land_size : this.form.land_size,
          construction_size : this.form.construction_size,
          floor_size : this.form.floor_size,
          floors_number : this.form.floors_number,
          side_facing : this.form.side_facing,
          number_of_adult_male : this.form.number_of_adult_male,
          number_of_adult_female : this.form.number_of_adult_female,
          number_of_boys : this.form.number_of_boys,
          number_of_girls : this.form.number_of_girls,
          number_of_married_couples : this.form.number_of_married_couples,
          designer : this.form.designer,
          constructor : this.form.constructor,
          septic_tank : this.form.septic_tank,
          grease_trap : this.form.grease_trap,
          rain_water_managment : this.form.rain_water_managment,
          kloset_leher_angsa : this.form.kloset_leher_angsa,
          polygons: this.paths[0]
        }
      }
      else if(this.edited==false)
      {
        payload = {
          identity: this.form.identity,
          type: this.form.type,
          size: this.form.size,
          fillColor: this.options.fillColor,
          strokeColor: this.options.strokeColor,
          owner_id: this.$route.params.id,
          polygons: this.paths
        }
      }
      
      // this.form.owner_id = this.$route.params.id;
      if (this.typeInput === 'new') {
        var uri = this.$apiUrl + '/house'
      } else {
        var uri = this.$apiUrl + '/house/'+this.$route.params.land;
      }
      this.$http.post(uri,payload,config).then(response =>{
        this.snackbar = true; //mengaktifkan snackbar
        this.color = 'green'; //memberi warna snackbar
        this.text = 'Berhasil'; //memasukkan pesan ke snackbar
        this.$router.push({ name : 'ownerDetail',params:{id: this.$route.params.id}})
        }).catch(error =>{
        this.snackbar = true;
        this.text = error.response.data.message;
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
        this.$http.get(this.$apiUrl + '/land/'+this.$route.params.land,config).then(response =>{
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
    updateEdited(mvcArray) {
      for( var i = 0; i < this.lands.length; i++){ 
        if ( this.lands[i].id == this.$route.params.land) {
          this.lands.splice(i, 1); 
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
      for( var i = 0; i < this.lands.length; i++){ 
        if ( this.lands[i].id == this.$route.params.land) {
          this.lands.splice(i, 1); 
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
      this.paths.push({lat : this.center.lat - 0.001, lng : this.center.lng - 0.001})
      this.paths.push({lat : this.center.lat - 0.001, lng : this.center.lng + 0.001})
      this.paths.push({lat : this.center.lat + 0.001, lng : this.center.lng + 0.001})
      this.paths.push({lat : this.center.lat + 0.001, lng : this.center.lng - 0.001})
    },
    setPlace(place) {
			this.center.lat =  place.geometry.location.lat()
			this.center.lng =  place.geometry.location.lng()
		},
  },
  mounted(){
      this.getAllData()
      if (this.$route.params.house){
          this.title = "UBAH DATA RUMAH"
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


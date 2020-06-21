<template>
  <div style="width: 100%">
    <div class="infoMap" v-if="mapMode==true">
      Pilih lokasi berdasarkan marker lalu atur bentuk bangunan
    </div>
    <gmap-map :center="center" :zoom="18" :options="mapMode==false? optionmaps : optionmaps2 " :style="mapMode==false? 'height:200px' : 'height:528px'" style="width: 100%;margin-bottom:16px"  @click="markerPlace($event)">
        <gmap-polygon :options="options" :paths="paths" :draggable="true" :editable="true" @paths_changed="updateEdited($event)">
        </gmap-polygon>
        <gmap-polygon v-for="(land) in lands" :key="land.id" :options="{ fillColor:land.fillColor,strokeColor:land.strokeColor,strokeWeight: 1 } " :paths="land.polygon.data" :draggable="false" :editable="false">
        </gmap-polygon>
        <gmap-polygon v-for="(house) in houses" :key="house.id" :options="{ fillColor:house.fillColor,strokeColor:house.strokeColor,strokeWeight: 1 } " :paths="house.polygon.data" :draggable="false" :editable="false">
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
    style="border: 1px solid rgba(151, 151, 151, 0.25);box-sizing: border-box;border-radius: 4px;margin-bottom: 60px"
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
            label="Identitas Peternakan"
            prepend-inner-icon="mdi-pier"
            color="indigo"
            light
        ></v-text-field>
        <v-text-field
          v-model="form.size"
          height=20
          outlined
          label="Luas Tanah (meter persegi)"
          prepend-inner-icon="mdi-image-size-select-small"
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
        <!-- <v-select
        v-model="form.type"
        :items="types"
        label="Jenis Lahan"
        outlined
        light
        ></v-select> -->
        <v-textarea
          light
          v-model="form.description"
          outlined
          label="Keterangan"
        ></v-textarea>
        <div class="item-top">
            <span class="item-title" style="color:black">Data Ternak</span>
            <v-btn class="item-add" @click="dialog2=true,typeInput2='new'" text icon >
            <v-icon color="orange" >mdi-plus-circle</v-icon>
            </v-btn>
        </div>
        <div v-if="livestocks.length<1" class="item-list isEmpty">
            <span>Tidak Terdapat Data</span>
        </div>
        <div v-else class="item-list" style="margin-bottom:64px">
            <div v-for="(livestock) in livestocks" :key="livestock.id">
            <v-list-item light >
                <v-list-item-icon>
                    <v-icon large :color="livestock.gender=='Betina' ? 'pink' : 'indigo'">mdi-cow</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title v-if="livestocks.maturity!=null">{{ livestock.species + livestocks.maturity + " " + " " + livestock.gender }}</v-list-item-title>
                    <v-list-item-title v-else>{{ livestock.species + " " + livestock.gender }}</v-list-item-title>
                    <v-list-item-subtitle>{{"Jumlah : " + livestock.amount }}</v-list-item-subtitle>
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
        <div style="display: flex; justify-content: flex-end">
          <v-btn @click="$router.go(-1)" tile small color="#FFFFFF" style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 120px;height: 39px;margin-right:15px" class="elevation-0">
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
    <v-dialog v-model="dialog2" persistent max-width="390">
      <v-card>
        <v-card-title class="headline" style="margin-bottom:8px">Masukan Data Ternak</v-card-title>
        <v-card-text>
            <v-form v-model="isFormValid">
              <v-select
              v-model="form2.species"
              :rules="[rules.required]"
              :items="species"
              label="Jenis Ternak"
              outlined
              light
              ></v-select>
              <v-select
              v-model="form2.maturity"
              :rules="[rules.required]"
              :items="maturities"
              label="Usia"
              outlined
              light
              ></v-select>
              <v-select
              v-model="form2.gender"
              :rules="[rules.required]"
              :items="gender"
              label="Jenis Kelamin"
              outlined
              light
              ></v-select>
              <v-text-field
                  v-model="form2.amount"
                  height=20
                  outlined
                  :rules="[rules.required,rules.numberOnly]"
                  label="Jumlah"
                  prepend-inner-icon="mdi-database-plus"
                  color="indigo"
                  light
              ></v-text-field>
            </v-form>
            <div style="display: flex; justify-content: flex-end">
              <v-btn dark tile small color="#FFFFFF"  style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 120px;height: 39px;" @click="dialog2=false" class="elevation-0">
                Close
              </v-btn>
              <v-btn :disabled="!isFormValid" tile light small color="#FFB802" style="border-radius: 2px;width: 120px;height: 39px;color:white" @click="submitLivestock()" class="elevation-0">
                  Finish
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
           size : null,
           type : null,
           fillColor : null,
           strokeColor : null,
           owner_id : null,
           description : null,
           disaster_status : null
        }, 
        form2 : {
           amount : null,
           species : null,
           gender : null,
           maturity : null,
        }, 
        disasterStatus : ["rendah","sedang","tinggi"],
        isFormValid: false, 
        lands:[],
        houses:[],
        item:{},
        dialog2 : false,
        livestocks : [],
        showColor1:false,
        showColor2:false,
        dialog: false,
        center: { lat:-7.779047, lng: 110.416957 },
        optionmaps : {
          scrollwheel: false, mapTypeControl: false, draggable: false, disableDoubleClickZoom: true,zoomControl: false                      
        },
        optionmaps2 : {
          scrollwheel: true, mapTypeControl: true, draggable: true, disableDoubleClickZoom: false,zoomControl: true  , clickableIcons: false                   
        },
        options : {strokeColor: '#3F5498',fillColor: '#3F5498',strokeWeight: 1},
        paths: [],
        allPaths: [],
        mode: 'hexa',
        marker: false,
        types : ["Pertanian","Kebun","Peternakan","Lahan Kosong","Pekarangan","Lainnya"],
        species : ["Ayam Potong","Ayam Petelur","Sapi Perah","Sapi Potong","Bebek Potong","Bebek Petelur",'Kambing','Domba',"Lele","Lainnya"],
        gender : ["Jantan","Betina"],
        maturities : ["Muda","Dewasa"],
        rules: {
          required: value => !!value || 'Data is required',
          numberOnly: value => !isNaN(value) || 'Number Only',
          textOnly: value => RegExp(/^[A-Za-z ]+$/).test(value) || 'Text Only'
        },
        date: new Date().toISOString().substr(0, 10),
        modal: false,
        snackbar: false, 
        color: null,
        edited: false,
        text: '', 
        title: 'MASUKAN DATA LAHAN',
        typeInput: 'new',
        typeInput2: 'new',
        mapMode: false,
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
          type: "Peternakan",
          size: this.form.size,
          disaster_status: this.form.disaster_status,
          description: this.form.description,
          fillColor: this.options.fillColor,
          strokeColor: this.options.strokeColor,
          owner_id: this.$route.params.id,
          polygons: this.paths[0],
          livestocks: this.livestocks
        }
      }
      else if(this.edited==false)
      {
        payload = {
          identity: this.form.identity,
          type: "Peternakan",
          size: this.form.size,
          description: this.form.description,
          disaster_status: this.form.disaster_status,
          fillColor: this.options.fillColor,
          strokeColor: this.options.strokeColor,
          owner_id: this.$route.params.id,
          polygons: this.paths,
          livestocks: this.livestocks
        }
      }
      console.log(payload)
      // this.form.owner_id = this.$route.params.id;
      if (this.typeInput === 'new') {
        var uri = this.$apiUrl + '/land'
      } else {
        var uri = this.$apiUrl + '/land/'+this.$route.params.land;
      }
      this.$http.post(uri,payload,config).then(response =>{
        this.snackbar = true; //mengaktifkan snackbar
        this.color = 'green'; //memberi warna snackbar
        this.text = 'Berhasil'; //memasukkan pesan ke snackbar
        this.$router.push({ name : 'ownerDetail',params:{id: this.$route.params.id}})
        }).catch(error =>{
        this.snackbar = true;
        this.text = error.response.data.errors;
        this.color = 'red';
        this.load = false;
      })
    },
    submitLivestock()
    {
        if(this.typeInput2=='new')
        {
          var i = 0
          var object = this.form2
          for(var data in this.livestocks)
          {
              if(this.livestocks[i].species==object.species && this.livestocks[i].maturity==object.maturity && this.livestocks[i].gender==object.gender )
              {
                   this.snackbar = true;
                   this.text = "Data Sudah Diinputkan";
                   this.color = 'red';
                   return
              }
              i++;
          }
          this.livestocks.push(JSON.parse(JSON.stringify(this.form2)))
        }
        else{
          var i = 0
          var object = this.form2
          for(var data in this.livestocks)
          {
              if(this.livestocks[i].species==object.species && this.livestocks[i].maturity==object.maturity &&  this.livestocks[i].gender==object.gender )
              {
                   this.snackbar = true;
                   this.text = "Data Sudah Diinputkan";
                   this.color = 'red';
                   return
              }
              i++;
          }
          var index = this.livestocks.indexOf(this.item);
          this.livestocks[index].amount=this.form2.amount
          this.livestocks[index].species=this.form2.species
          this.livestocks[index].gender=this.form2.gender
          this.livestocks[index].maturity=this.form2.maturity
        }

        this.dialog2=false
        this.resetFormLiveStock()
        // this.resetForm3()
    },
    editLivestock(item)
    {
      
        this.form2=item
        this.item=item
        this.typeInput2="edit"
        this.dialog2=true
    },

    deleteLivestock(item)
    {
        var index = this.livestocks.indexOf(item);
        this.livestocks.splice(index, 1);
    },
    resetFormLiveStock()
    {
      this.form2 = {
           amount : null,
           species : null,
           gender : null,
        }
    },
    getPostData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.$http.get(this.$apiUrl + '/land/'+this.$route.params.land,config).then(response =>{
            this.form = response.data.data
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
    async getAllData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        await this.$http.get(this.$apiurl + '/land',config).then(response =>{
            this.lands = response.data.data
        })
    },
    async getHouseData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        await this.$http.get(this.$apiUrl + '/owner-house/'+this.$route.params.id,config).then(response =>{
            this.houses = response.data.data
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
      this.getAllData()
      this.getHouseData()
      if (this.$route.params.land){
          this.title = "UBAH DATA LAHAN"
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


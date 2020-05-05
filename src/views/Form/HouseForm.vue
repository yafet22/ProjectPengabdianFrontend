<template>
  <div style="width: 100%">
    <div class="infoMap" v-if="mapMode==true">
      Pilih lokasi berdasarkan marker lalu atur bentuk bangunan
    </div>
    <gmap-map :center="center" :zoom="18" :options="mapMode==false? optionmaps : optionmaps2 "  :style="mapMode==false? 'height:200px' : 'height:528px'" style="width: 100%;margin-bottom:16px" @click="markerPlace($event)">
        <gmap-polygon :options="options" :paths="paths" :draggable="true" :editable="true" @paths_changed="updateEdited($event)">
        </gmap-polygon>
        <gmap-polygon :options="optionsConstruction" style="z-index:100" :paths="constructionPaths" :draggable="true" :editable="true" @paths_changed="updateEditedConstruction($event)">
        </gmap-polygon>
        <gmap-polygon v-for="(house) in houses" :key="house.id+99" :options="optionsConstruction" :paths="house.polygon_building.data" :draggable="false" :editable="false">
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
          v-model="form.floor_size"
          height=20
          outlined
          label="Luas Lantai (meter persegi)"
          prepend-inner-icon="mdi-office-building"
          color="indigo"
          light
          :rules="constructionSizeRule"
      ></v-text-field>
    </div>
    <div v-if="mapMode==true" style="display: flex;">
    <v-btn tile small color="#3F51B5" style="height:40px;color:#FFFFFF;margin-bottom:16px;margin-right:8px" @click="setMarker()" class="elevation-0">
      Set Tanah
    </v-btn>
    <v-btn :disabled="isValid" tile small color="warning" style="height:40px;color:#FFFFFF;margin-bottom:16px;margin-right:8px"  @click="setConstruction();isConstructionAvail=true" class="elevation-0">
      Set Lantai
    </v-btn>
    <v-btn tile small color="red" style="height:40px;color:#FFFFFF;margin-bottom:16px;margin-right:8px" @click="clearMarker()" class="elevation-0">
      Clear
    </v-btn>
    <v-btn
      tile small color="teal" class="white--text elevation-0" @click="dialog=true" style="height:40px;color:#FFFFFF;margin-bottom:16px;margin-left:auto"
    >
      <v-icon color="white">mdi-format-color-fill</v-icon>
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
        <v-stepper light v-model="e1" class="elevation-0">
            <v-stepper-header class="elevation-0">
            <v-stepper-step :complete="e1 > 1" step="1" ></v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2"></v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="e1 > 3" step="3"></v-stepper-step>
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
                v-model="form.disaster_status"
                :items="disasterStatus"
                label="Status Kebencanaan"
                outlined
                light
            ></v-select>
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
                disabled
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
            ></v-text-field>
            <v-text-field
                v-model="form.floor_size"
                height=20
                outlined
                disabled
                label="Luas Lantai (meter persegi)"
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
                <v-btn @click="$router.go(-1)" tile small color="#FFFFFF" style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 80px;height: 39px;margin-right:15px" class="elevation-0">
                    Cancel
                </v-btn>
                <v-btn tile dark small color="primary"  style="border-radius: 2px;width: 80px;height: 39px;margin-right:15px" @click="storeFinish()" class="elevation-0">
                    Finish
                </v-btn>
                <v-btn tile dark small color="#FFB802" style="border-radius: 2px;width: 80px;height: 39px;" @click="e1=2" class="elevation-0">
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
                @change="fillPerson()"
            ></v-text-field>
            <v-text-field
                v-model="form.number_of_adult_female"
                height=20
                outlined
                label="Jumlah Perempuan Dewasa"
                prepend-inner-icon="mdi-human-female"
                color="indigo"
                light
                @change="fillPerson()"
            ></v-text-field>
            <v-text-field
                v-model="form.number_of_boys"
                height=20
                outlined
                label="Jumlah Anak Laki-laki"
                prepend-inner-icon="mdi-human-male-boy"
                color="indigo"
                light
                @change="fillPerson()"
            ></v-text-field>
            <v-text-field
                v-model="form.number_of_girls"
                height=20
                outlined
                label="Jumlah Anak Perempuan"
                prepend-inner-icon="mdi-human-male-girl"
                color="indigo"
                light
                @change="fillPerson()"
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
            <div class="title-detail" v-if="persons.length>0">
              Detail Data keluarga
            </div>
            <div v-for="(item,index) in persons" :key="index">
              <div class="title-detail">
                Orang ke-{{index+1}} 
              </div>
              <v-row>
                  <v-col col="4" style="padding-top:0px;padding-bottom:0px">
                      <v-select
                          v-model="item.religion"
                          :items="religions"
                          label="Agama"
                          outlined
                          light
                      ></v-select>
                  </v-col>
                  <v-col col="4" style="padding-top:0px;padding-bottom:0px">
                      <v-text-field
                          v-model="item.age"
                          height=20
                          outlined
                          label="Umur"
                          prepend-inner-icon="mdi-yoga"
                          color="indigo"
                          light
                      ></v-text-field>
                  </v-col>
                  <v-col col="4" style="padding-top:0px;padding-bottom:0px">
                      <v-select
                          v-if="item.gender==''"
                          v-model="item.gender"
                          :items="genders"
                          label="Gender"
                          outlined
                          light
                      ></v-select>
                      <v-select
                          v-else
                          v-model="item.gender"
                          :items="genders"
                          label="Gender"
                          outlined
                          light
                          disabled
                      ></v-select>
                  </v-col>
              </v-row>
            </div>
            <div style="display: flex; justify-content: flex-end">
                <v-btn @click="e1=0" tile small color="#FFFFFF" style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 80px;height: 39px;margin-right:15px" class="elevation-0">
                    Cancel
                </v-btn>
                <v-btn tile dark small color="primary"  style="border-radius: 2px;width: 80px;height: 39px;margin-right:15px" @click="storeFinish()" class="elevation-0">
                    Finish
                </v-btn>
                <v-btn tile dark small color="#FFB802" style="border-radius: 2px;width: 80px;height: 39px;" @click="e1=3" class="elevation-0">
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
            <div>
              <div class="title-photo">
                Insert Photo
              </div>
              <v-layout wrap fill-height align-space-between row style="padding-left:12px;padding-right:12px;margin-bottom:24px">
                <v-flex class="box-photo" xl-3 md3 sm3 xs3 mx-2 my-2> 
                    <div class="content-photo">
                        <img :src="require('@/assets/photo-add.svg')" >
                    </div>
                    <input type="file" class="uploadButton" accept="image/png, image/jpeg, image/gif, image/jpg" @input="uploadImg($event)">
                </v-flex>
                <v-flex class="box-photo" v-for="item in savedImage" v-bind:key="item.key" xl-3 md3 sm3 xs3 mx-2 my-2> 
                    <v-icon dark color="red" class="iconCancel" @click.prevent="deleteImage(item.id)">mdi-close-circle</v-icon>
                    <img class="content-photo" :src="$imageUrl + '/images/'+item.filename">
                </v-flex>
                <v-flex class="box-photo" v-for="item in thumbnails" v-bind:key="item.key" xl-3 md3 sm3 xs3 mx-2 my-2> 
                    <v-icon dark color="red" class="iconCancel" @click.prevent="clear(item)">mdi-close-circle</v-icon>
                    <img class="content-photo" :src="item.display" >
                </v-flex>
                <!-- <v-flex class="box-photo" xl-3 md3 sm3 xs3 mx-2 my-2> 
                    <div class="content-photo">
                        <img :src="require('@/assets/photo-add.svg')" >
                    </div>
                </v-flex>
                <v-flex class="box-photo" xl-3 md3 sm3 xs3 mx-2 my-2> 
                    <div class="content-photo">
                        <img :src="require('@/assets/photo-add.svg')" >
                    </div>
                </v-flex>
                <v-flex class="box-photo" xl-3 md3 sm3 xs3 mx-2 my-2> 
                    <div class="content-photo">
                        <img :src="require('@/assets/photo-add.svg')" >
                    </div>
                </v-flex>
                <v-flex class="box-photo" xl-3 md3 sm3 xs3 mx-2 my-2> 
                    <div class="content-photo">
                        <img :src="require('@/assets/photo-add.svg')" >
                    </div>
                </v-flex> -->
              </v-layout>         
            </div>
            <div style="display: flex; justify-content: flex-end">
                <v-btn @click="e1=2" tile small color="#FFFFFF" style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 80px;height: 39px;margin-right:15px" class="elevation-0">
                    Cancel
                </v-btn>
                <v-btn tile dark small color="primary"  style="border-radius: 2px;width: 80px;height: 39px;margin-right:15px" @click="storeFinish()" class="elevation-0">
                    Finish
                </v-btn>
                <v-btn tile dark small color="#FFB802" style="border-radius: 2px;width: 80px;height: 39px;" @click="store()" class="elevation-0">
                    Next
                </v-btn>
            </div>
            </v-card-text>
            <v-card-text style="padding:24px" step="4" v-else-if="e1==4" >
            <div class="item-top">
                <span class="item-title" style="color:black">Ruangan</span>
                <v-btn class="item-add" text icon @click="resetForm2();dialogRooms=true;typeInput2='new'">
                <v-icon color="orange" >mdi-plus-circle</v-icon>
                </v-btn>
            </div>
            <div v-if="rooms.length<1" class="item-list isEmpty">
                <span>Tidak Terdapat Data</span>
            </div>
            <div v-else class="item-list">
                <div v-for="(room) in rooms" :key="room.id">
                <v-list-item >
                    <v-list-item-icon>
                        <v-icon large color="indigo">mdi-window-shutter-open</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ room.category }}</v-list-item-title>
                        <v-list-item-subtitle style="margin-top:8px">{{ room.size }} m<sup>2</sup></v-list-item-subtitle>
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
            <div style="display: flex; justify-content: flex-end">
                <v-btn @click="e1=3" tile small color="#FFFFFF" style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 120px;height: 39px;margin-right:15px" class="elevation-0">
                    Cancel
                </v-btn>
                <v-btn tile dark small color="#FFB802" style="border-radius: 2px;width: 120px;height: 39px;" @click="$router.push({ name : 'ownerDetail',params:{id: $route.params.id}})" class="elevation-0">
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
    <v-dialog v-model="dialogRooms" persistent max-width="390">
      <v-card>
        <v-card-title class="headline" style="margin-bottom:8px">Tambah Data Ruangan</v-card-title>
        <v-card-text v-if="addWindow==false"> 
          <v-select
              v-model="form2.category"
              :items="categories"
              label="Kategori Ruangan"
              outlined
              light
          ></v-select>
          <v-select
              v-model="form2.artificial_light"
              :items="choices"
              label="Apakah diperlukan cahaya buatan pada ruang ini?"
              outlined
              light
          ></v-select>
          <v-select
              v-model="form2.artificial_cooler"
              :items="choices"
              label="Apakah diperlukan pendingin buatan pada ruang ini?"
              outlined
              light
          ></v-select>
          <v-text-field
              v-model="form2.size"
              height=20
              outlined
              label="Luas Ruangan (meter persegi)"
              prepend-inner-icon="mdi-border-all-variant"
              color="indigo"
              light
          ></v-text-field>
          <div class="item-top">
                <span class="item-title" style="color:black">Jendela/Ventilasi</span>
                <v-btn class="item-add" text icon @click="addWindow=true,typeInput3='new'">
                <v-icon color="orange" >mdi-plus-circle</v-icon>
                </v-btn>
            </div>
            <div v-if="windows.length<1" class="item-list isEmpty" style="margin-bottom:24px">
                <span>Tidak Terdapat Data</span>
            </div>
            <div v-else class="item-list" style="margin-bottom:24px">
                <div v-for="(window) in windows" :key="window.id">
                <v-list-item >
                    <v-list-item-icon>
                        <v-icon large color="indigo">mdi-window-closed-variant</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ window.type }}</v-list-item-title>
                        <v-list-item-subtitle>{{ window.placement }}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-menu bottom left>
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
            <v-btn dark tile small color="#FFFFFF" style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 120px;height: 39px;" @click="dialogRooms=false" class="elevation-0">
              Close
            </v-btn>
            <v-btn tile dark small color="#FFB802" style="border-radius: 2px;width: 120px;height: 39px;" @click="storeRoom()" class="elevation-0">
                Finish
            </v-btn>
          </div>
        </v-card-text>
        <v-card-text v-else> 
          <v-form v-model="isFormValid">
            <v-select
                v-model="form3.type"
                :items="windowTypes"
                label="Type"
                outlined
                light
                :rules="[rules.required]"
            ></v-select>
            <v-select
                v-model="form3.placement"
                :items="compass"
                label="Letak"
                outlined
                light
                :rules="[rules.required]"
            ></v-select>
            <v-text-field
                v-model="form3.size"
                height=20
                outlined
                label="Luas (meter persegi)"
                prepend-inner-icon="mdi-border-all-variant"
                color="indigo"
                light
                :rules="[rules.required,rules.numberOnly]"
            ></v-text-field>
          </v-form>
          <div style="display: flex; justify-content: flex-end">
            <v-btn dark tile small color="#FFFFFF" style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 120px;height: 39px;" @click="addWindow=false" class="elevation-0">
              Close
            </v-btn>
            <v-btn :disabled="!isFormValid" tile light small color="#FFB802" style="border-radius: 2px;width: 120px;height: 39px;color:white" @click="submitWindow()" class="elevation-0">
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
import {gmapApi} from 'vue2-google-maps'
export default {
  data () {
    return {
        form : {
           identity : null,
           address : null,
           construction_year : 0,
           land_size : 0,
           construction_size : 0,
           floor_size : 0,
           floors_number : 0,
           side_facing : null,
           number_of_adult_male : 0,
           number_of_adult_female : 0,
           number_of_boys : 0,
           number_of_girls : 0,
           number_of_married_couples : 0,
           designer : null,
           septic_tank : "Ya",
           grease_trap : "Ya",
           rain_water_managment : "Ya",
           kloset_leher_angsa : "Ya",
           fillColor : null,
           strokeColor : null,
           owner_id : null,
           disaster_status : null,
        },
        address : "",
        land_length : null,
        land_width : null,
        land_size : null,
        temp_land_size : null,
        form2 : {
          category : null,
          size : null,
          artificial_light : null,
          artificial_cooler : null,
          windows : [],
        },
        form3 : {
          type : null,
          size : null,
          placement : null,
        },
        optionmaps : {
          scrollwheel: false, mapTypeControl: false, draggable: false, disableDoubleClickZoom: true,zoomControl: false                      
        },
        optionmaps2 : {
          scrollwheel: true, mapTypeControl: true, draggable: true, disableDoubleClickZoom: false,zoomControl: true, clickableIcons: false                     
        },
        isFormValid: false, 
        idHouse: null,
        idRoom: null,
        categories : ["Ruang Tamu","Kamar Tidur","Kamar Mandi","Dapur","Gudang","Ruang Keluarga","Ruang Makan","Garasi"],
        compass: ["Utara","Barat Laut","Barat","Barat Daya","Selatan","Tenggara","Timur","Timur Laut"], 
        religions: ["Kristen","Katholik","Islam","Hindu","Budha","Konghucu"], 
        e1:0,
        lands:[],
        houses:[],
        windows:[],
        persons:[],
        savedImage:[],
        addWindow:false,
        showColor1:false,
        showColor2:false,
        dialog: false,
        dialogRooms: false,
        center: { lat:-7.779047, lng: 110.416957 },
        options : {strokeColor: '#3F5498',fillColor: '#3F5498',strokeWeight: 1},
        optionsConstruction : {strokeColor: '#98963F',fillColor: '#98963F',strokeWeight: 1},
        paths: [],
        constructionPaths: [],
        allPaths: [],
        mode: 'hexa',
        marker: false,
        windowTypes:["Jendela Hidup","Jendela Mati","Ventilasi"],
        designers : ["Sendiri","Tukang","Arsitek/Teknik Sipil/Kontraktor","Lainnya"],
        designers2 : ["Sendiri","Tukang","Arsitek/Teknik Sipil/Kontraktor","Lainnya"],
        disasterStatus : ["rendah","sedang","tinggi"],
        choices : ["Ya","Tidak"],
        genders : ["Laki-laki","Perempuan"],
        date: new Date().toISOString().substr(0, 10),
        modal: false,
        snackbar: false, 
        color: null,
        edited: false,
        text: '', 
        title: 'MASUKAN DATA RUMAH',
        typeInput: 'new',
        typeInput2: 'new',
        typeInput3: 'new',
        item:{},
        mapMode: false,
        data: new FormData,
        rooms:[],
        img: null,
        images : [],
        thumbnails : [],
        thumbnail : {
          display : null,
          base64 : null
        },
        rules: {
          required: value => !!value || 'Data is required',
          numberOnly: value => !isNaN(value) || 'Number Only',
          textOnly: value => RegExp(/^[A-Za-z ]+$/).test(value) || 'Text Only'
        },
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
    numberOfPerson(){
      const sumOfPerson = Number(this.form.number_of_adult_female) + Number(this.form.number_of_adult_male) + Number(this.form.number_of_boys) + Number(this.form.number_of_girls)
      return sumOfPerson
    },
    numberOfMale(){
      const sumOfPerson = Number(this.form.number_of_adult_male) + Number(this.form.number_of_boys)
      return sumOfPerson
    },
    numberOfFemale(){
      const sumOfPerson = Number(this.form.number_of_adult_female) + Number(this.form.number_of_girls)
      return sumOfPerson
    },
    isValid(){
      if(this.form.land_size < this.form.floor_size || this.form.land_size==null || this.form.floor_size==null){
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
    fillPerson(){
      this.persons = []
      for( var i = 0; i < this.numberOfMale; i++){ 
        this.persons.push({ religion : "", age : 0, gender : "Laki-laki"})
      }
      for( var i = 0; i < this.numberOfFemale; i++){ 
        this.persons.push({ religion : "", age : 0, gender : "Perempuan"})
      }
    },
    store(){
      var config = {
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
          }
      }
      var payload 
      console.log(this.form.constructor)
      if(this.edited==true)
      {
        this.data = new FormData
        this.data.append('identity', this.form.identity);
        this.data.append('disaster_status', this.form.disaster_status);
        this.data.append('fillColor', this.options.fillColor);
        this.data.append('strokeColor', this.options.strokeColor);
        this.data.append('owner_id',  this.$route.params.id);
        this.data.append('address', this.form.address);
        this.data.append('construction_year', this.form.construction_year);
        this.data.append('land_size', this.form.land_size);
        this.data.append('construction_size', this.form.construction_size);
        this.data.append('floor_size', this.form.floor_size);
        this.data.append('floors_number', this.form.floors_number);
        this.data.append('side_facing', this.form.side_facing);
        this.data.append('number_of_adult_male', this.form.number_of_adult_male);
        this.data.append('number_of_adult_female', this.form.number_of_adult_female);
        this.data.append('number_of_boys', this.form.number_of_boys);
        this.data.append('number_of_girls', this.form.number_of_girls);
        this.data.append('number_of_married_couples', this.form.number_of_married_couples);
        this.data.append('designer', this.form.designer);
        this.data.append('constructor', this.form.constructor);
        this.data.append('septic_tank', this.form.septic_tank);
        this.data.append('grease_trap', this.form.grease_trap);
        this.data.append('rain_water_managment', this.form.rain_water_managment);
        this.data.append('kloset_leher_angsa', this.form.kloset_leher_angsa);
        this.data.append('image', this.images);
        this.data.append('polygons',  JSON.stringify(this.paths[0]));
        this.data.append('persons',JSON.stringify(this.persons))
        // payload = {
        //   identity: this.form.identity,
        //   fillColor: this.options.fillColor,
        //   strokeColor: this.options.strokeColor,
        //   owner_id: this.$route.params.id,
        //   address : this.form.identity,
        //   construction_year : this.form.construction_year,
        //   land_size : this.form.land_size,
        //   construction_size : this.form.construction_size,
        //   floor_size : this.form.floor_size,
        //   floors_number : this.form.floors_number,
        //   side_facing : this.form.side_facing,
        //   number_of_adult_male : this.form.number_of_adult_male,
        //   number_of_adult_female : this.form.number_of_adult_female,
        //   number_of_boys : this.form.number_of_boys,
        //   number_of_girls : this.form.number_of_girls,
        //   number_of_married_couples : this.form.number_of_married_couples,
        //   designer : this.form.designer,
        //   constructor : this.form.constructor,
        //   septic_tank : this.form.septic_tank,
        //   grease_trap : this.form.grease_trap,
        //   rain_water_managment : this.form.rain_water_managment,
        //   kloset_leher_angsa : this.form.kloset_leher_angsa,
        //   polygons: JSON.stringify(this.paths[0])
        // }
      }
      else if(this.edited==false)
      {
          this.data = new FormData
          this.data.append('identity', this.form.identity);
          this.data.append('disaster_status', this.form.disaster_status);
          this.data.append('fillColor', this.options.fillColor);
          this.data.append('strokeColor', this.options.strokeColor);
          this.data.append('owner_id',  this.$route.params.id);
          this.data.append('address', this.form.address);
          this.data.append('construction_year', this.form.construction_year);
          this.data.append('land_size', this.form.land_size);
          this.data.append('construction_size', this.form.construction_size);
          this.data.append('floor_size', this.form.floor_size);
          this.data.append('floors_number', this.form.floors_number);
          this.data.append('side_facing', this.form.side_facing);
          this.data.append('number_of_adult_male', this.form.number_of_adult_male);
          this.data.append('number_of_adult_female', this.form.number_of_adult_female);
          this.data.append('number_of_boys', this.form.number_of_boys);
          this.data.append('number_of_girls', this.form.number_of_girls);
          this.data.append('number_of_married_couples', this.form.number_of_married_couples);
          this.data.append('designer', this.form.designer);
          this.data.append('constructor', this.form.constructor);
          this.data.append('septic_tank', this.form.septic_tank);
          this.data.append('grease_trap', this.form.grease_trap);
          this.data.append('rain_water_managment', this.form.rain_water_managment);
          this.data.append('kloset_leher_angsa', this.form.kloset_leher_angsa);
          this.data.append('image', this.images);
          this.data.append('polygons', JSON.stringify(this.paths));
          this.data.append('persons',JSON.stringify(this.persons))
        // payload = {
        //   identity: this.form.identity,
        //   fillColor: this.options.fillColor,
        //   strokeColor: this.options.strokeColor,
        //   owner_id: this.$route.params.id,
        //   address : this.form.identity,
        //   construction_year : this.form.construction_year,
        //   land_size : this.form.land_size,
        //   construction_size : this.form.construction_size,
        //   floor_size : this.form.floor_size,
        //   floors_number : this.form.floors_number,
        //   side_facing : this.form.side_facing,
        //   number_of_adult_male : this.form.number_of_adult_male,
        //   number_of_adult_female : this.form.number_of_adult_female,
        //   number_of_boys : this.form.number_of_boys,
        //   number_of_girls : this.form.number_of_girls,
        //   number_of_married_couples : this.form.number_of_married_couples,
        //   designer : this.form.designer,
        //   constructor : this.form.constructor,
        //   septic_tank : this.form.septic_tank,
        //   grease_trap : this.form.grease_trap,
        //   rain_water_managment : this.form.rain_water_managment,
        //   kloset_leher_angsa : this.form.kloset_leher_angsa,
        //   polygons: this.paths
        // }
      }
      if(this.editedConstruction == true){
        this.data.append('polygons_building', JSON.stringify(this.constructionPaths[0]));
      }else{
        this.data.append('polygons_building', JSON.stringify(this.constructionPaths));
      }
      // this.form.owner_id = this.$route.params.id;
      if (this.typeInput === 'new') {
        var uri = this.$apiUrl + '/house'
      } else {
        var uri = this.$apiUrl + '/house/'+this.$route.params.house;
      }
      this.$http.post(uri,this.data,config).then(response =>{
        this.snackbar = true; //mengaktifkan snackbar
        this.color = 'green'; //memberi warna snackbar
        this.text = 'Berhasil'; //memasukkan pesan ke snackbar
        this.e1=4
        this.idHouse=response.data.data.id;
        // this.$router.push({ name : 'ownerDetail',params:{id: this.$route.params.id}})
        }).catch(error =>{
        this.snackbar = true;
        this.text = error.response.data.errors;
        this.color = 'red';
        this.load = false;
      })
    },
    storeFinish(){
      var config = {
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
          }
      }
      if(this.edited==true)
      {
        this.data = new FormData
        this.data.append('identity', this.form.identity);
        this.data.append('disaster_status', this.form.disaster_status);
        this.data.append('fillColor', this.options.fillColor);
        this.data.append('strokeColor', this.options.strokeColor);
        this.data.append('owner_id',  this.$route.params.id);
        this.data.append('address', this.form.address);
        this.data.append('construction_year', this.form.construction_year);
        this.data.append('land_size', this.form.land_size);
        this.data.append('construction_size', this.form.construction_size);
        this.data.append('floor_size', this.form.floor_size);
        this.data.append('floors_number', this.form.floors_number);
        this.data.append('side_facing', this.form.side_facing);
        this.data.append('number_of_adult_male', this.form.number_of_adult_male);
        this.data.append('number_of_adult_female', this.form.number_of_adult_female);
        this.data.append('number_of_boys', this.form.number_of_boys);
        this.data.append('number_of_girls', this.form.number_of_girls);
        this.data.append('number_of_married_couples', this.form.number_of_married_couples);
        this.data.append('designer', this.form.designer);
        this.data.append('constructor', this.form.constructor);
        this.data.append('septic_tank', this.form.septic_tank);
        this.data.append('grease_trap', this.form.grease_trap);
        this.data.append('rain_water_managment', this.form.rain_water_managment);
        this.data.append('kloset_leher_angsa', this.form.kloset_leher_angsa);
        this.data.append('image', this.images);
        this.data.append('polygons',  JSON.stringify(this.paths[0]));
        this.data.append('persons',JSON.stringify(this.persons))
        // payload = {
        //   identity: this.form.identity,
        //   fillColor: this.options.fillColor,
        //   strokeColor: this.options.strokeColor,
        //   owner_id: this.$route.params.id,
        //   address : this.form.identity,
        //   construction_year : this.form.construction_year,
        //   land_size : this.form.land_size,
        //   construction_size : this.form.construction_size,
        //   floor_size : this.form.floor_size,
        //   floors_number : this.form.floors_number,
        //   side_facing : this.form.side_facing,
        //   number_of_adult_male : this.form.number_of_adult_male,
        //   number_of_adult_female : this.form.number_of_adult_female,
        //   number_of_boys : this.form.number_of_boys,
        //   number_of_girls : this.form.number_of_girls,
        //   number_of_married_couples : this.form.number_of_married_couples,
        //   designer : this.form.designer,
        //   constructor : this.form.constructor,
        //   septic_tank : this.form.septic_tank,
        //   grease_trap : this.form.grease_trap,
        //   rain_water_managment : this.form.rain_water_managment,
        //   kloset_leher_angsa : this.form.kloset_leher_angsa,
        //   polygons: JSON.stringify(this.paths[0])
        // }
      }
      else if(this.edited==false)
      {
          this.data = new FormData
          this.data.append('identity', this.form.identity);
          this.data.append('disaster_status', this.form.disaster_status);
          this.data.append('fillColor', this.options.fillColor);
          this.data.append('strokeColor', this.options.strokeColor);
          this.data.append('owner_id',  this.$route.params.id);
          this.data.append('address', this.form.address);
          this.data.append('construction_year', this.form.construction_year);
          this.data.append('land_size', this.form.land_size);
          this.data.append('construction_size', this.form.construction_size);
          this.data.append('floor_size', this.form.floor_size);
          this.data.append('floors_number', this.form.floors_number);
          this.data.append('side_facing', this.form.side_facing);
          this.data.append('number_of_adult_male', this.form.number_of_adult_male);
          this.data.append('number_of_adult_female', this.form.number_of_adult_female);
          this.data.append('number_of_boys', this.form.number_of_boys);
          this.data.append('number_of_girls', this.form.number_of_girls);
          this.data.append('number_of_married_couples', this.form.number_of_married_couples);
          this.data.append('designer', this.form.designer);
          this.data.append('constructor', this.form.constructor);
          this.data.append('septic_tank', this.form.septic_tank);
          this.data.append('grease_trap', this.form.grease_trap);
          this.data.append('rain_water_managment', this.form.rain_water_managment);
          this.data.append('kloset_leher_angsa', this.form.kloset_leher_angsa);
          this.data.append('image', this.images);
          this.data.append('polygons', JSON.stringify(this.paths));
          this.data.append('persons',JSON.stringify(this.persons))
        // payload = {
        //   identity: this.form.identity,
        //   fillColor: this.options.fillColor,
        //   strokeColor: this.options.strokeColor,
        //   owner_id: this.$route.params.id,
        //   address : this.form.identity,
        //   construction_year : this.form.construction_year,
        //   land_size : this.form.land_size,
        //   construction_size : this.form.construction_size,
        //   floor_size : this.form.floor_size,
        //   floors_number : this.form.floors_number,
        //   side_facing : this.form.side_facing,
        //   number_of_adult_male : this.form.number_of_adult_male,
        //   number_of_adult_female : this.form.number_of_adult_female,
        //   number_of_boys : this.form.number_of_boys,
        //   number_of_girls : this.form.number_of_girls,
        //   number_of_married_couples : this.form.number_of_married_couples,
        //   designer : this.form.designer,
        //   constructor : this.form.constructor,
        //   septic_tank : this.form.septic_tank,
        //   grease_trap : this.form.grease_trap,
        //   rain_water_managment : this.form.rain_water_managment,
        //   kloset_leher_angsa : this.form.kloset_leher_angsa,
        //   polygons: this.paths
        // }
      }
      if(this.editedConstruction == true){
        this.data.append('polygons_building', JSON.stringify(this.constructionPaths[0]));
      }else{
        this.data.append('polygons_building', JSON.stringify(this.constructionPaths));
      }
      // this.form.owner_id = this.$route.params.id;
      let uri = ''
      if (this.typeInput === 'new') {
        uri = this.$apiUrl + '/house'
      } else {
        uri = this.$apiUrl + '/house/'+this.$route.params.house;
      }
      this.$http.post(uri,this.data,config).then(response =>{
        this.snackbar = true; //mengaktifkan snackbar
        this.color = 'green'; //memberi warna snackbar
        this.text = 'Berhasil'; //memasukkan pesan ke snackbar
        this.e1=4
        this.idHouse=response.data.data.id;
        this.$router.push({ name : 'ownerDetail',params:{id: this.$route.params.id}})
        // this.$router.push({ name : 'ownerDetail',params:{id: this.$route.params.id}})
        }).catch(error =>{
        this.snackbar = true;
        this.text = error.response.data.errors;
        this.color = 'red';
        this.load = false;
      })
    },
    storeRoom(){
      var config = {
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
          }
      }
      var payload 
    
      payload = {
        category : this.form2.category,
        size : this.form2.size,
        artificial_light : this.form2.artificial_light,
        artificial_cooler : this.form2.artificial_cooler,
        house_id : this.idHouse,
        windows : this.windows
      }      
      // this.form.owner_id = this.$route.params.id;
      if (this.typeInput2 === 'new') {
        var uri = this.$apiUrl + '/room'
      } else {
        var uri = this.$apiUrl + '/room/'+this.idRoom
      }
      this.$http.post(uri,payload,config).then(response =>{
        this.snackbar = true; //mengaktifkan snackbar
        this.color = 'green'; //memberi warna snackbar
        this.text = 'Berhasil'; //memasukkan pesan ke snackbar
        this.getRooms();
        this.dialogRooms = false;
        this.resetForm2();
        // this.$router.push({ name : 'ownerDetail',params:{id: this.$route.params.id}})
        }).catch(error =>{
        this.snackbar = true;
        this.text = error.response.data.errors;
        this.color = 'red';
        this.load = false;
      })
    },
    submitWindow()
    {
        if(this.typeInput3=='new')
        {
          this.windows.push(JSON.parse(JSON.stringify(this.form3)))
        }
        else{
          console.log("ioi")
          var index = this.windows.indexOf(this.item);
          this.windows[index].type=this.form3.type
          this.windows[index].placement=this.form3.placement
          this.windows[index].size=this.form3.size
        }

        this.addWindow=false
        this.resetForm3()
    },
    deleteWindow(item)
    {
        var index = this.windows.indexOf(item);
        this.windows.splice(index, 1);
    },
    editWindow(item)
    {
        this.form3=item
        this.item=item
        this.typeInput3="edit"
        this.addWindow=true
    },
    editRoom(id)
    {
      this.typeInput2="edit"
      this.idRoom=id
      this.getRoomData()
      this.dialogRooms=true
    },
    resetForm2()
    {
      this.form2 = {
          category : null,
          size : null,
          artificial_light : null,
          artificial_cooler : null,
          windows : [],
      }
      this.windows=[]
    },
    resetForm3()
    {
      this.form3 = {
          type : null,
          size : null,
          placement : null,
      }
    },
    getPostData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.$http.get(this.$apiUrl + '/house/'+this.$route.params.house,config).then(response =>{
            this.form = response.data.data
            this.paths = response.data.data.polygon.data
            this.constructionPaths = response.data.data.polygon_building.data
            this.rooms = response.data.data.room.data
            this.persons = response.data.data.person.data
            this.savedImage = response.data.data.image.data
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
    getRoomData()
    {
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.$http.get(this.$apiUrl + '/room/'+this.idRoom,config).then(response =>{
            this.form2 = response.data.data
            this.windows = response.data.data.window.data
        })
    },
    deleteImage(id)
    {
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.$http.delete(this.$apiUrl + '/house/image/'+id,config).then(response =>{
            this.getPostData()
        })
    },
    deleteRoom(id)
    {
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.$http.delete(this.$apiUrl + '/room/'+id,config).then(response =>{
            this.getRooms()
        })
    },
    getRooms(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.$http.get(this.$apiUrl + '/house/room/'+this.idHouse,config).then(response =>{
            this.rooms = response.data.data
        })
    },
    uploadImg (e) {
      var file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('Anda hanya diperbolehkan mengupload foto/gambar')
        return false
      }
      var reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        
        this.img = data
        this.thumbnail.display=data
        // this.thumbnails.push(data)
      }

      reader.readAsArrayBuffer(file)
      var photo;
      var reader = new FileReader();
      reader.readAsDataURL(file); 
      reader.onload = (e) => {
          var base64data = reader.result;
          this.thumbnail.base64 = reader.result;  
          this.images.push(reader.result);
          console.log(base64data);
      }
      setTimeout(() => {  this.thumbnails.push(JSON.parse(JSON.stringify(this.thumbnail))) }, 500);
      
      // reader.onloadend = function() {
      //     var base64data = reader.result;   
      //     this.image.push(reader.result);
      //     console.log(base64data);
      // }      
    },
    clear (item) {
      var index = this.thumbnails.indexOf(item.display);
      this.thumbnails.splice(index, 1);
      var index = this.images.indexOf(item.base64);
      this.images.splice(index, 1);
    },
    async getAllData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        await this.$http.get(this.$apiUrl + '/owner-land/'+this.$route.params.id,config).then(response =>{
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
    // updateEdited(mvcArray) {
    //   for( var i = 0; i < this.houses.length; i++){ 
    //     if ( this.houses[i].id == this.$route.params.house) {
    //       this.houses.splice(i, 1); 
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
      for( var i = 0; i < this.houses.length; i++){ 
        if ( this.houses[i].id == this.$route.params.house) {
          this.houses.splice(i, 1); 
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
      for( var i = 0; i < this.houses.length; i++){ 
        if ( this.houses[i].id == this.$route.params.house) {
          this.houses.splice(i, 1); 
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
      this.form.floor_size = Math.floor(this.google.maps.geometry.spherical.computeArea(pathArea))
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
      for( var i = 0; i < this.lands.length; i++){ 
        if ( this.lands[i].id == this.$route.params.land) {
          this.lands.splice(i, 1); 
        }
      }
      this.marker=true
      this.paths=[]
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
      this.constructionPaths.push({lat : center.lat - (Math.sqrt(this.form.floor_size)*0.0000045125), lng : center.lng - (Math.sqrt(this.form.floor_size)*0.0000045125)})
      this.constructionPaths.push({lat : center.lat - (Math.sqrt(this.form.floor_size)*0.0000045125), lng : center.lng + (Math.sqrt(this.form.floor_size)*0.0000045125)})
      this.constructionPaths.push({lat : center.lat + (Math.sqrt(this.form.floor_size)*0.0000045125), lng : center.lng + (Math.sqrt(this.form.floor_size)*0.0000045125)})
      this.constructionPaths.push({lat : center.lat + (Math.sqrt(this.form.floor_size)*0.0000045125), lng : center.lng - (Math.sqrt(this.form.floor_size)*0.0000045125)})
      // this.land_size = this.google.maps.geometry.spherical.computeArea(path)
    },
    setPlace(place) {
			this.center.lat =  place.geometry.location.lat()
      this.center.lng =  place.geometry.location.lng()
      this.form.address = place.formatted_address
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
      this.getHouseData()
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
.title-detail{
  font-family: Roboto; //harusnya poppins
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 47px;
  color:black;
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
.title-photo{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;
  margin-bottom: 12px;
  /* identical to box height */

  color: #979797;
}
.box-photo{
  position: relative;
  background: #FFFFFF;
  border: 1px solid rgba(165, 165, 165, 0.25);
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content-photo{
  width: 100%;
  height: 80px;
  background: #F8F8F8;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.uploadButton{
  position:absolute; 
  opacity : 0;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
}
.iconCancel{
  position: absolute !important;
  right: 0;
  top: 0;
  float: right;
  z-index: 1;
}
</style>


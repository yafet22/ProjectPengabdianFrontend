<template>
    <div style="width: 100%">
        <div style="margin-bottom:64px">   
            <v-card
                color="#3A4D8C"
                class="elevation-0"
                dark
                style="margin-top:24px"
            >
                <v-card-title><v-icon large color="white" style="margin-right:8px">mdi-home-circle</v-icon>Kecukupan Ruangan</v-card-title>
                <v-card-text style="padding-left:26px;padding-right:26px;padding-bottom:26px;padding-top:12px">
                    <v-card
                        v-if="data.kecukupan_lahan_data.kecukupan_lahan"
                        color="green"
                        class="elevation-0"
                        dark
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                    Luas Lahan
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-happy-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'luaslahan'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card
                        v-else
                        color="red"
                        class="elevation-0"
                        dark
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                    Luas Lahan
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-sad-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'luaslahan'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>

                    <v-card
                        v-if="data.kecukupan_bangunan_data.kecukupan_bangunan"
                        color="green"
                        class="elevation-0"
                        dark
                        style="margin-top:24px"
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                    Luas Bangunan
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-happy-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'luasbangunan'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card
                        v-else
                        color="red"
                        class="elevation-0"
                        dark
                        style="margin-top:24px"
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                    Luas Bangunan
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-sad-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'luasbangunan'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-card-text>
            </v-card>

            <v-card
                color="#3A4D8C"
                class="elevation-0"
                dark
                style="margin-top:24px"
            >
                <v-card-title><v-icon large color="white" style="margin-right:8px">mdi-emoticon</v-icon>Psikologis</v-card-title>
                <v-card-text style="padding-left:26px;padding-right:26px;padding-bottom:26px;padding-top:12px">
                    <v-card
                        v-if="data.data_kamar_tidur.kecukupan_kamar_tidur"
                        color="green"
                        class="elevation-0"
                        dark
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                    Kecukupan Kamar Tidur
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-happy-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'kamartidur'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card
                        v-else
                        color="red"
                        class="elevation-0"
                        dark
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                    Kecukupan Kamar Tidur
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-sad-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'kamartidur'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>

                    <v-card
                        v-if="data.memiliki_kamar_mandi"
                        color="green"
                        class="elevation-0"
                        dark
                        style="margin-top:24px"
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                    Memiliki Kamar Mandi Dalam
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-happy-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'kamarmandi'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card
                        v-else
                        color="red"
                        class="elevation-0"
                        dark
                        style="margin-top:24px"
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                    Memiliki Kamar Mandi Dalam
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-sad-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'kamarmandi'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>

                    <v-card
                        v-if="data.memiliki_ruang_keluarga"
                        color="green"
                        class="elevation-0"
                        dark
                        style="margin-top:24px"
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                    Memiliki Ruang Keluarga
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-happy-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'ruangkeluarga'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card
                        v-else
                        color="red"
                        class="elevation-0"
                        dark
                        style="margin-top:24px"
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                    Memiliki Ruang Keluarga
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-sad-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'ruangkeluarga'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-card-text>
            </v-card>

            <v-card
                color="#3A4D8C"
                class="elevation-0"
                dark
                style="margin-top:24px"
            >
                <v-card-title><v-icon large color="white" style="margin-right:8px">mdi-lightbulb-on</v-icon>Pencahayaan</v-card-title>
                <v-card-text style="padding-left:26px;padding-right:26px;padding-bottom:26px;padding-top:12px">
                    <div v-for="(room) in data.data_ruangan" :key="room.index">
                        <v-card
                            v-if="room.kecukupan_cahaya"
                            color="green"
                            class="elevation-0"
                            dark
                        >
                            <v-row style="padding-right:24px;padding-left:24px">
                                <v-col col="6">
                                    <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                        {{ room.category }}
                                    </div>
                                </v-col>
                                <v-col col="6">
                                    <div style="float: right;">
                                        <v-icon large color="white">mdi-emoticon-happy-outline</v-icon>
                                    </div>
                                </v-col>
                            </v-row>
                            <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                            <v-card-actions style="padding-right:16px;padding-left:16px">
                                <v-btn text>Detail</v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-card
                            v-else
                            color="red"
                            class="elevation-0"
                            dark
                        >
                            <v-row style="padding-right:24px;padding-left:24px">
                                <v-col col="6">
                                    <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                        {{ room.category }}
                                    </div>
                                </v-col>
                                <v-col col="6">
                                    <div style="float: right;">
                                        <v-icon large color="white">mdi-emoticon-sad-outline</v-icon>
                                    </div>
                                </v-col>
                            </v-row>
                            <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                            <v-card-actions style="padding-right:16px;padding-left:16px">
                                <v-btn text>Detail</v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                </v-card-text>
            </v-card>

            <v-card
                color="#3A4D8C"
                class="elevation-0"
                dark
                style="margin-top:24px"
            >
                <v-card-title><v-icon large color="white" style="margin-right:8px">mdi-weather-windy</v-icon>Penghawaan</v-card-title>
                <v-card-text style="padding-left:26px;padding-right:26px;padding-bottom:26px;padding-top:12px">
                    <div v-for="(room) in data.data_ruangan" :key="room.index">
                        <v-card
                            v-if="room.kecukupan_penghawaan"
                            color="green"
                            class="elevation-0"
                            dark
                        >
                            <v-row style="padding-right:24px;padding-left:24px">
                                <v-col col="6">
                                    <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                        {{ room.category }}
                                    </div>
                                </v-col>
                                <v-col col="6">
                                    <div style="float: right;">
                                        <v-icon large color="white">mdi-emoticon-happy-outline</v-icon>
                                    </div>
                                </v-col>
                            </v-row>
                            <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                            <v-card-actions style="padding-right:16px;padding-left:16px">
                                <v-btn text>Detail</v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-card
                            v-else
                            color="red"
                            class="elevation-0"
                            dark
                        >
                            <v-row style="padding-right:24px;padding-left:24px">
                                <v-col col="6">
                                    <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                        {{ room.category }}
                                    </div>
                                </v-col>
                                <v-col col="6">
                                    <div style="float: right;">
                                        <v-icon large color="white">mdi-emoticon-sad-outline</v-icon>
                                    </div>
                                </v-col>
                            </v-row>
                            <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                            <v-card-actions style="padding-right:16px;padding-left:16px">
                                <v-btn text>Detail</v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                </v-card-text>
            </v-card>

            <v-card
                color="#3A4D8C"
                class="elevation-0"
                dark
                style="margin-top:24px"
            >
                <v-card-title><v-icon large color="white" style="margin-right:8px">mdi-toilet</v-icon>Sanitasi dan Drainase</v-card-title>
                <v-card-text style="padding-left:26px;padding-right:26px;padding-bottom:26px;padding-top:12px">
                    <v-card
                        v-if="data.data_kamar_tidur.kloset_leher_angsa"
                        color="green"
                        class="elevation-0"
                        dark
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                   Kloset Leher Angsa
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-happy-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'kloset'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card
                        v-else
                        color="red"
                        class="elevation-0"
                        dark
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                    Kloset Leher Angsa
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-sad-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'kloset'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>

                    <v-card
                        v-if="data.septic_tank"
                        color="green"
                        class="elevation-0"
                        dark
                        style="margin-top:24px"
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                    Septic Tank
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-happy-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'septictank'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card
                        v-else
                        color="red"
                        class="elevation-0"
                        dark
                        style="margin-top:24px"
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                    Septic Tank
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-sad-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'septictank'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>

                    <v-card
                        v-if="data.grease_trap"
                        color="green"
                        class="elevation-0"
                        dark
                        style="margin-top:24px"
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                    Penyaringan Lemak
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-happy-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'greasetrap'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card
                        v-else
                        color="red"
                        class="elevation-0"
                        dark
                        style="margin-top:24px"
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                    Penyaringan Lemak
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-sad-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'greasetrap'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>

                    <v-card
                        v-if="data.rain_water_managment"
                        color="green"
                        class="elevation-0"
                        dark
                        style="margin-top:24px"
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                    Pengelolaan Air Hujan
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-happy-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'rainwater'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card
                        v-else
                        color="red"
                        class="elevation-0"
                        dark
                        style="margin-top:24px"
                    >
                        <v-row style="padding-right:24px;padding-left:24px">
                            <v-col col="6">
                                <div style="display: flex;height:100%;align-items: center;font-weight:bold;font-size:18px">
                                    Pengelolaan Air Hujan
                                </div>
                            </v-col>
                            <v-col col="6">
                                <div style="float: right;">
                                    <v-icon large color="white">mdi-emoticon-sad-outline</v-icon>
                                </div>
                            </v-col>
                        </v-row>
                        <hr style="margin-left: 18px;margin-right: 18px;opacity: 50%;">
                        <v-card-actions style="padding-right:16px;padding-left:16px">
                            <v-btn text @click="$router.push({ name : 'rumahSehatDetail',params:{id: id,type:'rainwater'}})">Detail</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
export default {
    data () {
    return {
        data : {
           kecukupan_lahan_data : {
               kecukupan_lahan : true,
               luas_lahan : 0,
               jumlah_orang : 0,
           },
           kecukupan_bangunan_data : {
               kecukupan_bangunan : true,
               luas_bangunan : 0,
               jumlah_orang : 0,
           },
           data_kamar_tidur : {
                jumlah_saat_ini : 0,
                jumlah_seharusnya : 0,
                kecukupan_kamar_tidur : true,
           },
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
        id : null,
    }
  },
  methods:{
    getRumahSehatData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.$http.get(this.$apiUrl + '/rumah-sehat/'+this.$route.params.id,config).then(response =>{
            this.data = response.data
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
    this.getRumahSehatData()
    this.id=this.$route.params.id
  },
}
</script>

<style>

</style>
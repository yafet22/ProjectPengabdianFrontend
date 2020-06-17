<template>
  <div style="width: 100%">
      <!-- <div style="margin-top:8px">
          <img :src="require('@/assets/house1.svg')" style="display: block;margin-left: auto;margin-right: auto;width: 360px;"/>
      </div> -->
        <div v-if="type=='luaslahan'" style="margin-bottom:64px">
            <div style="text-align:center;margin-top:16px">
                <span style="display:inline-block;border-bottom:1px solid #3A4D8C;border-bottom-width: medium;;padding-bottom:2px;color:#3A4D8C;">
                    <h1 style="">Kecukupan Ruang Lahan</h1>
                </span>
            </div>
            <div style="margin-top:28px">
                <v-card
                    color="green"
                    class="elevation-0"
                    dark
                    v-if="data.kecukupan_lahan_data.kecukupan_lahan"
                >
                <v-card-title class="headline">Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    {{data.kecukupan_lahan_data.luas_lahan}}m<sup>2</sup> / {{data.kecukupan_lahan_data.jumlah_orang}} orang penghuni
                </v-card-subtitle>
                </v-card>
                <v-card
                    color="red"
                    class="elevation-0"
                    dark
                    v-else
                >
                <v-card-title class="headline">Tidak Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    {{data.kecukupan_lahan_data.luas_lahan}}m<sup>2</sup> / {{data.kecukupan_lahan_data.jumlah_orang}} orang penghuni
                </v-card-subtitle>
                </v-card>
                <div style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Luas lahan anda dikategorikan SEHAT sesuai dengan standar berikut</p>
                    <div style="background-color:#FF9800;display: block;margin-left: 80px;margin-right: 80px;color:white;padding:8px;font-weight:bold">
                        60m<sup>2</sup> / 4 orang penghuni 
                    </div>
                </div>
            </div>
            <div class="suggestion-box">
                <div class="suggestion-header">
                    <h2>Saran Tindakan</h2>
                </div>
                <div v-if="data.kecukupan_lahan_data.kecukupan_lahan" class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Lahan yang ada dibersihkan secara rutin
                        </li>
                    </ul>
                </div>
                <div v-else class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Bangunlah rumah bertingkat dengan lahan terbuka yang memadai
                        </li>
                    </ul>
                </div>
            </div>
            <div class="negative-box">
                <div class="negative-header">
                    <h2>Efek Tidak Mencukupi</h2>
                </div>
                <div class="negative-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Ruang negatif, tidak berfungsi, sulit dibersihkan.
                        </li>
                        <li>
                            Tidak ada cahaya, tidak ada udara di luar dan di dalam rumah.
                        </li>
                        <li>
                            Infrastruktur sulit direncanakan dan diperbaiki.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else-if="type=='luasbangunan'" style="margin-bottom:64px">
            <div style="text-align:center;margin-top:16px">
                <span style="display:inline-block;border-bottom:1px solid #3A4D8C;border-bottom-width: medium;;padding-bottom:2px;color:#3A4D8C;">
                    <h1 style="">Kecukupan Ruang Bangunan</h1>
                </span>
            </div>
            <div style="margin-top:28px">
                <v-card
                    color="green"
                    class="elevation-0"
                    dark
                    v-if="data.kecukupan_bangunan_data.kecukupan_bangunan"
                >
                <v-card-title class="headline">Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    {{data.kecukupan_bangunan_data.luas_bangunan}}m<sup>2</sup> / {{data.kecukupan_bangunan_data.jumlah_orang}} orang penghuni
                </v-card-subtitle>
                </v-card>
                <v-card
                    color="red"
                    class="elevation-0"
                    dark
                    v-else
                >
                <v-card-title class="headline">Tidak Mencukupi</v-card-title>

                <v-card-subtitle style="font-weight:bold;font-size:18px">
                    {{data.kecukupan_bangunan_data.luas_bangunan}}m<sup>2</sup> / {{data.kecukupan_bangunan_data.jumlah_orang}} orang penghuni
                </v-card-subtitle>
                </v-card>
                <div style="margin-top:20px;text-align:center">
                    <p style="font-size:24px;font-weight:bold">Luas bangunan anda dikategorikan SEHAT sesuai dengan standar berikut</p>
                    <div style="background-color:#FF9800;display: block;margin-left: 80px;margin-right: 80px;color:white;padding:8px;font-weight:bold">
                        9m<sup>2</sup> / 1 orang penghuni 
                    </div>
                </div>
            </div>
            <div class="suggestion-box">
                <div class="suggestion-header">
                    <h2>Saran Tindakan</h2>
                </div>
                <div v-if="data.kecukupan_bangunan_data.kecukupan_bangunan" class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Rumah untuk berlindung, beristirahat, dan aktivitas produktif.
                        </li>
                        <li>
                            Rumah untuk sarana pembinaan keluarga sehingga memiliki kehidupan yang sehat secara fisik, mental, dan sosial.
                        </li>
                    </ul>
                </div>
                <div v-else class="suggestion-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Penataan dan pemilihan perabotan hemat ruang.
                        </li>
                        <li>
                            Pembagian ruang efisien dan efektif.
                        </li>
                        <li>
                            Prioritas aktivitas tertentu.
                        </li>
                    </ul>
                </div>
            </div>
            <div class="negative-box">
                <div class="negative-header">
                    <h2>Efek Tidak Mencukupi</h2>
                </div>
                <div class="negative-body">
                    <ul style="list-style-type: square;">
                        <li>
                            Ruang beraktivitas kurang dan ruang gerak terbatas.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
       <!-- <v-card
            class="mx-auto"
            color="#26c6da"
            dark
        >
            <v-card-title>
            <v-icon
                large
                left
            >
                mdi-twitter
            </v-icon>
            <span class="title font-weight-light">Twitter</span>
            </v-card-title>
            <v-card-text class="headline font-weight-bold">
            "Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."
            </v-card-text>
        </v-card> -->
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
        houseID : null,
        type : null,
        isAppropriate : false
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
    }
  },
  mounted(){
    this.getRumahSehatData()
    this.houseID = this.$route.params.id;
    this.type=this.$route.params.type;
    // this.isAppropriate=this.$route.params.result
  },
}
</script>

<style lang="scss" scoped>
    .suggestion-box{
        margin-top:24px;
        border:4px solid #03A9F4;
        border-radius:4px;
        .suggestion-header{
            text-align:center;
            background-color:#03A9F4;
            color:white  
        }
        .suggestion-body{
            padding: 8px;
            font-size: 18px; 
        }
    }

    .negative-box{
        margin-top:24px;
        border:4px solid #F44336;
        border-radius:4px;
        .negative-header{
            text-align:center;
            background-color:#F44336;
            color:white  
        }
        .negative-body{
            padding: 8px;
            font-size: 18px; 
        }
    }
</style>


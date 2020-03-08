<template>
  <div style="width: 100%">
      <h2 style="text-align:center">Data Bangunan Publik</h2>
      <gmap-map :center="center" :zoom="18" :options="optionmaps " style="width: 100%;margin-top:16px;height:200px" @click="markerPlace($event)">
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
                Type : 
            </span>
            {{ data.type}}
          </div>
          <div class="detail-text">
            <span>
                Pemilik : 
            </span>
            {{ data.owner}}
          </div>
          <div class="detail-text">
            <span>
                Alamat : 
            </span>
            {{ data.address}}
          </div>
          <div class="detail-text">
            <span>
                Fungsi : 
            </span>
            {{ data.function}}
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
                Jumlah Kamar Mandi : 
            </span>
            {{ data.number_of_bathrooms }}
          </div>
          <div class="detail-text">
            <span>
                Ketersediaan Genset : 
            </span>
            {{ data.genset }}
          </div>
          <div class="detail-text">
            <span>
                Sumber Air : 
            </span>
            {{ data.water_sources }}
          </div>
          <div class="detail-text">
            <span>
                Ukuran Tandon : 
            </span>
            {{ data.reservoir_size }}
          </div>
          <div class="detail-text">
            <span>
                Lebar Jalan Masuk : 
            </span>
            {{ data.width_of_building_entrance }}
          </div>
      </div> 
  </div>
</template>

<script>
export default {
    data () {
    return {
        data : {
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
        },
        optionmaps : {
          scrollwheel: true, mapTypeControl: false, draggable: true, disableDoubleClickZoom: true,zoomControl: false                      
        },
        center: { lat:-7.779047, lng: 110.416957 },
        marker: false,
        options : {strokeColor: '#3F5498',fillColor: '#3F5498',strokeWeight: 1},
        paths: [],
    }
  },
  methods:{
    getPostData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        this.$http.get(this.$apiUrl + '/publicbuilding/'+this.$route.params.id,config).then(response =>{
            this.data = response.data.data
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
  },
  mounted(){
    this.getPostData()
  },
}
</script>

<style>

</style>
<template>
  <div style="width: 100%">
    <v-flex xs12 md12 lg12 xl3>
        <v-card
        class="mx-auto elevation-0"
        color="#FFFFFF"
        dark
        style="border: 1px solid rgba(151, 151, 151, 0.25);box-sizing: border-box;border-radius: 4px;"
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
                label="Identitas Ternak"
                prepend-inner-icon="mdi-cow"
                color="indigo"
                light
            ></v-text-field>
            <v-text-field
                v-model="form.weight"
                height=20
                outlined
                label="Berat"
                prepend-inner-icon="mdi-weight-kilogram"
                color="indigo"
                light
            ></v-text-field>
            <v-select
            v-model="form.species"
            :items="species"
            label="Jenis Ternak"
            outlined
            light
            ></v-select>
            <v-select
            v-model="form.gender"
            :items="gender"
            label="Jenis Kelamin"
            outlined
            light
            ></v-select>
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
    </v-flex>
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
import store from '../../store'
export default {
  data () {
    return {
        form : {
           identity : null,
           weight : null,
           species : null,
           gender : null,
           owner_id : null,
        }, 
        species : ["Ayam","Sapi","Bebek",'Kambing','Domba'],
        gender : ["Jantan","Betina"],
        date: new Date().toISOString().substr(0, 10),
        modal: false,
        snackbar: false, 
        color: null,
        text: '', 
        title: 'MASUKAN DATA TERNAK',
        typeInput: 'new',
    }
  },
  methods:{
    store(){
      var config = {
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
          }
      }
      this.form.owner_id = this.$route.params.id;
      if (this.typeInput === 'new') {
        var uri = this.$apiUrl + '/livestock'
      } else {
        var uri = this.$apiUrl + '/livestock/'+this.$route.params.livestock;
      }
      this.$http.post(uri,this.form,config).then(response =>{
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
        this.$http.get(this.$apiUrl + '/livestock/'+this.$route.params.livestock,config).then(response =>{
            this.form = response.data.data
        })
    },
  },
  mounted(){
      if (this.$route.params.livestock){
          this.title = "UBAH DATA TERNAK"
        //   this.links.push({text: this.$route.params.slug, disabled: false, to:{name: 'DetailEvent', params:{slug: this.$route.params.slug}}})
          this.typeInput = 'edit'
        //   this.changeImg = 3
        //   this.links.push({text: 'Update', disabled: true})
          this.getPostData()
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


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
                {{title}}
            </div>
        </div>
        <div class="card-body">
        <v-card-text style="padding:24px">
            <v-text-field
                v-model="form.name"
                height=20
                outlined
                label="Nama"
                prepend-inner-icon="mdi-account"
                color="indigo"
                light
            ></v-text-field>
            <v-text-field
                  v-model="form.place_of_birth"
                  height=20
                  outlined
                  label="Tempat Lahir"
                  prepend-inner-icon="mdi-map-marker"
                  color="indigo"
                  light
            ></v-text-field>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="form.date_of_birth"
              persistent
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="form.date_of_birth"
                  outlined
                  label="Tanggal Lahir"
                  prepend-inner-icon="mdi-calendar-range"
                  color="indigo"
                  light
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="form.date_of_birth" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(form.date_of_birth)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
            <div style="display: flex; justify-content: flex-end">
              <v-btn tile small color="#FFFFFF" style="border: 1px solid rgba(151, 151, 151, 0.45);color:#979797;box-sizing: border-box;border-radius: 2px;width: 120px;height: 39px;margin-right:15px" @click="$router.go(-1)" class="elevation-0">
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
           name : null,
           date_of_birth : null,
           place_of_birth : null,
        }, 
        date: new Date().toISOString().substr(0, 10),
        modal: false,
        snackbar: false, 
        color: null,
        text: '', 
        typeInput: 'new',
        title: 'MASUKAN DATA PEMILIK'
    }
  },
  methods:{
    store(){
      var config = {
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
          }
      }
          if (this.typeInput === 'new') {
            var uri = this.$apiUrl + '/owner'
          } else {
            var uri = this.$apiUrl + '/owner/'+this.$route.params.id;
          }
          this.$http.post(uri,this.form,config).then(response =>{
            this.snackbar = true; //mengaktifkan snackbar
            this.color = 'green'; //memberi warna snackbar
            this.text = 'Berhasil'; //memasukkan pesan ke snackbar
            this.$router.push({ name : 'ownerDetail',params:{id: response.data.data.id}})
          }).catch(error =>{
            this.snackbar = true;
            this.text = error.response.data.errors;
            this.color = 'red';
            this.load = false;
        })
    },
    getData(){
        var config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        var uri = this.$apiUrl + '/inputs/'+this.$route.params.id;
            this.$http.get(uri,config).then(response =>{
                this.form=response.data.data;
            }
        )
      },
  },
  mounted(){
      if (this.$route.params.id){
          this.title = "UBAH DATA PEMILIK"
        //   this.links.push({text: this.$route.params.slug, disabled: false, to:{name: 'DetailEvent', params:{slug: this.$route.params.slug}}})
          this.typeInput = 'edit'
        //   this.changeImg = 3
        //   this.links.push({text: 'Update', disabled: true})
          this.getData()
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


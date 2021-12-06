<template>
    <v-container fluid fill-height class="loginOverlay">
          <v-layout flex align-center justify-center>
            <v-flex xs12 sm12 elevation-6>
              <v-toolbar class="pt-5 blue darken-4">
                <v-toolbar-title class="white--text"><h4 class="mb-4">Connecter à Ecole et Niveau</h4></v-toolbar-title>                
              </v-toolbar>
              <v-card>
                <v-card-text class="pt-4">
                  <div>
                      <v-form ref="form" v-model="valid">
                        <v-layout justify-space-between>
                        <v-row>
                          <v-col
                           cols="12"
                              sm="6"
                              md="4">
                           <v-select                            
                            v-model="departement"
                            :items="departements"
                            :rules="[v => !!v || 'Item is required']"
                            label="Département"
                            required
                            @change="getData('departements', departement)"
                            ></v-select>
                           
                          </v-col>
                          <v-col  cols="12"
                            sm="6"
                               md="4">
                              <v-select
                            v-if = "districts.length > 0"
                            v-model="district"
                            :items="districts"
                            :rules="[v => !!v || 'Item is required']"
                            label="District"
                            required
                            @change="getData('districts', district)"
                            ></v-select>                           
                          </v-col>
                          <v-col
                           cols="12"
                            sm="6"
                               md="4">
                           <v-select
                            v-if = "communes.length > 0"
                            v-model="commune"
                            :items="communes"
                            :rules="[v => !!v || 'Item is required']"
                            label="Commune"
                            required
                            @change="getData('communes', commune)"
                            ></v-select>
                           
                          </v-col>
                          <v-col  cols="12"
                              sm="6"
                              md="4">
                           <v-select
                           v-if = "zones.length > 0"
                            v-model="zone"
                            :items="zones"
                            :rules="[v => !!v || 'Item is required']"
                            label="Zones"
                            required
                            @change="getData('zones', zone)"
                            ></v-select>
                           
                          </v-col>
                        
                          <v-col  cols="12"
                            sm="6"
                            md="8">
                           <v-select
                           v-if = "ecoles.length > 0"
                            v-model="ecole"
                            :items="ecoles"
                            :rules="[v => !!v || 'Item is required']"
                            label="Ecole"
                            required
                            @change="getData('ecoles', ecole)"
                            ></v-select>                           
                          </v-col>
                       
                       
                       <div v-if="niveaux.length > 0" class="check"> 
                          <v-col  cols="12"
                            sm="3"                              
                              md="3">
                          <v-checkbox
                             v-if="niveaux[3]"
                            v-model="pres"
                            label="Prescolaire"
                            value=""
                          ></v-checkbox>                           
                          </v-col>
                            <v-col  cols="12"
                             sm="3"                             
                              md="4">
                          <v-checkbox
                            v-if="niveaux[2]"
                            v-model="prem"
                            label="1e et 2e Cycle"
                            value=""
                          ></v-checkbox>                           
                          </v-col>
                         
                           <v-col  cols="12"
                            sm="3"                              
                              md="2">
                          <v-checkbox
                        v-if="niveaux[1]"
                            v-model="premf"
                            label="3e Cycle"
                            value=""
                          ></v-checkbox>                           
                          </v-col>
                         
                         <v-col cols="12"
                            sm="3"                             
                              md="3">
                          <v-checkbox
                             v-if="niveaux[0]"
                            v-model="sec"
                            label="Secondaire"
                            value=""
                          ></v-checkbox>                           
                          </v-col>
                       </div>
                                               
                           <v-col  
                           cols="12"
                              sm="6"
                             md="12">
                            <v-btn :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                             @click="store_responsable">
                              <v-progress-circular
                                v-if="loading"
                                :disabled="loading"
                                :size="30"
                                color="white"
                                indeterminate
                              />
                             Inscrire</v-btn>
                             </v-col>
                          </v-row>  
                        </v-layout>
                      </v-form>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
       </v-container>  

</template>

<script>
  
    import {mapGetters} from 'vuex'
  export default {    
    data () {
          return {
            valid: false,
            district: '',
            commune: '',
            zone: '',
            ecole: '',
            niveau: '',
            loading:false,
            departement: '',
            departements: [],
            districts: [],
            communes: [],
            zones: [],
            ecoles: [],
            niveaux: [],
            phone: '',
            e1: false,
           sec: false,
           premf:false,
           prem: false,
           pres:false,
          }
        },
        computed: {
          ...mapGetters('auth', ['user']),
        },
        mounted(){
          this.get_dept();
        }, 
        methods: {

     
       async store_responsable () {
          
            if (!this.$refs.form.validate()) {             
                  return false
            }
             this.loading =true
            const niv = this.sec +'|'+ this.premf +'|'+ this.prem +'|'+ this.pres;
            const data = {niveau:niv, ecole_id:this.ecole, user_id:this.user.id};
            this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
            await this.$axios.post('store-responsable', JSON.stringify(data)).then(response => {               
                if(response.data.status === 1) {
                 // localStorage.setItem('responsable', response.data.user_id)
                   this.$notifier.showMessage({ content: 'Inscription réussie', color: 'success' })
                  this.$router.push({ name: 'confirmation' }) 
                } 
                else{
                   this.$notifier.showMessage({ content: 'Echec', color: 'error' })
                }
             })
              this.loading =false
              
          },
          clear () {
            this.$refs.form.reset()
          },
          split_data (data){
            this.niveaux = [];
              this.niveaux.push( parseInt(data.substring(0,1)));
              this.niveaux.push( parseInt(data.substring(1,2)));
              this.niveaux.push( parseInt(data.substring(2,3)));
              this.niveaux.push( parseInt(data.substring(3,4)));
          },

          async get_dept(){
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
            await this.$axios.get( 'departement').then( response => {
                  this.departements = response.data;
                  })
          },
          getData (data, value){
              if (data === 'departements'){
                 this.communes =[]
                 this.zones = []
                  this.ecoles = []                 
                  this.niveaux = []
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                this.$axios.get( 'get-departement/'+ this.departement).then( response => {
                  this.districts = response.data;
                })
                 
              }
              if (data === 'districts'){
                  this.zones = []
                  this.ecoles = []
                  this.niveaux = []
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get( 'get-district/'+ this.district).then( response => {
                  this.communes = response.data;
                })
                 
              }
              if (data === 'communes'){
                  this.ecoles = []
                  this.niveaux = []
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get( 'get-commune/'+ this.commune).then( response => {
                  this.zones = response.data;
                 })
              }
              if (data === 'zones'){
                  this.niveaux = []
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get( 'get-zone/'+ this.zone).then( response => {
                  this.ecoles = response.data;
                 })
              }
              if (data === 'ecoles'){
                 this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                  this.$axios.get( 'get-ecole/'+ this.ecole).then( response => {                   
                 this.split_data(response.data.text);
                })
              }
             }
        },
 }
 </script> 
 
 <style>
 .check{
   display: flex;
   flex-direction: row;
 }
 </style>
 
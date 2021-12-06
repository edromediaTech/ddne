<template>
    <v-container fluid fill-height class="loginOverlay">
          <v-layout flex align-center justify-center>
            <v-flex xs12 sm12 elevation-6>
              <v-toolbar class="pt-5 info">
                <v-toolbar-title class="white--text"><h4 class="mb-4">Info inspecteur</h4></v-toolbar-title>                
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
                              md="6">
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
                               md="6">
                              <v-select
                            v-if = "districts.length > 0"
                            v-model="inspecteur.district_id"
                            :items="districts"
                            :rules="[v => !!v || 'Item is required']"
                            label="District"
                            required
                           
                            ></v-select>                           
                          </v-col>
                                                 
                    
                        <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="inspecteur.nom"
                          label="Nom"
                           :rules="[v => !!v || 'Champ obligatoire']"
                           maxlength="25"
                           required
                        />
                      </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="inspecteur.prenom"
                          label="Prénom"
                           maxlength="55"
                           :rules="[v => !!v || 'Champ obligatoire']"
                           required
                        />                        
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="2"
                      >
                        <v-select
                          v-model="inspecteur.type"
                          label="Type"
                            :items="[{text:'Principal', value:1}, {text:'Secondaire', value:2}, {text:'Prescolaire', value:0}]"
                          
                           required
                        />                        
                      </v-col>
                       <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="inspecteur.tel"
                          label="Tel"
                          type="number"
                           maxlength="15"
                        />
                      </v-col>
                       <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="inspecteur.nif"
                          label="NIF"
                          type="number"
                           maxlength="15"
                        />
                      </v-col>
                       <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="inspecteur.datefonction"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template #activator="{ on, attrs }">
                            <v-text-field
                              v-model="inspecteur.datefonction"
                              label="Date Affectation"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="inspecteur.datefonction"
                            no-title
                             :rules="[v => !!v || 'Champ obligatoire']"
                           required
                            scrollable
                          >
                            <v-spacer />
                            <v-btn
                              text
                              color="primary"
                              @click="menu = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(inspecteur.datefonction)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                        <!-- </v-row>
                        <v-row> -->
                                       
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
           // district: '',
            commune: '',
           
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
            menu: false,
             modal: false,
             menu2: false,
          inspecteur:{
            nom:'',
            prenom: '',
            nif:'',
            tel: '',
             district_id: '',
            datefonction:'',
            user_id:'',
          }
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
            
            this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
            this.inspecteur.user_id = this.user.id
            await this.$axios.post('store-ip',this.inspecteur).then(response => {               
                if(response.data.ip.status === 1) { 
                  localStorage.setItem('id', response.data.user_id)                
                  // localStorage.setItem('type', response.data.ip.type)                
                  localStorage.setItem('ip', response.data.id)                
                  this.$notifier.showMessage({ content: 'Inscription réussie', color: 'success' }) 
                   this.$router.push({ name: 'dashIp' }) 
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
 
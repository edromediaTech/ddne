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
                               <v-col cols="12"
                 sm="6"          
              md="4">
            <v-select                            
            v-model="classe"
            :items="classes"
            :rules="[v => !!v || 'Choisir classe']"
            label="Classe"
            required
            @change="getEleves"
            ></v-select>
                           
            </v-col>
                        <v-row>
                          <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedItem.nom"
                          label="Nom"
                           :rules="[v => !!v || 'Champ obligatoire']"
                           required
                        />
                      </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedItem.prenom"
                          label="Prénom"
                           :rules="[v => !!v || 'Champ obligatoire']"
                           required
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-select
                          v-model="editedItem.sexe"
                          :items="[{text:'Masculin', value:1}, {text:'Féminin', value:0}]"
                          label="Sexe"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedItem.lieunais"
                          label="Lieu de Naissance"
                           :rules="[v => !!v || 'Champ obligatoire']"
                           required
                        />
                      </v-col>
                     <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-select
                          v-model="editedItem.dept_n"
                          :items="departements"
                          label="Departement de Naissance"
                           :rules="[v => !!v || 'Champ obligatoire']"
                           required
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="editedItem.datenais"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template #activator="{ on, attrs }">
                            <v-text-field
                              v-model="editedItem.datenais"
                              label="Date Naissance"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="editedItem.datenais"
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
                              @click="$refs.menu.save(editedItem.datenais)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        md="5"
                      >
                        <v-text-field
                          v-model="editedItem.prenom_mere"
                          label="Prénom de la Mère"
                        />
                      </v-col>
                        <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                          v-model="editedItem.tel_persrep"
                          label="Tel Responsable"
                          type="number"
                        />
                      </v-col>
                       <v-col
                        cols="12"
                        sm="6"
                        md="3"
                      >
                        <v-select
                          v-model="editedItem.deficience"
                          :items="[ {text:'Non', value:0},{text:'Oui', value:1}]"
                          label="Deficience"
                        />
                      </v-col>                            
                    </v-row>
                           <v-row>                    
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
            classe: '',
            classes: [],
            phone: '',
            e1: false,
           sec: false,
           premf:false,
           prem: false,
           pres:false,
            menu: false,
      modal: false,
      menu2: false,
            editedItem: {
        nom:'',
        prenom: '',
        sexe: '',
        lieunais: '',
        datenais: '',
        tel_persrep:'',
        deficience: '',
        prenom_mere: '',
      },
          }
        },
        computed: {
          ...mapGetters('auth', ['user']),
        },
        mounted(){
            this.getClasses()
          this.get_dept();
        }, 
        methods: {
             getEleves () {
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
          const id = this.classe + '|'+ localStorage.ecole_id +'|'+ localStorage.anac
        this.$axios.get('get-eleve/'+ id).then(res => {
          this.eleves = res.data
          
        })
      },

      getClasses () { 
          const responsable = localStorage.niveau; 
         this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')           
        this.$axios.get('get-classe-responsable/'+ responsable).then(res => {
          this.classes = res.data         
        })
      },
//    async storeEleve () {
                   
//         // this.loading = true
//        // this.$axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
//         this.editedItem.ecole_id = localStorage.ecole_id
//         this.editedItem.classe_id = this.classe
//         this.editedItem.anac = localStorage.anac
       
//             // this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
//         await this.$axios.post( 'eleve-store', JSON.stringify(this.editedItem)).then(res => {          
        
//           if (res.data.status === 1) {
//              this.getEleves()
//              this.$notifier.showMessage({ content: 'Elève enregistré avec succès', color: 'success' })
    
//                } else {
//              this.$notifier.showMessage({ content: 'Echec:', color: 'error' })
    
//             // console.log(res.data.message)
//           }
//         })
//         this.loading = false
//       },
     
       async store_responsable () {
          
            if (!this.$refs.form.validate()) {             
                  return false
            }
             this.loading =true
             this.editedItem.ecole_id = localStorage.ecole_id
   this.editedItem.classe_id = this.classe
       this.editedItem.anac = localStorage.anac
            this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
            await this.$axios.post('eleve-store', JSON.stringify(this.editedItem)).then(response => {               
                if(response.data.status === 1)                  
                  this.$notifier.showMessage({ content: 'Elève enregistré avec succès', color: 'success' })
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
 
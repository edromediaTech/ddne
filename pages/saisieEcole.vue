<template>
 <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-home"
      title="Gestion ecoles"
      class="px-5 py-3 mt-4"
    >
  <v-stepper v-model="e1">
    <v-stepper-header  >
            <v-stepper-step :complete="e1 > 1"   step="1" > Identification </v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step  :complete="e1 > 2"   step="2" >  Localisation   </v-stepper-step>
            <v-divider></v-divider>      

            <v-stepper-step  :complete="e1 > 3"   step="3">   Responsable</v-stepper-step>  
                <v-divider></v-divider>

            <!-- <v-stepper-step  :complete="e1 > 4"   step="4">   Etat</v-stepper-step>  
                <v-divider></v-divider> -->

            <v-stepper-step   step="4"  > Etat </v-stepper-step>
       </v-stepper-header>
     
<!-- *************************************  Identification ecole ************************** -->
<v-stepper-items>
 <v-stepper-content step="1">
     <v-card   class="mb-12 pa-4" color="grey lighten-1"   height="auto"  >
        
        <v-row>
            <v-col   cols="12"  md="4"  sm="6">
                <v-text-field v-model="ec.nom"  :rules="nameRules"  label="Nom Ecole*"  required></v-text-field>
            </v-col>

            <v-col   cols="12"  md="4" sm="6">
                <v-text-field v-model="ec.code" :rules="nameRules"  label="Code"  required  ></v-text-field>
            </v-col>

            <v-col   cols="12"   md="4" sm="6" >
                    <v-text-field v-model="ec.fondateur" :rules="nameRules"  label="Fondateur"  required  ></v-text-field>
            </v-col>
            <v-col   cols="12"   md="4" sm="6">
                <v-text-field v-model="ec.sigle" :rules="nameRules"  label="Sigle"  required  ></v-text-field>
            </v-col>
            <v-col   cols="12"   md="4" sm="6">
                <v-text-field v-model="ec.tel" :rules="nameRules"  label="Tel"  required  ></v-text-field>
            </v-col>
            <v-col   cols="12"   md="4" sm="6">
                <v-text-field v-model="ec.telephone" :rules="nameRules"  label="Tel Additionnel"  required  ></v-text-field>
            </v-col>                            

            <v-col  cols="12"  md="4" sm="6">
             <v-text-field  v-model="ec.email"  :counter="25" :rules="emailRules"  label="E-mail"  required ></v-text-field>
            </v-col>
            <v-col
                cols="12"    sm="6"   md="4" >
                        <v-select
                          v-model="ec.categorie"
                          :items="categories"
                          label="Categorie"                          
                        />
                      </v-col>
                <v-col
                cols="12"    sm="6"       md="4"   >
                        <v-select
                          v-model="ec.niveau"
                          :items="niveauens"
                          label="Niveau Enseignement"                          
                        />
                      </v-col>
                    <v-col
                cols="12"    sm="6"       md="4"   >
                        <v-select
                          v-model="ec.vacation"
                          :items="vacations"
                          label="Vacation"                          
                        />
                      </v-col>
                      <v-col   cols="12"    sm="6"       md="4"   >
                    <span>Secteur</span>
                         <v-radio-group
                          v-model="ec.secteur"
                          row
                         >
                        <v-radio                                                  
                          label="Public" 
                          value="1" 
                                                 
                        ></v-radio>
                         <v-radio                                                   
                          label="Privé" 
                          value="0"
                                                  
                        ></v-radio>
                        </v-radio-group>
                </v-col>
                
                 <v-col   cols="12"    sm="6"       md="4"   >
                      <span>Location</span>
                     <v-radio-group  v-model="ec.location" row>                   
                        <v-radio                                                  
                          label="Non" 
                          value="0" 
                                                 
                        />
                         <v-radio                                                  
                          label="Oui" 
                          value="1"                                                  
                        />
                        </v-radio-group>
                </v-col>
                 <v-col   cols="12"    sm="6"       md="4"   >
                    <span>Milieu</span>
                      <v-radio-group  v-model="ec.milieu" row> 
                        <v-radio                                                   
                          label="Urbain" 
                          value="1" 
                                                                             
                        />
                         <v-radio                                                 
                          label="Rural" 
                          value="0"                                                    
                        />
                      </v-radio-group>
                </v-col>

                 <v-col   cols="12"    sm="6"       md="4"   >                     
                    <span>Statut</span>
                      <v-radio-group  v-model="ec.statut" row> 
                        <v-radio                                                   
                          label="Fonctionnel" 
                          value="1"                                                 
                        />
                         <v-radio                                                   
                          label="Non Fonctionnel" 
                          value="0"                                                
                        />
                      </v-radio-group>
                </v-col>
               
    </v-row>
</v-card> 
        <v-row>
            <v-col cols="12" md="9" sm="6"></v-col>
            <v-col cols="12" md="3" sm="6">            
        <v-btn  color="primary" small title="continue" @click="e1 = 2" >  <v-icon>mdi-arrow-right-bold</v-icon> </v-btn>
        <v-btn small color="cyan" title="Quitter" class="ma-2 pa-0"> <v-icon>mdi-close</v-icon>  </v-btn>
            </v-col>
        </v-row>
    
</v-stepper-content>
<!-- ********************************* Localisation ********************* -->
<v-stepper-content step="2">
    <v-card  class="mb-12 pa-4"  color="grey lighten-1"   height="auto">
        <v-row>
            <v-col  cols="12"   sm="6"    md="4">
                 <v-select                            
                            v-model="departement"
                            :items="departements"
                            :rules="[v => !!v || msgrules]"
                            label="Département"
                            required
                            @change="getData('departements', departement)"
                            ></v-select>
                           
                          </v-col>
                          <v-col  v-if = "districts.length > 0" cols="12" 
                            sm="6"
                               md="4">
                              <v-select                           
                            v-model="district"
                            :items="districts"
                            :rules="[v => !!v || msgrules]"
                            label="District"
                            required
                            @change="getData('districts', district)"
                            ></v-select>                           
                          </v-col>
                          <v-col  v-if = "communes.length > 0"
                           cols="12"
                            sm="6"
                               md="4">
                           <v-select
                           
                            v-model="commune"
                            :items="communes"
                            :rules="[v => !!v || msgrules]"
                            label="Commune"
                            required
                            @change="getData('communes', commune)"
                            ></v-select>
                           
                          </v-col>
                          <v-col v-if = "zones.length > 0" cols="12"
                              sm="6"
                              md="3">
                           <v-select
                           
                            v-model="ec.zone_id"
                            :items="zones"
                            :rules="[v => !!v || msgrules]"
                            label="Zones"
                            required
                            @change="getData('zones', zone)"
                            ></v-select>
                           
                          </v-col>
                          <v-col  cols="12"
                              sm="6"
                              md="4">
                           <v-select
                           
                            v-model="ec.section_communale_id"
                            :items="sectioncoms"
                            :rules="[v => !!v || msgrules]"
                            label="Section Communale"
                            required
                          
                            ></v-select>                           
                          </v-col>
                     <v-col  cols="12"  md="5"  sm="6">
             <v-text-field  v-model="ec.adresse"  :rules="nameRules"  label="Adresse"  required ></v-text-field>
            </v-col>
             <v-col cols="12" sm="6"   md="4">
                           <v-select                           
                            v-model="ec.acces"
                            :items="access"
                            :rules="[v => !!v || msgrules]"
                            label="Acces"
                            required                          
                            ></v-select>                           
                          </v-col>
              <v-col  cols="12"  md="4" sm="6" >
                     <v-text-field  v-model="ec.latitude"  type="number"  label="Latitude"  required ></v-text-field>
            </v-col>
              <v-col  cols="12"  md="4" sm="6" >
                    <v-text-field  v-model="ec.longitude"  type="number" label="Longitude"  required ></v-text-field>
            </v-col>                                           
        </v-row>
    </v-card>
    <v-row>
            <v-col cols="12" md="9" sm="6"></v-col>
            <v-col cols="12" md="3" sm="6"> 
     <v-btn small title="Continuer"  color="primary"   @click="e1 = 3" > <v-icon>mdi-arrow-right-bold</v-icon> </v-btn>
     <v-btn small title="Precedent" color="Secondary"   class="ma-2"  @click="e1 = 1">  <v-icon>mdi-arrow-left-bold</v-icon></v-btn>
     <v-btn small title="Quitter" color="cyan"> <v-icon>mdi-close</v-icon>  </v-btn>
            </v-col>
    </v-row>
</v-stepper-content>

  <!-- *************** Responsable *************************8 -->

<v-stepper-content step="3">
    <v-card  class="mb-12 pa-4"   color="grey lighten-1"  height="auto"  >
        <v-row>
            <v-col   cols="12"  md="6" >
            <v-text-field   v-model="ec.nomd" :rules="nameRules"    label="Nom Directeur"
                required  ></v-text-field>
            </v-col>
             <v-col   cols="12"  md="6" >
            <v-text-field   v-model="ec.prenom" :rules="nameRules"    label="Prenom Directeur"
                required  ></v-text-field>
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
                          :return-value.sync="datenais"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template #activator="{ on, attrs }">
                            <v-text-field
                              v-model="ec.datenais"
                              label="Date Naissance"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="ec.datenais"
                             :rules="[v => !!v || msgrules]"
                             required
                            no-title
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
                              @click="$refs.menu.save(ec.datenais)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    <v-col   cols="12"  md="5" sm="6" >
            <v-text-field v-model="ec.lieunais" :rules="nameRules"   label="Lieu de Naissance"
                required ></v-text-field>
            </v-col>
             <v-col   cols="12"    sm="6"       md="3"   >
                    <span>Sexe</span>
                     <v-radio-group
                      v-model="ec.sexe" 
                        row
                     >
                        <v-radio
                                                 
                          label="M" 
                          value="1" 
                            hide-details                        
                        ></v-radio>
                         <v-radio
                          v-model="ec.sexe"                         
                          label="F" 
                          value="0"
                            hide-details                         
                        ></v-radio>
                         </v-radio-group>
                </v-col>
            
                 <v-col cols="12" md="4" sm="6">
            <v-text-field  v-model="ec.cin"  :rules="nameRules"  type="number" :counter="10" label="CINU"  required ></v-text-field>
            </v-col>

            <v-col  cols="12"   md="4" sm="6">
            <v-text-field  v-model="ec.nif" :rules="nameRules"  :counter="15"  label="NIF"  required ></v-text-field>
            </v-col>

            <v-col   cols="12"   md="4" sm="6">
                <v-text-field v-model="ec.teld" :rules="nameRules"  type="number" label="Tel"  required  ></v-text-field>
            </v-col>
            <v-col   cols="12"   md="4" sm="6">
                <v-text-field v-model="ec.telephoned" :rules="nameRules"  type="number" label="Tel Additionnel"  required  ></v-text-field>
            </v-col>                            

            <v-col  cols="12"  md="4" >
             <v-text-field  v-model="ec.emaild"   :rules="emailRules"  label="E-mail"  required ></v-text-field>
            </v-col>
            <v-col   cols="12"   sm="6"    md="4">
                        <v-select                           
                            v-model="ec.communed"
                            :items="communes"
                            :rules="[v => !!v || msgrules]"
                            label="Commune"
                            required                           
                            ></v-select>                           
                          </v-col>
                     <v-col   cols="12"   sm="6"    md="4">
                        <v-select                           
                            v-model="ec.sectioncommunaled"
                            :items="sectioncoms"
                            :rules="[v => !!v || msgrules]"
                            label="Section Communale"
                            required                           
                            ></v-select>                           
                          </v-col>
                           <v-col   cols="12"  md="4"  >
            <v-text-field   v-model="ec.adressed"  :rules="nameRules"    label="Adresse" required ></v-text-field>
            </v-col>
        </v-row>
     </v-card>
     <v-row>
            <v-col cols="12" md="9" sm="6"></v-col>
            <v-col cols="12" md="3" sm="6"> 
        <v-btn small  title="Continuer" color="primary"  @click="e1 = 4" > <v-icon>mdi-arrow-right-bold</v-icon> </v-btn>
        <v-btn small title="Precedent" color="Secondary"   class="ma-2" @click="e1 = 2"> <v-icon>mdi-arrow-left-bold</v-icon></v-btn>
        <v-btn small title="Quitter" color="cyan">  <v-icon>mdi-close</v-icon> </v-btn>
            </v-col>
     </v-row>
 </v-stepper-content>

 <!-- ********************** Etat ******************* -->

    <v-stepper-content step="4">
           <v-card   class="mb-12 pa-4"  color="grey lighten-1"  height="auto"  >

               <v-row v-if="questions.length >0" class="ma-2">                   
                    <span v-for="q in questions" :key="q.id" >                                      
                        <span v-if ="q.type_q === 'select'">                     
                            <v-col cols="12" md="12" sm="6" >
                             <label ><b>{{q.libelle}}*</b></label>
                               <v-select  id="'q'.q.id"  type=""  required>
                                   <span v-for="opt in options" :key="opt.id">
                                       <span v-if="opt.question_id === q.id">
                                           <option v-bind="opt.id">{{opt.libelle}}</option>                                     
                                       </span>
                                   </span>
                                </v-select>                              
                            </v-col>                           
                        </span>                  
                       <span v-else>                        
                           <v-col cols="12" md="12" sm="6">                      
                                     <label><b>{{q.libelle}}* </b></label>                       
                               <span v-for="opt in options" :key="opt.id">
                                  <span v-if="opt.question_id === q.id" >                                 
                                     <v-radio-group  row>                                    
                                         <v-radio   id="'chk'.opt.id" data-question="q.id" value="opt.id" />
                                           {{opt.libelle}}
                                     </v-radio-group>                                                            
                                    </span>
                                </span> 
                           </v-col>                                                      
                        </span>    
                    </span> 
                </v-row>
           </v-card>
           <v-row>
                <v-col cols="12" md="9" sm="6"></v-col>
               <v-col cols="12" md="3" sm="6"> 
                    <v-btn small title="soumettre"  color="primary"  @click="store" > 
                        <v-icon>mdi-content-save</v-icon>  
                    </v-btn>
                    <v-btn small title="Precedent"  class="ma-2" color="Secondary"   @click="e1 = 3"> 
                            <v-icon>mdi-arrow-left-bold</v-icon>
                    </v-btn>
                    <v-btn small title="Quitter"  color="cyan"  @click="e1 = 1" >
                            <v-icon>mdi-close</v-icon>
                    </v-btn>
               </v-col>
           </v-row>  
    </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
   </base-material-card>
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        e1: 1,
        valid: false,
         departement: '',
         
        ecole: '',
        district:'',
        commune:'',
        departements: [],
        districts: [],
        communes: [],
        zones: [],
     sectioncoms:[],
     questions:[],
     options:[],
          niveauens:[{text:'Prescolaire', value:'0001'}, {text:'Fondamental', value:'0110'},
                      {text:'Secondaire', value:'1000'},  {text:'Ecole Complete', value:'1111'},
                      {text:'Fondamental 1er et 2eme cycle', value:'0010'},
                      {text:'Prescolaire et Fondamental 1er et 2eme cycle', value:'0011'},
                      {text:'Prescolaire et Fondamental complet', value:'0111'},
                      {text:'Fondamental 3eme Cycle et Secondaire', value:'1100'},
                      {text:'Fondamental et Secondaire', value:'1110'}, {text:'3e Cycle', value:'0100'},
                   ], 
            categories : ['Laique', 'Communautaire', 'Congreganiste Anglicane', 'Congreganiste Romaine',
                          'Presbyterale', 'Protestante','Nationale', 'Lycée','Mission Baptiste',
                          'Mission Adventiste', 'Mission Methodiste', 'Autres'],
         vacations : ['AM', 'PM', 'Soir','Double Vacation', 'Triple Vacation'],
          access : ['Facile', 'Dificile', 'Très Dificile'],
        ec:{ nomd: '',   prenom: '',   cin: '',    nif: '',   tel: '',  email: '', telephone:'', teld:'', 
              fondateur:'',  sigle:'',  niveau:'',  categorie:'', milieu:'', secteur:'', vacation:'', location:'', 
              adressed:'', adresse: '',  lieunais: '',    sexe: '',   telephoned:'',   communed:'',  emaild: '',
             longitude:'', latitude:'', code:'', statut:'', acces:'', nom:'', sectioncommunaled:'', 
             section_communale_id:'', datenais: '',  zone_id: '',},
      menu: false,
      modal: false,
      menu2: false,
             
    msgrules:'Champ obligatoire',
      nameRules: [
        v => !!v || 'Champ obligatoire',
       v => (v && v.length <= 25) || 'Name must be less than 25 character',
      ],
      
      emailRules: [
        v => !!v || 'E-mail est obligatoire',
        v => /.+@.+/.test(v) || 'E-mail doit être valide',
      ],
      }
    },
    mounted () {      
      this.get_dept() 
      this.get_Etat() 
          
    },

    methods:{
          async get_dept(){
              this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
            await this.$axios.get( 'departement').then( response => {
                  this.departements = response.data;
                  })
                  this.visible = false
          },

          async get_Etat(){             
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
            await this.$axios.get( 'get-etat').then( response => {
                  this.sectioncoms = response.data.sectioncommunales
                  this.questions = response.data.questions
                  this.options = response.data.options
                
                  })                 
          },

        getData (data, value){
              if(value === 0){              
                this.resetChamp(data)
                return false
            }
              if (data === 'departements'){
                 this.communes =[]
                 this.zones = []
                   this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                this.$axios.get( 'get-departement/'+ this.departement).then( response => {
                  this.districts = response.data;
                  
                   this.visible = false 
                })
               
              }
              if (data === 'districts'){
                  this.zones = []
                
                  this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get( 'get-district/'+ this.district).then( response => {
                  this.communes = response.data;
                   
                    this.visible = false
                })
               
              }
              if (data === 'communes'){
                
                  this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get( 'get-commune/'+ this.commune).then( response => {
                  this.zones = response.data;
                  
                   this.visible = false
                 })
                
              }
              if (data === 'zones'){                  
                  this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get( 'get-zone/'+ this.zone).then( response => {
                    //  this.ec = response.data;
                    //   this.ec.push({text:'Toutes', value: 0})
                   this.visible = false
                 })                
              }
               
              if (data === 'ecoles'){
                this.visible = true
                 this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get('get-classe/'+ -1).then( response => {                   
                 this.classes = response.data;
                 
                  this.visible = false
                })               
              }
              
             },

        async store(){
                 this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
            
            await this.$axios.post('store-data-ecole',this.ec).then(response => {               
                if(response.data.status === 1) {                              
                  this.$notifier.showMessage({ content: 'Succes', color: 'success' })                   
                }
                else{
                     this.$notifier.showMessage({ content: 'Echec', color: 'error' })
                }
             })
              this.loading =false
        }
    }
  }
</script>
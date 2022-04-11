<template>
  <v-row>
      <v-dialog
              v-model="dialog"
              max-width="auto"
            >       
    
  
              <v-card>
                <v-card-title>
                  <span class="text-h5">Editer: {{ec.nom}}</span>                  
                </v-card-title>
                  
                <v-card-text>
                     <div class="text-h6"> Infos {{part.title}}</div>
                </v-card-text>
                <v-card-text>
                  <v-container>

                    <v-row v-if="part.id === 1">
                       
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
                          label="Categorie*"                          
                        />
                      </v-col>
                <v-col
                cols="12"    sm="6"       md="4"   >
                        <v-select
                          v-model="ec.niveau"
                          :items="niveauens"
                          label="Niveau Enseignement*"                          
                        />
                      </v-col>
                    <v-col
                cols="12"    sm="6"       md="4"   >
                        <v-select
                          v-model="ec.vacation"
                          :items="vacations"
                          label="Vacation*"                          
                        />
                      </v-col>
                      <v-col   cols="12"    sm="6"       md="4"   >
                    <span>Secteur*</span>
                         <v-radio-group
                          v-model="ec.secteur"     row                      
                         >
                        <v-radio
                         v-for="sect in secteurs"
                         :key="sect.value"                                                  
                          :label="sect.text" 
                          :value="sect.value"                                                  
                        ></v-radio>
                         
                        </v-radio-group>
                </v-col>
                
                 <v-col   cols="12"    sm="6"       md="4"   >
                      <span>Location*</span>
                     <v-radio-group  v-model="ec.location" row>                   
                        <v-radio
                         v-for="loca in locations"
                         :key="loca.value"                                                  
                          :label="loca.text" 
                          :value="loca.value"                                                  
                        ></v-radio>
                        </v-radio-group>
                </v-col>
                 <v-col   cols="12"    sm="6"       md="4"   >
                    <span>Milieu*</span>
                      <v-radio-group  v-model="ec.milieu" row> 
                         <v-radio
                         v-for="urb in milieux"
                         :key="urb.value"                                                  
                          :label="urb.text" 
                          :value="urb.value"                                                  
                        ></v-radio>
                      </v-radio-group>
                </v-col>

                 <v-col   cols="12"    sm="6"       md="4"   >                     
                    <span>Statut*</span>
                      <v-radio-group  v-model="ec.statut" row> 
                         <v-radio
                         v-for="stat in statuts"
                         :key="stat.value"                                                  
                          :label="stat.text" 
                          :value="stat.value"                                                  
                        ></v-radio>
                      </v-radio-group>
                </v-col> 
                <v-col  cols="12"   sm="6"    md="4">
                 <v-select                            
                            v-model="ec.departement"
                            :items="departements"
                            :rules="[v => !!v || msgrules]"
                            label="Département"
                            required
                            @change="getData('departements', departement)"
                            ></v-select>
                           
                          </v-col>
                          <v-col  cols="12" 
                            sm="6"
                               md="4">
                              <v-select                           
                            v-model="ec.district"
                            :items="districts"
                            :rules="[v => !!v || msgrules]"
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
                           
                            v-model="ec.commune"
                            :items="communes"
                            :rules="[v => !!v || msgrules]"
                            label="Commune"
                            required
                            @change="getData('communes', commune)"
                            ></v-select>
                           
                          </v-col>
                          <v-col  cols="12"
                              sm="6"
                              md="3">
                           <v-select
                           
                            v-model="ec.zone_id"
                            :items="zones"
                            :rules="[v => !!v || msgrules]"
                            label="Zones"
                            required                          
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
                     <v-text-field  v-model="ec.latitude" label="Latitude"  required ></v-text-field>
            </v-col>
              <v-col  cols="12"  md="4" sm="6" >
                    <v-text-field  v-model="ec.longitude" label="Longitude"  required ></v-text-field>
            </v-col>                          
                    </v-row> 
     <!-- *************** directeur **********************************  -->
        <v-row v-if="part.id ===2">
            <v-col   cols="12"  md="6" >
            <v-text-field   v-model="direct.nomd" :rules="nameRules"    label="Nom Directeur"
                required  ></v-text-field>
            </v-col>
             <v-col   cols="12"  md="6" >
            <v-text-field   v-model="direct.prenom" :rules="nameRules"    label="Prenom Directeur"
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
        :return-value.sync="direct.datenais"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="direct.datenais"
            label="Date Naissance"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="direct.datenais"
          no-title
          scrollable
        >
          <v-spacer></v-spacer>
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
            @click="$refs.menu.save(direct.datenais)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
                    <v-col   cols="12"  md="5" sm="6" >
            <v-text-field v-model="direct.lieunais" :rules="nameRules"   label="Lieu de Naissance"
                required ></v-text-field>
            </v-col>
             <v-col   cols="12"    sm="6"       md="3"   >
                    <span>Sexe</span>
                      <v-radio-group  v-model="direct.sexe" row> 
                         <v-radio
                         v-for="se in sexeop"
                         :key="se.value"                                                  
                          :label="se.text" 
                          :value="se.value"                                                  
                        ></v-radio>
                      </v-radio-group>
                </v-col>
            
                 <v-col cols="12" md="4" sm="6">
            <v-text-field  v-model="direct.cin"  :rules="nameRules"  type="number" :counter="10" label="CINU"  required ></v-text-field>
            </v-col>

            <v-col  cols="12"   md="4" sm="6">
              <v-text-field-simplemask
      v-model="direct.nif"
      :label="label"
      :properties="{
        prefix: '',
        suffix: '',
        readonly: false,
        disabled: false,
        outlined: false,
        clearable: false,
        placeholder: '000-000-000-0',
        }"
      :options="{
        inputMask: '###-###-###-#',
        outputMask: '###-###-###-#',
        empty: null,
        applyAfter: false,
        alphanumeric: false,
        lowerCase: false,
      }"
      :focus="focus"
      @focus="focus = false"
    /> 
            </v-col>

            <v-col   cols="12"   md="4" sm="6">
                 <v-text-field-simplemask
      v-model="direct.teld"
      label="Tel"
      :properties="{
        prefix: '',
        suffix: '',
        readonly: false,
        disabled: false,
        outlined: false,
        clearable: true,
        placeholder: '(509)3999999',
      }"
      :options="{
        inputMask: '(###) ####-####',
        outputMask: '###########',
        empty: null,
        applyAfter: false,
        alphanumeric: true,
        lowerCase: false,
      }"
      :focus="focus"
      @focus="focus = false"
    />
            </v-col>
            <v-col   cols="12"   md="4" sm="6">
                <v-text-field-simplemask
      v-model="direct.telephoned"
      label="Tél Additionnel"
      :properties="{
        prefix: '',
        suffix: '',
        readonly: false,
        disabled: false,
        outlined: false,
        clearable: true,
        placeholder: '(509)3999999',
      }"
      :options="{
        inputMask: '(###) ####-####',
        outputMask: '###########',
        empty: null,
        applyAfter: false,
        alphanumeric: true,
        lowerCase: false,
      }"
      :focus="focus"
      @focus="focus = false"
    />
            </v-col>                            

            <v-col  cols="12"  md="4" >
             <v-text-field  v-model="direct.emaild"   :rules="emailRules"  label="E-mail"  required ></v-text-field>
            </v-col>
            <v-col   cols="12"   sm="6"    md="4">
                        <v-select                           
                            v-model="direct.communed"
                            :items="communes"
                            :rules="[v => !!v || msgrules]"
                            label="Commune"
                            required                           
                            ></v-select>                           
                          </v-col>
                     <v-col   cols="12"   sm="6"    md="4">
                        <v-select                           
                            v-model="direct.section_communaled_id"
                            :items="sectioncoms"
                            :rules="[v => !!v || msgrules]"
                            label="Section Communale"
                            required                           
                            ></v-select>                           
                          </v-col>
                           <v-col   cols="12"  md="4"  >
            <v-text-field   v-model="direct.adressed"  :rules="nameRules"    label="Adresse" required ></v-text-field>
            </v-col>

        </v-row>
         <!-- *************** Etat batiment **********************************  -->
         <v-row v-if="part.id===3">
          <v-row v-if="questions.length >0" class="ma-2">                   
                    <span v-for="q in questions" :key="q.id" >                                      
                        <span v-if ="q.type_q === 'select'">                     
                            <v-col cols="12" md="12" sm="6" >
                           <v-select                           
                            v-model="q.option_id"
                            :items="options"
                            :rules="[v => !!v || msgrules]"
                            :label="q.libelle"
                            required                           
                            ></v-select>                              
                                 </v-col>                      
                        </span>
                                      
                       <span v-else > 
                                               
                           <v-col cols="12" md="12" sm="6" class="carte">                      
                                     <label><b>{{q.libelle}}* </b></label>                       
                               <span v-for="(opt) in options" :key="opt.value">
                                  <span v-if="opt.question_id === q.id" >                                 
                                     <v-checkbox   v-model="q.option_id"   :label= opt.text :value="opt.value">
                                         
                                     </v-checkbox>                                                                                            
                                    </span>
                                </span> 
                           </v-col>                                                      
                        </span>    
                    </span> 
                </v-row>
               <v-row>
             <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-menu
                          ref="menu1"
                          v-model="menu1"
                          :close-on-content-click="false"
                          :return-value.sync="ec.dateEval"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template #activator="{ on, attrs }">
                            <v-text-field
                              v-model="ec.dateEval"
                              label="Date Evaluation"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="ec.dateEval"
                             :rules="[v => !!v || msgrules]"
                             required
                            no-title
                            scrollable
                          >
                            <v-spacer />
                            <v-btn
                              text
                              color="primary"
                              @click="menu1 = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu1.save(ec.dateEval)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      </v-row>

                       </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="update"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
              v-model="dialogDelete"
              max-width="500px"
            >
              <v-card>
                <v-card-title
                  class="text-h5"
                >
                  Etes-vous sur ?
                </v-card-title>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="closeDelete"
                  >
                    Cancel
                  </v-btn>
                  <!-- <v-btn
                    color="blue darken-1"
                    text
                    @click="deleteItemConfirm"
                  >
                    OK
                  </v-btn> -->
                  <v-spacer />
                </v-card-actions>
              </v-card>
            </v-dialog>
  </v-row>

</template>
<script>
  
  // import { checkTypeFile } from '../../../helpers/outils.js'
  export default {
    props : { part:{ type: Object, default: () => {}}, departements:{type:Array,default: () => [] }, 
             options:{type:Array,default: () => [] }, districts:{type:Array,default: () => []},
                communes: {type:Array,default: () => []}, zones: {type:Array,default: () => []},
            ecole:{type:Object, default: () => {}}, sectioncoms:{type:Array,default: () => [] }},
    data: () => ({
        nomecole:'Inconnu',
        radiogroup: 1,
        dialogDelete:false,
        isopened: true,
         ec:{ },

        direct:{  adressed:'',   lieunais: '',    sexe: '',   telephoned:'',   communed:'',  emaild: '',  section_communaled_id:'',
                teld:'', nomd: '',   prenom: '',   cin: '',    nif: '' },

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
          secteurs : [{text:'Public', value:1},{text:'Privé', value:0}],
          locations: [{text:'Oui', value:1}, {text:'Non', value:0}],
          milieux: [{text:'Urbain', value:1}, {text:'Rural', value:0}],
        statuts: [{text:'Fonctionnel', value:1}, {text:'Non Fonctionnel', value:0}],        
        questions:[],
      dialog: false,
      viewPrint:false,
      visible: false,
      items:[{title:'Classe Precedente', classe:null, annee:''},{title:'Classe Courante', classe:null, annee:''}],
    //  classe:null,
      generateB:false,     
        
       district: '',
       texte:'',
    commune: '',
    zone: '',
   // ecole: '',
    niveau: '',
    loading:false,
    departement: '',
    
    ecoles: [],
    etats:[],
    info:{},
    infoEcole:'', 
     label: "NIF",
    focus: false,
     menu: false,
      modal: false,
      menu2: false,
      menu1:false,
     msgrules:'Champ obligatoire',
      nameRules: [
        v => !!v || 'Champ obligatoire',
       v => (v && v.length <= 25) || 'Name must be less than 25 character',
      ],
      
      emailRules: [
        v => !!v || 'E-mail est obligatoire',
        v => /.+@.+/.test(v) || 'E-mail doit être valide',
      ],      
        sexeop:[{text:'F',value:0},{text:'M',value:1}],
      search:'',
        data: [],
      ajouter : false,
      numberRule: v  => {
     // if (!v.trim()) return true;
      if (!isNaN(parseFloat(v)) && v > 0 && v <= 10) return true;      
      return 'La valeur doit-être comprise entre 0 et 10';
      }
    }),
   
    
    created () {
      this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')    
      
    },

    mounted () {
     
     // this.get_Etat()
     // this.get_dept()     
      
       },

    methods: { 
      
      getClasse_emit (item) {        
         this.get_decision_prec(this.ecole, item.classe, item.annee)
      }, 

         async update(){
                 this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               const data = {parti:this.part, ecole_id:this.ec.id}
                 
               if(this.part === 1)
                  data.ecole = this.ec                 
                if(this.part === 2)
                  data.directeur= this.direct                
                if(this.part === 3)
                 data.etat = this.etats
                
                
            await this.$axios.patch('update-ecole',data).then(response => {                            
                if(response.data === 'succes') {                              
                  this.$notifier.showMessage({ content: 'Succes', color: 'success' })                   
                }
                else{
                     this.$notifier.showMessage({ content: 'Echec: '+response.data.message, color: 'error'})
                }
             })
              this.loading =false
        },  

        // getData (data, value){
        //       if(value === 0){              
        //         this.resetChamp(data)
        //         return false
        //     }
        //       if (data === 'departements'){
        //         //  this.communes =[]
        //         //  this.zones = []
        //            this.visible = true
        //            this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
        //         this.$axios.get( 'get-departement/'+ this.departement).then( response => {
        //           this.districts = response.data;
                  
        //            this.visible = false 
        //         })
               
        //       }
        //       if (data === 'districts'){
        //           this.zones = []
                
        //           this.visible = true
        //            this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
        //          this.$axios.get( 'get-district/'+ this.district).then( response => {
        //           this.communes = response.data;
                   
        //             this.visible = false
        //         })
               
        //       }
        //       if (data === 'communes'){
                
        //           this.visible = true
        //            this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
        //          this.$axios.get( 'get-commune/'+ this.commune).then( response => {
        //           this.zones = response.data;
                  
        //            this.visible = false
        //          })
                
        //       }
        //       if (data === 'zones'){                  
        //           this.visible = true
        //            this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
        //          this.$axios.get( 'get-zone/'+ this.zone).then( response => {
        //             //  this.ec = response.data;
        //             //   this.ec.push({text:'Toutes', value: 0})
        //            this.visible = false
        //          })                
        //       }
               
        //       if (data === 'ecoles'){
        //         this.visible = true
        //          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
        //          this.$axios.get('get-classe/'+ -1).then( response => {                   
        //          this.classes = response.data;
                 
        //           this.visible = false
        //         })               
        //       }
              
        //      },
        
        

   save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },
     

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
    }


  }
</script>

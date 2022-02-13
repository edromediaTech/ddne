<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="auto"
    >
    
      <template #activator="{ on, attrs }">                   
        <v-btn   
         class="mb-2"            
          color="cyan" 
          x-small
          fab         
          title="Recherche élève"
          v-bind="attrs"         
          v-on="on"
        >
        
          <v-icon>mdi-magnify</v-icon> 
        </v-btn>
      </template>
       <v-card>
            <v-row>
              <v-col class="" cols="12" md="10" sm="6">
            <h3 class="px-4 mt-4 mx-4 py-4"> <v-icon>mdi-magnify</v-icon> Recherche et transfert élèves</h3>
              </v-col>
             <v-col  cols="12" md="2" sm="6">
                 <v-icon class="mt-4 mx-4 px-4" color="primary" title="Fermer" @click="cancel">mdi-close</v-icon>
             </v-col>
            </v-row>
          
       <v-row class="px-4">
            <v-col v-if="abandons.length === 0 && expulses.length === 0"   cols="12"    sm="6"   md="3">
                <v-select                            
                    v-model="el"
                    :items="donnees"
                    multiple
                    :rules="[v => !!v || msgrules]"
                    label="Select"
                    required
                    @change="showField"
                ></v-select>                
              </v-col>
                <v-col v-if="abandons.length === 0 && eleves.length === 0 && el.length === 0" cols="12"
                            sm="6"
                            md="3">
                            <v-btn                             
                            fat
                            small
                            title="Eleves expulsés"
                            class="mt-4 mx-2"
                            color="primary"
                            @click="get_expulse"
                            >
                              Expulsés
                            </v-btn>
                           </v-col>
                      <v-col  v-if="eleves.length === 0 && expulses.length === 0 && el.length === 0" cols="12"
                            sm="6"
                            md="3">
                            <v-btn                             
                            fat
                            small
                            title="Eleves abandonnés"
                            class="mt-4 mx-4"
                            color="primary"
                            @click="get_abandon"
                            >
                              Abandons
                            </v-btn>
                           </v-col>

                      <v-col v-if="nom"
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field
                        v-if="nom" 
                          v-model="editedItem.nom"
                          label="Nom"
                           :rules="[v => !!v || msgrules]"
                           maxlength="25"
                           required
                          
                        />
                      </v-col>
                        <v-col v-if="prenom"
                        cols="12"
                        sm="6"
                        md="5"
                      >
                        <v-text-field
                        v-if="prenom"
                          v-model="editedItem.prenom"
                          label="Prénom"
                           maxlength="55"
                           :rules="[v => !!v || msgrules]"
                           required
                        />
                      </v-col>
                       <v-col v-if="datenais"
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
                          v-if="datenais"
                            v-model="editedItem.datenais"
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
                              @click="$refs.menu.save(editedItem.datenais)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                        <v-col v-if="prenom_mere"
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                        v-if="prenom_mere"
                          v-model="editedItem.prenom_mere"
                          label="Prénom de la Mère"
                           maxlength="25"
                           :rules="[v => !!v || msgrules]"
                           required
                        />
                      </v-col>
                        <v-progress-circular
                            v-show="visible"
                            :size="20"
                            :width="3"
                            color="info"
                            indeterminate
                            /> 
                       <v-col v-if="editedItem.nom !== '' || editedItem.prenom !== '' || editedItem.prenom_mere !== '' || editedItem.datenais !== '' && selected.length < 1" cols="12"
                            sm="6"
                            md="2">
                            <v-btn 
                            
                            fat
                            small
                            class="mt-4 mx-4"
                            color="primary"
                            @click="rechercheEleve"
                            >
                              Executer 
                            </v-btn>
                           </v-col>
                            </v-row>
                              
                    <v-card-text>
                       
                    <v-container>
                        <v-row>
                           <v-col v-if="selected.length > 0 || selAb.length >0 || selEx.length >0 "
                           cols="12"
                              sm="6"
                              md="2">
                           <v-select                            
                            v-model="departement"
                            :items="departements"
                            :rules="[v => !!v || msgrules]"
                            label="Département"
                            required
                            @change="get_com"
                            ></v-select>
                           
                          </v-col>
                           <v-col  v-if = "communes.length > 0"
                           cols="12"
                            sm="6"
                               md="2">
                           <v-select
                           
                            v-model="commune"
                            :items="communes"
                            :rules="[v => !!v || msgrules]"
                            label="Commune"
                            required
                            @change="get_ecole_com"
                            ></v-select>
                           
                          </v-col>
                           <v-col  v-if = "ecoles.length > 0"  cols="12"
                            sm="6"
                            md="5">
                           <v-select                          
                            v-model="ecole"
                            :items="ecoles"
                            :rules="[v => !!v || msgrules]"
                            label="Ecole"
                            required
                           
                            ></v-select>                           
                          </v-col>
                           <v-col  cols="12"
                            sm="6"
                            md="1">
                            <v-btn 
                            v-if="ecole !== '' && selected.length > 0"
                            fat
                            small
                            title="Transferer"
                            class="mt-4 mx-4"
                            color="primary"
                            @click="updateEleve"
                            >
                              <v-icon>mdi-login</v-icon>
                            </v-btn>
                           </v-col>
                           <!-- select abandon -->
                            <v-col  cols="12"
                            sm="6"
                            md="1">
                            <v-btn 
                            v-if="ecole !== '' && selAb.length > 0"
                            
                            fat
                            small
                            title="Transferer"
                            class="mt-4 mx-4 px-4"
                            color="primary"
                            @click="abandon_store"
                            >
                              <v-icon>mdi-login</v-icon>
                            </v-btn>
                           </v-col>
                           <!-- select expulse -->
                            <v-col class="mx-4" cols="12"
                            sm="6"
                            md="1">
                            <v-btn 
                            v-if="ecole !== '' && selEx.length > 0"
                            fat
                            title="Réintegrer élève"
                            small
                            class="mt-4 mx-4"
                            color="primary"
                            @click="expulse_store"
                            >
                              <v-icon>mdi-login</v-icon>
                            </v-btn>
                           </v-col>
               </v-row>
            <v-row>
              <v-data-table  v-if="eleves.length > 0"  v-model="selected" :headers="headers" :search="search" :items="eleves" 
              show-select single-select :footer-props="{'items-per-page-options':[50, 100, -1]}">
    
       <template #top>
         <v-row class="mx-4 my-4">
             <v-spacer />
             <v-col cols="12"
                  sm="6"        
              md="4">
            <v-text-field
             v-if="eleves.length > 0"
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
             </v-col>
               
         </v-row>
       </template> 
    
    </v-data-table>
      <v-data-table  v-if="expulses.length > 0" v-model="selEx" :headers="headers" :search="search" :items="expulses" 
              show-select single-select :footer-props="{'items-per-page-options':[50, 100, -1]}">
              
       <template #top>
         <v-row class="mx-4 my-4">
             <v-spacer />
             <v-col cols="12"
                  sm="6"        
              md="4">
            <v-text-field
             v-if="expulses.length > 0"
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
             </v-col>
               
         </v-row>
       </template>
      </v-data-table>            
      <v-data-table  v-if="abandons.length > 0" v-model="selAb" :headers="headers" :search="search" :items="abandons" 
              show-select single-select :footer-props="{'items-per-page-options':[50, 100, -1]}">
              
       <template #top>
         <v-row class="mx-4 my-4">
             <v-spacer />
             <v-col cols="12"
                  sm="6"        
              md="4">
            <v-text-field
             v-if="abandons.length > 0"
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
             </v-col>
               
         </v-row>
       </template>
      </v-data-table>            
            
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="cancel"
          >
            Fermer
          </v-btn>

       
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  
  // import { checkTypeFile } from '../../../helpers/outils.js'
  export default {
    // props : { classe: { type: Number, default: null},  ecole: { type: Number, default: null},  
    //           annee: { type: String, default: null}},
    data: () => ({

      
      dialog: false,
      viewPrint:false,
      visible: false,
      selected: [],
      selAb: [],
      selEx: [],
      generateB:false,
      classes: [],
      options: [],
      eleves: [],
       district: '',
       texte:'',
       ecole:'',
    commune: '',
    zone: '',
      msgrules:'Champ obligatoire',
    editedItem: {   nom:'',   prenom: '', prenom_mere:'', datenais:''},
    donnees: [ 'nom',   'prenom', 'datenais', 'prenom_mere' ],
    el :[] ,
    niveau: '',
    loading:false,
    departement: '',
    departements: [],
    districts: [],
    communes: [],
    zones: [],
    ecoles: [],
    abandons:[],
    expulses:[],
    info:{},
      infoEcole:'',
     nom:false, prenom:false, datenais:false, 
             prenom_mere:false,
         menu: false,
      modal: false,
      menu2: false,
        sexeop:[{text:'Feminin',value:0},{text:'Masculin',value:1}],
      search:'',
        data: [],
      ajouter : false,
      numberRule: v  => {
     // if (!v.trim()) return true;
      if (!isNaN(parseFloat(v)) && v > 0 && v <= 10) return true;      
      return 'La valeur doit-être comprise entre 0 et 10';
      }
    }),
   computed : {
        headers (){
          const  headers= [
       
        { text: "ID", value: "eleve_id" },
        { text: "Nom", value: "nom" },
        { text: "Prénom", value: "prenom" },  
         { text: "Année Scolaire", value: "annee" },      
        { text: "Ecole", value: "ecole" },
        { text: "Classe", value: "nomclasse" },
        { text: "Prénom Mère", value: "prenom_mere" },
       
      ];
     
      return headers
        }
        
    },
    
    created () {
      this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
      
      
    },

    mounted () {
     
      this.get_dept()
     
      
       },

    methods: { 
           

     
        async rechercheEleve(){
            this.visible = true
             this.eleves =[]
                  this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               await this.$axios.get( 'search-eleve/'+ (this.editedItem.nom +'|'+ this.editedItem.prenom +'|'+ this.editedItem.datenais +'|'+ this.editedItem.prenom_mere )).then( response => {
                  
                   if(response.data.length > 0)
                        this.eleves = response.data;
                   else
                   this.$notifier.showMessage({ content: 'Aucun Elève trouvé', color: 'success' })  
                  this.visible = false
                  })
        },

        async updateEleve(){
            this.visible = true
                         
                  this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               await this.$axios.patch( 'update-eleve-trans/'+ (this.selected[0].id +'|'+ this.ecole)).then( response => {
                  
                   if(response.data === 1){
                        this.eleves = this.filtrerEleve(this.selected[0].id)
                        this.$notifier.showMessage({ content: 'Transfert réussi!', color: 'success' })
                      
                    
                   }
                   else
                   this.$notifier.showMessage({ content: 'Transfert echoué', color: 'echec' })  
                  this.visible = false
                  
                  })
        },

        async expulse_store(){
            this.visible = true
                      
                  this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               await this.$axios.post( 'expulse-store/'+ (this.selEx[0].id +'|'+ this.ecole +'|'+localStorage.anac+'|'+this.selEx[0].expulse_id+'|'+this.selEx[0].decision_id+'|'+this.selEx[0].mention)).then( response => {
                                    
                   if(response.data === 1){
                        this.eleves = this.filtrerExpulse(this.selEx[0].id)
                        this.$notifier.showMessage({ content: 'Transfert réussi!', color: 'success' })                  
                    
                   }
                   else
                   this.$notifier.showMessage({ content: 'Transfert echoué', color: 'echec' })  
                  this.visible = false
                  
                  })
        },

        async abandon_store(){
            this.visible = true
                         
                  this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               await this.$axios.post( 'abandon-store/'+ (this.selAb[0].id +'|'+ this.ecole +'|'+localStorage.anac+'|'+this.selAb[0].abandon_id)).then( response => {
                  
                    if(response.data === 1){
                        this.eleves = this.filtrerAbandon(this.selAb[0].id)
                        this.$notifier.showMessage({ content: 'Transfert réussi!', color: 'success' })                     
                    
                   }
                   else
                   this.$notifier.showMessage({ content: 'Transfert echoué', color: 'echec' })  
                  this.visible = false
                  
                  })
        },

        filtrerEleve(id){
            const el = this.eleves.filter(item => item.id !== id)              
            return el
        },
        filtrerExpulse(id){
            const el = this.expulses.filter(item => item.id !== id)              
            return el
        },
        filtrerAbandon(id){
            const el = this.abandons.filter(item => item.id !== id)              
            return el
        },

        showField(){
                // this.vField.map(e => {
                //     if(e.text === this.el)
                //     e.visible = true                    
                // })
            
              this.nom = false 
              this.prenom = false 
              this.prenom_mere = false 
              this.datenais = false
                for(let i = 0; i<this.el.length; i++){
                       if(this.el[i] === 'nom')
                         this.nom = true
               
                       if(this.el[i] === 'prenom')
                         this.prenom = true
               
                       if(this.el[i] === 'datenais')
                         this.datenais = true
               
                       if(this.el[i] === 'prenom_mere')
                         this.prenom_mere = true
                }   
        },

         async get_expulse(){
            this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               await this.$axios.get( 'liste-expulse').then( response => {
                  this.expulses = response.data;
                  this.visible =  false
                  })
             },
         async get_abandon(){
            this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               await this.$axios.get( 'liste-abandon').then( response => {
                  this.abandons = response.data;
                  this.visible =  false
                  })
             },
         async get_dept(){
            this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               await this.$axios.get( 'departement').then( response => {
                  this.departements = response.data;
                   this.visible = false
                  })
             },

         async get_com(){
            this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               await this.$axios.get( 'get-commune-dept/'+this.departement).then( response => {
                  this.communes = response.data;
                   this.visible = false
                  })
             },
         async get_ecole_com(){
            this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               await this.$axios.get( 'get-ecole-commune/'+this.commune).then( response => {
                  this.ecoles = response.data;
                   this.visible = false
                  })
             },

           getData (data, value){
              if (data === 'departements'){
                 this.communes =[]
                 this.zones = []
                  this.ecoles = []                 
                  this.niveaux = []
                   this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                this.$axios.get('get-departement/'+ this.departement).then( response => {
                  this.districts = response.data;
                   this.visible = false
                })                 
              }
              if (data === 'districts'){
                  this.zones = []
                  this.ecoles = []
                  this.niveaux = []
                   this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get('get-district/'+ this.district).then( response => {
                  this.communes = response.data;
                   this.visible = false
                })
                 
              }
              if (data === 'communes'){
                  this.ecoles = []
                  this.niveaux = []
                   this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get('get-commune/'+ this.commune).then( response => {
                  this.zones = response.data;
                   this.visible = false
                 })
              }
              if (data === 'zones'){
                  this.niveaux = []
                   this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get('get-zone/'+ this.zone).then( response => {
                  this.ecoles = response.data;
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
        
  


   //   annee_prec(){
        //       const annees = localStorage.anac.split('-')
        //       const an = annees[0]
        //       const anprec = an - 1
        //         const anv= (anprec+'-'+an) 
        //         return anv
        //       },

      
        
      getEleves () {
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
          const id = this.classe + '|'+ localStorage.ecole_id +'|'+ localStorage.anac
        this.$axios.get('get-eleve/'+ id).then(res => {
          this.eleves = res.data
          
        })
      },


      
       get_text(objet,value){
      if(objet===this.defi){
        if(value===0)
          return 'Non';
            return 'Oui';
      }
      else{
         if(value===0)
          return 'Feminin';
            return 'Masculin';
      }
    },

    get_value(objet,text){
      objet.forEach(function(ob){
      if(ob.text === text)
        return ob.value;
      });
    },

      save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
        this.nom = false 
              this.prenom = false 
              this.prenom_mere = false 
              this.datenais = false
              this.selected = []
              this.selAb = []
              this.selEx =[]
              this.eleves = []
              this.abandons=[]
              this.expulses =[]
              this.departement = ''
              this.communes=[]
              this.ecoles =[]
              this.ecole = ''
              this.el = []
               this.editedItem.nom=''
                 this.editedItem.prenom= ''
                 this.editedItem.prenom_mere=''
                  this.editedItem.datenais=''
        this.dialog = false
        },

    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },
    }


  }
</script>

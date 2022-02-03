<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="auto"
    >
      <template #activator="{ on, attrs }">
                    
        <v-btn               
          color="cyan" 
          x-small
          fab         
          title="Classe precedente de l'annee precedente"
          v-bind="attrs"
          class="mx-1 mt-4"
          v-on="on"
        >
        
          <v-icon>mdi-arrow-left-bold</v-icon> 
        </v-btn>
      </template>
       
      <v-card>
        
        <v-card-text>
          <v-container>
            <v-row>
              <v-data-table :headers="headers" :search="search" :items="eleves" :footer-props="{'items-per-page-options':[50, 100, -1]}">
    
       <template #top>
         <v-row class="mx-4 my-4">
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
                <v-divider
                 v-if="eleves.length > 0"
              class="mx-4 mt-1"
              inset
              vertical
            />
                <v-spacer />
             
             <v-col  cols="12"
                            sm="6"
                            md="2">
                            <v-btn 
                            v-if="generateB"
                            fat
                            small
                            class="mt-4 mx-4"
                            color="primary"
                            @click="generate"
                            >
                              Générer
                            </v-btn>
                           </v-col>
                           <v-col class="mx-4 mt-4">
               <menu-transfert  :classe="classe" :ecole="ecole" @onClickClasse="getClasse_emit($event)"/></v-col>
              
         </v-row>
       </template>

        <template #[`item.mention`]="props">
            <v-edit-dialog
              :return-value.sync="props.item.mention"
              @save="save"
              @cancel="cancel"
              @open="open"
              @close="close"
            >
          {{ props.item.mention }}
          <template #input>
          <v-select      
              v-model="props.item.mention"
              :items="opts"
              label="Select mention"
                @change="update_decision(props.item)"
            />
            </template>
        </v-edit-dialog>
      </template>
   <template #[`item.annee`]="props">
        <v-edit-dialog
          :return-value.sync="props.item.annee"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.annee }}
          <template #input>
      <v-select
            v-model="props.item.annee"
            :items="getAnnees(1990,2021)"
            label="Selectionner Année"
               @blur="setMention(props.item)"
              @change="update_decision(props.item)"
          />
            </template>
        </v-edit-dialog>
      </template>    
      
      <template #[`item.moyenne`]="props" >
        <v-edit-dialog
          :return-value.sync="props.item.moyenne"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.moyenne }}
          <template #input>
            <v-text-field           
              v-model="props.item.moyenne"
                label="Edit"    
                 :rules="[numberRule]"             
                type="number"
                 @keyup="checkinput(props.item)"
                  @blur="setMention(props.item)" 
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
       <template #[`item.nordre`]="props" >
        <v-edit-dialog
          :return-value.sync="props.item.nordre"
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          {{ props.item.nordre }}
          <template #input>
            <v-text-field           
              v-model="props.item.nordre"
                label="Edit"    
                             
                type="number"                         
                @blur="update_decision(props.item)" 
            ></v-text-field>
          </template>
        </v-edit-dialog>
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
            @click="dialog = false"
          >
            Cancel
          </v-btn>

       
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
  
  // import { checkTypeFile } from '../../../helpers/outils.js'
  export default {
    props : { classe: { type: Number, default: null},  ecole: { type: Number, default: null},  
              annee: { type: String, default: null}},
    data: () => ({

      titre:'Décision de fin d\'année '+ localStorage.anac,
      dialog: false,
      viewPrint:false,
      visible: false,
      items:[{title:'Classe Precedente', classe:null, annee:''},{title:'Classe Courante', classe:null, annee:''}],
    //  classe:null,
      generateB:false,
      classes: [],
      options: [],
      eleves: [],
       district: '',
       texte:'',
    commune: '',
    zone: '',
   // ecole: '',
    niveau: '',
    loading:false,
    departement: '',
    departements: [],
    districts: [],
    communes: [],
    zones: [],
    ecoles: [],
    info:{},
      infoEcole:'',
       decision:{'classeleve_id':0,'mention':'Select mention','moyenne':'0.00'},
       opts:['Admis', 'A refaire', 'Abandon', 'Admis ailleurs', 'A refaire ailleurs' ],
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
       
        { text: "Nom", value: "nom" },
        { text: "Prénom", value: "prenom" },        
        { text: "Moyenne", value: "moyenne" },
        { text: "Mention", value: "mention" },
      ];
      if (this.classe > 12){
      headers.push({ text: "Année", value: "annee" })
      headers.push({ text: "No d'ordre", value: "nordre" })
      }
      return headers
        }
        
    },
    
    created () {
      this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
       this.items[0].title = 'Annee Precedente'
      this.items[1].title = 'Annee Courante'
       this.items[1].annee = localStorage.anac
      this.items[0].annee = this.annee_prec()
    
     // if(this.classe > 1){
              this.items[0].classe = this.classe - 1
              this.items[1].classe =this.classe             
         ///   }
      
    },

    mounted () {
     
      this.get_dept()
     
      
       },

    methods: { 
      
      getClasse_emit (item) {        
         this.get_decision_prec(this.ecole, item.classe, item.annee)
      },
      generateReport () {
           this.visible = true
           this.infoEcole = (this.ecoles.find(el => el.value === this.ecole)).text +' - '+ (this.classes.find(el => el.value === this.classe)).text
            this.texte = 'Decision de fin d\'année '+localStorage.anac 
            this.$refs.html2Pdf.generatePdf()
            this.visible = false
        },

          annee_prec(){
              const annees = localStorage.anac.split('-')
              const an = annees[0]
              const anprec = an - 1
                const anv= (anprec+'-'+an) 
                return anv
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
        
         setMention(eleve){
             if(eleve.moyenne === '' || eleve.moyenne === '0.00'){
              eleve.moyenne = '0.00'
              return false
             }

           if(eleve.moyenne !== null || eleve.moyenne !== ''){
            if(eleve.moyenne<5) eleve.mention="A refaire"
            else eleve.mention ="Admis"
            if (eleve.moyenne.length>0 && eleve.moyenne.length<4)
            eleve.moyenne = this.checkDecimal(eleve.moyenne)
           }
           this.update_decision(eleve);
          },

        checkDecimal(moyenne){
         if(moyenne !== null || moyenne !== '')
           if(moyenne.length<4 && moyenne.length!==0){
             if(moyenne.length===1)
              return (moyenne+'.00')
              return (moyenne+'0')
          }
        },

        
          checkinput(obj){
            if(obj.moyenne>9.99)
              {obj.moyenne='0.00';alert('Moyenne incorrecte')}
            else if(obj.moyenne<0)
                  {obj.moyenne='0';}

            if (obj.moyenne.length > 4) {
                obj.moyenne = obj.moyenne.slice(0,4);
             }
          },

         getAnnees (ad,af){
          const annees = [];
          for(let i=ad; i<af+1; i++)
             annees.push(i.toString()+'-'+(i+1).toString());          
          return annees;
      },

      generate (){
          const data = this.ecole+'|'+this.classe+'|'+this.annee_prec();
    this.$axios.get('generate-formation-prec/'+ data).then((response)=>{
      console.log(response.data);
      if(response.data !== 0){
      this.$notifier.showMessage({content:response.data+' élève(s) traité(s) ',  color: 'success' })
          this.generateB = false;
      }
      else{
        this.$notifier.showMessage({content:' echec ',  color: 'error' })
      }
    });

  },

 async get_decision (){    
         this.visible = true
           await  this.$axios.get('get-decision/' + this.ecole+'|'+this.classe+'|'+ localStorage.anac).then((response)=>{
                 console.log(response.data);
                this.visible = false
                  this.eleves =response.data;                  
                  this.loading =false;
                  this.showtable = true;
                  this.generateB = true;
                  })
  },
 async get_decision_prec (ec, cl, an){    
        
           await  this.$axios.get('get-decision/' + ec+'|'+cl+'|'+an).then((response)=>{
                 console.log(response.data);               
                  this.eleves =response.data;                  
                  this.loading =false;
                  this.showtable = true;
                  this.generateB = true;
                  })
  },

  update_decision (eleve){
      let data = {}
       if(eleve.moyenne >9.99){
           this.$notifier.showMessage({ content: 'Vérifier la moyenne', color: 'error' })           
          return false;
         }
          if(this.classe > 12)
             data = {'classeleve_id':eleve.id,'moyenne':eleve.moyenne,'mention':eleve.mention, 'annee':eleve.annee, 'nordre':eleve.nordre, 'decision_id':eleve.decision_id};
             else
           data = {'classeleve_id':eleve.id,'moyenne':eleve.moyenne,'mention':eleve.mention};
      this.visible = true
            this.$axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
         this.$axios.patch('update-decision', JSON.stringify(data)).then((response)=>{
          console.log(response.data);
          if(response.data === 1)
            this.$notifier.showMessage({ content: 'Succès', color: 'success' }) 
          else
          this.$notifier.showMessage({ content: 'Echec', color: 'error' }) 
 this.visible = false
    })
  },

      
        
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
    }


  }
</script>

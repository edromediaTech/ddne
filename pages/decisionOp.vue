<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-certificate"
      :title="titre"
      class="px-5 py-3 mt-4" >      
     
                 <v-row> 
                      <v-col cols="12"  sm="6"     md="4">
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
                          <v-col   v-if = "communes.length > 0"
                           cols="12"
                            sm="6"
                               md="4">
                           <v-select
                          
                            v-model="commune"
                            :items="communes"
                            :rules="[v => !!v || 'Item is required']"
                            label="Commune"
                            required
                            @change="getData('communes', commune)"
                            ></v-select>
                           
                          </v-col>
                          <v-col   v-if = "zones.length > 0" cols="12"
                              sm="6"
                              md="2">
                           <v-select
                         
                            v-model="zone"
                            :items="zones"
                            :rules="[v => !!v || 'Item is required']"
                            label="Zones"
                            required
                            @change="getData('zones', zone)"
                            ></v-select>
                           
                          </v-col>
                        
                          <v-col  v-if = "ecoles.length > 0"  cols="12"
                            sm="6"
                            md="5">
                           <v-select
                          
                            v-model="ecole"
                            :items="ecoles"
                            :rules="[v => !!v || 'Item is required']"
                            label="Ecole"
                            required
                            @change="getData('ecoles', ecole)"
                            ></v-select>                           
                          </v-col>              
                          <v-col  v-if = "classes.length > 0" cols="12"
                            sm="6"
                            md="3">
                           <v-select
                          
                            v-model="classe"
                            :items="classes"
                            :rules="[v => !!v || 'Item is required']"
                            label="Classe"
                            required
                             @change="get_decision"
                            ></v-select>                           
                          </v-col> 
                           <v-col v-if="classe !== null"  cols="12" 
                            sm="6"
                            md="2">
                           <v-select                          
                            v-model="an"
                            :items="annees"
                            label="Année"
                             @change="get_decision"                                          
                            ></v-select>                           
                          </v-col>    
                          <v-progress-circular
                            v-show="visible"
                            :size="20"
                            :width="3"
                            color="info"
                            indeterminate                          
                          />    
                           <v-col  cols="12"
                            sm="6"
                            md="2">
                            <v-btn 
                            v-if="generateB"
                            fat
                            small
                            class="mt-4"
                            color="primary"
                            @click="generate"
                            >
                              Générer
                            </v-btn>
                           </v-col>         
         
                             
              </v-row>
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
             
             <!-- <download-excel
               v-if="eleves.length > 0"
              :data="eleves"
               class="mx-4 mt-1"
              name="Decision de fin d'année"
              header="La Liste des elèves"
            >
              <v-img
                max-height="40"
                max-width="40"
                src="images/excel.png"
              />
            </download-excel>
              
               <v-btn 
                  v-if="eleves.length > 0"               
                    class="mx-2 mt-2"
                     fab   
                     title="Télécharger liste ecole en PDF"                   
                     x-small
                      color="info"
                    @click=" generateReport"              
                  >
                  PDF
                  <client-only>
                     <vue-html2pdf   ref="html2Pdf"
                      :show-layout="false"
                      :float-layout="true"
                      :enable-download="true"
                      :preview-modal="false"
                      :paginate-elements-by-height="1400"
                      filename="Suped-Decision"
                      :pdf-quality="2"
                      :manual-pagination="false"
                      pdf-format="legal"
                      pdf-orientation="landscape"
                      pdf-content-width="1350px"                  
                      >
                        <template slot="pdf-content"  class="sectpdf">                             
                            <table-print-decision :eleves="eleves" :classe="classe" :texte="texte" :info-ecole="infoEcole" />                             
                        </template>
                    </vue-html2pdf>
                  </client-only>             
                  </v-btn> -->
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
    </base-material-card>
  </v-container>
</template>
<script>
// import tablePrintDecision from '~/components/tablePrintDecision.vue';

  export default {
 // components: { tablePrintDecision },   
   middleware: 'operateur',  
    data: () => ({
      titre:'Décision de fin d\'année ',
      dialog: false,
      viewPrint:false,
      visible: false,
      classe:null,
      generateB:false,
      classes: [],
      options: [],
      eleves: [],
      annees: [],
      an: '',
       district: '',
       texte:'',
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
    },
      
      pagination: {},
     
     
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
      
    },

    mounted () {
      this.get_dept()
      this.get_liste_annees()
      
       },

    methods: {      
      generateReport () {
           this.visible = true
           this.infoEcole = (this.ecoles.find(el => el.value === this.ecole)).text +' - '+ (this.classes.find(el => el.value === this.classe)).text
            this.texte = 'Decision de fin d\'année '+localStorage.anac 
            this.$refs.html2Pdf.generatePdf()
            this.visible = false
        },

         async get_liste_annees(){
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                    await this.$axios.get( 'liste-annee').then( response => {
                  this.annees = response.data;
                  })
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
        const data = this.ecole+'|'+this.classe+'|'+this.an;
    this.$axios.get('generate-formation/'+ data).then((response)=>{
      console.log(response.data);
      if(response.data !== 0){
      this.$notifier.showMessage({content:response.data+' élève(s) traité(s) ',  color: 'success' })
          this.generateB = false;
      }
      else{
        this.$notifier.showMessage({content:response.data+' echec ',  color: 'error' })
      }
    });

  },

 async get_decision (){    
         this.visible = true
          this.titre = 'Decision de fin d\'annee '
           await  this.$axios.get('get-decision/' + this.ecole+'|'+this.classe+'|'+ this.an).then((response)=>{
                 console.log(response.data);
                this.visible = false
                  this.eleves =response.data;  
                   this.titre = this.titre + this.an                
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

      getClasses () { 
          const responsable = localStorage.getItem('niveau');  
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')           
        this.$axios.get('get-classe-responsable/'+ responsable).then(res => {
          this.classes = res.data         
        })
      },
     
    }
  }
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>

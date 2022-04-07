<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-clipboard-outline"
      title="Gestion elèves"
      class="px-5 py-3 mt-4"
    >
     
     <v-row>
          <v-col cols="12"
            sm="6"          
            md="4">
       <v-progress-circular
          v-show="visible"
          :size="10"
          :width="1"
          color="info"
          indeterminate
          class="ma-auto"
        />
                              
            </v-col>
            

            <v-spacer />
            <v-col cols="12"
                sm="6"        
                md="3">
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
              <!-- @beforeDownload="beforeDownload($event)"  -->
            
      <v-data-table v-if="eleves.length > 0"
        v-model="selected"
        :headers="headers"
         :items="eleves"
         :search="search" show-select
         :footer-props="{'items-per-page-options':[ 50, 100, -1]}"
          sort-by="nom"
          class="elevation-1"
      >
       
        <template #[`item.datenais`]="{ item }">
          <span>{{ item.datenais | moment(" Do MMMM YYYY") }} </span>
        </template>
          <template #[`item.sexe`]="{ item }">
          <span>{{item.sexe ? 'Masculin' : 'Feminin' }} </span>
        </template> 
          <template #[`item.deficience`]="{ item }">
          <span>{{item.deficience ? 'Oui' : 'Non' }} </span>
        </template> 
          
        <template #top>
          
          <v-row class="mx-4 my-4">
             <v-btn
                  v-if="selected.length > 0"
                    class="mx-2 mt-2"
                     fab                      
                      x-small
                      color="primary"
                      title="Attestation"
                                
                  >
                  <v-icon>mdi-certificate</v-icon>
             </v-btn>
              <v-btn
                 v-if="selected.length > 0"
                   class="mx-2 mt-2"
                     fab                      
                      x-small
                      color="info"
                      title="Rélevés de notes"
                                
                  >
                  <v-icon>mdi-pencil</v-icon>
             </v-btn>
             <v-btn
                v-if="selected.length > 0"
                   class="mx-2 mt-2"
                     fab                                        
                      x-small
                      color="primary"
                      title="Transfert"
                        @click="generateTransfert"         
                  >
                   <v-icon>mdi-logout</v-icon>
                  
             </v-btn>          
              
            
            <v-divider
            v-if="selected.length > 0"
              class="mx-4"
              inset
              vertical
            />
            
            <v-spacer />
            <v-btn
                    v-if="eleves.length > 0"
                    class="mx-2 mt-2"
                     fab                      
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
                      filename="Suped-DDENE"
                      :pdf-quality="2"
                      :manual-pagination="false"
                      pdf-format="letter"
                      pdf-orientation="landscape"
                      pdf-content-width="1000px"       
                      
                        >
                        <template slot="pdf-content"  class="sectpdf">                             
                            <tablePrint :eleves="eleves" :texte="texte" />                                
                        </template>
                    </vue-html2pdf>
                  </client-only>             
                  </v-btn>
                  
          
             <download-excel             
                v-if="eleves.length > 0"
                class="mx-2 mt-1"
              :data="eleves"
              name="Liste eleves"
              header="La Liste des eleves"
            >
              <v-img
                max-height="40"
                max-width="40"
                src="images/excel.png"
              />
            </download-excel>
            
            
          </v-row>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template #no-data>
          <v-btn
            color="primary"
            @click="getClasses"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table> 
       <v-data-table
        v-model="selected"        :headers="headerSec"    :items="ecoles"       :search="search" 
         :footer-props="{'items-per-page-options':[ 50, 100, -1]}"
          sort-by="nom"
          class="elevation-1"
      >
        <template #top>
          
          <v-row class="mx-4 my-4">
        <download-excel             
                v-if="ecoles.length > 0"
                class="mx-2 mt-1"
              :data="ecoles"
              name="Liste eleves"
              header="La Liste des ecoles ayant le niveau secondaire"
            >
              <v-img
                max-height="40"
                max-width="40"
                src="images/excel.png"
              />
            </download-excel>
          </v-row>
        </template>
       </v-data-table>      
    </base-material-card>
  </v-container>
</template>
<script>
import tablePrint from '~/components/tablePrintPdf.vue';
   export default {
  components: { tablePrint},    
      middleware: 'responsable',          
  data: () => ({
     texte :'' ,
     trtexte:'',
      selected: [],
      dialog: false,
      visible: false,
      classe: null,
      classes: [],
      eleves: [],
      ecoles:[],
      search:'',
      departements:[],
      dialogDelete: false,
      ajouter : false,
      sexeop : [{text:'Masculin', value:1}, {text:'Féminin', value:0}],
      menu: false,
      modal: false,
      menu2: false,
      transferts:[],
      centres: [],
      editedIndex: -1,
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
      defaultItem: {
        nom:'',
        prenom: '',
        sexe: '',
        lieunais: '',
        datenais: '',
       tel_persrep:'',
        deficience: '',
        prenom_mere: '',
          },
          headprint: [       
          { text: "Nom", value: "nom" },
          { text: "Prénom", value: "prenom" },    
          { text: 'Naissance', value: 'lieunais' },
          { text: 'Date', value: 'datenais' },
          { text: 'Sexe', value: 'sexe' },
          { text: 'Tel Personne responsable ', value: 'tel_persrep' },
          { text: 'Prenom Mère', value: 'prenom_mere' },
          { text: 'Deficience', value: 'deficience' },
          ]
          
    }),

    computed: {
       
      headers (){
          const  headers= [       
          { text: "Ecole", value: "ecole" },
          { text: "Nom Directeur", value: "nomd" },
          { text: "Prenom", value: "prenom" },    
          { text: "Niveau", value: "prenom" },    
          { text: "Tel", value: "teld" },    
          { text: 'Filles', value: 'nb_fille' },
          { text: 'Garcons', value: 'nb_garcon' },
          { text: 'Total', value: 'total' },         
          
       ];
     
      return headers
        },
      headerSec (){
          const  headerSec= [       
          { text: "Ecole", value: "nom" },
          { text: "Niveau", value: "niveau" },                 
          { text: "Niveau1", value: "niveau1" },                 
          { text: "Directeur", value: "directeur" },                 
          { text: "Code", value: "code" },                 
          
       ];
     
      return headerSec
        },

      formTitle () {
        return this.editedIndex === -1 ? 'Elève' : 'Editer '
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
     this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
    },

    mounted () {
      this.get_ecole_secondaire()
     // this.getClasses()
     // this.get_certificat()
    },

    methods: {

     async get_certificat(){
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                await this.$axios.get('liste-certificat').then( response => {
                  this.eleves = response.data;
                  })
          },

     async get_ecole_secondaire(){
       this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                await this.$axios.get('ecole-secondaire/'+45).then( response => {
                  this.ecoles = response.data;
                  this.visible =false
                  })
          },

      format_data(){
        const data = []
        this.selected.forEach(function(el){
          data.push({classeleve_id : el.classeleve_id})
        })
        return data
      },

      downloadPdf (){
        
      },

      async beforeDownload ({ html2pdf, options, pdfContent }) {
            await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
                const totalPages = pdf.internal.getNumberOfPages()
                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i)
                    pdf.setFontSize(10)
                    pdf.setTextColor(150)
                    pdf.text('Page ' + i + ' de ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
                } 
            }).save()
        },
      setTexte(){
        this.texte = localStorage.ecole  +' - '+ (this.classes.find(el => el.value === this.classe)).text
      },
     
      generateReport () {
        this.setTexte()
            this.$refs.html2Pdf.generatePdf()
        },
       async get_dept(){
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
            await this.$axios.get('departement').then( response => {
                  this.departements = response.data;
                  })
          },
      getEleves () {
        this.visible = true
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
          const id = this.classe + '|'+ localStorage.ecole_id +'|'+ localStorage.anac
        this.$axios.get('get-eleve/'+ id).then(res => {
          this.eleves = res.data
          this.visible = false
        })
      },

      getClasses () { 
        this.visible = true
          const responsable = localStorage.niveau; 
         this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')           
        this.$axios.get('get-classe-responsable/'+ responsable).then(res => {
          this.classes = res.data 
          this.visible = false        
        })
      },

      getAge(dateString) {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
},

  check_age(classe, datenais){
          if(parseInt(this.getAge(datenais)) < classe)
            return false;
          return true;
      },

      deleteEleve (eleve) {
        this.$axios.delete('eleve-delete/' + eleve.classeleve_id +'|'+ eleve.id).then(res => {
         
          if (res.data.status === 1) { 
            this.$notifier.showMessage({ content: 'Elève supprimé', color: 'success' })            
            return true 
            } 
            else {           
            return false }
        })
      },

      updateEleve (eleve) {  
        this.visible = true          
        this.$axios.patch( 'eleve-edit/' + eleve.classeleve_id  +'|'+ eleve.id+'|'+localStorage.anac, eleve).then(res => {
        if (res.data.status === 1) { 
            this.$notifier.showMessage({ content: 'Elève modifié', color: 'success' })            
            return true 
            } 
          else { 
            this.$notifier.showMessage({ content: 'Echec', color: 'error' })            
            
            }        
        })
         this.visible = false
      },

    
    async storeEleve () {                   
        // this.loading = true
       //  this.$axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
        this.editedItem.ecole_id = localStorage.ecole_id
        this.editedItem.classe_id = this.classe
        this.editedItem.anac = localStorage.anac       
       this.visible = true
        this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.authToken
        await this.$axios.post('eleve-store', JSON.stringify(this.editedItem)).then(res => {              
          if (res.data.status === 1) {
             this.getEleves()
             this.$notifier.showMessage({ content: 'Elève enregistré avec succès', color: 'success' })    
               } else {
             this.$notifier.showMessage({ content: 'Echec:', color: 'error' })       
             }
        })
        this.loading = false
         this.visible = false
      },

      editItem (item) {
        this.editedIndex = this.eleves.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.eleves.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.deleteEleve(this.editedItem)       
        this.eleves.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      showSnackbar (){
         this.$notifier.showMessage({ content: 'veuillez saisir les champs obligatoires', color: 'info' })             
      },

      save () {       
         if(!this.check_age(this.classe,this.editedItem.datenais)){
            this.$notifier.showMessage({ content: 'La Date de naissance ne correspond pas a la classe!', color: 'error' })     
                  return false;
           }        
     
        if (this.editedIndex > -1) {
          this.editedItem.ecole_id = localStorage.ecole_id
          this.editedItem.classe_id = this.classe
          this.updateEleve(this.editedItem)
          Object.assign(this.eleves[this.editedIndex], this.editedItem)
            } 
            else {
               this.storeEleve()
            }
          this.close()
      },
    },
  }
</script>
<style scoped>
/* .v-progress-circular {
  margin: 1rem;
} */
.sectpdf {
  margin: 1em;
  color: #000;
 
}
 
</style>

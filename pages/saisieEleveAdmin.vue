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
                           <v-col
                           cols="12"
                              sm="6"
                              md="4">
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
                               md="3">
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
                               md="3">
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
                              md="2">
                           <v-select
                           
                            v-model="zone"
                            :items="zones"
                            :rules="[v => !!v || msgrules]"
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
                            :rules="[v => !!v || msgrules]"
                            label="Ecole"
                            required
                            @change="getData('ecoles', ecole)"
                            ></v-select>                           
                          </v-col>              
                          <v-col   v-if = "classes.length > 0" cols="12"
                            sm="6"
                            md="3">
                           <v-select                         
                            v-model="classe"
                            :items="classes"
                            :rules="[v => !!v || msgrules]"
                            label="Classe"
                            required
                             @change="getEleves"
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
                           <v-select                          
                            v-model="an"
                            :items="annee"
                            label="Année" 
                             @change="getEleves"                                              
                            ></v-select>                           
                          </v-col>             
         
            </v-row>
      <v-data-table
        :headers="headers"
        :items="eleves"
         :search="search"
         :footer-props="{'items-per-page-options':[ 50, 100, -1]}"
        sort-by="calories"
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
              class="mx-4"
              inset
              vertical
            />
            <v-spacer />
              
             
         
             <download-excel
              v-if="eleves.length > 0"
                class="mx-2 mt-2"
              :data="eleves"
              title="Telecharger en excel"
              name="Liste eleves"
              header="La Liste des eleves"
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
                      x-small
                      color="primary"
                    @click=" generateReport"              
                  >
                  PDF
                  <client-only>
                     <vue-html2pdf   ref="html2Pdf"
                      :show-layout="false"
                      :float-layout="true"
                      :enable-download="true"
                      :preview-modal="false"
                      :paginate-elements-by-height="1300"
                      filename="Suped-DDENE"
                      :pdf-quality="2"
                      :manual-pagination="false"
                      pdf-format="letter"
                      pdf-orientation="landscape"
                      pdf-content-width="1000px"        
                      
                        >
                      <template slot="pdf-content"  class="sectpdf">                             
                          <table-print-eleve :eleves="eleves" :texte="texte"  :formation-c="formationC"/>                                
                       </template>
                      </vue-html2pdf>
                  </client-only>             
                  </v-btn>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template #activator="{ on, attrs }">
                <v-btn
                 :disabled ="classe == null"
                  color="primary"
                  dark
                  fab                                        
                   x-small
                  title="Ajouter elèves"
                    class="mx-2 mt-2 mb-2"
                                    
                  v-bind="attrs"
                  v-on="on"                
                   
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                  
                <v-card-text>
                  <v-container>                     
                    <v-row>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field
                          v-model="editedItem.nom"
                          label="Nom"
                           :rules="[v => !!v || msgrules]"
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
                          v-model="editedItem.prenom"
                          label="Prénom"
                           maxlength="55"
                           :rules="[v => !!v || msgrules]"
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
                           :rules="[v => !!v || msgrules]"
                           required
                            maxlength="25"
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
                           :rules="[v => !!v || msgrules]"
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
                        <v-col
                        cols="12"
                        sm="6"
                        md="5"
                      >
                        <v-text-field
                          v-model="editedItem.prenom_mere"
                          label="Prénom de la Mère"
                           maxlength="25"
                           :rules="[v => !!v || msgrules]"
                           required
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
                           :rules="[v => !!v || msgrules]"
                           required
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
                     
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
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
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="deleteItemConfirm"
                  >
                    OK
                  </v-btn>
                  <v-spacer />
                </v-card-actions>
              </v-card>
            </v-dialog>
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
       
    </base-material-card>
  </v-container>
</template>
<script>
import tablePrintEleve from '~/components/tablePrintEleve.vue';
   export default {
  components: { tablePrintEleve },  
      middleware: 'responsable',     
    data: () => ({
     valid: false,
      dialog: false,
      visible: false,
      classe:null,
      classes: [],
      eleves: [],
       district: '',
    commune: '',
    texte:'',
    formationC:'',
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
    annee: ['2020-2021', '2021-2022'],
    an: '2020-2021',
      search:'',
      msgrules:'Champ obligatoire',
      dialogDelete: false,
      ajouter : false,
      sexeop : [{text:'Masculin', value:1}, {text:'Féminin', value:0}],
      // date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
     
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
          { text: "Nom", value: "nom" },
          { text: "Prénom", value: "prenom" },    
          { text: 'Naissance', value: 'lieunais' },
          { text: 'Date', value: 'datenais' },
          { text: 'Sexe', value: 'sexe' },
          { text: 'Tel Personne responsable ', value: 'tel_persrep' },
          { text: 'Prenom Mère', value: 'prenom_mere' },
          { text: 'Deficience', value: 'deficience' },
          { text: 'Actions', value: 'actions', sortable: false },
       ];
      if (this.editedItem.sexe === '0'){
           headers.push({ text: "Masculin", value: "0" })
           headers.push({ text: "Féminin", value: "1" })
         }
      return headers
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
      
      this.get_dept()
    },

    methods: {
        async beforeDownload ({ html2pdf, options, pdfContent }) {
            await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
                const totalPages = pdf.internal.getNumberOfPages()
                for (let i = 1; i <= totalPages; i++) {
                    pdf.setPage(i)
                    pdf.setFontSize(10)
                    pdf.setTextColor(150)
                    pdf.text('Page ' + i + ' sur ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
                } 
            }).save()
        },
       setTexte(){
       
      },
      generateReport () {
        this.texte =  (this.ecoles.find(el => el.value === this.ecole)).text +' - '+ (this.classes.find(el => el.value === this.classe)).text
        this.formationC = 'Formation de classe ' + localStorage.anac
            this.$refs.html2Pdf.generatePdf()
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
                this.$axios.get( 'get-departement/'+ this.departement).then( response => {
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
                 this.$axios.get( 'get-district/'+ this.district).then( response => {
                  this.communes = response.data;
                    this.visible = false
                })
               
              }
              if (data === 'communes'){
                  this.ecoles = []
                  this.niveaux = []
                  this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get( 'get-commune/'+ this.commune).then( response => {
                  this.zones = response.data;
                   this.visible = false
                 })
                
              }
              if (data === 'zones'){
                  this.niveaux = []
                  this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get( 'get-zone/'+ this.zone).then( response => {
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
        
      getEleves () {
        this.visible = true
        if(this.classe !== null || this.an !==''){
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
          const id = this.classe + '|'+ this.ecole +'|'+ this.an
        this.$axios.get('get-eleve/'+ id).then(res => {
          this.eleves = res.data
           this.visible = false
        })
      }
      },

      getClasses () { 
          const responsable = localStorage.niveau; 
          this.visible = true
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
    
            // this.$store.dispatch('set_snackbar', { showing: true, text: 'Elève supprimé' })
            return true } 
            else { 
           
            return false }
        })
      },
      updateEleve (eleve) {            
        this.$axios.patch( 'eleve-edit/' + eleve.classeleve_id  +'|'+ eleve.id, eleve).then(res => {
           return true
        })
      },

    
      async storeEleve () {                   
                  
        this.editedItem.ecole_id = this.ecole
        this.editedItem.classe_id = this.classe
        this.editedItem.anac = localStorage.anac
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
         
        await this.$axios.post( 'eleve-store', this.editedItem).then(res => {
        
          if (res.data.status === 1) {
            this.getEleves()
             this.$notifier.showMessage({ content: 'Elève enregistré avec succès', color: 'success' })
    
                    // console.log('Don inséré!')
          } else {
            this.$notifier.showMessage({ content: 'Echec:', color: 'error' })
            // console.log(res.data.message)
          }
        })
        this.loading = false
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
            this.loading = true
        // if (!this.$refs.form.validate()) { this.loading = false; return false }

         if(!this.check_age(this.classe,this.editedItem.datenais)){
            this.$notifier.showMessage({ content: 'La Date de naissance ne correspond pas a la classes!', color: 'error' })     
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
.v-progress-circular {
  margin: 1rem;
}
.sectpdf {
  margin: 1em;
  color: #000;
 
}
</style>

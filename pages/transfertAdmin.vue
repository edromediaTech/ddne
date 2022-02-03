<template>
     <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
     <base-material-card
        title="Transfert Elèves"
        icon="mdi-logout"
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
                                label="Département"
                            required
                            @change="getData('departements', departement)"
                            ></v-select>                           
                          </v-col>
                          
                          <v-col  v-if = "districts.length > 0" 
                              cols="12" 
                                 sm="6"
                               md="3">
                              <v-select                           
                            v-model="donnee.district"
                            :items="districts"
                                label="District"
                            required
                            @change="getData('districts', donnee.district)"
                            ></v-select>                           
                          </v-col>
                          <v-col  v-if = "communes.length > 0"
                           cols="12"
                            sm="6"
                               md="3">
                           <v-select
                           
                            v-model="donnee.commune"
                            :items="communes"
                                label="Commune"
                            required
                            @change="getData('communes', donnee.commune)"
                            ></v-select>
                           
                          </v-col>
                          <v-col v-if = "zones.length > 0" cols="12"
                              sm="6"
                              md="2">
                           <v-select                           
                            v-model="donnee.zone"
                            :items="zones"
                                label="Zones"
                                 required  
                                    @change="getData('zones', donnee.zone)"                        
                            ></v-select>
                           
                          </v-col>
                           <v-col v-if = "ecoles.length > 0" cols="12"
                              sm="6"
                              md="7">
                           <v-select                           
                            v-model="donnee.ecole"
                            :items="ecoles"
                                label="Ecoles"
                                 required  
                                    @change="getData('ecoles', donnee.ecole)"                        
                            ></v-select>
                           
                          </v-col>
                           <v-col v-if = "classes.length > 0" cols="12"
                              sm="6"
                              md="3">
                           <v-select                           
                            v-model="donnee.classe"
                            :items="classes"
                                label="Classe"
                                 required                          
                            ></v-select>
                           
                          </v-col>
                           <v-progress-circular
                            v-show="visible"
                            class="mt-4"
                            :size="20"
                            :width="3"
                            color="info"
                            indeterminate
                            />
                          
                      
                      <v-col cols="12" md="2" sm="6">
                            <v-btn v-if="departement !== ''" fat color="primary" @click="get_eleves">Executer</v-btn>
                      </v-col>
                       
                        </v-row>

     <v-data-table v-if="eleves.length > 0"  v-model="selected" :headers="headers" :items="eleves" show-select
             :search="search"    :footer-props="{'items-per-page-options':[50, 100, -1]}">  
          <template #top>          
          <v-row class="mx-4 my-4">
               <v-progress-circular
                    v-show="visible"
                    :size="50"
                    :width="3"
                    color="info"
                    indeterminate                    
                    /> 
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
             

              <!-- <v-divider
               v-if="ecoles.length > 0"
              class="mx-4"
              inset
              vertical
            /> -->
              <v-spacer />
             
           
           <download-excel             
               v-if="eleves.length > 0"
                title="Télécharger liste eleve en excel" 
                class="mx-2 mt-1"
              :data="eleves"
              name="Liste eleves"
              header="Liste des eleves"
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
                     title="Télécharger liste eleve en PDF"                   
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
                      filename="Suped-ListeEcole"
                      :pdf-quality="2"
                      :manual-pagination="false"
                      pdf-format="letter"
                      pdf-orientation="landscape"
                      pdf-content-width="1000px"       
                      
                        >
                        <template slot="pdf-content"  class="sectpdf">                             
                         <table-print-reqecole :ecoles="ecoles" :texte="texte" />                             
                        </template>
                    </vue-html2pdf>
                  </client-only>             
                  </v-btn>
                     <v-badge
                        class="mx-4 mt-3"
                          color="primary"
                          x-small
                          title="Total Eleves"
                          :content="eleves.length"
                        >
                        <v-icon>mdi-student</v-icon>
                      </v-badge>
              
           <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                  
                <v-card-text>
                  <v-container>
                     
                    <v-row>
                        
                        <v-col cols="12"
                              sm="6"
                              md="12">
                           <v-select                           
                            v-model="ecolec"
                            :items="ecolecibles"
                                label="Ecoles"
                                 required                                                           
                            ></v-select>                           
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
                    @click="EleveTrans"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
     
          </v-row>
          </template>
          <template #[`item.actions`]="{ item }">
          <v-icon
           v-if="selected.length > 0"
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-logout
          </v-icon>
          
        </template>
    <template #[`item.datenais`]="{ item }">
          <span>{{ item.datenais | moment(" Do-MM-YYYY") }} </span>
        </template>
      
        
         
     </v-data-table>
     </base-material-card>
  </v-container>
</template>

<script>
export default {
   middleware: 'super', 
        data: () => ({   
             search:'',
             selected:[],
             dialog:false,
           msgrules:'Champ obligatoire',   
          departement: '',
          texte:'',
          donnee:{ district: 0,    ecole:0,   classe:0,     commune: 0,     zone:0},
            departements: [],
            districts: [],
            communes: [],
            zones: [],
            ecoles:[],
            ecolecibles:[],
            classes:[], 
            eleves:[],          
            visible:false,
            ecolec:'',
            headers: [ 
                 { text: 'ID', value: 'id' },      
                 { text: 'Nom', value: 'nom' },      
                 { text: 'Prénom', value: 'prenom' },                         
                 { text: 'Ecole', value: 'ecole' },      
                 { text: "Date de Naissance", value: "datenais" },
                  { text: "Prénom de la Mère", value: "prenom_mere" }, 
                   { text: 'Actions', value: 'actions', sortable: false }, 
                                    
             ]
          
    }),

     computed : {
       formTitle () {
        return this.editedIndex === -1 ? 'Utilisateur' : 'Selectionner Ecole '
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    mounted () {      
      this.get_dept()
       this.getEcoleCible()
         
    },
    methods:{
          async get_dept(){
              this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
            await this.$axios.get( 'departement').then( response => {
                  this.departements = response.data;
                    this.departements.push({text:'Tous', value: 0})
                  })
                  this.visible = false
          },

        

          async get_eleves(){
              this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               const data = this.donnee.district+'|'+this.donnee.commune+'|'+this.donnee.zone+'|'+this.donnee.ecole+'|'+this.donnee.classe
                await this.$axios.get( 'get-eleve-trans/'+ data).then( response => {
                        this.eleves = response.data;
                  })
                this.visible = false
          },

            async getEcoleCible(){
              this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')              
                await this.$axios.get( 'getEcole').then( response => {
                        this.ecolecibles = response.data;
                  })
                this.visible = false
          },
          
         
     async EleveTrans () { 
            this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')         
                 await this.$axios.patch('eleve-trans/'+this.ecolec).then(res => {       
                        if (res.data.status === 1) {
                            this.get_eleves()
                            this.$notifier.showMessage({ content: 'Elève transferé avec succès', color: 'success' })             
                                    
                        } else {
                            this.$notifier.showMessage({ content: 'Echec:', color: 'error' })
                              }
                        })
                        this.loading = false
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
                    this.districts.push({text:'Tous', value: 0})
                   this.visible = false 
                })
               
              }
              if (data === 'districts'){
                  this.zones = []                
                  this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get( 'get-district/'+ this.donnee.district).then( response => {
                  this.communes = response.data;
                  this.communes.push({text:'Toutes', value: 0})
                    this.visible = false
                })
               
              }
              if (data === 'communes'){
                
                  this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get( 'get-commune/'+ this.donnee.commune).then( response => {
                  this.zones = response.data;
                    this.zones.push({text:'Toutes', value: 0})
                   this.visible = false
                 })
                
              }
              if (data === 'zones'){                  
                  this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get( 'get-zone/'+ this.donnee.zone).then( response => {
                  this.ecoles = response.data;
                    this.ecoles.push({text:'Toutes', value: 0})
                   this.visible = false
                 })                
              }
               if (data === 'ecoles'){
                 this.visible = true
                 this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get('get-classe/'+ -1).then( response => {                   
                 this.classes = response.data;
                 this.classes.push({text:'Toutes', value: 0})
                  this.visible = false
                })
              }
              
             },

        close () {
             this.eleveAccept = []
        this.dialog = false
        },

    editItem (item) {
        // this.editedIndex = this.users.indexOf(item)
        // this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

    generateReport () {
       this.texte =  this.get_text()
      
            this.$refs.html2Pdf.generatePdf()
        },

   resetChamp(data) {
     const champ = ['departements','districts','communes','zones']
     const index = champ.indexOf(data) 

    for(let i= index+1; i<champ.length; i++){      
       this[champ[i]] = []
         
     }
  }


    }
}
</script>
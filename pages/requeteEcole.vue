<template>
     <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
     <base-material-card
        icon="mdi-home"
        title="Gestion Ecole"
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
                           <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-select
                          v-model="donnee.secteur"
                          :items="[{text:'Tous', value:-1},{text:'Public', value:1}, {text:'Privé', value:0}]"
                          label="Secteur"                          
                        />
                      </v-col>
                       <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-select
                          v-model="donnee.niveau"
                          :items="niveauens"
                          label="Niveau Enseignement"
                         
                        />
                      </v-col>
                      <v-col cols="12" md="2" sm="6">
                            <v-btn v-if="departement !== ''" fat color="primary" @click="get_ecole">Executer</v-btn>
                      </v-col>
                       
                        </v-row>

     <v-data-table v-if="ecoles.length > 0" :headers="headers" :items="ecoles" 
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
                  v-if="ecoles.length > 0"  
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
               v-if="ecoles.length > 0"
                title="Télécharger liste ecole en excel" 
                class="mx-2 mt-1"
              :data="ecoles"
              name="Liste eleves"
              header="Liste des ecoles"
            >
              <v-img
                max-height="40"
                max-width="40"
                src="images/excel.png"
              />
            </download-excel>
                 <v-btn 
                  v-if="ecoles.length > 0"               
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
                          title="Total Ecoles"
                          :content="ecoles.length"
                        >
                        <v-icon>mdi-home</v-icon>
                      </v-badge>
               </v-row>      
            
           
      </template>

      
          <template #[`item.secteur`]="{ item }">
          <span>{{item.secteur ? 'Public' : 'Privé' }} </span>
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
      msgrules:'Champ obligatoire',   
          departement: '',
          texte:'',
          donnee:{ district: 0,    secteur:-1,   niveau:0,     commune: 0,     zone:0},
            departements: [],
            districts: [],
            communes: [],
            zones: [],
            niveauens:[{text:'Tous', value:0},{text:'Prescolaire', value:'0001'}, {text:'Fondamental', value:'0110'},
                {text:'Secondaire', value:'1000'},  {text:'Ecole Complete', value:'1111'},
                {text:'Fondamental 1er et 2eme cycle', value:'0010'},
                {text:'Prescolaire et Fondamental 1er et 2eme cycle', value:'0011'},
                {text:'Prescolaire et Fondamental complet', value:'0111'},
                {text:'Fondamental 3eme Cycle et Secondaire', value:'1100'},
                {text:'Fondamental et Secondaire', value:'1110'}, {text:'3e Cycle', value:'0100'},
                {text:'Prescolaire inclus', value:'-0001'},
                {text: '1e et 2e  Cycle inclus', value:'-0010'},
                  {text: '3e Cycle inclus', value:'-0100'},
                  { text:'Secondaire inclus', value:'-1000'}
                ],
            ecoles:[],
            visible:false,
            headers: [ 
                 { text: 'Ecole', value: 'Ecole' },      
                 { text: "Adresse", value: "Adresse" },
                 { text: "Accès", value: "Acces" },                     
                 { text: "Tel", value: "tel" },                     
                 { text: "Nom Directeur", value: "Nom_Directeur" },                     
                 { text: "Prénom", value: "Prenom_Directeur" },                     
             ]
          
    }),

    mounted () {      
      this.get_dept()
     // this.get_niveau()     
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

        

          async get_ecole(){
              this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               const data = this.donnee.district+'|'+this.donnee.commune+'|'+this.donnee.zone+'|'+this.donnee.secteur+'|'+this.donnee.niveau
                await this.$axios.get( 'get-rapportecole/'+ data).then( response => {
                        this.ecoles = response.data;
                  })
                this.visible = false
          },
          
          async get_text(){             
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               const data = this.donnee.district+'|'+this.donnee.commune+'|'+this.donnee.zone+'|'+this.donnee.secteur+'|'+this.donnee.niveau
                await this.$axios.get( 'get-text/'+ data).then( response => {
                        this.texte = response.data;
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
<template>
<v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-info"
      title="Enseignants"
      class="px-5 py-3 mt-4"
    >
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
                              md="4">
                           <v-select
                         
                            v-model="zone"
                            :items="zones"
                            :rules="[v => !!v || 'Item is required']"
                            label="Zones"
                            required
                            @change="getData('zones', zone)"
                            ></v-select>
                           
                          </v-col>
    </v-row>
  
     <v-data-table  :headers="headers" :items="enseignants"  :search="search"
      class="elevation-1" :footer-props="{'items-per-page-options':[50, 100, -1]}">  
          <template #top>
          
          <v-row class="mx-4 my-4">
              
            <v-col cols="12"
                sm="6"        
                md="3">
              <v-text-field
                    
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
               ></v-text-field>
             </v-col>
              <v-divider
              class="mx-4"
              inset
              vertical
            />
              <v-spacer />
              
                <download-excel             
              
                class="mx-2 mt-1"
              :data="ecoles"
              name="Liste eleves"
              header="Liste des enseignants du Nord-Est"
            >
              <v-img
                max-height="40"
                max-width="40"
                src="images/excel.png"
              />
            </download-excel>
                 <v-btn                
                    class="mx-2 mt-2"
                     fab                      
                     x-small
                      color="info"
                    @click=" generateListeEnseignant"              
                  >
                  PDF
                  <client-only>
                     <vue-html2pdf   ref="html2Pdf"
                      :show-layout="false"
                      :float-layout="true"
                      :enable-download="true"
                      :preview-modal="false"
                      :paginate-elements-by-height="1400"
                      filename="Suped-ListeEnseignant-NE"
                      :pdf-quality="2"
                      :manual-pagination="false"
                      pdf-format="letter"
                      pdf-orientation="landscape"
                      pdf-content-width="1000px"       
                      
                        >
                        <template slot="pdf-content"  class="sectpdf">                             
                           <table-print-ecole-zone :enseignants="enseignants" :texte="texte" /> 
                           
                        </template>
                    </vue-html2pdf>
                  </client-only>             
                  </v-btn>
               </v-row>  
           
      </template>      
          <template #[`item.sexe`]="{ item }">
          <span>{{item.sexe ? 'M' : 'F' }} </span>
        </template> 
         
     </v-data-table>
    </base-material-card>
</v-container>
</template>
<script>
 import TablePrintEcoleZone from '~/components/tablePrintEcoleZone.vue';
   export default {
   components: {TablePrintEcoleZone },   
   //  middleware: 'inspect',  
    data (){
        return {
            
             enseignants: [],           
             id:null,
            search : '',
          
              texte:'',
              classe:'',
             headers: [ 
         { text: 'Ecole', value: 'ecole' },      
          { text: "Nom", value: "nom" },
          { text: "Prénom", value: "prenom" },          
          { text: 'Adresse', value: 'adresse' },
          { text: 'Tel', value: 'tel' },
          { text: 'Sexe', value: 'sexe' },
          { text: 'CIN', value: 'cin' },
          { text: 'NIF', value: 'nif' },
          { text: 'Ecole', value: 'Ecole' },
          { text: 'Classe', value: 'nomclasse' },
         
          ]
        }
    },
    mounted (){
       this.get_liste_Enseignant() 
    },
    methods : {     

       async get_liste_Enseignant (){
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
          await  this.$axios.get('get-liste-enseignant').then(res => {
                this.enseignants = res.data               
            })
        },

         async get_dept(){
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               await this.$axios.get( 'departement').then( response => {
                  this.departements = response.data;
                  })
             },

 generateListeEcole () {
         this.texte ='Liste des écoles de la '+ localStorage.zonename 
            this.$refs.html2Pdf.generatePdf()
        },
      
     

       

      

    
    }
}
</script>
<template>
<v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-info"
      title="Ecoles"
      class="px-5 py-3 mt-4"
    >
  
     <v-data-table :headers="headers" :items="ecoles"  :search="search"
      class="elevation-1" :footer-props="{'items-per-page-options':[50, 100, -1]}">  
          <template #top>
          
          <v-row class="mx-4 my-4">
              
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
              <v-divider
               v-if="ecoles.length > 0"
              class="mx-4"
              inset
              vertical
            />
              <v-spacer />
               <v-progress-circular
                            v-show="visible"
                            :size="20"
                            :width="3"
                            color="info"
                            indeterminate
                          
                          /> 
              
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
                      filename="Suped-StatsEcole"
                      :pdf-quality="2"
                      :manual-pagination="false"
                      pdf-format="letter"
                      pdf-orientation="landscape"
                      pdf-content-width="1000px"       
                      
                        >
                        <template slot="pdf-content"  class="sectpdf">                             
                         <table-print-ecole :ecoles="ecoles" :texte="texte" />                             
                        </template>
                    </vue-html2pdf>
                  </client-only>             
                  </v-btn>
                  
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
 import {mapGetters } from 'vuex'
import tablePrintEcole from '~/components/tablePrintEcole.vue'
   export default {
  components: { tablePrintEcole },
     // middleware: 'admin',  
    data (){ 
        return {
            dialog:false,          
             ecoles: [],
             acceptes:[],
             selected:[],
             id:null,
            search : '',
            visible: false,
              texte:'',  
              classe:'',
             headers: [ 
         { text: 'Ecole', value: 'ecole' },      
          { text: "Nom Directeur", value: "nomd" },
          { text: "Prénom", value: "prenom" },          
          { text: 'Section Communale', value: 'nom' },
          { text: 'Tél Directeur ', value: 'teld' },
          { text: 'Secteur', value: 'secteur' },
          { text: 'Filles', value: 'nb_fille' },
          { text: 'Garcons', value: 'nb_garcon' },
          { text: 'Total', value: 'total' },
         
          ]
        }
    },
    
computed: {
       ...mapGetters('auth', ['user']),        
     },
     
    mounted (){
       this.get_liste_ecole() 
    },
    methods : {     

       async get_liste_ecole (){
         this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               await this.$axios.get('stat-ecole-ip/'+ localStorage.id +'|'+ localStorage.ip).then(res => {
                this.ecoles = res.data  
                this.visible = false             
            })
        },

 generateReport () {
   this.visible = true
   const tab = ['Prescolaire', 'Principal', 'Secondaire']
          this.texte = 'Statistique des écoles  du ' +tab[localStorage.type]+ ' du district de '+ localStorage.districtname
            this.$refs.html2Pdf.generatePdf()
            this.visible = false
        },
      
     

        
    }
}
</script>
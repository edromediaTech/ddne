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
  
     <v-data-table  :headers="headers" :items="ecoles"  :search="search"
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
              header="Liste des ecoles"
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
                    @click=" generateListeEcole"              
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
                           <table-print-ecole-zone :ecoles="ecoles" :texte="texte" /> 
                           
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
 import TablePrintEcoleZone from '~/components/tablePrintEcoleZone.vue';
   export default {
   components: {TablePrintEcoleZone },   
   //  middleware: 'inspect',  
    data (){
        return {
            
             ecoles: [],           
             id:null,
            search : '',
          
              texte:'',
              classe:'',
             headers: [ 
         { text: 'Ecole', value: 'ecole' },      
          { text: "Nom Directeur", value: "nomd" },
          { text: "Prénom", value: "prenom" },          
          { text: 'Adresse', value: 'adresse' },
          { text: 'Tel Directeur ', value: 'teld' },
          { text: 'Secteur', value: 'secteur' },
         
          ]
        }
    },
    mounted (){
       this.get_liste_ecole() 
    },
    methods : {     

       async get_liste_ecole (){
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
          await  this.$axios.get('get-liste-ecole-inspect/'+ localStorage.inspect).then(res => {
                this.ecoles = res.data               
            })
        },

 generateListeEcole () {
         this.texte ='Liste des écoles de la '+ localStorage.zonename 
            this.$refs.html2Pdf.generatePdf()
        },
      
     

       

      

    
    }
}
</script>
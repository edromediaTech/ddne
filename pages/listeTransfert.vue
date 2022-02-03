<template>
<v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-logout"
      title="Transferts entrants"
      class="px-5 py-3 mt-4"
    >
  
     <v-data-table v-model="selected"  :headers="headers" :items="eleves" 
      class="elevation-1" :footer-props="{'items-per-page-options':[50, 100, -1]}">  
          <template #top>          
           <v-row class="mx-4 my-4">           
              <v-btn   v-if="eleves.length > 0"            
                   class="mx-2 mt-2"
                     fab                                        
                      x-small
                      color="info"
                      title="Imprimer Transfert entrant"
                         @click=" generateReport"        
                  >
                   <v-icon>mdi-printer</v-icon>
                    <client-only>
                     <vue-html2pdf   ref="html2Pdf"
                      :show-layout="false"
                      :float-layout="true"
                      :enable-download="true"
                      :preview-modal="false"
                      :paginate-elements-by-height="1400"
                      filename="Suped-Transfert"
                      :pdf-quality="2"
                      :manual-pagination="false"
                      pdf-format="letter"
                      pdf-orientation="landscape"
                      pdf-content-width="1000px"       
                      
                        >
                        <template slot="pdf-content"  class="sectpdf">                             
                            <liste-tranfert-pdf :eleves="eleves" :texte="texte" />                                
                        </template>
                    </vue-html2pdf>
                  </client-only> 
                 </v-btn>      
            
          </v-row>
          </template>
       <template #[`item.datenais`]="{ item }">
          <span>{{ item.datenais | moment(" Do-MM-YYYY") }} </span>
        </template>
          <template #[`item.sexe`]="{ item }">
          <span>{{item.sexe ? 'M' : 'F' }} </span>
        </template> 
          <template #[`item.deficience`]="{ item }">
          <span>{{item.deficience ? 'Oui' : 'Non' }} </span>
        </template> 
     </v-data-table>
    </base-material-card>
</v-container>
</template>
<script>
import ListeTranfertPdf from '~/components/listeTranfertPdf.vue';
   export default {
  components: { ListeTranfertPdf},   
      middleware: 'responsable',  
    data (){
        return {
            dialog:false,
            transferes : [],
            transprint : [],
             tab_del:[],
             eleves: [],
             acceptes:[],
             id:null,
            selected : [],
            btext:'Accepter',
              texte:'',
              classe:'',
             headers: [       
          { text: "Nom", value: "nom" },
          { text: "Prénom", value: "prenom" },    
          { text: 'Classe', value: 'nomclasse' },
          { text: 'Ecole', value: 'ecole' },
          { text: 'Naissance', value: 'lieunais' },
          { text: 'Date', value: 'datenais' },
          { text: 'Sexe', value: 'sexe' },
          { text: 'Tel Personne responsable ', value: 'tel_persrep' },
          { text: 'Prenom Mère', value: 'prenom_mere' },
          { text: 'Deficience', value: 'deficience' },
          ]
        }
    },
    mounted (){
       this.get_eleve_accepter() 
    },
    methods : {     

       async get_eleve_accepter (){
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
          await  this.$axios.get('get-eleve-accepter/'+ localStorage.ecole_id).then(res => {
                this.eleves = res.data               
            })
        },

 generateReport () {
         this.texte = localStorage.ecole
            this.$refs.html2Pdf.generatePdf()
        },
      
     

        generateTransfert(){
             this.transprint = this.selected              
              this.texte = localStorage.ecole
            this.$refs.trans.generatePdf()
        },

         sug_id (){
            const tab = this.selected.map(item => item.id)
            this.tab_del = tab;
        },


      delAllItem(){
                     
            this.selected.forEach((se) =>{
                const editedIndex = this.transferes.indexOf(se) 
                this.transferes.splice(editedIndex, 1)  
            })               
        },

     async  deleteAll_transferts () {
           this.sug_id()
             this.visible = true
             const tab = this.tab_del.join('|') 
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')        
          await this.$axios.delete('delete-group-trans/'+ tab).then(res => {
          if (res.data !== 0) {
              let message =  res.data+' élève restauré'
              if(res.data > 1)
               message =  res.data+' élèves restaurés'
                this.$notifier.showMessage({ content: message , color: 'success' })            
              this.delAllItem()
              this.selected = []
          }
           this.visible = false

       })
        },

        
        close () {
             this.eleveAccept = []
        this.dialog = false
        },

    
    }
}
</script>
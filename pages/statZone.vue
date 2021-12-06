<template>    
    <v-container
    id="dashboard"
    fluid
    tag="section"
  >
   <base-material-card
      icon="mdi-clipboard-outline"
      title="Statistique des Ecoles"
      class="px-5 py-3 mt-4"
    >
    
    <v-data-table   v-if="stat.length > 0"  v-model="selected" :headers="headers" :items="stat"  show-select :search="search"
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
              <v-spacer />
             
               <!-- <v-btn                
                    class="mx-2 mt-2"
                     fab                      
                      small
                      title="Valider elèves"
                      color="info"                                
                  > -->
                   <!-- <nuxt-link :to="({ name: 'validerEleve', params:{tabEcole:selected} })">
                        <v-icon> mdi-check</v-icon>
                   </nuxt-link>                 -->
               <!-- </v-btn> -->
               <v-btn
                     v-if="selected.length > 0"
                       class="mx-2 mt-2"
                        title="Valider elèves"
                     fab                                        
                      x-small
                      color="info"
                        @click="getEleveTransfert">
                 <v-icon> mdi-check</v-icon>
               </v-btn>
                 <v-btn                
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
                            <table-print-zone :eleves="stat" :texte="texte" />                                
                        </template>
                    </vue-html2pdf>
                  </client-only>             
                  </v-btn>
               </v-row>
                <v-divider
              class="mx-4"
              inset
              vertical
            />
            
           
      </template>
     </v-data-table>
   </base-material-card>
  </v-container>
</template>
<script>
 import {mapGetters } from 'vuex'
import tablePrintZone from '~/components/tablePrintZone.vue'
export default {
  components: { tablePrintZone },
    // middleware: 'admin', 
      data () {
      return {
          search:'',
         texte: '', 
        stat: [],
        ecoled:'',
        zone:'',
        selected:[],
        tab_val:[],
        all_select : false, 
        visible:false,
        headers: [
          { text: "Ecole", value: "ecole" },
          { text: "Filles", value: "nb_fille" },
          { text: "Garcons", value: "nb_garcon" },
          { text: "Total", value: "total" },
        ],
        
      }
  },
    computed: {
       ...mapGetters('auth', ['user']),    
     },
    mounted (){
      
        this.get_ecole()
          },
     methods :{
        
              async get_ecole (){
                  
                this.visible = true                
                this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.authToken              
                   await this.$axios.get('get-ecole-inspect/'+ localStorage.inspect).then(response =>{                                              
                          this.stat = response.data         
                                                     
                   })
                   this.visible = false
            },
             get_tabecole (tabl){
            const tab = tabl.map(item => item.id)
            return tab;            
        },

       

       async  getEleveTransfert(){
           // const tab = this.$route.params.tabEcole                     
           const id = this.get_tabecole(this.selected).join('|')
                    
         this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
          await  this.$axios.get('get-eleve-accepter/'+ id).then(res => {
              if(res.data.length === 0)
              this.$notifier.showMessage({ content: 'Pas de transfert en attente de validation pour cette école', color: 'info' })
               else
                this.$router.push({name:'validerEleve', params:{eleves:res.data}}) 
                this.selected = []                                            
            })
        },
      
 generateReport () {
        this.texte = 'Statistique des écoles de la ' + localStorage.zonename 
            this.$refs.html2Pdf.generatePdf()
        },
    


            }
        
}
</script>
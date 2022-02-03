<template>
<v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-logout"
      title="Transferts sortants"
      class="px-5 py-3 mt-4"
    >
   
     <v-data-table v-model="selected" show-select :headers="headers" :items="transferes" 
      class="elevation-1" :footer-props="{'items-per-page-options':[50, 100, -1]}">  
          <template #top>
              <v-row class="mx-4 my-4">
          <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template #activator="{ on, attrs }">
                <v-btn
               dialog = true
                  color="primary"
                  dark
                  fab                                        
                   x-small
                  title="No transfert"
                  class="mx-2 mt-2"                  
                  v-bind="attrs"
                  v-on="on"  
                   
                >
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
              </template>
    <v-toolbar
    dark
    color="primary"
  >
    <v-toolbar-title>No Transfert</v-toolbar-title>
    <v-text-field       
      v-model="id"    
      class="mx-4"         
      hide-no-data
      hide-details
      label="No transfert"
      solo-inverted
      type="number"
    ></v-text-field>
    <v-btn 
    :disabled="id === ''"
    color="info"
     fab
      x-small
    @click="get_eleve_transfert">
     <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </v-toolbar>
<div v-if="eleveAccept.length > 0" class="m-4">
      <v-card>                                 
                <v-card-text>
                  <p> Nom / Prénom: {{eleveAccept[0].nom}} {{eleveAccept[0].prenom}}</p>                  
                  <p> Nom de la mère : {{eleveAccept[0].prenom_mere}}   </p>
                  <p> Date de Naissance  /  Sexe : {{eleveAccept[0].datenais | moment(" Do-MM-YYYY")}}  /
                      <span  v-if="eleveAccept[0].sexe"> Masculin</span>
                      <span  v-else> Féminin</span>
                      </p>
                  <p> Classe : {{eleveAccept[0].nomclasse}}   </p>
                  <p>  Ecole  : {{eleveAccept[0].ecole}}   </p>
                
                </v-card-text>

     
            <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="primary"
                    text
                    @click="close"
                  >
                    Fermer
                  </v-btn>
                  <v-btn
                    color="primary"
                    text
                    @click="accepter"
                  >
                    <span v-if="eleveAccept[0].accepter === 0">Accepter</span>
                    <span v-else>Rejeter</span>
                  </v-btn>
                </v-card-actions>
                </v-card>
            </div>       
      </v-dialog>
    <v-spacer  class="mx-4"
              inset/>
        
             <v-btn
                  v-if="selected.length > 0"
                    class="mx-2 mt-2"
                     fab                      
                      x-small
                      color="primary"
                      title="Restaure"
                        @click=" deleteAll_transferts"           
                  >
                  <v-icon>mdi-restore</v-icon>
             </v-btn>
              <v-btn
                v-if="selected.length > 0"
                   class="mx-2 mt-2"
                     fab                                        
                      x-small
                      color="info"
                      title="Imprimer Transfert"
                        @click="generateTransfert"         
                  >
                   <v-icon>mdi-printer</v-icon>
                   <client-only>
                     <vue-html2pdf   ref="trans"
                      :show-layout="false"
                      :float-layout="true"
                      :enable-download="true"
                      :preview-modal="false"
                      :paginate-elements-by-height="900"
                      filename="Suped-DDENE"
                      :pdf-quality="2"
                      :manual-pagination="false"
                      pdf-format="letter"
                      pdf-orientation="portrait"
                      pdf-content-width="700px"        
                      
                        >
                        <template slot="pdf-content"  class="sectpdf">                             
                            <transfert-pdf :transferts="transprint" :trtexte="trtexte" />                                
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
          <span>{{item.sexe ? 'Masculin' : 'Feminin' }} </span>
        </template> 
          <template #[`item.deficience`]="{ item }">
          <span>{{item.deficience ? 'Oui' : 'Non' }} </span>
        </template> 
     </v-data-table>
    </base-material-card>
</v-container>
</template>
<script>
import TransfertPdf from '~/components/transfertPdf.vue';
export default {
    components: { TransfertPdf },    
      middleware: 'responsable',  
    data (){
        return {
          valid:false,
            dialog:false,
            transferes : [],
            transprint : [],
             tab_del:[],
             eleveAccept: [],
             acceptes:[],
             id:'',
            selected : [],
            btext:'Accepter',
              trtexte:'',
              classe:'',
             headers: [       
          { text: "Nom", value: "nom" },
          { text: "Prénom", value: "prenom" },    
          { text: 'Classe', value: 'nomclasse' },
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
       this.get_transfert_pendant() 
    },
    methods : {
       async get_transfert_pendant (){
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
          await  this.$axios.get('get-transfert-pendant/'+ localStorage.ecole_id).then(res => {
                this.transferes = res.data               
            })
        },

       async get_eleve_accepter (){
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
          await  this.$axios.get('get-eleve-accepter/'+ localStorage.ecole_id).then(res => {
                this.acceptes = res.data               
            })
        },

       async accepter (){
           
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 await  this.$axios.patch('accepter/'+ this.id +'|'+localStorage.ecole_id).then(res => {
                if(res.data === 1)
                  this.$notifier.showMessage({ content: 'Transfert accepté' , color: 'success' })
                  else
                    this.$notifier.showMessage({ content: 'Echec' , color: 'error' })
            })
             this.eleveAccept = []
            this.dialog = false
        },

      async get_eleve_transfert (){  
                  this.eleveAccept = []
            this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
         await  this.$axios.get('get-id-transfert/'+ this.id).then(res => {
            
              if(res.data.length > 0){
                
                    if(parseInt(res.data[0].ecole_id) === parseInt(localStorage.ecole_id))
                        this.$notifier.showMessage({ content: 'Cette action n\'est pas permise, essayer la restauration' , color: 'error' }) 
                  else {                
                    this.eleveAccept = res.data
                  }
                 }
                else
                   this.$notifier.showMessage({ content: 'Aucune donnée trouvée' , color: 'info' }) 
                             
            })
        },

        generateTransfert(){
             this.transprint = this.selected              
              this.trtexte = localStorage.ecole
            this.$refs.trans.generatePdf()
        },

         sug_id (){
            const tab = this.selected.map(item => item.id)
            this.tab_del = tab;
        },


      delAllItem(){
            // const sug = this.transferes
            // const sugg = sug.filter(it => !tab.includes(it.id))
            // this.tranferes = sugg; 
            
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
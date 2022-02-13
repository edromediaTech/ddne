<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
    >    
      <template #activator="{ on, attrs }">                   
        <v-btn   
         class="mb-2"            
          color="cyan" 
          small
          text       
          title="Recherche élement"
          v-bind="attrs"         
          v-on="on"          
        >         
           {{btntitle}}
        </v-btn>                 
        
      </template>
       <v-card>
           <v-row>
            <v-col cols="12"
                sm="6"        
                md="6">
            <v-text-field
             
              v-model="search"
              class="px-4"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
             </v-col>
              <v-col v-if="selected.length > 0" cols="12" md="4" sm="6">
               <v-btn   
            class="mb-2 mt-2"            
            color="cyan" 
            small
            fab     
            @click="emit_element()"          
            >         
           <span>Ok </span>
        </v-btn>
        </v-col>
            <v-col  cols="12" md="2" sm="6">
                 <v-icon class="mt-4 mx-4 px-4" color="primary" title="Fermer" @click="cancel">mdi-close</v-icon>
             </v-col>
         </v-row>
            
                        <v-progress-circular
                            v-show="visible"
                            :size="20"
                            :width="3"
                            color="info"
                            indeterminate
                        />
                       
            <v-data-table   v-model="selected" :headers="headers" :items="items" 
             :search="search"  single-select  show-select    class="elevation-1" >                
           </v-data-table>           
         </v-card>
    </v-dialog>
  </v-row>
</template>
<script>

export default {
    props :{label:{type:String, default:''}, labelid:{type:String, default:''}, btntitle:{type:String,default:'Ajouter'} },
 data: () => ({
      expanded: [],
             singleExpand: false,
              ss:true,
     search:'',
     selected:[],
     selectEc:[],
         valid: false,
      dialog: false,
      visible: false,
      ecoles:[],
      classes:[],
      matieres:[],
      niveaux:[],
      items:[],
      headers:[],
      commune:'',
      communes:[],
       headersCom: [ 
                
                 { text: 'Commune', value: 'name' },
       ],
       headersEc: [ 
                
                 { text: 'Ecole', value: 'name' },
       ],
       headersNiv: [ 
                
                 { text: 'Niveau', value: 'niveau' },
       ],
       headersCl: [ 
                
                 { text: 'Classe', value: 'nomclasse' },
       ],
       headersMat: [ 
                   { text: 'Cours', value: 'libelle' },
       ]
 }),
 mounted(){
  
     this.get_com()

 },
    methods : {
         emit_element(){             
             this.$emit('onClickElement', this.selected[0])
               this.selected =[]             
             this.cancel()
        },

    async get_com(){
            this.visible = true             
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               await this.$axios.get( 'get-info-prof-cours/'+this.label+'|'+this.labelid).then( response => {
                    if(this.label === 'commune'){
                        this.headers = this.headersCom
                     this.items = response.data;                    
                     
                    }
                    if(this.label === 'ecole'){                       
                         this.headers = this.headersEc
                      this.items = response.data;
                    
                    }
                 if(this.label === 'niveau'){
                   this.headers = this.headersNiv
                      this.items = response.data;
                 }
                    if(this.label === 'classe'){
                      this.headers = this.headersCl
                      this.items = response.data;
                    }
                     if(this.label === 'cours'){
                          this.headers = this.headersMat
                      this.items = response.data;
                     }
                   this.visible = false
                  })
            
           
             },
          
       cancel (){
           this.dialog = false
       }    
    }
}
</script>
        
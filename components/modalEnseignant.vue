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
          @click="get_com"        
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
               <v-col v-if="label=== 'cours'"  class="mx-4 px-4" cols="12" sm="6" md="8" > 
           <v-select
               v-model="nbh"
                  label="Nombre d'heure par semaine"                    
                   :items="[1,2,3,4,5,6,7,8,9,10]"
                   required                   
                    > 
           </v-select>
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
    props :{label:{type:String, default:''}, labelid:{type:String, default:''},
             btntitle:{type:String,default:'Ajouter'} },
 data: () => ({
      expanded: [],
      nbh:0,
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
                
                 { text: 'Niveau', value: 'name' },
       ],
       headersCl: [ 
                
                 { text: 'Classe', value: 'name' },
       ],
       headersMat: [ 
                   { text: 'Cours', value: 'name' },
       ]
 }),
 mounted(){
  
     // this.get_com()

 },
    methods : {
         emit_element(){ 
           if(this.label === 'cours'){
              if(this.nbh === 0){
               this.$notifier.showMessage({ content:  'Saisie le nombre d\'heure par semaine', color: 'error' })
               return false
              }
           this.selected[0].name =   this.selected[0].name + '|'+this.nbh  
           }
             this.$emit('onClickElement', this.selected[0])
               this.selected =[]  
               this.nbh = null           
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
                         this.items = this.formatNiveau(response.data)
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

        formatNiveau(st){
          
          let nivo = [{id:'1', name:'Secondaire'}, {id:'2', name:'3e Cycle'},
                       {id:'3', name:'Primaire'},{id:'4', name:'Prescolaire'}]
            for(let i=0; i<=3; i++){
                if(st[i] === '0')
                nivo = nivo.filter(ni => ni !== nivo[i])                
            }
            return nivo
        // const nivar =[]
        //   if(st.substring(0,1) === 1 )
        //     nivar.push({id:'1', name:'Secondaire'})
        //   if(st.substring(1,2) === 1 )
        //     nivar.push({id:'1', name:'3e Cycle'})
        //   if(st.substring(2,3) === 1 )
        //     nivar.push({id:'1', name:'1e et 2e Cycle'})
        //   if(st.substring(3,4) === 1 )
        //     nivar.push({id:'1', name:'Prescolaire'})
        //     return nivar

        },
          
       cancel (){
           this.dialog = false
       }    
    }
}
</script>
        
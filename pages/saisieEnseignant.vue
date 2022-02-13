<template>
<v-container  id="regular-tables"
    
    tag="section"
  >
    <base-material-card
      icon="mdi-clipboard-outline"
      title="Gestion Enseignants"
      class="px-5 py-3 mt-4"
    >      
    <v-row v-for="formation,i in formations" :key="i " class="fbox">
         <v-col  cols="12"
                        sm="6"
                        md="12" >
            <span class="format" > Formation Académique {{i+1}} 
                </span> 
              <v-btn 
                  v-if= "i > 0"                 
                  color="red"
                  title="Cliquez si vous souhaitez supprimer"                  
                  fab                                        
                   x-small                  
                    class="ml-4 mb-4"               
                   @click="deleteFormation(formation)"              
                >
                  <v-icon>mdi-close</v-icon> 
                
                </v-btn>
         </v-col>
            <v-col  cols="12"
                        sm="6"
                        md="6" >
                <v-select                            
                    v-model="formations.titref"
                   
                    :items="titreFormats"             
                    label="Select Formation"
                    required                    
                ></v-select>
               
            </v-col>
              
                 
           <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field                    
                          v-model="formations.lieuf"
                           v-mask="'***-****-****-*'"
                          label="Adresse de l'institution"
                           :rules="[v => !!v || msgrules]"
                           maxlength="25"
                           required
                          
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="formations.datefind"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template #activator="{ on, attrs }">
                            <v-text-field
                              v-model="formations.datedebutd"
                              label="Date debut"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="formations.datedebutd"
                             :rules="[v => !!v || msgrules]"
                             required
                            no-title
                            scrollable
                          >
                            <v-spacer />
                            <v-btn
                              text
                              color="primary"
                              @click="menu = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(formations.datedebutd)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-menu
                          ref="menu"
                          v-model="menu2"
                          :close-on-content-click="false"
                          :return-value.sync="formations.datefind"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template #activator="{ on, attrs }">
                            <v-text-field
                              v-model="formations.datefind"
                              label="Date Fin"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="formations.datefind"
                             :rules="[v => !!v || msgrules]"
                             required
                            no-title
                            scrollable
                          >
                            <v-spacer />
                            <v-btn
                              text
                              color="primary"
                              @click="menu = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(formations.datefind)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>            
            </v-row>
             <v-btn                  
                  color="primary"
                  dark
                  fab                                        
                   x-small                  
                    class=" mt-4 mb-2 m-4 px-4"               
                   @click="ajouterFormation"              
                >
                  <v-icon >mdi-plus</v-icon>                 
                </v-btn> 
                 <span class ="plus"> Cliquez si vous avez d'autres formations.</span>
                 <v-row>
                    
                     <v-col cols="12" md="12" sm="6">
    <v-expansion-panels  focusable>
    <v-expansion-panel
      v-for="(item,i) in communes.length"
      :key="i"
    >
      <v-expansion-panel-header>{{communes[i].nom}}
        <modal-enseignant :label="label='commune'" labelid="04" @onClickElement="getElement_emit($event)" />
      </v-expansion-panel-header>
      <v-expansion-panel-content v-if="communes[0].id !== 0">
          <!-- ********************** ecole -->
                <v-expansion-panels  focusable >
                    <v-expansion-panel
                      v-for="(ecole,j) in ecoles.length"
                      :key="j"
                      >
                      <v-expansion-panel-header>{{ecoles[j].nom}}
                          <modal-enseignant label="ecole" :labelid="communes[i].id.toString()"
                           @onClickElement="getElement_emit($event)" />                    
                      </v-expansion-panel-header>
                      <v-expansion-panel-content v-if="ecoles[0].id !== 0">                                          
                          <v-expansion-panel-content> 

                          </v-expansion-panel-content>
                     </v-expansion-panel-content>
                  </v-expansion-panel>
            </v-expansion-panels>
        <!-- ************** fin ecole -->
       <v-expansion-panel-content>         
      </v-expansion-panel-content>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
                     </v-col>                     
                 </v-row>                
    </base-material-card>
        </v-container>
</template>
<script>
import modalEnseignant from '~/components/modalEnseignant.vue'
export default {
  components: { modalEnseignant },
    data : ()=>({
      initiallyOpen:['Prof name','Ecole', 'classe','niveau','cours'],
        msgrules:'',
         menu: false,
         modal: false,
         menu2: false,
         profselect:[],
         label:'commune',
         labelid:'04',        
        classes:[{id:0, nom:'Selectionnez une classe'}],
        niveaux:[{id:0, nom:'Selectionnez un niveau'}],
        matieres:[],
       communes:[{id:0, nom:'Selectionnez une commune'}],
       ecoles:[{id:0, nom:'Selectionnez une école'}],
         formations :[{titref:'', lieuf:'', datef:'', dated:''}],
        titreFormats:[{text:'Science de l\'education', value:1},{text:'ENS', value:2},
                      {text:'ENI', value:3}],
        
    }),

    methods:{
      getElement_emit(item){
    alert(this.label)
         if(this.label === 'commune'){
            if(this.communes[0].id === 0)
                this.communes = []
               this.communes.push(item)  
            }         
          if(this.label === 'ecole'){
          if(this.ecoles[0].id === 0)
                this.ecoles = []
                 this.ecoles.push(item)
             }          
          if(this.label === 'niveau'){
          if(this.niveaux[0].id === 0)
                this.niveaux = []
                   this.niveaux.push(item)
          }                 
           if(this.label === 'classe'){
           if(this.classes[0].id === 0)
                this.classes = []                     
                    this.classes.push(item)
           }
            if(this.label === 'cours'){
            if(this.matieres[0].id === 0)
                this.matieres = []
                    this.matieres.push(item) 
            }                     
      },

        getElement(){           
            
          },

         ajouterFormation(){
               this.formations.push({titref:'', lieuf:'', datef:'', dated:''})
            },
        deleteFormation(format){
             const f =  this.formations.filter(item => item !== format) 
             this.formations = f                
               
            }
    }

}
</script>
<style scoped>
    .plus{
        color:blue;
        font-style: italic;
        font-size: 14px;
        padding: 5px;
    }
    .fset{       
        padding: 0px;
        margin: 0px;
    }
    .format {
   font-size:18px;
    color:blue;
     font-weight: bold;
    margin-left: 30px;
}

.fbox{
    border: solid 1px rgb(177, 165, 189);
    border-top: white;
    border-radius: 10px;
    margin-top:40px;
}
</style>
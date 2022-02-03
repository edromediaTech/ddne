<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-clipboard-outline"
      title="Gestion elèves"
      class="px-5 py-3 mt-4" >
                 <v-row>              
                      <v-col   cols="12"
                            sm="6"
                            md="5">
                          <v-select                          
                            v-model="ecole"
                            :items="ecoles"
                            :rules="[v => !!v || msgrules]"
                            label="Ecole"
                            required
                            @change="getData('ecoles', ecole)"
                            ></v-select>                           
                        </v-col>              
                          <v-col   v-if = "enseignants.length > 0" cols="12"
                            sm="6"
                            md="3">
                           <v-select                         
                            v-model="enseignant"
                            :items="enseignants"
                            :rules="[v => !!v || msgrules]"
                            label="Enseignant"                            
                            required  
                             @change="getData('enseignants', enseignant)"                          
                            ></v-select>                           
                          </v-col> 
                           <v-col   v-if = "matieres.length > 0" cols="12"
                            sm="6"
                            md="3">
                           <v-select                         
                            v-model="matiere"
                            :items="matieres"
                            :rules="[v => !!v || msgrules]"
                            label="matiere"
                            required                            
                            ></v-select>                           
                          </v-col> 
                          <v-progress-circular
                            v-show="visible"
                            :size="20"
                            :width="3"
                            color="info"
                            indeterminate
                            /> 
                           <v-col  v-if = "an !==''" cols="12" md="2" sm="6">
                              <v-btn
                              fat
                              small
                              color="primary"
                              @click="getEleves"
                              >
                              Executer
                              </v-btn>
                          </v-col> 
                 </v-row>
     </base-material-card  >   
  </v-container>
 </template>
    <script>
    export default {
        data: () => ({
            visible:false,
            an:'',
            ecole:'',
            enseignant:'',
            matiere:'',
            matieres:[],
            ecoles:[],
            enseignants:[],
            msgrules:'',
        }),
        mounted(){
            this.get_ecoles()
        },
        methods:{
             async get_ecoles(){
         this.loading = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                    await this.$axios.get( '/select-liste-ecole-inspect/'+localStorage.inspect).then( response => {
                  this.ecoles = response.data;
                  this.loading = false
                  })
          },

           getData (data, value){                
           if (data === 'ecoles'){
                this.visible = true
                 this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get('get-enseignant-ecole/'+this.ecole).then( response => {                   
                 this.enseignants = response.data;
                  this.visible = false
                })
               
              }
               if (data === 'enseignants'){
                this.visible = true
                 this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get('get-enseignant-matiere/'+this.enseignant).then( response => {                   
                 this.matieres = response.data;
                  this.visible = false
                })
               
              }
             },
        
        }
        
    }
    </script>
    <style scoped>
.v-progress-circular {
  margin: 1rem;
}
.sectpdf {
  margin: 1em;
  color: #000;
 
}
</style>

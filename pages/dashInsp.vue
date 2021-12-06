<template>    
    <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row >
       <v-col
      class="mt-4"
        cols="12"
        sm="6"
        lg="3"
      >
      
        <base-material-stats-card
          color="orange"
          icon="mdi-home"
          title="Ecoles"
          :value="sumEcole"        
          sub-icon="mdi-home"
          sub-icon-color="red"
          sub-text="Total Ecoles"
        />
      </v-col> 
      <v-col
      class="mt-4"
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="info"
          icon="mdi-account-plus"
          title="Elèves"
          :value="sumEleve"
          sub-icon="mdi-account"
          sub-text="Total elèves"
        />
      </v-col>

      <v-col
      class="mt-4"
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="success"
          title="Filles"
          icon="mdi-human-female"
          :value="sumfille"
          sub-icon="mdi-human-female"
          sub-text="Total filles"
        />
      </v-col>

      <v-col
      class="mt-4"
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="pink"
          icon="mdi-human-male"
          title="Garcons"
          :value="sumgarcon"
          sub-icon="mdi-human-male"
          sub-text="Total garcons"
        />
      </v-col> 
        
    </v-row>
     
  </v-container>
</template>
<script>
 import {mapGetters, mapActions } from 'vuex'
export default {
    // middleware: 'admin', 
      data () {
      return {
       nb_ecole:[],
       donnees:[],
        sumEleve: '',
        sumfille:'',  
        sumgarcon:'', 
        sumEcole:'',
        eleved:'',       
        ecoled:'',
        id:null,
        visible:false,       
        
      }
  },
    computed: {
       ...mapGetters('auth', ['user']),  
       ...mapGetters('dataUtil', ['zonename']),  
             
     },
     

    mounted (){      
        this.get_ecole()
          },
            methods :{
               ...mapActions('dataUtil', [ 'getZonenameData']),
  
             async get_ecole (){
                this.visible = true  
                           
                this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.authToken              
                   await this.$axios.get('get-info-inspect/'+ localStorage.inspect).then(response =>{
                                                        
                      this.getZonenameData(response.data.eleves[0].nom +', '+ response.data.district)
                        localStorage.setItem('zonename', response.data.eleves[0].nom +', '+ response.data.district)                                                            
                           this.sumEleve = response.data.eleves[0].nb_eleve.toString()
                           this.sumEcole = response.data.ecoles.toString()
                           this.sumfille = response.data.filles[0].nb_fille.toString()                          
                           this.sumgarcon = (response.data.eleves[0].nb_eleve - response.data.filles[0].nb_fille).toString()
                                                      
                   })
                   this.visible = false
            },
      


            }
        
}
</script>
<template>
 <v-container
    id="dashboard"
    fluid
    tag="section"
  >
  <v-row justify="start" align="start">
    
  <v-col cols="12" sm="8" md="6">
       <Carousel></Carousel>
    </v-col>
    <v-col cols="12" sm="8" md="6">
     <h3>Bienvenue sur la plateforme de la DDENE</h3>
     <br>
      <hr>
      <br>
      <p class="text-justify">{{ education }}</p>    
     <p class="text-justify">{{ education1 }}</p>     
     <p class="text-justify">{{ education2 }}</p>     
    </v-col>
    <v-col class="mt-4" cols="12" sm="6" md="6" >
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
  <v-col cols="12" sm="6" md="6"   class="mt-4">
  <base-material-stats-card
          color="info"
          icon="mdi-account"
          title="Elèves"
          :value="sumEleve"
          sub-icon="mdi-account"
          sub-text="Total elèves"
        />
  </v-col>
  </v-row>
   <v-row>
      
      <v-col cols="12"
        sm="6"
        md="6"
        lg="6">
        <center>
         <v-progress-circular
          v-show="visible"
          :size="70"
          :width="3"
          color="info"
          indeterminate
          class="ma-auto"
        /></center>
        <span>Statistique ecoles par district</span>
        <apexchart width="400" type="bar" :options="options" :series="series"></apexchart>
      </v-col>
    <v-col cols="12"
        sm="6"
        md="6"
        lg="6">
         <span>Pourcentage ecoles par district</span>
        <apexchart width="400" type="donut" :options="chartOptions" :series="seriesd"></apexchart>
   </v-col>
       <v-col cols="12"
        sm="6"
        md="6"
        lg="6">
         <span>Pourcentage elèves par district</span>         
        <apexchart width="400" type="pie" :options="chartOptionsl" :series="seriesl"></apexchart>
    </v-col>
      <v-col cols="12"
        sm="6"
        md="6"
        lg="6">
       <span>Statistique elèves par district</span>
        <apexchart width="400" type="bar" :options="optionsl" :series="seriesel"></apexchart>
      </v-col>  
  </v-row>
   </v-container>
</template>
<script>
  import Carousel from '../components/carousel'
export default {
  components: { Carousel },
    data () {
      return {
         nb_ecole:[],
       donnees:[],
        sumEleve: '',
        sumfille:'',  
        sumgarcon:'', 
        sumEcole:'',
        page: 1,
         eleved:'',
        ecoled:'',
         visible:false,       
         
         options: {
           
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        }       
        
      },
      legend:{
          show:true,
           position:top,
            },
      series: [{
        name: '2020-2021',
        data: [],
        
      }], 
        optionsl: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        }
      },
      seriesel: [{
        name: '2020-2021',
        data: []
      }],

       seriesd: [],
       chartOptions: {
       labels: []
        },
        seriesl: [],
       chartOptionsl: {
       labels: []
        },
         
        education: 'Les Directions Départementales d\'Éducation (DDE)',
        education1: 'La DDE est la structure déconcentrée du MENFP chargée de la planification et de la mise en œuvre des politiques sectorielles d’éducation et de la réalisation des opérations administratives dans les divisions territoriales.',
        education2:'Ainsi le décret-loi de mai 2005 fait du directeur départemental le premier superviseur de son département.'
      }
    },
      mounted (){
          this.get_ecole()
          },
    methods :{
      
             async get_ecole (){
                this.visible = true
                this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.authToken
                   await this.$axios.get('get-info').then(response =>{                      
                           this.donnees = response.data
                           this.sumEleve = response.data.eleves.toString()
                           this.sumEcole = response.data.ecoles.toString()
                           this.sumfille = response.data.filles.toString()
                           this.sumgarcon = (response.data.eleves - response.data.filles).toString()
                           this.ecoled = this.donnees.ecoledis
                           this.eleved = this.donnees.elevedis
                            this.get_data_chart()
                           this.get_data_chart_donut()                        
                           this.get_data_chart_el()                        
                            this.get_data_chart_donut_el()                        
                                                        
                   })
                   this.visible = false
            },
        get_data_chart (){                            
          this.ecoled.forEach((el) => {                  
          this.options.xaxis.categories.push(el.nom)         
          this.series[0].data.push(el.nb_ecole)   
                             
          })              
      },

      get_data_chart_donut (){                 
            this.ecoled.forEach((el) => {                  
          this.chartOptions.labels.push(el.nom)
          this.seriesd.push(el.nb_ecole) 
                    
          })              
      },
        get_data_chart_el (){                            
          this.eleved.forEach((el) => {                  
          this.optionsl.xaxis.categories.push(el.nom)         
          this.seriesel[0].data.push(el.nb_eleve)   
                             
          })              
      },

      get_data_chart_donut_el (){                 
            this.eleved.forEach((el) => {                  
          this.chartOptionsl.labels.push(el.nom)
          this.seriesl.push(el.nb_eleve) 
                    
          })              
      },
    }
    
  }
</script>

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
        lg="6"
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
        lg="6"
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
        lg="6"
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
        lg="6"
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
     <v-row>
      
      <v-col cols="12"
        sm="6"
        md="6"
        lg="6">
        <center>
         <v-progress-circular
          v-show="visible"
          :size="70"
          :width="7"
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
        <apexchart width="430" type="bar" :options="optionsl" :series="seriesel"></apexchart>
      </v-col>  
  </v-row>
  </v-container>
</template>
<script>
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
        visible:false,
         options: {
        chart: {
          id: 'vuechart-example'
        },
        xaxis: {
          categories: []
        }
      },
      series: [{
        name: '2020-2021',
        data: []
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
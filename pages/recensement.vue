<template>
 <v-container
    id="regular-tables"
    fluid
    tag="section"
    
  >
    <base-material-card    
      icon="mdi-view-list"
      title="Recensement"      
      class="px-5 py-3 mt-4"
     
    >
   
  <v-card  elevation="1">
    <v-tabs
      color="primary accent-4"
      
      right       
    >
   

      <v-tab  @click="get_ecole">Ecole <v-icon >mdi-home</v-icon> </v-tab>
      <v-tab @click="get_eleve"> Eleve <v-icon>mdi-human-male-female</v-icon></v-tab>
      <v-tab  @click="get_enseignant"> Enseignant <v-icon>mdi-account-tie</v-icon> </v-tab>

      <v-tab-item
        v-for="n in 3"
        :key="n"
      >      
       <v-card-title class="text-left justify-left mt-4">
      <h1  v-if="eco" class="font-weight-bold text-h5 ">
        Saisie Ecole
      </h1>
      <h1 v-if="el" class="font-weight-bold text-h5 ">
        Saisie Eleve
      </h1>
      <h1 v-if="ens" class="font-weight-bold text-h5 ">
        Saisie Enseignant
      </h1>
    </v-card-title>
            <saisie-ecole v-if="eco" v-model="eco"/>
            <saisie-eleve v-if="el" v-model="el"/>
            <tree v-if="ens" v-model="ens"/>
             
      </v-tab-item>
    </v-tabs>
  </v-card>
    </base-material-card>
    <!-- </base-material-card> -->
 </v-container>
</template>
<script>
import saisieEcole from './saisieEcole.vue'
import SaisieEleve from './saisieEleveRecensement.vue'
import Tree from './tree.vue'
export default {
    components:{saisieEcole, SaisieEleve, Tree},
    middleware: 'operateur',
     data: () => ({
         eco:true,
         el:false,
         ens:false
     }),
      methods: {
         get_eleve () {
            this.el = true
            this.eco = false
            this.ens = false     
            },
         get_ecole () {
            this.el = false
            this.eco = true
            this.ens = false     
            },
         get_enseignant () {
            this.el = false
            this.eco = false
            this.ens = true     
            },
      }
    
}
</script>
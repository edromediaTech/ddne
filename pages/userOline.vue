<template>
  
     <v-container
      id="regular-tables"
      fluid
      tag="section"
   >
    <base-material-card
      icon="mdi-account"
      title="Liste des utilisateurs"
      class="px-5 py-3 mt-4"
    >     
      <center>
        <v-progress-circular
          v-show="visible"
          :size="50"
          :width="3"
          color="primary"
          indeterminate
          class="ma-auto"
        />
      </center> 
       <v-row>         
         <v-col cols="12" sm="6" md="6"> 
            <h4>Performance Opérateur Elève</h4>    
       <v-data-table  :search="search" :headers="headers" :items="itemsWithSno" item-key 
       :footer-props="{'items-per-page-options':[50, 100, -1]}"> 
             <template #top>
          <v-toolbar flat>
             <v-col cols="12"
                  sm="6"        
              md="4">
             <v-text-field
         v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
             </v-col>
            <!-- <v-divider
              class="mx-4"
              inset
              vertical
            /> -->
            <v-spacer />          
            
          </v-toolbar>
        </template>  
    </v-data-table>
    </v-col>
   
    <v-col cols="12" sm="6" md="6">
       <h4>Performance Opérateur Decision</h4>
      <v-data-table  :search="search" :headers="headers" :items="itemsWithDec" item-key
       :footer-props="{'items-per-page-options':[50, 100, -1]}">      
  
      <template #top>
          <v-toolbar flat>
             <v-col cols="12"
                  sm="6"        
              md="4">
             <v-text-field
         v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
             </v-col>
            <!-- <v-divider
              class="mx-4"
              inset
              vertical
            /> -->
            <v-spacer />
           
            
          </v-toolbar>
        </template>
       
       
    </v-data-table>
    </v-col>
    </v-row>
    </base-material-card>
  </v-container>    
</template>
<script>


export default {
   middleware: 'admin', 
    data (){
        return {
          dialog: false,
          dialogDelete: false,
            nbu: 0,
            search:'',
            visible: false,
            users: [],
            decisions:[],
           n:0,
            headers: [
         
        { text: "#", value: "sno" },              
        { text: "Nom", value: "name" },              
        { text: "Email", value: "email" },
        { text: "Total", value: "saisie" }, 
             
                
      ],
           
      editedIndex: -1,
      editedItem: {
        name:'',
        email: '',
       
       
      },
      defaultItem: {
        name:'',
        email: '',
        user_level:''       
      },
        }
    },
    computed : {
      itemsWithSno() {
      return this.users.map((d, index) => ({ ...d, sno: index + 1 }))
   },
      itemsWithDec() {
      return this.decisions.map((d, index) => ({ ...d, sno: index + 1 }))
   },
       formTitle () {
        return this.editedIndex === -1 ? 'Utilisateur' : 'Editer '
      },
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
  mounted (){
     
      this.get_performance()
      this. get_perf_dec()
  },
  methods : {
        
        async  get_performance () {
          this.visible = true
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')                
          await this.$axios.get('get-performance').then(res => {
              this.users = res.data
             this.visible = false
          })
        }, 

        async  get_perf_dec () {
          this.visible = true
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')                
          await this.$axios.get('get-perform-decisions').then(res => {
              this.decisions = res.data
             this.visible = false
          })
        }, 

 

  
       getdate(dated){
      const diff = new Date().getTime() -new Date(dated).getTime()
      if (diff < 1000)
        return 'maintenant'
      const nbjour = Math.trunc(diff / ( 1000 * 60 * 60 * 24))
      if(nbjour > 6)
        return dated
      else if (nbjour <6 && nbjour > 0 )
         return ('il y a ' + nbjour + ' j')
      else {
        const nbheure = Math.trunc(diff / ( 1000 * 60 * 60))
        if (nbheure >11 )
          return 'Il y a '+nbheure + ' heures'
        else if (nbheure < 12 && nbheure > 0)
          return ('il y a ' + nbheure + 'h')
        else {
          const nbminute = Math.trunc(diff / ( 1000 * 60))
          if (nbminute > 29 )
            return ('moins de 1h')
          else if(nbminute < 30 && nbminute > 0)
            return ('il y a '+ nbminute + ' min')
          else {
            const nbseconde = Math.trunc(diff / ( 1000))
          if (nbseconde > 29 )
            return ('moins de 1mn')
          else if(nbseconde < 30 && nbseconde > 0)
            return ('il y a '+ nbseconde + ' sec')
          }
        }
      }
       },

       editItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.users.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.deleteuser(this.editedItem)       
        this.users.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },



          save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
   


  }
}
</script>
<template>
  
     <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-account"
      title="Liste des responsables d'ecole"
      class="px-5 py-3 mt-4"
    >
     
      <center>
        <v-progress-circular
          v-show="visible"
          :size="50"
          :width="5"
          color="primary"
          indeterminate
          class="ma-auto"
        />
      </center>   
    
            
  <v-data-table :headers="headers" :items="users" :footer-props="{'items-per-page-options':[50, 100, -1]}">     
     <template #[`item.valider`]="{ item }">
        <v-simple-checkbox
          v-model="item.valider"         
          value="item.valider"
          @click="update_responsable(item)"
        
        ></v-simple-checkbox>
      </template>
     <template #[`item.niveau`]="{ item }">
        
        {{niveauConvert(item.niveau)}}
       
      </template>
       
    </v-data-table>
    </base-material-card>
  </v-container>    
</template>
<script>


export default {
    middleware: 'admin', 
    data (){
        return {
            nbu: 0,
            visible: false,
            users: [],
            valid: false,
            valider:[{text: 'Oui', value:true},{text: 'Non', value:false}],
            headers: [
       
        { text: "Nom", value: "name" },              
        { text: "Ecole", value: "nom" },
        { text: "Niveau", value: "niveau" },
        { text: "Email", value: "email" },
        { text: "Valider", value: "valider" },
        
      ],
       
        }
    },
  mounted (){
     
      this.get_responsable()
  },
  methods : {
        
       async  get_responsable () {
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
       this.visible = true
          const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');  
    headers.append('Origin','http://localhost:3000');
              // this.$axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://127.0.0.1:3000'        
          await this.$axios.get( 'liste-responsable',{headers, mode:'cors'}).then(res => {
              this.users = res.data
              this.nbu = res.data.length
                console.log(res.data);
          })
          this.visible = false
        }, 

       async  update_responsable (item) {
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')                 
          await this.$axios.patch( 'update-responsable/'+item.id).then(res => {
                           
                console.log(res.data);
          })
        }, 

        niveauConvert (niveau) {
    let tniveau = ''
    let n = 0
    const textniv = ['Secondaire', '3e Cycle', '1 & 2e Cycle', 'Prescolaire']
   for(let i = 0; i<5; i++){
     if(niveau.substring(i, i+1) === '1') {
        if(n === 0)
             tniveau = tniveau + textniv[i] 
        else
         tniveau = tniveau + ' - ' + textniv[i]
         n++
   }
 }
    return tniveau
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
    close() {
      console.log("Dialog closed");
    },


  }
}
</script>
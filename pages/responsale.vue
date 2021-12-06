<template>
 <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <base-material-card
      icon="mdi-book-open"
      title="Liste des suggestions"
      class="px-5 py-3 mt-4"
    >
    <v-btn
      class="mx-4 px-4"
      fab
      dark
      small
      color="primary"
      @click="deleteAll_suggestions"
    >
      <v-icon dark>
        mdi-delete
      </v-icon>
    </v-btn>
    <v-progress-circular
          v-show="visible"
          :size="20"
          :width="3"
          color="info"
          indeterminate
          class="ma-auto"
        />
    
<v-data-table v-model="selected" show-select :headers="headers" :items="suggestions" show-expand  class="elevation-1" :footer-props="{'items-per-page-options':[50, 100, -1]}">     
      
       <template #[`item.created_at`]="{ item }">
            <span> {{getdate(item.created_at)}} </span>
      </template>

       <template #[`item.sup`]="{item}">
        <v-simple-checkbox
          v-model="item.sup"         
          value="item.sup"           
        ></v-simple-checkbox>
      </template>
      <template #expanded-item="{ item }">
      <td :colspan="headers.length" class="py-4">
         <span class="my-4">{{ item.message }}</span>
      </td>
    </template>
     <v-dialog
              v-show="dialogDelete"
              max-width="500px"
            >
              <v-card>
                <v-card-title
                  class="text-h5"
                >
                  Etes-vous sur ?
                </v-card-title>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="closeDelete"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="delete_suggestions"
                  >
                    OK
                  </v-btn>
                  <v-spacer />
                </v-card-actions>
              </v-card>
            </v-dialog>
      <template #[`item.actions`]="{}">
           <v-icon           
            small            
            @click="confirm"            
          >
            mdi-delete
          </v-icon>
        </template>          
    </v-data-table>
     </base-material-card>
  </v-container>
</template>
<script>
export default {
     data (){
        return {
            nbu: 0,
            dialogDelete:false,
            selected: [],
            visible: false,
            suggestions: [], 
            sug_del:[], 
            sup:'',
            tab_del:[],
            all_select : false,         
          headers: [                 
                  
        { text: "Nom", value: "name" },              
        { text: "Email", value: "email" },                
        { text: "Date", value: "created_at" },         
        { text: 'Actions', value: 'actions', sortable: false },
      ],
        }
     },
     mounted (){
         this.get_suggestions()
         
     },
     methods : {
          async  get_suggestions () {
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken') 
          await this.$axios.get('get-suggestion').then(res => {
              this.suggestions = res.data
       })
        },


        sug_id (){
            const tab = this.selected.map(item => item.id)
            this.tab_del = tab;
        },

        delItem(item){
            const sug = this.suggestions
            const sugg = sug.filter(it => item.id !== it.id)
            this.suggestions = sugg;        
        },

        delAllItem(tab){
            const sug = this.suggestions
            const sugg = sug.filter(it => !tab.includes(it.id))
            this.suggestions = sugg;        
        },

         async  delete_suggestions (item) {
             
            this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')        
          await this.$axios.delete('delete-suggestion/'+ item.id).then(res => {
          if (res.data.status === 1) {
               this.delItem(item)
            this.$notifier.showMessage({ content: 'Message supprimé', color: 'success' })  
            this.closeDelete()          
            return true 
            } 
            else {           
            return false }
       })
        },
         async  deleteAll_suggestions () {
             this.sug_id()
             this.visible = true
             const tab = this.tab_del.join('|') 
          this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')        
          await this.$axios.delete('delete-group-suggestion/'+ tab).then(res => {
          if (res.data !== 0) 
              this.delAllItem(tab)
                this.$notifier.showMessage({ content: res.data+' suggestions supprimées', color: 'success' })            
           this.visible = false
       })
        },

        confirm (){            
            this.dialogDelete = true
        },
        closeDelete () {
        this.dialogDelete = false
        },

     getdate(dated){
      const diff = new Date().getTime() -new Date(dated).getTime()
      if (diff < 0)
        return '0'
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
    }
    
     } 
    
}
</script>
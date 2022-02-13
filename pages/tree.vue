<template>
<v-container>
    <v-row>
       <v-col cols="12" sm="6" md="12" >  
            <v-treeview
              v-model="trees"   
              :items="items"
              activatable
              item-key="id"
                open-all
              @update:active="getActiveValue" 
            >
              <template #prepend="{ item, open }">
                <v-icon v-if="!item.file">
                  {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
                </v-icon>
                <v-icon v-else>
                  {{ files[item.file] }}
                </v-icon>
              </template>
            </v-treeview> 
          </v-col>
    
        <v-col v-if="tree.length > 0" cols="12" sm="6" md="6" >     
              <modal-enseignant :labelid="infoSelect.id"  :label="infoSelect.label" 
      :btntitle="infoSelect.btntitle"  @onClickElement="getElement_emit($event)"/>
        </v-col>
        <v-col  cols="12" sm="6" md="6">
    <v-btn  
      v-if="tree.length > 0 && tree[tree.length-1].split('-').length > 1" 
            class="mb-2 mt-2"            
            color="cyan" 
            small
            text
            dark 
            title="" 
             @click="delNode"      
            >         
           Supprimer 
           
        </v-btn> 
        </v-col>
      </v-row>
        <span  v-if="tree.length === 0"  class="text"> 
          Selectionnez une rubrique pour ajouter ou supprimer</span>
</v-container>
</template>
<script>
import modalEnseignant from '~/components/modalEnseignant.vue'
  export default {
  components: { modalEnseignant },
    data: () => ({
      initiallyOpen: ['william'],
      files: {
        prof: 'mdi-account',
        commune:'mdi-earth',
        ecole: 'mdi-home',
        niveau: 'mdi-grid',
        classe: 'mdi-account-multiple',
        cours: 'mdi-book-open',        
      },
      infoSelect:[{btntitle:'Ajouter', id:'',label:'', index:''}],
      
      tree: [],
      trees: [],
      communes:[{id:'29', name:'Fort-liberte'},{id:'30', name:'Ouanaminthe'}],
      items: [
        {
          id:'p|1',
          name: 'william',
          file:'prof',
          children:[
          ]
        },
        
      ],
    }),
    methods : {
       getActiveValue(value){
         if(value.length > 0){
         const msgbtn = ['Ajouter Commune',  'Ajouter Ecole',    'Ajouter Niveau',
                        'Ajouter Classe',    'Ajouter Matière'  ]
         this.infoSelect = this.getElement_Id(value)   
      // alert(this.infoSelect.id)
         if(value[value.length -1].split('-').length === 1)
            this.infoSelect.btntitle = msgbtn[0] 
         else
            this.infoSelect.btntitle = msgbtn[value[value.length -1].split('-').length -1]            
        this.tree = value
         } 
       
                
     },

getElement_emit(item){  
        this.addNode(item)
       // console.log(this.items)                
     },


  addNode(element){      
    element.id = this.createIdNode(this.tree,element.id)
       if(this.infoSelect.label === 'commune')
    element.file = this.files.commune
    // console.log(element)
    //    }
  if(this.infoSelect.label === 'ecole')
    element.file = this.files.ecole
  if(this.infoSelect.label === 'niveau')
    element.file = this.files.niveau  
  if(this.infoSelect.label === 'classe')
    element.file = this.files.classe
  if(this.infoSelect.label === 'matiere')
    element.file = this.files.cours
    element.children = []
    
    const i = this.getIndice(this.tree)       
    if(this.tree[this.tree.length -1].split('-').length ===1)    
       this.items[i].children.push({id:2, name:'F-L',file:'mdi-earth', children:[]})    
       
   
    if(this.tree[this.tree.length -1].split('-').length === 2) { 
       const j = this.getIndice(this.tree)      
          this.items[i].children[j].children.push(element)
          
    }

 
  if(this.tree[this.tree.length -1].split('-').length === 3) {  
    const k = this.getIndice(this.tree)
      const j = this.getIndice(this.tree)
    
    this.items[i].children[j].children[k].children.push(element)
    }

  if(this.tree[this.tree.length -1].split('-').length === 4) {    
    const k = this.getIndice(this.tree)
      const j = this.getIndice(this.tree)
      const l = this.getIndice(this.tree)
    
    this.items[i].children[j].children[k].children[l].children.push(element)
    }


  if(this.tree[this.tree.length -1].split('-').length === 5) {    
    const k = this.getIndice(this.tree)
      const j = this.getIndice(this.tree)
      const l = this.getIndice(this.tree)
      const m = this.getIndice(this.tree)
    this.items[i].children[j].children[k].children[l].children[m].children.push(element)
    }   
    this.tree = [] 

      },

      delNode(){
        const long = this.tree[this.tree.length-1].split('-').length
        
          if(long > 1){
            if(long === 2){
              this.items[0].children.splice(this.tree[this.tree.length -1].split('-')[0].split('|')[0], 1)             
              
            }
            this.tree = [] 

          }         
      },

      getIndice(elem){
       
          if(elem.length > 0){       
          const long = elem[elem.length-1].split('-').length  
        if(long === 1){
          const id = elem[elem.length-1]       
         const obj = this.items.filter(item => id === item.id)            
           return this.items.indexOf(obj[0])
        }
        if(long === 2){
          const id = elem[elem.length-1]                
         const obj = this.items[0].children.filter(item => id === item.id)            
           return this.items[0].children.indexOf(obj[0])
        }
        if(long === 3){
          const id = elem[elem.length-1]       
         const obj = this.items.children.children.filter(item => id === item.id)            
           return this.items.children.children.indexOf(obj[0])
        }
        if(long === 4){
          const id = elem[elem.length-1]       
         const obj = this.items.children.children.children.filter(item => id === item.id)            
           return this.items.children.children.children.indexOf(obj[0])
        }
        if(long === 5){
          const id = elem[elem.length-1]       
         const obj = this.items.children.children.children.children.filter(item => id === item.id)            
           return this.items.children.children.children.children.indexOf(obj[0])
        }
        if(long === 6){
          const id = elem[elem.length-1]       
         const obj = this.items.children.children.children.children.children.filter(item => id === item.id)            
           return this.items.children.children.children.children.children.indexOf(obj[0])
        }
        }
        
      },

      createIdNode(elem,id){
        if(elem.length > 0){    
          
          const labels = ['prof','commune', 'ecole','niveau','classe','cours']
          const label = labels[elem[elem.length -1].split('-').length ]          
            let label1 = label.substring(0,1)
            if(label === 'classe')
              label1 = 'k'
              
                  const idnode = elem[elem.length -1]+'-'+label1+'|'+id
              return idnode
        } 
      },

    getElement_Id(elem){ // cette fonction retourne label, index et id
        
       if(elem.length > 0){
         const pa = elem[elem.length -1].split('-')
          const pa1 = pa[pa.length -1].split('|')      
          const part = pa1[pa1.length -1]     
          const result = {}
          const labels = ['prof','commune', 'ecole','niveau','classe','cours']
          result.label = labels[elem[elem.length -1].split('-').length]
          result.index =  part
          result.id =  part
          
          if(result.label === 'commune')
            result.id = '04'  
              return result
        } 
      }
    }
  } 

</script>
<style scoped>
.text{
  color: rgb(177, 177, 253);
  font-style: italic;
  font-weight: normal;
}
</style>
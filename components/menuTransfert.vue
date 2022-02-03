<template>
  <div class="text-center">
    <v-menu>
      <template #activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template #activator="{ on: tooltip }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              fab
              x-small
              v-on="{ ...tooltip, ...menu }"
            >
             <v-icon>mdi-arrow-left-bold</v-icon>
            </v-btn>
          </template>
          <span>Année precedente</span>
        </v-tooltip>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          link
          @click="test(item)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
  export default {
      props: {classe: { type: Number, default: null}, ecole:{type:Number, default:null}},
     data: () => ({
            items:[{title:'Classe Precedente', annee:'', classe:null},{title:'Classe Courante', annee:'', classe:null}],
     }),
      mounted(){
          this.items[0].title = 'Classe Precedente'
          this.items[1].title = 'Classe Courante'
          this.items[0].annee = this.annee_prec()
          this.items[1].annee = localStorage.anac
          this.items[0].classe = this.classe -1
          this.items[1].classe = this.classe
      },
    methods:{
        test(item){            
            console.log(item)
             this.$emit('onClickClasse', item)
        },
        annee_prec(){
              const annees = localStorage.anac.split('-')
              const an = annees[0]
              const anprec = an - 1
                const anv= (anprec+'-'+an) 
                return anv
              },
    }
      }
      
</script>
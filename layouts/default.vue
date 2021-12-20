<template>
  <v-app dark >
    <Snackbar/>
     <autoLogout v-if="user" />
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
       app
       src="images/ombre.jpg"
      >
    
         
    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center"
          color="white"
          contain
        >
          <v-img
            src='images/logo.jpg'
            max-height="30"
          />
        </v-list-item-avatar>
          <span  v-if="user && user.user_level === 2" class="ecole">{{ecolename}}</span>
           <span  v-if="user && user.user_level === 3" class="ecole">{{zonename}}</span>
           <span  v-if="user && user.user_level === 5" class="ecole">District: {{districtname}}</span>
        </v-list-item>
    </v-list>

    <v-divider class="mb-2" />
      <v-list  dense
      nav>       
        
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />            
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      src="images/appombre.jpg"
      
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <!-- <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <!-- <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn> -->
      <v-toolbar-title v-text="title + anac" />
      <v-spacer />
      <!-- <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn> -->
       <v-btn
      v-if="!user"
      class="ml-0"
      min-width="0"
      text
      title="Enregistrer"
      to="/register"
    >
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn
      v-if="!user"
      class="ml-0"
      min-width="0"
      text
      title="Connecter"
      to="/login"
    >
      <v-icon>mdi-login</v-icon>
    </v-btn>
    <v-btn
      v-else
      class="ml-0"
      min-width="0"
      title="Déconnecter"
      text
      @click="logout"
    >
      {{privileges[user.user_level]}}, {{ get_initial(user.name) }}
    </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <!-- <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer> -->
    <v-footer
      :absolute="!fixed"
      app
    >
      <span class="ecole">&copy; {{ new Date().getFullYear() }} Design by EDROMEDIA</span>
    </v-footer>
  </v-app>
</template>
<script>

 import {mapActions, mapGetters } from 'vuex'
 import autoLogout from '../components/base/autoLogout.vue'
 import Snackbar from '../components/Snackbar.vue'
export default {  
   name: 'Default',
   components : {autoLogout, Snackbar},
    data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,     
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'DDENE ',
       ecole_name: '',
       zone_name: '',
      privileges:['User', 'Ope', 'Dir', 'Ins', 'Sup', 'Ip', 'Adm'],
    }
  },
  computed: {
  ...mapGetters('auth', ['user']),
  ...mapGetters('dataUtil', ['anac','ecolename', 'zonename', 'districtname']),
    
  items () {
  const  items = [
        {
          icon: 'mdi-apps',
          title: 'Accueil',
          to: '/'
        },        
       
              
      ];
       if (this.user && this.user.user_level === 2){
            items.push({ icon: 'mdi-view-dashboard',
            title: 'Tableau de bord',
            to: '/dashResponsable'})
            
            items.push({  icon: 'mdi-pencil',
            title: 'Suggestion',
            to: '/suggestion' })       
                     
            items.push({  icon: 'mdi-clipboard-outline',
            title: 'Gestion Formation',
            to: '/saisieEleve' })

            items.push({  icon: 'mdi-certificate',
            title: 'Décision',
            to: '/decision' })

            items.push({  icon: 'mdi-logout',
            title: 'Transferts',
            to: '/gestionTransfert'})

            items.push({  icon: 'mdi-clipboard-outline',
            title: 'Transferts Entrants',
            to: '/listeTransfert'})
      }
       if (this.user && this.user.user_level === 3 ){
            
            items.push({ icon: 'mdi-view-dashboard',
            title: 'Tableau de bord',
            to: '/dashInsp'})
            
            items.push({ icon: 'mdi-graph',
            title: 'Stats Ecole',
            to: '/statZone'})

                     
             items.push({  icon: 'mdi-clipboard-outline',
                title: 'Gestion Formation',
               to: '/saisieEleveZone' })

              items.push({  icon: 'mdi-certificate',
              title: 'Décision',
              to: '/decisionZone' })

      }

       if (this.user && this.user.user_level === 4 ){
            
            items.push({ icon: 'mdi-view-dashboard',
            title: 'Tableau de bord',
            to: '/dashSuper'})
            
            items.push({ icon: 'mdi-graph',
            title: 'Stats Ecole',
            to: '/statEcoleSuper'})

              items.push({  icon: 'mdi-home',
               title: 'Liste Ecole',
               to: '/requeteEcole'})

            
             items.push({  icon: 'mdi-clipboard-outline',
                title: 'Gestion Formation',
               to: '/saisieEleveSuper' })

            }

       if (this.user && this.user.user_level === 5 ){
            
            items.push({ icon: 'mdi-view-dashboard',
            title: 'Tableau de bord',
            to: '/dashIp'})
            
            items.push({ icon: 'mdi-graph',
            title: 'Stats Ecole',
            to: '/statEcoleIP'})

           items.push({  icon: 'mdi-clipboard-outline',
                title: 'Gestion Formation',
               to: '/saisieEleveIP' })

               

              items.push({  icon: 'mdi-certificate',
              title: 'Décision',
              to: '/decisionIp' })
          
      }

        if (this.user && this.user.user_level > 5){
                 items.push({ icon: 'mdi-view-dashboard',
                 title: 'Tableau de bord',
                 to: '/dashAdmin'})

                  items.push({  icon: 'mdi-book-open',
                 title: 'Suggestions',
                 to: '/listeSuggestion' })

               items.push({  icon: 'mdi-account',
               title: 'Gestion Utilisateur',
               to: '/gestionUser'})

                 items.push({  icon: 'mdi-home',
               title: 'Liste Ecole',
               to: '/requeteEcole'})

                 items.push({  icon: 'mdi-human',
               title: 'Liste Enseignant',
               to: '/listeEnseignant'})

               items.push({  icon: 'mdi-check',
               title: 'Valider Responsable',
               to: '/validerResponsable'})

                items.push({  icon: 'mdi-clipboard-outline',
                title: 'Gestion Formation',
               to: '/saisieEleveAdmin' })

              items.push({  icon: 'mdi-certificate',
              title: 'Décision',
              to: '/decisionAdmin' })

            items.push({  icon: 'mdi-graph',
            title: 'Stats Ecole',
            to: '/statEcoleAdmin' })

             items.push({  icon: 'mdi-graph',
            title: 'Performance Operateur',
            to: '/userOline' })
        }
       return items
  }

  }, 
  mounted () {   
         this.set_anac()
          this.get_district_name()
          this.get_zone_name()
      if (localStorage.authToken) {
        this.getUserData()
        this.get_ecole_name()
      //  this.get_title()
      }
       
      },
  
  methods:{
     ...mapActions('auth', [ 'sendLogoutRequest', 'getUserData']),
    ...mapActions('dataUtil', [ 'getAnacData','getDistrictnameData', 'getZonenameData']),
  

      get_initial (name) {
          const nom = name.split(' ')
          let initial = ''
        if (nom.length > 1 )
            initial = nom[0].substring(0,1) + nom[1].substring(0,1)
        else
            initial = nom[0].substring(0,2)
 
        return initial   

      },

    get_ecole_name (){
      this.ecole_name = localStorage.ecole
    },
    
    get_district_name (){
         if(localStorage.userl === '5')
            this.getDistrictnameData(localStorage.districtname) 
    },
    
    get_zone_name (){
         if(localStorage.userl === '3')
            this.getZonenameData(localStorage.zonename) 
    },
    
    
     logout () {
        this.sendLogoutRequest()
        this.$router.push('/')
      },

      set_anac(){
        this.getAnacData()
         // this.title = 'DDNE '+ this.anac
      }
  }
}
</script>
<style scoped>
.ecole{
  font-size: 11px;
}
</style>


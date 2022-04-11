<template>
     <v-container
        id="regular-tables"
        fluid
        tag="section"
    >
     <base-material-card
        icon="mdi-home"
        title="Gestion Ecole"
        class="px-5 py-3 mt-4"
        >      

        <v-row>
                           <v-col
                           cols="12"
                              sm="6"
                              md="4">
                           <v-select                            
                            v-model="departement"
                            :items="departements"
                                label="Département"
                            required
                            @change="getData('departements', departement)"
                            ></v-select>                           
                          </v-col>
                          
                          <v-col  v-if = "districts.length > 0" 
                              cols="12" 
                                 sm="6"
                               md="3">
                              <v-select                           
                            v-model="donnee.district"
                            :items="districts"
                                label="District"
                            required
                            @change="getData('districts', donnee.district)"
                            ></v-select>                           
                          </v-col>
                          <v-col  v-if = "communes.length > 0"
                           cols="12"
                            sm="6"
                               md="3">
                           <v-select
                           
                            v-model="donnee.commune"
                            :items="communes"
                                label="Commune"
                            required
                            @change="getData('communes', donnee.commune)"
                            ></v-select>
                           
                          </v-col>
                          <v-col v-if = "zones.length > 0" cols="12"
                              sm="6"
                              md="2">
                           <v-select
                           
                            v-model="donnee.zone"
                            :items="zones"
                                label="Zones"
                            required
                          
                            ></v-select>
                           
                          </v-col>
                           <v-progress-circular
                            v-show="visible"
                            class="mt-4"
                            :size="20"
                            :width="3"
                            color="info"
                            indeterminate
                            />
                           <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-select
                          v-model="donnee.secteur"
                          :items="[{text:'Tous', value:-1},{text:'Public', value:1}, {text:'Privé', value:0}]"
                          label="Secteur"                          
                        />
                      </v-col>
                       <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-select
                          v-model="donnee.niveau"
                          :items="niveauens"
                          label="Niveau Enseignement"
                         
                        />
                      </v-col>
                      <v-col cols="12" md="2" sm="6">
                            <v-btn v-if="departement !== ''" fat color="primary" @click="get_ecole">Executer</v-btn>
                      </v-col>
                       
                        </v-row>

     <v-data-table v-if="ecoles.length > 0" :headers="headers" :items="ecoles" 
             :search="search"    :footer-props="{'items-per-page-options':[50, 100, -1]}">  
          <template #top>          
          <v-row class="mx-4 my-4">
               <v-progress-circular
                    v-show="visible"
                    :size="50"
                    :width="3"
                    color="info"
                    indeterminate                    
                    /> 
            <v-col cols="12"
                sm="6"        
                md="3">
              <v-text-field
                  v-if="ecoles.length > 0"  
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
               ></v-text-field>
             </v-col>
             

              <!-- <v-divider
               v-if="ecoles.length > 0"
              class="mx-4"
              inset
              vertical
            /> -->
              <v-spacer />
              <v-dialog
              v-model="dialog"
              max-width="auto"
            >
              
  
             
              </v-dialog>
           
           <download-excel             
               v-if="ecoles.length > 0"
                title="Télécharger liste ecole en excel" 
                class="mx-2 mt-1"
              :data="ecoles"
              name="Liste ecoles"
              header="Liste des ecoles"
            >
              <v-img
                max-height="40"
                max-width="40"
                src="images/excel.png"
              />
            </download-excel>
                 <v-btn 
                  v-if="ecoles.length > 0"               
                    class="mx-2 mt-2"
                     fab   
                     title="Télécharger liste ecole en PDF"                   
                     x-small
                      color="info"
                    @click=" generateReport"              
                  > 
                  PDF
                  <client-only>
                     <vue-html2pdf   ref="html2Pdf"
                      :show-layout="false"
                      :float-layout="true"
                      :enable-download="true"
                      :preview-modal="false"
                      :paginate-elements-by-height="1400"
                      filename="Suped-ListeEcole"
                      :pdf-quality="2"
                      :manual-pagination="false"
                      pdf-format="letter"
                      pdf-orientation="landscape"
                      pdf-content-width="1000px"       
                      
                        >
                        <template slot="pdf-content"  class="sectpdf">                             
                         <table-print-reqecole :ecoles="ecoles" />                             
                        </template>
                    </vue-html2pdf>
                  </client-only>             
                  </v-btn>
                     <v-badge
                        class="mx-4 mt-3"
                          color="primary"
                          x-small
                          title="Total Ecoles"
                          :content="ecoles.length"
                        >
                        <v-icon>mdi-home</v-icon>
                      </v-badge>
               </v-row>           
      </template>      
          <template #[`item.secteur`]="{ item }">
           <span>{{item.secteur ? 'Public' : 'Privé' }} </span>
        </template> 

         <template #[`item.actions`]="{item }">
           {{item.ecole}}
      <modalEcole ref="modalEcole" :part="parti" :departements="departements" :ecole="item" 
        :options="options" :sectioncoms="sectioncoms" :communes="communes" :districts="districts" :zones="zones"/>
      
  <div class="text-center">
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          text
          x-small
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-pencil</v-icon>  <v-icon>mdi-menu-down</v-icon>           
        </v-btn>
      </template>
     
          <v-list>
            <v-list-item
              v-for="(item1, index) in items"
              :key="index"
              link
              @click="openModal(item1, item)"       
              
            >        
              <v-list-item-title>{{ item1.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        
        </v-menu>
      </div>        
    </template>   
         
     </v-data-table>
     </base-material-card>
  </v-container>
</template>

<script>
import modalEcole from '../components/modalEditEcole.vue'
export default {
  components:{modalEcole},
   middleware: 'super', 
        data: () => ({ 
          parti: {}, 
          nom:'',
          dialog: false,
           items: [
        { title: 'Ecole' , id: 1},
        { title: 'Directeur', id: 2 },
        { title: 'Etat Batiment', id:3 },
       ], 
             search:'',
      msgrules:'Champ obligatoire',   
      nameRules: [
        v => !!v || 'Champ obligatoire',
       v => (v && v.length <= 25) || 'Name must be less than 25 character',
      ],
          departement: '',
          texte:'',
          secteur : 1,
          donnee:{ district: 0,    secteur:-1,   niveau:0,     commune: 0,     zone:0},
            departements: [],
            districts: [],
            communes: [],
            zones: [],
            questions:[],
            options:[],
            etats:[],
            niveauens:[{text:'Tous', value:0},{text:'Prescolaire', value:'0001'}, {text:'Fondamental', value:'0110'},
                {text:'Secondaire', value:'1000'},  {text:'Ecole Complete', value:'1111'},
                {text:'Fondamental 1er et 2eme cycle', value:'0010'},
                {text:'Prescolaire et Fondamental 1er et 2eme cycle', value:'0011'},
                {text:'Prescolaire et Fondamental complet', value:'0111'},
                {text:'Fondamental 3eme Cycle et Secondaire', value:'1100'},
                {text:'Fondamental et Secondaire', value:'1110'}, {text:'3e Cycle', value:'0100'},
                {text:'Prescolaire inclus', value:'-0001'},
                {text: '1e et 2e  Cycle inclus', value:'-0010'},
                {text: '3e Cycle inclus', value:'-0100'},
                { text:'Secondaire inclus', value:'-1000'}
                ],
            ecoles:[],
             sectioncoms:[], 
            visible:false,
            headers: [ 
                 { text: 'Ecole', value: 'Ecole' },      
                 { text: "Adresse", value: "Adresse" },               
                 { text: "Accès", value: "Acces" },                     
                 { text: "Tel", value: "tel" },                     
                 { text: "Nom Directeur", value: "Nom_Directeur" },                     
                 { text: "Prénom", value: "Prenom_Directeur" },
                  { text: 'Actions', value: 'actions', sortable: false },                     
             ]
          
    }),

    mounted () {      
      this.get_dept()
     this.get_Etat()     
    },
    methods:{
      openModal(p, ecol){        
        this.parti = p  
        let e = this.ecoles.filter((eco) => eco.id === ecol.id)
        e = e[0]
        if(e.Sexe === 'M')
          e.Sexe = 1
          else
          e.Sexe = 0
        console.log(this.communes)
         this.$refs.modalEcole.ec = {id:e.id, tel: e.tel,  email: e.Email_Ecole, telephone:e.Telephone, fondateur:e.Fondateur,  sigle:e.Sigle,  
         niveau:e.niveau1,  categorie:e.categorie, milieu:e.milieu, secteur:e.secteur, vacation:e.vacation, 
         location:e.location,   adresse: e.Adresse, longitude:e.Longitude, latitude:e.Latitude, code:e.Code,
          statut:e.statut, acces:e.Acces, nom:e.Ecole, section_communale_id:e.section_communale_id, zone_id: e.zone_id, district: e.district_id, 
          departement:e.departement_id, commune:e.commune_id}
  
          this.$refs.modalEcole.nomecole = e.Ecole
          this.$refs.modalEcole.direct = {  adressed:e.Adresse_Directeur,   lieunais: e.Lieu_de_Naissance, sexe: e.Sexe,   telephoned:e.Tel_Directeur2,
       communed:e.communed,  emaild: e.Email,  section_communaled_id:e.section_communaled_id, directeur_id:e.directeur_id,
                teld:e.Tel_Directeur, nomd: e.Nom_Directeur,   prenom: e.Prenom_Directeur,   cin: e.CIN,    nif: e.NIF , datenais:e.Date_Naissance}
       
       const et = this.etats.filter((eta) => eta.ecole_id === ecol.id)
        
        this.questions.forEach((quest) => {
            et.forEach((etat) => {
              if(quest.id === etat.questionnaire_id)
                 quest.option_id.push(etat.reponse)
           })
        })

     
       this.$refs.modalEcole.questions = this.questions
       

         console.log( this.$refs.modalEcole.questions)
       this.$refs.modalEcole.dialog = true
        
      },
         

      async get_dept(){
              this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
            await this.$axios.get( 'departement').then( response => {
                  this.departements = response.data;
                    this.departements.push({text:'Tous', value: 0})
                  })
                  this.visible = false
          },
        async get_Etat(){             
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
             await this.$axios.get( 'get-etat').then( response => {
                  this.sectioncoms = response.data.sectioncommunales
                  const quest = response.data.questions
                  this.questions = this.addRestoQuest(quest)
                  this.options = response.data.options                
                  })                 
          },

          async get_ecole(){
           // alert(this.donnee.niveau)
              this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               const data = this.donnee.district+'|'+this.donnee.commune+'|'+this.donnee.zone+'|'+this.donnee.secteur+'|'+this.donnee.niveau
                await this.$axios.get( 'get-rapportecole/'+ data).then( response => {
                        this.ecoles = response.data.ecole;
                        this.etats = response.data.etat
                  })
                this.visible = false
          },
          
          async get_text(){             
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               const data = this.donnee.district+'|'+this.donnee.commune+'|'+this.donnee.zone+'|'+this.donnee.secteur+'|'+this.donnee.niveau
                await this.$axios.get( 'get-text/'+ data).then( response => {
                        this.texte = response.data;
                  })
               
          },


          getData (data, value){
            if(value === 0){              
                this.resetChamp(data)
                return false
            }
              if (data === 'departements'){
                 this.communes =[]
                 this.zones = []
                   this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                this.$axios.get( 'get-departement/'+ this.departement).then( response => {
                  this.districts = response.data;
                    this.districts.push({text:'Tous', value: 0})
                   this.visible = false 
                })
               
              }
              if (data === 'districts'){
                  this.zones = []                
                  this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get( 'get-district/'+ this.donnee.district).then( response => {
                  this.communes = response.data;
                  this.communes.push({text:'Toutes', value: 0})
                    this.visible = false
                })
               
              }
              if (data === 'communes'){
                
                  this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get( 'get-commune/'+ this.donnee.commune).then( response => {
                  this.zones = response.data;
                    this.zones.push({text:'Toutes', value: 0})
                   this.visible = false
                 })
                
              }            
              
            },

           addRestoQuest(quest){     
                if(quest.length > 0){          
                  const data = []
                  quest.forEach((q)=>{
                      q.option_id = [];
                      data.push(q)
                  })
                
                   return data;
                 }
               return quest;
            },

        

    generateReport () {
       // this.texte =  this.get_text()
      
            this.$refs.html2Pdf.generatePdf()
        },

   resetChamp(data) {
     const champ = ['departements','districts','communes','zones']
     const index = champ.indexOf(data) 

    for(let i= index+1; i<champ.length; i++){      
       this[champ[i]] = []
         
     }
  }


    }
}
</script>
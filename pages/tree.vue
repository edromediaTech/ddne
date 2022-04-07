<template>
<v-container>

  <v-row>
     <v-col cols="12" sm="6" md="2" > 
     <v-text-field-simplemask
      v-model="prof.nif"
      :label="label"
      :properties="{
        prefix: '',
        suffix: '',
        readonly: false,
        disabled: false,
        outlined: false,
        clearable: false,
        placeholder: '000-000-000-0',
        }"
      :options="{
        inputMask: '###-###-###-#',
        outputMask: '###-###-###-#',
        empty: null,
        applyAfter: false,
        alphanumeric: false,
        lowerCase: false,
      }"
      :focus="focus"
      @focus="focus = false"
    /> 
   </v-col>
   
    <v-col v-if="nifvalid" cols="12" sm="6" md="6" > 
       <v-icon color="success" class="mt-4">mdi-check</v-icon>  
    </v-col>
    <v-col cols="12" sm="6" md="6" > 
        
     <v-btn 
        v-if=" prof.nif.length > 10 && !nifvalid" 
            class="mb-2 mt-4"            
            color="primary" 
           small
              dark 
            title="Verifier NIF" 
             @click="checkNif"      
            >  
            <v-progress-circular
                            v-show="visible"
                            :size="20"
                            :width="3"
                            color="white"
                            indeterminate
                            />        
          Verifier          
        </v-btn>  
           
    </v-col>
    
  </v-row>
  <v-row v-if="nifvalid">
    <v-col cols="12" sm="6" md="6" > 
     <v-text-field
               v-model="prof.nom"
                  label="Nom*"
                    maxlength="55"
                    :rules="[v => !!v || msgrules]"                   
                    required
                     @blur="createTreeRoot"
                        /> 
               </v-col>
            <v-col cols="12" sm="6" md="6" > 
              <v-text-field
                        v-model="prof.prenom"
                            label="Prénom*"
                              maxlength="55"
                              :rules="[v => !!v || msgrules]"
                              required
                                  /> 
                 </v-col>
                   <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-select
                          v-model="prof.sexe"
                          :items="[{text:'Masculin', value:1}, {text:'Féminin', value:0}]"
                          label="Sexe*"
                          
                        />
                      </v-col>
                       <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        
                  <v-text-field                   
                          v-model="prof.date_naissance"                        
                          label="Date Naissance"                         
                          type="date"                         
                         />
                      </v-col>
                   <!-- <v-col cols="12" sm="6" md="6" > 
                      <v-menu
                          ref="menu6"
                          v-model="menu6"
                          :close-on-content-click="false"
                          :return-value.sync="prof.date_naissance"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template #activator="{ on, attrs }">
                            <v-text-field
                              v-model="prof.date_naissance"
                              label="Date de naissance*"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="prof.date_naissance"
                             :rules="[v => !!v || msgrules]"
                             required
                            no-title
                            scrollable
                           
                          >
                            <v-spacer />
                            <v-btn
                              text
                              color="primary"
                              @click="menu6 = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu6.save(prof.date_naissance)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                       </v-col> -->
                      <v-col   cols="12"
                              sm="6"
                              md="6">
                           <v-select                            
                            v-model="prof.dept_n"
                            :items="departements"
                            :rules="[v => !!v || msgrules]"
                            label="Département de Naissance*"
                            required
                            @change="get_com"
                            ></v-select>
                           
                          </v-col>
                           <v-col 
                           cols="12"
                            sm="6"
                               md="6">
                           <v-select
                           
                            v-model="prof.commune_n"
                            :items="communes"
                            :rules="[v => !!v || msgrules]"
                            label="Commune de Naissance*"
                            required                         
                            ></v-select>                           
                          </v-col>
                           <v-col cols="12" sm="6" md="6" > 
                        <v-text-field
                        v-model="prof.lieunais"
                            label="Lieu de naissance"
                              maxlength="55"
                              placeholder="Localité, Section communale"
                              :rules="[v => !!v || msgrules]"
                              required
                                  /> 
                 </v-col>
                   <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-select
                          v-model="prof.statutmat"
                          :items="['Marié(e)','veuf(ve)','Célibataire','Divorcé(e)', 'Séparé']"
                          label="Statut Matrimonial"                          
                        />
                      </v-col>
                      <v-col cols="12" sm="6" md="6" > 
                      <v-text-field
                        v-model="prof.cin"
                       label="CINU"
                            maxlength="15"
                            type="number"                              
                             /> 
                 </v-col>
                 <v-col cols="12" sm="6" md="6" > 
              <v-text-field
                        v-model="prof.adresse"
                            label="Adresse"
                              maxlength="55"
                              
                                  /> 
                 </v-col>
                  <v-col   cols="12"
                              sm="6"
                              md="6">
                           <v-select                            
                            v-model="prof.dept_h"
                            :items="departements"
                            :rules="[v => !!v || msgrules]"
                            label="Département d'habitation*"
                            required
                            placeholder="Adresse"
                            @change="get_comH"
                            ></v-select>
                           
                          </v-col>
                           <v-col 
                           cols="12"
                            sm="6"
                               md="6">
                           <v-select
                           
                            v-model="prof.commune_h"
                            :items="communesh"
                            :rules="[v => !!v || msgrules]"
                            label="Commune d'habitation*"
                              placeholder="Adresse"
                            required                         
                            ></v-select>                           
                          </v-col>
                           <v-col     cols="12"    sm="6"    md="6">
                        <v-text-field-simplemask
      v-model="prof.telephone"
      label="Tel"
      :properties="{
        prefix: '',
        suffix: '',
        readonly: false,
        disabled: false,
        outlined: false,
        clearable: true,
        placeholder: '(509)3999999',
      }"
      :options="{
        inputMask: '(###) ####-####',
        outputMask: '###########',
        empty: null,
        applyAfter: false,
        alphanumeric: true,
        lowerCase: false,
      }"
      :focus="focus"
      @focus="focus = false"
    />
         </v-col> 
          <v-col cols="12" sm="6" md="6" >
          <v-text-field
                          v-model="prof.email"
                           prepend-icon="mdi-mail"
                          label="E-mail"                          
                        ></v-text-field> 
                        </v-col>  
                         <v-col cols="12" sm="6" md="6" > 
                        <v-menu
                          ref="menu1"
                          v-model="menu1"
                          :close-on-content-click="false"
                          :return-value.sync="prof.date_affectation"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template #activator="{ on, attrs }">
                            <v-text-field
                              v-model="prof.date_affectation"
                              label="Date Affectation"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="prof.date_affectation"
                             
                            no-title
                            scrollable
                          >
                            <v-spacer />
                            <v-btn
                              text
                              color="primary"
                              @click="menu1 = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu1.save(prof.date_affectation)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
    </v-col>
     <v-col cols="12" sm="6" md="6" > 
    <v-menu
                          ref="menu2"
                          v-model="menu2"
                          :close-on-content-click="false"
                          :return-value.sync="prof.date_EFonction"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template #activator="{ on, attrs }">
                            <v-text-field
                              v-model="prof.date_EFonction"
                              label="Date d'Entree en Fonction"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="prof.date_EFonction"                             
                            no-title
                            scrollable
                          >
                            <v-spacer />
                            <v-btn
                              text
                              color="primary"
                              @click="menu2 = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu2.save(prof.date_EFonction)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
    </v-col>
     <v-col   cols="12"  sm="6"    md="6"  >
              <v-select
                 v-model="prof.nClassique"
                 :items="['Niveau Secondaire (3e à Philo)','Niveau Fondamental 3e Cycle(7e à 9e)','Niveau Fondamental 1e & 2e Cycle']"
                   label="Formation Scolaire"                          
                 />
        </v-col>           
     <v-col   cols="12"  sm="6"    md="6"  >
              <v-select
                 v-model="prof.nUniversitaire"
                 :items="['Certificat - Attestation','Diplome','Licence','Maitrise','Doctorat']"
                   label="Niveau Universitaire"                          
                 />
        </v-col>           
  </v-row> 
  <div  v-if="nifvalid"> 
   <v-row  v-for="formation,i in formations" :key="i " class="fbox">
         <v-col  cols="12"
                        sm="6"
                        md="12" >
            <span class="format" > Formation Académique {{i+1}} 
                </span> 
              <v-btn 
                  v-if= "i > 0"                 
                  color="red"
                  title="Cliquez si vous souhaitez supprimer"                  
                  fab                                        
                   x-small                  
                    class="ml-4 mb-4"               
                   @click="deleteFormation(formation)"              
                >
                  <v-icon>mdi-close</v-icon> 
                
                </v-btn>
         </v-col>
            <v-col  cols="12"
                        sm="6"
                        md="6" >
                <v-select   
                  v-model="formation.nomf"                          
                    :items="['Science de l\'Education','ENI','ENS','FIA','CEFEF','Capiste','Jardinière','Autres']"                   
                    label="Formation Academique*"
                    required                    
                ></v-select>
               
            </v-col> 
             <v-col v-if="formation.nomf ==='Autres'"
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field                    
                          v-model="formation.nomf"                        
                          label="Saisie votre formation"
                           :rules="[v => !!v || msgrules]"
                           maxlength="25"
                           required
                          
                        />
                      </v-col>  
                 
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field                    
                          v-model="formation.lieu"                        
                          label="Adresse de l'institution*"
                           :rules="[v => !!v || msgrules]"
                           maxlength="25"
                           required
                          
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        
                  <v-text-field                   
                          v-model="formation.date_debut"                        
                          label="Date debut"
                          mask="01 / 01 / 1990"
                          type="date"                         
                          
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field                    
                          v-model="formation.date_fin"                        
                          label="Date fin"
                          type="date"
                          locale="fr"
                           
                          
                        />
                      </v-col>            
            </v-row>
             <v-btn                  
                  color="primary"
                  dark
                  fab                                        
                   x-small                  
                    class=" mt-4 mb-2 m-4 px-4"               
                   @click="ajouterFormation"              
                >
                  <v-icon >mdi-plus</v-icon>                 
                </v-btn> 
                 <span class ="plus"> Cliquez si vous avez d'autres formations.</span>
                 <v-col
            cols="12"
            sm="4"
            md="4"
          >
            <v-checkbox
              v-model="formatc"
              label="Formation Continue"
              color="blue"
              value="0"
              hide-details
            ></v-checkbox>                 
                 </v-col>
                <div v-if="formatc">
                   <v-row  v-for="formationc,i in formationsP" :key="i "  class="fbox">
         <v-col  cols="12"
                        sm="6"
                        md="12" >
            <span class="format" > Formation Continue {{i+1}} 
                </span> 
              <v-btn 
                  v-if= "i > 0"                 
                  color="red"
                  title="Cliquez si vous souhaitez supprimer"                  
                  fab                                        
                   x-small                  
                    class="ml-4 mb-4"               
                   @click="deleteFormatP(formationc)"              
                >
                  <v-icon>mdi-close</v-icon> 
                
                </v-btn>
         </v-col>
            <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field                    
                          v-model="formationc.titre"                        
                          label="Titre de la Formation"
                           :rules="[v => !!v || msgrules]"
                           maxlength="25"
                           required                          
                        />
                      </v-col> 
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field                    
                          v-model="formationc.lieu"                        
                          label="Lieu"
                           :rules="[v => !!v || msgrules]"
                           maxlength="25"
                           required                          
                        />
                      </v-col> 
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field                    
                          v-model="formationc.duree"                        
                          label="Durée"
                           :rules="[v => !!v || msgrules]"
                           maxlength="25"
                           type="number"
                           required
                          
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field                    
                          v-model="formationc.organisateur"                        
                          label="Organisateur"
                           :rules="[v => !!v || msgrules]"
                           maxlength="25"
                           required
                          
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field                    
                          v-model="formationc.datef"                        
                          label="Date fin"
                          type="date"
                          locale="fr"
                           :rules="[v => !!v || msgrules]"
                           maxlength="6"
                           required
                          
                        />
                      </v-col>
              
              </v-row>
             <v-btn                  
                  color="primary"
                  dark
                  fab                                        
                   x-small                  
                    class=" mt-4 mb-2 m-4 px-4"               
                   @click="addFormatContinue"              
                >
                  <v-icon >mdi-plus</v-icon>                 
                </v-btn> 
                 <span class ="plus"> Cliquez si vous avez d'autres formations.</span>
         
                     
                </div>
                       <v-col
            cols="12"
            sm="4"
            md="4"
          >
            <v-checkbox
              v-model="formatS"
              label="Formation Souhaitée"
              color="blue"
              value="0"
              hide-details
            ></v-checkbox>                 
                 </v-col>
                 <v-row v-if="formatS"> 
              <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                       
                        <v-text-field                    
                          v-model="prof.titref"                        
                          label="Titre"
                           :rules="[v => !!v || msgrules]"
                           maxlength="25"
                           required                          
                        />
                      </v-col> 
                      <v-col
                        cols="12"
                        sm="6"
                        md="6"
                      >
                        <v-text-field                    
                          v-model="prof.description"                        
                          label="Description"
                           :rules="[v => !!v || msgrules]"
                           maxlength="55"                         
                           required                          
                        />
                      </v-col>                     
                      
                      </v-row>

    <v-row>
       <v-col  cols="12"
                        sm="6"
                        md="4" >
                <v-select  
                v-model="prof.statut"  
                    :items="[{value:'1',text:'Bénévolat'},{value:'2',text:'Contractuel'}
                              ,{value:'3',text:'Fonctionnaire'},{value:'4',text:'Remplacant'},
                              {value:'5',text:'Stagiaire'},{value:'6',text:'Sous-Traitant'},{value:'7',text:'Situation Particulière'}]"                                           
                    label="Statut*"
                     :rules="[v => !!v || msgrules]"
                     maxlength="55"                  
                    required                    
                ></v-select>               
            </v-col> 
             <v-col v-if="prof.statut ==='3' || prof.statut ==='2'"
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="prof.date_nomination"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template #activator="{ on, attrs }">
                            <v-text-field
                              v-model="prof.date_nomination"
                              label="Date Nomination"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="prof.date_nomination"                             
                            no-title
                            scrollable
                          >
                            <v-spacer />
                            <v-btn
                              text
                              color="primary"
                              @click="menu = false"
                            >
                              Cancel
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(prof.date_nomination)"
                            >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                                        
                      </v-col>

              <v-col v-if="prof.statut ==='3' ||  prof.statut ==='2'"
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-text-field                    
                          v-model="prof.code_budgetaire"                        
                          label="Code Budgetaire*"
                           :rules="[v => !!v || msgrules]"
                           maxlength="25"
                           required                          
                        />
                      </v-col>
                      <v-col v-if="prof.statut ==='3'"
                        cols="12"
                        sm="6"
                        md="4"
                      >
                         <v-select
                          v-model="prof.type_chaire"
                          :items="['1 Chaires', '2 Chaires', '3 Chaires', 'Temps plein']"
                          label="Type de chaires*"
                          
                        />
                      </v-col>
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
             @click="delNode(getIdnode(tree))"      
            >         
           Supprimer 
           
        </v-btn> 
        </v-col>
    </v-row>

      </div>
        <span  v-if="tree.length === 0"  class="text"> 
          Selectionnez une rubrique pour ajouter ou supprimer</span>
          <v-col cols="12" sm="6" md="6" > 
        
     <v-btn 
        v-if="nifvalid" 
            class="mb-2 mt-4"            
            color="primary" 
           small
              dark             
             @click="store_prof"      
            >  
            <v-progress-circular
                            v-show="visible"
                            :size="20"
                            :width="3"
                            color="white"
                            indeterminate
                            />        
          Soumettre         
        </v-btn>  
           
    </v-col>
</v-container>
</template>
<script>
 import modalEnseignant from '~/components/modalEnseignant.vue'
  export default {
  components: { modalEnseignant },
    data: () => ({
      initiallyOpen: ['william'], 
 // date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      
      prof:{  type:'',  nif:0, telephone:'', statut:'', lieunais:'',  adresse:'',  cin:'', nom:'', prenom:'',   sexe:0, commune_n:'',
      commune_h:'', dept_n:'', dept_h:'', email: '', date_naissance:null,  dateAffectation:null, date_EFonction:null, date_nomination:null, code_budgetaire:''
      ,statutmat:'', titre:'',  titref:'',description:'', nomf:'',lieuf:''},     
    
    label: "NIF",
    focus: false,   
    visible: false,
    date: new Date().toISOString().substr(0, 8) ,// 05/09/2019 
     departements:[],      
      communes:[],      
      communesh:[], 
       affectations:[],
       niveaux : [],
       matieres :[] ,
      profs:[],    
        emailRules: [
              (v) => !!v || 'E-mail obligatoire',
              (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail doit être valide'
            ],
              formations :[{nomf:'', lieu:'', date_debut:null, date_fin:null}],
              formationsP :[{titre:'', duree:'',lieu:'',organisateur:'',datef:''}],
            
        menu: false,
         modal: false,
         menu1:false,
         menu2: false,
         menu3: false,
         menu4: false,
         menu5: false,
         menu6: false,
         formatc:'',
         formatS:'',
      nifvalid:false,
      msgrules:'Champ obligatoire',
      infoSelect:{btntitle:'', id:'',label:''},      
      tree: ['p|0'],
      trees: [],
      labels : [{label:'prof',file:'mdi-account'},
          {label:'commune',file:'mdi-earth'},
          {label:'ecole',file:'mdi-home'},
          {label:'niveau',file:'mdi-grid'},
          {label:'classe',file:'mdi-account-multiple'},
          {label:'cours',file:'mdi-book-open'}],

        files:{'prof':'mdi-account','commune':'mdi-earth',  'ecole':'mdi-home',
        'niveau':'mdi-grid',  'classe':'mdi-account-multiple', 'cours':'mdi-book-open'},

       items: [
        //  {
        //   id:'p|1',
        //   name: '',
        //   file:'prof',
        //   children:[ ]
        // },       
        
      ],
    }),
    mounted(){
        this.get_dept()
      },
    methods : {
     arbrecomplete(){
       if(this.items.length === 0){
       this.$notifier.showMessage({content:'Affectation vide', color:'error'}) 
          return false
       } 
       else if(this.items[0].children.length === 0){
             this.$notifier.showMessage({content:'Pas de Commune d\'affectation pour ce prof', color:'error'}) 
          return false
       } 
           else{
           const nbc = this.items[0].children.length
             for(let i=0; i< nbc; i++){
                if(this.items[0].children[i].length === 0){
                  this.$notifier.showMessage({content:'Commune vide', color:'error'}) 
                      return false
                  }             
                 else if(this.items[0].children[i].children.length === 0){
                    this.$notifier.showMessage({content:'Pas d\'ecole', color:'error'}) 
                        return false
                    } 
                    else{
                      const nbe = this.items[0].children[i].children.length
                      for(let j=0; j< nbe; j++){
                        if(this.items[0].children[i].children[j].length === 0){
                              this.$notifier.showMessage({content:'Ecole vide', color:'error'}) 
                                  return false
                              }                                    
                        else if(this.items[0].children[i].children[j].children.length === 0){
                              this.$notifier.showMessage({content:'Pas de niveau', color:'error'}) 
                                  return false
                              }                          
                             else {
                                const nbn = this.items[0].children[i].children[j].children.length
                            for(let k=0; k< nbn; k++){
                              if(this.items[0].children[i].children[j].children[k].length === 0){
                                  this.$notifier.showMessage({content:'Niveau vide', color:'error'}) 
                                      return false
                                  }                                           
                              else if(this.items[0].children[i].children[j].children[k].children.length === 0){
                                    this.$notifier.showMessage({content:'Pas de classe', color:'error'}) 
                                        return false
                                    } 
                                  else{                                  
                                    const nbk = this.items[0].children[i].children[j].children[k].children.length
                                for(let l=0; l< nbk; l++){                                  
                                    if(this.getIdFromIdnode(this.items[0].children[i].children[j].children[k].children[l].id) >9){
                                    
                                    if(this.items[0].children[i].children[j].children[k].children[l].length === 0){
                                          this.$notifier.showMessage({content:'Classe vide', color:'error'}) 
                                              return false
                                          }                                  
                                                                                                                         
                                    else if(this.items[0].children[i].children[j].children[k].children[l].children.length === 0){
                                        this.$notifier.showMessage({content:'Pas de matiere', color:'error'}) 
                                            return false
                                        }                                                      
                                    }
                                        }
                                   }
                               }
                             }
                         }
                       }   
           }
        } 
         return true
     },

  reformatTreeData(){     
    let i, j, k, l, m
    const nbcom = this.items[0].children.length
      for( i=0; i<nbcom; i++){
         const nbecole = this.items[0].children[i].children.length
           for( j=0; j<nbecole; j++){
               const nbniv =  this.items[0].children[i].children[j].children.length
               for( k=0; k<nbniv; k++){
                  this.niveaux.push(this.items[0].children[i].children[j].children[k].name)
                      const nbcl = this.items[0].children[i].children[j].children[k].children.length
                 for(l=0; l<nbcl; l++){
                    this.affectations.push({ecole_id:this.getIdFromIdnode(this.items[0].children[i].children[j].id), 
                                      classe_id:this.getIdFromIdnode(this.items[0].children[i].children[j].children[k].children[l].id)})
                         const nbmat =this.items[0].children[i].children[j].children[k].children[l].children.length
                    for(m=0; m<nbmat; m++){
                         this.matieres.push({ecole_id:this.getIdFromIdnode(this.items[0].children[i].children[j].id), 
                                  classe_id:this.getIdFromIdnode(this.items[0].children[i].children[j].children[k].children[l].id),
                                  matiere_id:this.getIdFromIdnode(this.items[0].children[i].children[j].children[k].children[l].children[m].id),
                                  nb_heure:(this.items[0].children[i].children[j].children[k].children[l].children[m].name).split('|')[1]})
                                  }
                            }
                       }               
                   }
              }                            
     },

    //  test_date(){
    //  //  (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    //    const date = new Date()
    //     const daten = new Date(this.prof.date_naissance)              
    //       alert(daten.getTime())
    //      if(daten.getTime() > (date) ){
    //        this.$notifier.showMessage({ content: 'Vous n\'êtes pas encore majeur !', color: 'error' }) 
    //               return false;
    //        }
    //  },

  async store_prof(){ 
    const datedeb = new Date(this.formation.date_debut)
        const datefin = new Date(this.formation.date_fin)              
         if(datedeb.getTime() > datefin.getTime() ){
            this.$notifier.showMessage({ content: 'La Date de la fin ne peut pas etre inferieure a la date du debut !', color: 'error' })     
              return false;
         } 
            
                            
         if(!this.arbrecomplete())         
             return false
            this.reformatTreeData()

         this.visible = true 
        
         const donnees ={formation:this.formations, prof:this.prof, formatp:this.formationsP,
                          affectation:this.affectations, matiere:this.matieres, niveau:this.niveaux}
                            this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')           
        await this.$axios.post('store-enseignant',JSON.stringify(donnees)).then(res => {        
          if(res.data.reponse === 1){
                this.$notifier.showMessage({content:'Succes', color:'success'})
                    this.$notifier.showMessage({content:'Succès!!!', color:'success'})     
                if(res.data.message.length > 0) 
                this.$notifier.showMessage({content:res.data.message, color:'error'})  
                return true 
            }
            else{
               this.$notifier.showMessage({content:res.data.message[0], color:'error'})
            }          
        })
        this.visible = false
      },


     async checkNif(){
        if((this.prof.nif).length < 12 || this.prof.nif==='000-000-000-0'){
           this.$notifier.showMessage({content:' NIF invalide', color:'error'}) 
           return false
        }
           this.visible = true
         this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')           
        await this.$axios.get('check-prof/'+ this.nif).then(res => {
          this.profs = res.data 
          if(res.data === 0){
            this.nifvalid = true
           this.visible = false 
          } 
          else
          this.$notifier.showMessage({content:'Ce prof a ete deja insere', color:'error'})   
        })
      },

  ajouterFormation(){
               this.formations.push({nomf:'', lieu:'', date_debut:null, date_fin:null})
            },
      addFormatContinue(){
          this.formationsP.push({titre:'', duree:'',lieu:'',organisateur:'',datef:''})
      },
        deleteFormation(format){
             const f =  this.formations.filter(item => item !== format) 
             this.formations = f                
               
            },
        deleteFormatP(formatp){
             const fc =  this.formationsP.filter(item => item !== formatp) 
             this.formationsP = fc                
               
            },
      createTreeRoot(){
        if(this.items.length > 0)
        this.items =[]
        this.items.push({name:this.prof.nom, id:'p|1', file:'prof', children:[]})
      },

       getActiveValue(value){
       
         if(value.length > 0){
         const msgbtn = ['Ajouter Commune',  'Ajouter Ecole',    'Ajouter Niveau',
                        'Ajouter Classe',    'Ajouter Matière'  ]
         const niv  =  this.getNbniveau(this.getIdnode(value))
         if(niv === 1){
            const niv  =  this.getNbniveau(this.getIdnode(value))
            this.infoSelect.id = '04'
            this.infoSelect.label = this.labels[niv].label
            this.infoSelect.btntitle = msgbtn[0]
         } 
         if(niv === 2){           
            this.infoSelect.id = this.getElement_Id(value)           
            this.infoSelect.label = this.labels[niv].label
            this.infoSelect.btntitle = msgbtn[1]
         } 
         if(niv === 3){           
            this.infoSelect.id = this.getElement_Id(value)          
            this.infoSelect.label = this.labels[niv].label
            this.infoSelect.btntitle = msgbtn[2]
         } 
         if(niv === 4){           
            this.infoSelect.id = this.getElement_Id(value)          
            this.infoSelect.label = this.labels[niv].label
            this.infoSelect.btntitle = msgbtn[3]
         } 
         if(niv === 5){           
            this.infoSelect.id = this.getElement_Id(value)          
            this.infoSelect.label = this.labels[niv].label
            this.infoSelect.btntitle = msgbtn[4]
         } 
         else
            this.infoSelect.btntitle = msgbtn[value[value.length -1].split('-').length -1]            
        this.tree = value
         }            
     },

getElement_emit(item){  
        this.Addnode(this.getIdnode(this.tree),item)                    
     },

getIdnode(tab){ // retourne identifiant du noeud 
   return tab[tab.length -1]  
},

getNbniveau(idnode){ // retourme le nombre de niveau de larbre
  return idnode.split('-').length
},

getLabelnode(idnode){ // retourne l'etiquette du noeud
  const niv = this.getNbniveau(idnode)
  return this.labels[niv -1].label
},

getExpression(idnode) // expression permettant de supprimer ou ajouter noeud
{
  const niv = this.getNbniveau(idnode)  
   const index =[0]
   const first ='this.items[0].'
   const last ='.children.filter(item => item.id === idnode)[0]'   
   let exp = ''   
   if( niv > 0){
     for(let i=1; i<niv.length; i++){  
       const expObj = first + exp + last        
       const obj = this[expObj]
       const expIndex = first + exp + '.children.indexOf('+obj+',1)'  
	      index.push(this[expIndex])
        exp = 'children[this[expIndex]]'     
      }
    return (first + exp + 'children')
    }
},

getIndexnode(idnode)  // retourne un tableau d'index du ou  des noeuds precedents
 { 
    const niv = this.getNbniveau(idnode)  
    const tabnode = idnode.split('-')
   const index =[0]
    let id =''  
   if( niv > 0){     
     for(let i=2; i<=niv; i++){        
      if(i=== 2)  {
        id = tabnode[0]+'-'+tabnode[1]
        const obj = this.items[0].children.filter(item => item.id ===id )       
      	index.push(this.items[0].children.indexOf(obj[0]))         
      }    
      if(i=== 3)  {
         id = id+'-'+tabnode[2]                
        const obj = this.items[0].children[index[1]].children.filter(item => item.id === id)         
      	index.push(this.items[0].children[index[1]].children.indexOf(obj[0]))    
      }    
      if(i=== 4)  {
          id = id+'-'+tabnode[3]
        const obj = this.items[0].children[index[1]].children[index[2]].children.filter(item => item.id === id)
      	index.push(this.items[0].children[index[1]].children[index[2]].children.indexOf(obj[0]))
      }    
      if(i=== 5)  {
          id = id+'-'+tabnode[4]
        const obj = this.items[0].children[index[1]].children[index[2]].children[index[3]].children.filter(item => item.id === id)
      	index.push(this.items[0].children[index[1]].children[index[2]].children[index[3]].children.indexOf(obj[0]))
      }    
      if(i=== 6)  {
          id = id+'-'+tabnode[5]
        const obj = this.items[0].children[index[1]].children[index[2]].children[index[3]].children[index[4]].children.filter(item => item.id === id)
      	index.push(this.items[0].children[index[1]].children[index[2]].children[index[3]].children[index[4]].children.indexOf(obj[0]))
      }    
      }   
       return index
      }
  },

getEtiquette(idnode){
   const niv = this.getNbniveau(idnode)
  let lab = (this.labels[niv].label).substring(0,1)
  if(niv === 4)
	  lab = 'k'
  return lab
},

  formatnode(item, idnode, filel){
     const niv = this.getNbniveau(idnode)     
  let ide = idnode + '-' +this.getEtiquette(idnode)+'|'+ item.id
  if(niv === 4)  
   ide = idnode + '-k|'+ item.id
  return({id:ide, name:item.name, file:filel, children:[]})
},
  

  Addnode(idnode, item){ 
   const niv =  this.getNbniveau(idnode)  
    const index =this.getIndexnode(idnode)
     if(niv === 1){
       const obj = this.formatnode(item, idnode, 'commune')      
       if((this.items[index[0]].children.filter(item => obj.id ===item.id).length < 1))
         this.items[index[0]].children.push(obj) 
      else        
           this.$notifier.showMessage({ content:  'Cette commune a été  déjà ajoutée', color: 'error' })  
    }   
    if(niv === 2){
        const obj = this.formatnode(item, idnode, 'ecole')
         if((this.items[index[0]].children[index[1]].children.filter(item => obj.id ===item.id).length < 1))
             this.items[index[0]].children[index[1]].children.push(obj)
         else        
           this.$notifier.showMessage({ content:  'Cette ecole a été  déjà ajoutée', color: 'error' })
    }
    if(niv === 3){
        const obj = this.formatnode(item, idnode, 'niveau')
         if(( this.items[index[0]].children[index[1]].children[index[2]].children.filter(item => obj.id ===item.id).length < 1))
      this.items[index[0]].children[index[1]].children[index[2]].children.push(obj)
      else        
           this.$notifier.showMessage({ content:  'Ce niveau a été  déjà ajouté', color: 'error' })
    }
    if(niv === 4){
        const obj = this.formatnode(item, idnode, 'classe')
         if((this.items[index[0]].children[index[1]].children[index[2]].children[index[3]].children.filter(item => obj.id ===item.id).length < 1))
      this.items[index[0]].children[index[1]].children[index[2]].children[index[3]].children.push(obj)
      else        
           this.$notifier.showMessage({ content:  'Cette classe a été  déjà ajoutée', color: 'error' })
    }
    if(niv === 5){
        const obj = this.formatnode(item, idnode, 'cours')
         if((this.items[index[0]].children[index[1]].children[index[2]].children[index[3]].children[index[4]].children.filter(item => obj.id ===item.id).length < 1))
      this.items[index[0]].children[index[1]].children[index[2]].children[index[3]].children[index[4]].children.push(obj)
    else      
        this.$notifier.showMessage({ content:  'Cette matiere a été  déjà ajoutée', color: 'error' })
   }
    this.tree =[]           
  }, 


 

 delNode(idnode){
         const index =this.getIndexnode(idnode)
         const niv =  index.length 
     
    if(niv === 2){
       const obj =  this.items[index[0]].children[index[1]]             
       if(obj.children.length < 1)  
       this.items[index[0]].children.splice(index[1],1)
       else
           this.$notifier.showMessage({ content: this.labels[niv -1].label+ ' n\'est pas vide', color: 'error' })  
        }
    if(niv === 3){
       const obj = this.items[index[0]].children[index[1]].children[index[2]]
        if(obj.children.length < 1)
      this.items[index[0]].children[index[1]].children.splice(index[2],1)
       else
           this.$notifier.showMessage({ content: this.labels[niv -1].label+ ' n\'est pas vide', color: 'error' })  
        }
    if(niv === 4){
      const obj = this.items[index[0]].children[index[1]].children[index[2]].children[index[3]] 
       if(obj.children.length < 1)     
      this.items[index[0]].children[index[1]].children[index[2]].children.splice(index[3],1)
       else
           this.$notifier.showMessage({ content: this.labels[niv -1].label+ ' n\'est pas vide', color: 'error' })  
    
    }
    if(niv === 5){
       const obj = this.items[index[0]].children[index[1]].children[index[2]].children[index[3]].children[index[4]]
        if(obj.children.length < 1)
      this.items[index[0]].children[index[1]].children[index[2]].children[index[3]].children.splice(index[4],1)
       else
           this.$notifier.showMessage({ content: this.labels[niv -1].label+ ' n\'est pas vide', color: 'error' })  
    
    }
    if(niv === 6){
      const obj = this.items[index[0]].children[index[1]].children[index[2]].children[index[3]].children[index[4]].children[index[5]]
       if(obj.children.length < 1)
      this.items[index[0]].children[index[1]].children[index[2]].children[index[3]].children[index[4]].children.splice(index[5],1)
     else
           this.$notifier.showMessage({ content: this.labels[niv -1].label+ ' n\'est pas vide', color: 'error' })  
       }
    this.tree =[]       
  },

 async get_dept(){
            this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               await this.$axios.get( 'departement').then( response => {
                  this.departements = response.data;
                   this.visible = false
                  })
             },

         async get_com(){
            this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               await this.$axios.get( 'get-commune-dept/'+this.prof.dept_n).then( response => {
                  this.communes = response.data;
                   this.visible = false
                  })
             },
         async get_comH(){
            this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               await this.$axios.get( 'get-commune-dept/'+this.prof.dept_h).then( response => {
                  this.communesh = response.data;
                   this.visible = false
                  })
             },

  
  //     getIndice(elem){
       
  //         if(elem.length > 0){       
  //         const long = elem[elem.length-1].split('-').length  
  //       if(long === 1){
  //         const id = elem[elem.length-1]       
  //        const obj = this.items.filter(item => id === item.id)            
  //          return this.items.indexOf(obj[0])
  //       }
  //       if(long === 2){
  //         const id = elem[elem.length-1]                
  //        const obj = this.items[0].children.filter(item => id === item.id)            
  //          return this.items[0].children.indexOf(obj[0])
  //       }
  //       if(long === 3){
  //         const id = elem[elem.length-1]       
  //        const obj = this.items.children.children.filter(item => id === item.id)            
  //          return this.items.children.children.indexOf(obj[0])
  //       }
  //       if(long === 4){
  //         const id = elem[elem.length-1]       
  //        const obj = this.items.children.children.children.filter(item => id === item.id)            
  //          return this.items.children.children.children.indexOf(obj[0])
  //       }
  //       if(long === 5){
  //         const id = elem[elem.length-1]       
  //        const obj = this.items.children.children.children.children.filter(item => id === item.id)            
  //          return this.items.children.children.children.children.indexOf(obj[0])
  //       }
  //       if(long === 6){
  //         const id = elem[elem.length-1]       
  //        const obj = this.items.children.children.children.children.children.filter(item => id === item.id)            
  //          return this.items.children.children.children.children.children.indexOf(obj[0])
  //       }
  //       }
        
  //     },

  //     createIdNode(elem,id){
  //       if(elem.length > 0){    
          
  //         const labels = ['prof','commune', 'ecole','niveau','classe','cours']
  //         const label = labels[elem[elem.length -1].split('-').length ]          
  //           let label1 = label.substring(0,1)
  //           if(label === 'classe')
  //             label1 = 'k'
              
  //                 const idnode = elem[elem.length -1]+'-'+label1+'|'+id
  //             return idnode
  //       } 
  //     },

    getElement_Id(elem){ // cette fonction retourne label, index et id
        const idnode = this.getIdnode(elem)
        const idnodetab = idnode.split('-')
        const id = idnodetab[idnodetab.length -1].split('|')
        return id[id.length -1]
       
    },
     getIdFromIdnode(idnode){ // cette fonction retourne label, index et id       
        const idnodetab = idnode.split('-')
        const id = idnodetab[idnodetab.length -1].split('|')
        return id[id.length -1]
       
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

    .plus{
        color:blue;
        font-style: italic;
        font-size: 14px;
        padding: 5px;
    }
    .fset{       
        padding: 0px;
        margin: 0px;
    }
    .format {
   font-size:18px;
    color:blue;
     font-weight: bold;
    margin-left: 30px;
}


.fbox{
    border: solid 1px rgb(177, 165, 189);
    border-top: white;
    border-radius: 10px;
    margin-top:40px;
}
</style>
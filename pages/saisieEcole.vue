<template>
 <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <!-- <base-material-card
      icon="mdi-home"
      title="Gestion ecoles"
      class="px-5 py-3 mt-4"
    > -->
  <v-stepper v-model="e1">
    <v-stepper-header  >
            <v-stepper-step :complete="e1 > 1"   step="1" > Identification </v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step  :complete="e1 > 2"   step="2" >  Localisation   </v-stepper-step>
            <v-divider></v-divider>      

            <v-stepper-step  :complete="e1 > 3"   step="3">   Responsable</v-stepper-step>  
                <v-divider></v-divider>           

            <v-stepper-step   step="4"  > Etat Batiment </v-stepper-step>
       </v-stepper-header>
     
<!-- *************************************  Identification ecole ************************** -->
<v-stepper-items>
 <v-stepper-content step="1">
    <span class="mt-4 p-4 text-h5"> <v-icon x-large color="blue" class="mb-2">mdi-information-variant</v-icon> Identification Ecole</span>
     <v-card   class="mb-12 pa-4" color="grey lighten-3"   height="auto"  >
       
        <v-row >
            <v-col   cols="12"  md="4"  sm="6">
                <v-text-field v-model="ec.nom"  :rules="[v => !!v || msgrules]"   maxlength="100" label="Nom Ecole*"  prepend-icon="mdi-home" required></v-text-field>
            </v-col>

            <v-col   cols="12"  md="4" sm="6">
                <v-text-field v-model="ec.code"  label="Code" maxlength="14" prepend-icon="mdi-license"></v-text-field>
            </v-col>

            <v-col   cols="12"   md="4" sm="6" >
                    <v-text-field v-model="ec.fondateur"   label="Fondateur"  maxlength="50"  prepend-icon="mdi-human" ></v-text-field>
            </v-col>
            <v-col   cols="12"   md="4" sm="6">
                <v-text-field v-model="ec.sigle"  label="Sigle"  maxlength="10" prepend-icon="mdi-alphabetical-variant"></v-text-field>
            </v-col>
            <v-col   cols="12"   md="4" sm="6">
                 <v-text-field
                      v-model="ec.tel"
                      label="Tel"
                      prepend-icon="mdi-phone-outline" 
                         type="number"                         
                         counter="12"                  
                    />
            </v-col>
            <v-col   cols="12"   md="4" sm="6">
                 <v-text-field
                      v-model="ec.telephone"
                      label="Tel Additionnel"
                      prepend-icon="mdi-phone"
                      type="number"
                    />
            </v-col>                            

            <v-col  cols="12"  md="4" sm="6">
             <v-text-field  v-model="ec.email"   :rules="emailRules"  label="E-mail"  prepend-icon="mdi-mail"></v-text-field>
            </v-col>
            <v-col
                cols="12"    sm="6"   md="4" >
                        <v-select
                          v-model="ec.categorie"
                          :items="categories"
                          label="Categorie*" 
                          required 
                           :rules="[v => !!v || msgrules]" 
                           prepend-icon="mdi-grid"                       
                        />
                      </v-col>
                <v-col
                cols="12"    sm="6"       md="4"   >
                        <v-select
                          v-model="ec.niveau"
                          :items="niveauens"
                          label="Niveau Enseignement*" 
                           required 
                           :rules="[v => !!v || msgrules]"
                           prepend-icon="mdi-grid-large"                          
                        />
                      </v-col>
                    <v-col
                cols="12"    sm="6"       md="4"   >
                        <v-select
                          v-model="ec.vacation"
                          :items="vacations"
                          label="Vacation*" 
                           required 
                           :rules="[v => !!v || msgrules]"  
                           prepend-icon="mdi-clock"                        
                        />
                      </v-col>
                      <v-col   cols="12"    sm="6"       md="4"   >
                    <span>Secteur*</span>
                         <v-radio-group
                          v-model="ec.secteur"
                          row
                           required 
                           :rules="[v => !!v || msgrules]" 
                         >
                        <v-radio                                                  
                          label="Public" 
                          value="1" 
                                                 
                        ></v-radio>
                         <v-radio                                                   
                          label="Privé" 
                          value="0"
                                                  
                        ></v-radio>
                        </v-radio-group>
                </v-col>
                
                 <v-col   cols="12"    sm="6"       md="4"   >
                      <span>Location*</span>
                     <v-radio-group  v-model="ec.location" row  required 
                           :rules="[v => !!v || msgrules]" >                   
                        <v-radio                                                  
                          label="Non" 
                          value="0"                                                 
                        />
                         <v-radio                                                  
                          label="Oui" 
                          value="1"                                                  
                        />
                        </v-radio-group>
                </v-col>
                 <v-col   cols="12"    sm="6"       md="4"   >
                    <span>Milieu*</span>
                      <v-radio-group  v-model="ec.milieu" row  required 
                           :rules="[v => !!v || msgrules]" > 
                        <v-radio                                                   
                          label="Urbain" 
                          value="1" 
                                                                             
                        />
                         <v-radio                                                 
                          label="Rural" 
                          value="0"                                                    
                        />
                      </v-radio-group>
                </v-col>

                 <v-col   cols="12"    sm="6"       md="6"   >                     
                    <span>Statut*</span>
                      <v-radio-group  v-model="ec.statut" row  required 
                           :rules="[v => !!v || msgrules]"  > 
                        <v-radio                                                   
                          label="Fonctionnel" 
                          value="1" 
                                                                          
                        />
                         <v-radio                                                   
                          label="Non Fonctionnel" 
                          value="0"                                                
                        />
                      </v-radio-group>
                </v-col>
               
    </v-row>
</v-card> 
        <v-row>
            <v-col cols="12" md="9" sm="6"></v-col>
            <v-col cols="12" md="3" sm="6">            
        
        <v-btn :disabled="ec.nom === '' || ec.categorie === '' || ec.vacation === '' || ec.milieu=== '' || ec.niveau ==='' || ec.statut === '' || ec.secteur === ''"
         
         color="primary" small title="continue" @click="e1 = 2" > 
           <v-icon>mdi-arrow-right-bold</v-icon>
            </v-btn>
        <v-btn small color="cyan" title="Quitter" class="ma-2 pa-0"> <v-icon>mdi-close</v-icon>  </v-btn>
            </v-col>
        </v-row>
    
</v-stepper-content>
<!-- ********************************* Localisation ********************* -->
<v-stepper-content step="2">
   <span class="mt-4 p-4 text-h5"> <v-icon x-large color="blue" class="mb-2">mdi-map-marker-outline</v-icon> Localisation Ecole {{ec.code}} {{ec.nom}}</span>
    <v-card  class="mb-12 pa-4"  color="grey lighten-3"   height="auto">
        <v-row>
            <v-col  cols="12"   sm="6"    md="3">
                 <v-select                            
                            v-model="departement"
                            :items="departements"
                            :rules="[v => !!v || msgrules]"
                            label="Département*"
                            required
                            prepend-icon="mdi-earth"
                              @change="getData('departements', departement)"
                            ></v-select>                           
                          </v-col>
                          <v-col  v-if = "districts.length > 0" cols="12" 
                            sm="6"
                               md="3">
                              <v-select                           
                            v-model="district"
                            :items="districts"
                            :rules="[v => !!v || msgrules]"
                            label="District*"
                            required
                              prepend-icon="mdi-grid"
                            @change="getData('districts', district)"
                            ></v-select>                           
                          </v-col>
                          <v-col  v-if = "communes.length > 0"
                           cols="12"
                            sm="6"
                               md="3">
                           <v-select                           
                            v-model="commune"
                            :items="communes"
                            :rules="[v => !!v || msgrules]"
                            label="Commune*"
                            required
                              prepend-icon="mdi-earth"
                            @change="getData('communes', commune)"
                            ></v-select>
                           
                          </v-col>
                          <v-col v-if = "zones.length > 0" cols="12"
                              sm="6"
                              md="3">
                           <v-select
                           
                            v-model="ec.zone_id"
                            :items="zones"
                            :rules="[v => !!v || msgrules]"
                            label="Zone*"
                              prepend-icon="mdi-grid"
                            required 
                            @change="get_sectionec"                         
                            ></v-select>
                           
                          </v-col>
                          <v-col  v-if = "zones.length > 0"
                              cols="12"
                              sm="6"   md="4">
                           <v-select                          
                            v-model="ec.section_communale_id"
                            :items="sectioncoms"
                            :rules="[v => !!v || msgrules]"
                            label="Section Communale*"
                              prepend-icon="mdi-earth"
                            required
                          
                            ></v-select>                           
                          </v-col>
                           <v-progress-circular
                            v-show="visible"
                            class="mt-4"
                            :size="20"
                            :width="2"
                            color="info"
                            indeterminate
                            />
                     <v-col  cols="12"  md="8"  sm="6">
             <v-text-field  v-model="ec.adresse"  :rules="[v => !!v || msgrules]"  label="Adresse*"   prepend-icon="mdi-map-marker" required ></v-text-field>
            </v-col>
             <v-col cols="12" sm="6"   md="4">
                           <v-select                           
                            v-model="ec.acces"
                            :items="access"
                            label="Accès*"
                            :rules="[v => !!v || msgrules]"
                            required                          
                            ></v-select>                           
                          </v-col>
              <v-col  cols="12"  md="4" sm="6" >
                     <v-text-field  v-model="ec.latitude" label="Latitude" prepend-icon="mdi-longitude"  ></v-text-field>
            </v-col>
              <v-col  cols="12"  md="4" sm="6" >
                    <v-text-field  v-model="ec.longitude" label="Longitude" prepend-icon="mdi-latitude"></v-text-field>
            </v-col>                                           
        </v-row>
    </v-card>
    <v-row>
            <v-col cols="12" md="9" sm="6"></v-col>
            <v-col cols="12" md="3" sm="6"> 
     
     <v-btn   :disabled="ec.district === '' || ec.commune === '' || ec.zone === '' || ec.section_communale_id === '' || ec.adresse === '' || ec.acces === ''"
    
           small title="Continuer"  color="primary"   @click="e1 = 3" > 
         <v-icon>mdi-arrow-right-bold</v-icon>
      </v-btn>
     <v-btn small title="Precedent" color="Secondary"   class="ma-1"  @click="e1 = 1">  <v-icon>mdi-arrow-left-bold</v-icon></v-btn>
     <v-btn small title="Quitter" color="cyan"  @click="e1 = 1"> <v-icon>mdi-close</v-icon>  </v-btn>
            </v-col>
    </v-row>
</v-stepper-content>

  <!-- *************** Responsable ************************* -->

<v-stepper-content step="3">
       <span class="mt-4 p-4 text-h5">  <v-icon x-large color="blue" class="mb-2">mdi-account-tie</v-icon> Responsable Ecole {{ec.code}} {{ec.nom}}</span>
    <v-card  class="mb-12 pa-4"   color="grey lighten-3"  height="auto"  >
        <v-row>
            <v-col   cols="12"  md="6" >
            <v-text-field   v-model="ec.nomd" :rules="[v => !!v || msgrules]"  label="Nom Directeur*"   prepend-icon="mdi-account-tie"
                required  ></v-text-field>
            </v-col>
             <v-col   cols="12"  md="6" >
            <v-text-field   v-model="ec.prenom" :rules="[v => !!v || msgrules]"    label="Prenom Directeur*" prepend-icon="mdi-account-tie"
                required  ></v-text-field>
            </v-col>
            <v-col
      cols="12"
      sm="6"
      md="4"
    >
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="ec.datenais"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template #activator="{ on, attrs }">
          <v-text-field
            v-model="ec.datenais"
            label="Date Naissance*"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
        
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="ec.datenais"
          no-title
          scrollable
          
        >
          <v-spacer></v-spacer>
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
                @blur="check_age"
            @click="$refs.menu.save(ec.datenais)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
          <v-col   cols="12"  md="5" sm="6" >
            <v-text-field v-model="ec.lieunais" :rules="[v => !!v || msgrules]"  label="Lieu de Naissance*" required
                prepend-icon="mdi-map-marker" @blur="check_age" ></v-text-field>
            </v-col>
             <v-col   cols="12"    sm="6"       md="3"   >
                    <span>Sexe*</span>
                      <v-radio-group  v-model="ec.sexe" row> 
                        <v-radio                                                   
                          label="M" 
                          value="1" 
                          prepend-icon="mdi-human-male"                                                                             
                        />
                         <v-radio                                                 
                          label="F" 
                          value="0" 
                          prepend-icon="mdi-human-female"                                                   
                        />
                      </v-radio-group>
                </v-col>
            
                 <v-col cols="12" md="4" sm="6">
            <v-text-field  v-model="ec.cin"  :rules="[v => !!v || msgrules]"  type="number" :counter="10" label="NINU"  required ></v-text-field>
            </v-col>

            <v-col  cols="12"   md="4" sm="6">
              <v-text-field-simplemask
                  v-model="ec.nif"
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

            <v-col   cols="12"   md="4" sm="6">
                 <v-text-field-simplemask
                    v-model="ec.teld"
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
                      alphanumeric: false,
                      lowerCase: false,
                    }"
                    :focus="focus"
                    @focus="focus = false"
                  />
            </v-col>
            <v-col   cols="12"   md="4" sm="6">
                <v-text-field-simplemask
                    v-model="ec.telephoned"
                    label="Tél Additionnel"
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
                      alphanumeric: false,
                      lowerCase: false,
                    }"
                    :focus="focus"
                    @focus="focus = false"
                  />
            </v-col>                            

            <v-col  cols="12"  md="4" >
             <v-text-field  v-model="ec.emaild"   label="E-mail"  prepend-icon="mdi-mail"></v-text-field>
            </v-col>
            <v-col   cols="12"   sm="6"    md="4">
                        <v-select                           
                            v-model="ec.communed"
                            :items="communeds"
                            :rules="[v => !!v || msgrules]"                          
                            label="Commune"
                            required 
                              prepend-icon="mdi-earth"  
                              @change="get_sectiondis"                     
                            ></v-select>                           
                          </v-col>
                     <v-col   cols="12"   sm="6"    md="4">
                        <v-select                           
                            v-model="ec.section_communaled_id"
                            :items="sectioncomds"
                            :rules="[v => !!v || msgrules]"
                            label="Section Communale*"
                            prepend-icon="mdi-earth"
                            required                           
                            ></v-select>                           
                          </v-col>
                         
                          
                           <v-col   cols="12"  md="8"  >
            <v-text-field   v-model="ec.adressed"  :rules="[v => !!v || msgrules]"    label="Adresse*" required prepend-icon="mdi-map-marker"></v-text-field>
            </v-col>
        </v-row>
            </v-card>
     <v-row>
            <v-col cols="12" md="8" sm="6"></v-col>
            <v-col cols="12" md="4" sm="6"> 
             
        <v-btn  :disabled="ec.nomd === '' || ec.prenom === ''  || ec.lieunais === '' || ec.adressed === '' || ec.sexe ==='' || ec.section_communaled_id ===''"
      
        small  title="Continuer" color="primary"  @click="e1 = 4" > <v-icon>mdi-arrow-right-bold</v-icon> </v-btn>
        <v-btn small title="Precedent" color="Secondary"   class="ma-2" @click="e1 = 2"> <v-icon>mdi-arrow-left-bold</v-icon></v-btn>
        <v-btn small title="Quitter" color="cyan"  @click="e1 = 1">  <v-icon>mdi-close</v-icon> </v-btn>
            </v-col>
     </v-row>
 </v-stepper-content>

 <!-- ********************** Etat ******************* -->

    <v-stepper-content step="4">
      <span class="mt-4 p-4 text-h5"><v-icon x-large color="blue" class="mb-2">mdi-home</v-icon> Etat Physique {{ec.code}} {{ec.nom}}</span>
    
           <v-card   class="mb-12 pa-4"  color="grey lighten-3"  height="auto" >          
      <v-row>

               <span v-if="questions.length >0" class="ma-2">                   
                    <span v-for="q in questions" :key="q.id" >                                      
                        <span v-if ="q.type_q === 'select'">                     
                            <v-col cols="12" md="12" sm="6" >
                                <v-select                           
                                  v-model="q.option_id"
                                  :items="optionSelect"
                                  :rules="[v => !!v || msgrules]"
                                  :label="q.libelle"
                                  required                           
                                  ></v-select>                              
                              </v-col>                      
                        </span>
                                      
                       <span v-else >                                               
                           <v-col cols="12" md="12" sm="6">                      
                                     <label><b>{{q.libelle}}* </b></label>                       
                               <span v-for="(opt) in options" :key="opt.value">
                                  <span v-if="opt.question_id === q.id" >                                 
                                     <v-checkbox   v-model="q.option_id"   :label= opt.text :value="opt.value">                                         
                                     </v-checkbox>                                                                                            
                                    </span>
                                </span> 
                           </v-col>                                                      
                       </span>    
                    </span>
                    </span> 
                </v-row>
               <v-row>
             <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-menu
                          ref="menu1"
                          v-model="menu1"
                          :close-on-content-click="false"
                          :return-value.sync="ec.dateEval"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template #activator="{ on, attrs }">
                            <v-text-field
                              v-model="ec.dateEval"
                              label="Date Evaluation"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            />
                          </template>
                          <v-date-picker
                            v-model="ec.dateEval"
                             :rules="[v => !!v || msgrules]"
                             required
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
                              @click="$refs.menu1.save(ec.dateEval)"
                             >
                              OK
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                      </v-row>

           </v-card>
           <v-row>
                <v-col cols="12" md="9" sm="6"></v-col>
               <v-col cols="12" md="3" sm="6"> 
                    <v-btn :disabled=" ec.dateEval ===null"
                            small title="soumettre"  color="primary"  @click="store"> 
                        <v-icon>mdi-content-save</v-icon>  
                    </v-btn>
                    <v-btn small title="Precedent"  class="ma-1" color="Secondary"   @click="e1 = 3"> 
                            <v-icon>mdi-arrow-left-bold</v-icon>
                    </v-btn>
                    <v-btn small title="Quitter"  color="cyan"  @click="e1 = 1" >
                            <v-icon>mdi-close</v-icon>
                    </v-btn>
               </v-col>
           </v-row>  
    </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
   <!-- </base-material-card> -->
  </v-container>
</template>
<script>
  export default {
    data () {
      return {
        e1: 1,
      label: "NIF",
    focus: false, 
    visible:false,
        valid: false,
         departement: '',         
        ecole: '',
        district:'',
        commune:'',
        communed:'',
        departements: [],
        districts: [],
        communes: [],
        communeds: [],
        zones: [],
     sectioncoms:[],
     sectioncomds:[],
     questions:[],
     options:[],
     optionSelect:[],
     repeb: [],
        niveauens:[{text:'Prescolaire', value:'0001'}, {text:'Fondamental', value:'0110'},
                      {text:'Secondaire', value:'1000'},  {text:'Ecole Complete', value:'1111'},
                      {text:'Fondamental 1er et 2eme cycle', value:'0010'},
                      {text:'Prescolaire et Fondamental 1er et 2eme cycle', value:'0011'},
                      {text:'Prescolaire et Fondamental complet', value:'0111'},
                      {text:'Fondamental 3eme Cycle et Secondaire', value:'1100'},
                      {text:'Fondamental et Secondaire', value:'1110'}, {text:'3e Cycle', value:'0100'},
                   ], 
            categories : ['Laique', 'Communautaire', 'Congreganiste Anglicane', 'Congreganiste Romaine',
                          'Presbyterale', 'Protestante','Nationale', 'Lycée','Mission Baptiste',
                          'Mission Adventiste', 'Mission Methodiste', 'Autres'],
         vacations : ['AM', 'PM', 'Soir','Double Vacation', 'Triple Vacation'],
          access : ['Facile', 'Dificile', 'Très Dificile'],
        ec:{ nomd: '',   prenom: '',   cin: '',    nif: '',   tel: '',  email: '', telephone:'', teld:'', 
              fondateur:'',  sigle:'',  niveau:'',  categorie:'', milieu:'', secteur:'', vacation:'', location:'', 
              adressed:'', adresse: '',  lieunais: '',    sexe: '',   telephoned:'',   communed:'',  emaild: '',
             longitude:'', latitude:'', code:'', statut:'', acces:'', nom:'', section_communaled_id:'', 
             section_communale_id:'', datenais: '',  zone_id: '', dateEval:null},
      menu: false,
      modal: false,
      menu2: false,
      menu1:false,
      locationgps:null,
    gettingLocation: false,
    errorStr:null,
    msgrules:'Champ obligatoire',
      nameRules: [
        v => !!v || 'Champ obligatoire',
       v => (v && v.length <= 25) || 'Name must be less than 25 character',
      ],
      
      emailRules: [
              (v) => !!v || 'E-mail obligatoire',
              (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail doit être valide'
            ],
      }
    },
    created(){
      this.getCoordinates()
    },
    mounted () {      
      this.get_dept() 
      this.get_Etat()
                   
    },

    methods:{
      
        async get_dept(){
              this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
            await this.$axios.get( 'departement').then( response => {
                  this.departements = response.data;
                  })
                  this.visible = false
          },
          

          getEmptyQuestion(){
            let tr = true
              this.questions.forEach((q)=>{               
                if(q.option_id.length === 0) {   
                  tr =false                                                                   
                return false 
                }       
              })  
               return tr           
          },

          getOpstionSelect(){
            const optSelect = this.options.filter((op)=>op.question_id === 1)           
            return optSelect
            
          },

          async get_Etat(){  
             this.visible = true           
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
             await this.$axios.get( 'get-etat').then( response => {
                  this.sectioncoms = response.data.sectioncommunales
                  this.communeds = response.data.communeds
                  const quest = response.data.questions
                  this.questions = this.addRestoQuest(quest)
                  this.options = response.data.options     
                   this.optionSelect = this.getOpstionSelect()               
                   this.visible = false             
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
                })
                 this.visible = false               
              }
              if (data === 'districts'){
                  this.zones = []                
                  this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get( 'get-district/'+ this.district).then( response => {
                  this.communes = response.data            
                })
                this.visible = false
              }
              if (data === 'communes'){                
                  this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get( 'get-commune/'+ this.commune).then( response => {
                  this.zones = response.data;                 
                 })
                 this.visible = false
              }
              if (data === 'zones'){                  
                  this.visible = true
                   this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get( 'get-zone/'+ this.zone).then( response => {
                    //  this.ec = response.data;
                    //   this.ec.push({text:'Toutes', value: 0})
                   this.visible = false
                 })                
              }
               
              if (data === 'ecoles'){
                this.visible = true
                 this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                 this.$axios.get('get-classe/'+ -1).then( response => {                   
                 this.classes = response.data;
                 
                  this.visible = false
                })               
              }
              
             },
      async get_sectiondis(){
              this.visible = true              
              if(this.communeds.length > 0){
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
            await this.$axios.get('sectioncom/'+this.ec.communed).then( response => {             
                  this.sectioncomds = response.data;
                  })
              }
                  this.visible = false
          },
 async get_sectionec(){
              this.visible = true              
              if(this.zones.length > 0){
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
            await this.$axios.get('sectioncom/'+this.commune).then( response => {            
                  this.sectioncoms = response.data;
                  })
              }
                  this.visible = false
          },


        async store(){
            this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
                   
                if(!this.getEmptyQuestion()){
                   this.$notifier.showMessage({ content: 'Une option au moins doit-être choisie pour chaque question.', color: 'error' }) 
                  return false
                }
               const data = {ecole: this.ec, etat: this.questions}                
            await this.$axios.post('store-data-ecole',data).then(response => {                                     
                if(response.data === 1) {                           
                  this.e1 =1                    
                  this.district =''   
                   this.commune=''
                  this.departement=''  
                  this.resetObjectField(this.ec)
                  this.resetQuestion()
                  this.$notifier.showMessage({ content: 'Bravo!!! Operation reussie avec succès!!!', color: 'success' })                              
                }
                else{
                     this.$notifier.showMessage({ content: 'Echec!', color: 'error' })
                }
             })
              this.loading =false
        },
        
        getAge(dateString) {
            const today = new Date();
            const birthDate = new Date(dateString);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
    },

  check_age(){
          if(parseInt(this.getAge(this.ec.datenais)) < 22){          
            this.$notifier.showMessage({content: 'Votre age ne correspond pas a ce poste!', color: 'error' })     
                  return false;
           }         
           return true;
      },

      getCoordinates () {
        this.$getLocation({
          enableHighAccuracy: false, // false defaults to false
          timeout: Infinity, // defaults to Infinity
          maximumAge: 0, // defaults to 0

        })
          .then(coordinates => {            
            this.ec.latitude = coordinates.lat
            this.ec.longitude = coordinates.lng
          })
      },

     localisation(){
           if(!("geolocation" in navigator)) {
             this.$notifier.showMessage({ content: 'La Geolocalisation n\'est pas disponible.', color: 'error' })
              this.errorStr = 'Geolocation is not available.';
              return;
            }

            this.gettingLocation = true;
            // get position
            navigator.geolocation.getCurrentPosition(pos => {
              this.gettingLocation = false;
              this.locationgps = pos;
            }, err => {
              this.gettingLocation = false;
              this.errorStr = err.message;
            })
            this.ec.latitude = this.locationgps.coords.latitude
            this.ec.longitude = this.locationgps.coords.longitude
       },

resetObjectField(object){
  const keystab = Object.keys(object)
  keystab.forEach((k)=>{
    if(typeof object[k] === 'string')
    object[k] = ''
    else 
    object[k] = null
  })
  return object
  
},

resetQuestion(){
  this.questions.forEach((q)=>{
    q.option_id = []
  })
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
}
    }
  }
</script>
<style scoped>
.carte{
  border: solid 1px rgb(132, 194, 230);
  margin: 30px;
  
  
}
</style>
<template>
<v-container>
    
        <v-row>
          <v-col  cols="12"
            sm="6"
            md="9">                           
    <GMap
  ref="gMap"
  language="fr"
  :cluster="{options: {styles: clusterStyle}}"
  :center="{lat: +locations[0].lat, lng: +locations[0].lng}"
  :options="{fullscreenControl: true, styles: mapStyle}"
  :zoom="6"
  label="Carte Scolaire"
>
 <GMapMarker
    v-for="location in locations"
    :key="location.id"
    :position="{lat: location.lat, lng: location.lng}"   
    :options="{icon: location === currentLocation ? pins.selected : pins.notSelected}"
      label="Carte Scolaire"    
    @click="currentLocation = location"
    
  >
      <!-- :options="{icon: location === currentLocation ? pins.selected : pins.notSelected}" -->
    <GMapInfoWindow :options="{maxWidth: 200}">
      <code>
         <h4> Ecole: {{ location.nom }}</h4>
          Adresse: {{ location.adresse }}
          lat: {{ location.lat }},
          lng: {{ location.lng }}
      
      </code>
    </GMapInfoWindow>
    <MarkerLabel title="Ecole" visible = "true">
      
    </MarkerLabel>
  </GMapMarker> 
  <GMapCircle :options="circleOptions"/>
</GMap> 
</v-col>
<v-col
                           cols="12"
                              sm="6"
                              md="3">
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
                               md="6">
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
                              md="6">
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
                        md="6"
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
                        md="6"
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
                       </v-col>
                        </v-row>

</v-container>
</template>
<script>
export default {
    data() {
  return {
       departement: '',
          texte:'',
          secteur : 1,
          donnee:{ district: 0,    secteur:-1,   niveau:0,     commune: 0,     zone:0, section_communale_id:0},
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
          
    currentLocation: {},
    circleOptions: {
      // ...
    },
    locations: [{"id":"271","nom":"COLLEGE BAPTISTE DE FERRIER","adresse":"Rue Musset","lng":-71.77804,"lat":19.61612},{"id":"278","nom":"ECOLE ETOILE DU SAVOIR DE FERRIER","adresse":"Rue Cimetiere","lng":-71.757,"lat":19.6389},{"id":"291","nom":"ECOLE NATIONALE DE FERRIER","adresse":"Marie-Therese","lng":-71.786,"lat":19.6177},{"id":"296","nom":"COLLEGE MIXTE CHOEUR DES ANGES DE FERRIER","adresse":"Marie Therese","lng":-71.7881,"lat":19.6166},{"id":"297","nom":"COLLEGE LE FLAMBEAU DE FERRIER","adresse":"Marie Therese (Terre Blanche)","lng":-71.7852,"lat":19.6164},{"id":"298","nom":"COLLEGE LA NOUVEAUTE DE FERRIER","adresse":"32, Rue Marie Therese","lng":-71.7845,"lat":19.615971},{"id":"300","nom":"ECOLE PRESBYTERALE SAINT CHARLES BORROMEE DE FERRIER","adresse":"Rue Cimetiere","lng":-71.7795,"lat":19.6146},{"id":"301","nom":"ECOLE RENOVATION KINDERGARTEN DE FERRIER","adresse":"Rue Saint Charles, Ferrier","lng":-71.7786,"lat":19.6157},{"id":"302","nom":"COLLEGE BERACA DE FERRIER","adresse":"Marie-Therese","lng":-71.7826,"lat":19.616},{"id":"333","nom":"INSTITUTION CHRETIENNE MIXTE DE FERRIER","adresse":"Pont Ferrier","lng":-71.7742,"lat":19.616},{"id":"338","nom":"LYCEE ERIC LAMORTHE DE FERRIER","adresse":"Casimir","lng":-71.7825,"lat":19.611},{"id":"906","nom":"COLLEGE ETZER VILAIRE DE FERRIER","adresse":"Boulevard Reine Marie Louise","lng":-71,"lat":19},{"id":"921","nom":"TEST ECOLE","adresse":"yyyy","lng":-55,"lat":44},{"id":"923","nom":"TEST OPTION","adresse":"jj","lng":-76,"lat":77},{"id":"926","nom":"BB PP","adresse":"nn","lng":-90,"lat":88},{"id":"935","nom":"TEDT","adresse":"ll","lng":-72.3074326,"lat":18.594395}],
   pins: {
    //   selected: "../static/v.png",
    //  notSelected: "../static/favicon.ico"
    },
    mapStyle: [
        {
          featureType: "all",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#ffffff"
            }
          ]
        },
        {
          featureType: "all",
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "on"
            },
            {
              color: "#3e606f"
            },
            {
              weight: 2
            },
            {
              gamma: 0.84
            }
          ]
        },
        {
          featureType: "all",
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "administrative",
          elementType: "geometry",
          stylers: [
            {
              weight: 0.6
            },
            {
              color: "#313536"
            }
          ]
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [
            {
              color: "#44a688"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#13876c"
            }
          ]
        },
        {
          featureType: "poi.attraction",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#f5e4e4"
            },
            {
              visibility: "off"
            }
          ]
        },
        {
          featureType: "poi.attraction",
          elementType: "labels",
          stylers: [
            {
              visibility: "on"
            },
            {
              lightness: "14"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [
            {
              color: "#13876c"
            },
            {
              visibility: "simplified"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              color: "#067372"
            },
            {
              lightness: "-20"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [
            {
              color: "#357374"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#004757"
            }
          ]
        }
      ],
    clusterStyle: [
      {
        url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",
        width: 56,
        height: 56,
        textColor: "#fff"
      }
    ]
  }
},
mounted(){
   this.get_dept()
},

methods: {
     async get_dept(){
              this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
            await this.$axios.get( 'departement').then( response => {
                  this.departements = response.data;
                    this.departements.push({text:'Tous', value: 0})
                  })
                  this.visible = false
          },
           async get_ecole(){
           // alert(this.donnee.niveau)
              this.visible = true
             this.$axios.defaults.headers.common.Authorization = 'Bearer ' + localStorage.getItem('authToken')
               const data = this.donnee.district+'|'+this.donnee.commune+'|'+this.donnee.zone+'|'+this.donnee.section_communale_id+'|'+this.donnee.secteur+'|'+this.donnee.niveau
                await this.$axios.get( 'get-localisationecole/'+ data).then( response => {
                        this.locations = response.data;
                        console.log(response.data)
                       
                  })
                this.visible = false
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
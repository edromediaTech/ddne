<template>
    <div class="body" >
<div class="card-body " >
  <div class="header" >
      <div>
        <center><img src='images/amoirie.jpg' width="80" class="imag"></center>
    </div>
      <div  class="entete"><h4>MINISTERE DE L'EDUCATION NATIONALE ET DE LA FORMATION PROFESSIONNELLE</h4>
         <center> <h4>Direction Départementale d'Education du Nord'Est</h4></center>
      </div>      
      
    </div>   
    <center ><h5 class="ecole">{{texte}}</h5></center>
    <h5 class="ecole">{{infoEcole}}</h5>
    <br>
   <v-simple-table >
                <thead>
                  <tr>
                     <th >ID</th>
                    <th >Nom </th>                     
                    <th > Prénom</th>                     
                    <th >Date Naissance</th> 
                    <th >Lieu de Naissance</th> 
                    <th >Sexe</th> 
                    <th >Nom de la mère</th> 
                    <th >Tel</th> 
                    <th v-if="classe>12" scope="col">Année 9e</th>
                     <th v-if="classe>12" scope="col">No ordre 9e</th>                    
                    <th >Moyenne</th>
                    <th >Mention</th>                    
                </tr>
               </thead>
                <tbody>                                   
                  <tr v-for="eleve in eleves" :key="eleve.id"  style="page-break-inside: avoid">
                    <td  >{{eleve.eleve_id}} </td>
                    <td  >{{eleve.nom}}</td>
                    <td  > {{eleve.prenom}}</td>                  
                     <td >{{eleve.datenais | moment(" Do-MM-YYYY")}}</td>
                     <td >{{eleve.lieunais}}</td>
                    <td v-if="eleve.sexe">M</td>
                    <td v-else>F</td>
                     <td >{{eleve.prenom_mere}}</td>
                     <td >{{eleve.tel_persrep}}</td>                  
                   <td v-if="classe > 12" >{{eleve.annee}}</td>   
                   <td v-if="classe > 12 && eleve.nordre ==='00000000'" ></td> 
                    <td v-else-if="classe > 12 ">{{eleve.nordre}}</td>      
                    <td v-if="eleve.moyenne === 0" ></td>
                    <td v-else>{{eleve.moyenne}}</td> 
                  <td v-if="eleve.mention ==='Select mention'" ></td>
                   <td v-else>{{eleve.mention}}</td>
                            
                  </tr>                                                                                       
                </tbody>
              </v-simple-table>
          </div>
      </div>  
</template>
<script>
export default {
    props : {eleves: { type: Array, default: () => []} , classe: { type: Number, default: null}, 
    texte:{ type:String, default: ''}, infoEcole:{ type:String, default: ''} },
      data (){
          return{
            // classe: null,
             n:0,
              decision:{'classeleve_id':0,'mention':'Select mention','moyenne':'0.00'},
            opts:['Admis', 'A refaire', 'Abandon', 'Admis ailleurs', 'A refaire ailleurs' ],
        }
      },
      methods : {
          check_n (){
              if(this.n % 14 === 0){                  
                  return true
              }
              else 
              {
                  this.n++
                  return false
              }
          }
      } 
}
</script>
<style scoped>
table{
  border-collapse: collapse; 
  width: 100%;
  margin-top: 20px;
 
  }
  th,td{
     border:1px solid #ddd;
     padding: 8px;
   }
   .entete{
       text-align: center;  
       border-bottom: 1px solid gray;
        margin-top: 5px;
   }
   .imag{
       margin-bottom: 0%;
   }
   .body{
       margin: 30px;
   }
   .ecole{
       margin-top: 20px ;
   }
  
  
</style>
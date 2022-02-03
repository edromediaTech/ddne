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
    <!-- <center ><h5 class="ecole">{{texte}}</h5></center> -->
   <v-simple-table >
                <thead>
                  <tr>
                    <th>ID Enseignant</th>
                    <th>Nom</th>                                  
                    <th>Prénom</th>                             
                    <th>Tel</th>  
                    <th>Sexe</th>  
                     <th>Nif</th>                  
                                         
                </tr>
               </thead>
                <tbody>                                   
                  <tr v-for="lf in enseignants" :key="lf.id"  style="page-break-inside: avoid">
                    <td>{{lf.id}}</td>                                                        
                    <td>{{lf.nom}}</td>               
                    <td>{{lf.prenom}}</td>                                         
                    <td>{{lf.telephone}}</td>                                         
                    <td v-if="lf.sexe">M</td>
                    <td v-else>F</td>                                       
                    <td>{{lf.nif}}</td>                                         
                  </tr>                                                                                       
                </tbody>
              </v-simple-table>
          </div>
      </div>  
</template>
<script>
export default {
    props : {enseignants: { type: Array, default: () => []} , texte:{ type:String, default: ''}},
      data (){
          return{
          n:0,
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
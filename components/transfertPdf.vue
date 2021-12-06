<template>
<div class="contenu">
    <page v-for="tr in transferts"  :key="tr.id" class="body">

  <div class="header" >
      <div>
        <center><img src='images/amoirie.jpg' width="80" class="imag"></center>
     </div>
      <div  class="entete"><h4>MINISTERE DE L'EDUCATION NATIONALE ET DE LA FORMATION PROFESSIONNELLE</h4>
         <h4>Direction Départementale d'Education du Nord'Est</h4>
      </div>      
      
    </div>
    <center ><h5 class="ecole">{{trtexte}}</h5></center>
            
            <section >
                <p class="code">Ref: {{tr.id}}</p>
                    
            <p class="date">{{tr.sectioncom}}, Le {{tr.created_at |  moment(" Do MMMM YYYY") }}</p>

            <p class="page">La Direction {{article(tr.ecole)}} certifie et atteste que {{tr.nom}} {{tr.prenom}}, 
             élève de {{tr.nomclasse}} pour l'année académique {{anac}} identifié au No {{tr.eleve_id}} 
             est habilité à laisser l'établissement 
            étant donné qu'aucune charge n'est retenue contre lui.</p>
 
        <p>En foi de quoi le présent certificat lui est délivré pour servir et valoir ce que de droit.</p>
                            
                 <p class="direction">Pour la direction: </p>
                  <div class="directeur" > <p class="nom" >   {{tr.prenomd}} {{tr.nomd}} </p>
          <p class="fonction" >  {{tr.sexe ? 'Directeur ' : 'Directrice '}} </p></div>
            </section>
          
       <footer>Design by SUPED-DDENE</footer>
       <div v-if="check_n < transferts.length" page-break-after: always;></div>
      </page>  
</div>
</template>
<script>
export default {
    props : {transferts: { type: Array, default: () => []} , trtexte:{ type:String, default: ''}},
      data (){
          return{
          n:0,
          anac:''
        }
      },
      mounted (){
          this.anac = localStorage.anac
      },
      methods : {

             check_n (){
            return this.n++
          },
         article (ecole) {       
            const voyel = ['a','e','i','o','u','y']
            const st = ecole.trim()
            const first = st.substring(0,1).toLowerCase()
            if(!voyel.includes(first))
                return(' du '+ecole)
            else
                return (' de l\''+ecole)
            }
      } 
}
</script>
<style scoped>
.contenu{
    margin: 40px 20px 5px 60px;
}
.code{
    font-weight: bold;
    font-size: 16px;
    text-align: left;
    margin-bottom: 20px;
    margin-top: 20px;
}

p{
    font-size: 14px;
    font-family: 'Times New Roman', Times, serif;
     margin-top: 30px;
     text-align: justify;
    line-height: 30px;
    /* inline-size: 60px; */
   

}

footer {
    border-top: 1px solid black;
    clear: both;
    position: relative;
    height: 200px;
    margin-top: 300px;
    text-align: right;
     font-size: 10px;
}
.date{
    text-align: right;
    margin-top: 40px;
}
.direction{
    text-align: left;
    margin-top: 50px;
}
.nom{
     border-top: 1px solid black;
     width: 150px;
    text-align: right;
    margin-top: 50px;
    font-weight: bold;
    margin: 0px;
    padding: 0;
}
.directeur{
    float: right;
    margin:0px;  
    padding: 0px;
}
.fonction{
    text-align: right;
    margin-top: 0px;
   }
  .header{
       text-align: center;  
       border-bottom: 1px solid gray;
        margin-top: 5px;       
   }

   .imag{
       margin-bottom: 0%;
   }
  
   .ecole{
       margin-top: 20px ;
   }

  
  
</style>
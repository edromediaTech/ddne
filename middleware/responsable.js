// import notifier from "~/plugins/notifier"
export  default function responsable({redirect, res, req,next}){
    const userl = localStorage.getItem('userl')
    if (!localStorage.getItem('authToken')) {
      alert('Vous devez vous connecter')        
        next({ name: 'login' })
    } else if (parseInt(userl) < 2) {
      alert('Vous devez êtes responsable d\'ecole')             
             next({ name: 'index' })
                } else {
            // next()
    }
}
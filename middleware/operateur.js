// import notifier from "~/plugins/notifier"
export  default function operateur({redirect, res, req,next}){
    const userl = localStorage.getItem('userl')
    if (!localStorage.getItem('authToken')) {
      alert('Vous devez vous connecter')        
        next({ name: 'login' })
    } else if (parseInt(userl) < 1) {
      alert('Vous devez êtes Operateur')             
             next({ name: 'index' })
                } else {
            // next()
    }
}
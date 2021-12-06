// import notifier from "~/plugins/notifier"
export  default function inspecteur({redirect, res, req,next}){
    const userl = localStorage.getItem('userl')
    if (!localStorage.getItem('authToken')) {
      alert('Vous devez vous connecter')        
        next({ name: 'login' })
    } else if (parseInt(userl) < 3) {
      alert('Vous devez êtes inspecteur')             
             next({ name: 'index' })
                } else {
            // next()
    }
}
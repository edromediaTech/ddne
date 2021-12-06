
export  default function admin({redirect, res, req,next}){
    const userl = localStorage.getItem('userl')
    if (!localStorage.getItem('authToken')) {
        alert('Vous devez vous connecter')        
        next({ name: 'login' })
    } else if (parseInt(userl) < 6) {
        alert('Vous devez êtes admin')
            
             next({ name: 'index' })
                } else {
            // next()
    }
}
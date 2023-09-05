import { http } from "../../http";

export function loadBg(id:number){
    
    http.post('auth/changeAvatar')
      .then(async resp => {
        
        
      })
      .catch(bad => {
        console.log("Bad request", bad);
      })
}
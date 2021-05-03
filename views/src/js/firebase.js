const dbRefPairing = firebase.database().ref().child("pairing");
const modo = window.localStorage.getItem("modo");
const mapa = window.localStorage.getItem("mapa");
const dataUser = jQuery.parseJSON(window.localStorage.getItem("user"));
var userList = [];
var userKeys = [];
var enemy = null ;
var myPlayer = null;
var vsPlayer = null;


if(dataUser != null){
    
    var addUserParing = dbRefPairing.push();
    addUserParing.set({
    mapa: mapa,
    emparejado: false,
    finalizado: false,
    vs: 0,
    id: dataUser.id,
    nombre: dataUser.userName,
    position : {x:0 , y:0, z:0},
    rotation : {x:0 , y:0, z:0},
    HP: 4,
    escudo:{
        enable: false,
        time : 0
         }
        
       
    });
}
  
  


    dbRefPairing.on("child_added",(snap)=>{
        var player = snap.val();
        var key = snap.key;
       
        
       if(player.emparejado == false){
        userList.push(player);
        userKeys.push(key);
       }

     if(userList.length > 1){

        for(var i = 0; i< userList.length; i++ ){
            for(var j = 0; j < userList.length; j++){
                if(userList[i].emparejado == false && userList[j].emparejado == false && userList[i].id != userList[j].id && userList[i].id == dataUser.id){
                    myPlayer = i;
                    vsPlayer= j;
                    userList[myPlayer].emparejado = true;
                    const dbRefPlayers =  firebase.database().ref().child(`pairing/${ userKeys[myPlayer] }`);
                    
                    dbRefPlayers.update({
                         emparejado: true,
                         vs : userList[vsPlayer].id,
                    });
                    const dbRefPlayers2 =  firebase.database().ref().child(`pairing/${ userKeys[vsPlayer] }`);
                    
                    dbRefPlayers2.update({
                         emparejado: true,
                         vs : userList[myPlayer].id,
                         
                    });
                }
            }
       }
        
     }
        
    
    });


    dbRefPairing.on("child_changed",(snap)=>{
        
        var player = snap.val();
        var keyvs = snap.key
       
      
      
        
  
           if(keyvs == userKeys[vsPlayer]  && player.emparejado == true && player.finalizado == false){
                //Actualizacion de datos del enemigo
               enemy = player;
              
         }
            
       
      
      
      
        
    });





//funcion para actualizar los datos del jugador y subirlos a firebase


function updatePlayer(position,rotation,HP,escudo){
    
    const dbRefPlayer =  firebase.database().ref().child(`pairing/${ userKeys[myPlayer] }`);
		dbRefPlayer.update({
           position,
           rotation,
           HP,
           escudo
       })
}







    //Codigo cuando los dos jugadores terminen la partida 
    
    function ganeEnd(){
    
        const dbRefPlayers =  firebase.database().ref().child(`pairing/${ userKeys[myPlayer] }`);
              
                
        dbRefPlayers.update({
             finalizado: true,
        });
        const dbRefPlayers2 =  firebase.database().ref().child(`pairing/${ userKeys[vsPlayer] }`);
        
        dbRefPlayers2.update({
             finalizado: true,
             
        });
    
    
        }
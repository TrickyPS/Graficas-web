const dbRefPvP = firebase.database().ref().child("PvP");

var data =  {
    mapa: "Desierto",
        Usuario1: {
            id : 4,
            posTop: 30,
            posRight: 30,
            posLeft: 30,
            posBot: 30,
            HP: 4,
            escudo:{
                enable: false,
                time : 0
            }
        },
        Usuario2: {
            id : 9,
            posTop: 30,
            posRight: 30,
            posLeft: 30,
            posBot: 30,
            HP: 4,
            escudo:{
                enable: false,
                time : 0
            }
        }
    }


dbRefPvP.push(
   {data}
)

dbRefPvp.on('value',function(snap){
    console.log(snap.val())
});


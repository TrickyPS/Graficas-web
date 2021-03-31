const dbRefObject = firebase.database().ref();


dbRefObject.on('value',function(snap){
    console.log(snap.val())
});


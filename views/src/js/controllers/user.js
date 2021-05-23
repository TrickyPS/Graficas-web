class User {
    constructor(id, userName, email, password, totalPoints) {
        this.id = id;
	    this.userName = userName;
	    this.email = email;
        this.password = password;
        this.totalPoints = totalPoints;
    }

    addUser() {
        var dataToSend = {
            action: "addUser",
            userName: this.userName,
            email: this.email,
            password: this.password
        };
        
        $.ajax({
            url: "../controllers/user.php",
            async: true,
            type: 'POST',
            data: dataToSend,
            dataType: 'json',
            success: function(data) {
                
                var user = {
                    "id" : data.id,
                    "userName" : data.userName,
                    "email" : data.email,
                    "totalPoints" : data.totalPoints
                }
               
                window.localStorage.setItem('user', JSON.stringify(user));
                
            },
            error: function(x, y, z) {
                alert("Error en webservice: " + x.statusText + x.responseText + y + z);
            }
        });
    }

    getUserByEmail() {
        var dataToSend = {
            action: "getUserByEmail",
            email: this.email
          };
      
        $.ajax({
            url: "../controllers/user.php",
            async: true,
            type: 'POST',
            data: dataToSend,
            dataType: 'json',
            success: function(data) {
                
                var user = {
                    "id" : data.id,
                    "userName" : data.userName,
                    "email" : data.email,
                    "totalPoints" : data.totalPoints
                }

                if(window.localStorage.getItem('user') == null) {
                    window.localStorage.setItem('user', JSON.stringify(user));
                } else {
                    var usP1 = JSON.parse(window.localStorage.getItem('user'));
                    if(data.id != usP1.id) {
                        window.localStorage.setItem('user2', JSON.stringify(user));
                    }
                }
            },
            error: function(x, y, z) {
               
              alert("Error en webservice: " + x + y + z);
            }
        });
    }

    updateUserLocalStorage(indexStorage) {
        var dataToSend = {
            action: "updateUserLocalStorage",
            id: this.id
          };
      
        $.ajax({
            url: "../controllers/user.php",
            async: true,
            type: 'POST',
            data: dataToSend,
            dataType: 'json',
            success: function(data) {
                
                var user = {
                    "id" : data.id,
                    "userName" : data.userName,
                    "email" : data.email,
                    "totalPoints" : data.totalPoints
                }

                if(user) {
                    window.localStorage.removeItem(indexStorage);
                    window.localStorage.setItem(indexStorage, JSON.stringify(user));
                }
            },
            error: function(x, y, z) {
               
              alert("Error en webservice: " + x + y + z);
            }
        });
    }

    updateTotalPoints() {
        var dataToSend = {
            action: "updateTotalPoints",
            id: this.id,
            points: this.totalPoints
        }
        
        $.ajax({
            url: "../controllers/user.php",
            async: true,
            type: 'POST',
            data: dataToSend,
            dataType: 'json',
            success: function(data) {
                console.log(data);
            },
            error: function(x, y, z) {
                alert("Error en webservice: " + x.statusText + x.responseText + y + z);
            }
        });

    }
}
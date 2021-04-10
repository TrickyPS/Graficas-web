class User {
    constructor(id, userName, email, password) {
        this.id = id;
	    this.userName = userName;
	    this.email = email;
        this.password = password;
    }

    addUser() {
        var dataToSend = {
            action: "addUser",
            userName: this.userName,
            email: this.email,
            password: this.password
        };

        $.ajax({
            url: "http://localhost/projects/Graficas-web/controllers/user.php",
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
                alert("Error en webservice: " + x + y + z);
            }
        });
    }

    getUserByEmail() {
        var dataToSend = {
            action: "getUserByEmail",
            email: this.email
          };
      
        $.ajax({
            url: "http://localhost/projects/Graficas-web/controllers/user.php",
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
              alert("Error en webservice: " + x + y + z);
            }
        });
    }
}
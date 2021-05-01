function addUser(){
    let user = document.getElementById("User").value;
    let password = document.getElementById("Password").value;

    console.log(user);

    if(user.length==0){
        window.alert("Campul user nu poate fi gol!");
    }
    else if(password.length==0){
        window.alert("Campul parola nu poate fi gol!");
    }
    else{
        var newUser={
            name: user,
            pass: password
        }
        console.log(newUser);

        let OK=1;
        fetch('http:/localhost:3000/admins', {
            method: 'get'
        }).then((response) =>{
            response.json().then((users) => {
    
                users.forEach(search);
                
                function search(item){
                    if(item.name==newUser.name&&OK!=0){
                        window.alert("Username deja existent!");
                        OK=0;
                    }
                }

                if(OK==1){    
                    fetch("http:/localhost:3000/admins", {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newUser)
                    }).then(function(response){
                        console.log(response);
                        window.alert("User creat cu succes!");
                    })
                }
            })
        })

    }
}

function tryLogin(){
    let user = document.getElementById("User").value;
    let password = document.getElementById("Password").value;
    fetch('http:/localhost:3000/admins', {
        method: 'get'
    }).then((response) =>{
        response.json().then((users) => {

            let OK=0;

            users.forEach(search);
            
            function search(item){
                if(item.name==user&&OK==0){
                    OK=1;

                    if(item.pass!=password){
                    window.alert("Parola incorecta!");
                    }
                    else{
                        logUser(item.name);
                    }
                }
            }
            
            if(OK==0)
            window.alert("User inexistent!");
        })
    })

}
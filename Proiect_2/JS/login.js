var body = document.getElementsByTagName("body")[0];
window.onload = function pageLoad(){
    let logTab = document.createElement("div");
    logTab.classList.add("logTab");
    logTab.id = "logTab";
    
    body.appendChild(logTab);
    }
    
    fetch('http:/localhost:3000/logged', {
        method: 'get'
    }).then((response)=> {
        response.json().then((logged)=>{

            let logTab = document.getElementById("logTab");

            if(logged.state==0){
            logTab.style.left="65.5%";

            let br = document.createElement("br");

            let userLabel= document.createElement("label");
            userLabel.setAttribute("for", "userInput");
            userLabel.innerText="User: ";

            let passwordLabel= document.createElement("label");
            passwordLabel.setAttribute("for", "passwordInput");
            passwordLabel.innerText="Parola: ";
            passwordLabel.style.marginLeft="2%";
            
            let userInput= document.createElement("input");
            userInput.setAttribute("type","text");
            userInput.id="User";

            let passwordInput= document.createElement("input");
            passwordInput.setAttribute("type","password");
            passwordInput.id="Password";

            let addButton= document.createElement("button");
            addButton.classList.add("button");
            addButton.classList.add("add");
            addButton.innerText="Creare";
            addButton.setAttribute("onClick","addUser()");


            let loginButton= document.createElement("button");
            loginButton.classList.add("button");
            loginButton.classList.add("login");
            loginButton.innerText="Logare";
            loginButton.setAttribute("onClick","tryLogin()");

            logTab.appendChild(userLabel);
            logTab.appendChild(userInput);
            logTab.appendChild(passwordLabel);
            logTab.appendChild(passwordInput);
            logTab.appendChild(addButton);
            logTab.appendChild(loginButton);

            document.addEventListener('keypress', function(e){
                console.log(e.key);

                if(e.key === 'Enter'){
                    tryLogin();
                    }
            })
            
            }

            else{
            logTab.style.left="78%";
            logTab.style.width = "15%";
            logTab.style.padding = "1%";
            logTab.style.justifyContent = "space-between";

            let welcomeText = document.createElement("p");
            welcomeText.innerText="Welcome, " + logged.name+ "!";
            welcomeText.style.margin = "0";

            let logoutButton = document.createElement("img");
            logoutButton.setAttribute("src","Images/logout.png");
            logoutButton.setAttribute("onClick","logOut()");
            logoutButton.classList.add("logoutButton");

            logTab.appendChild(welcomeText);
            logTab.appendChild(logoutButton);

            let insertMenu = document.createElement("div");
            insertMenu.classList.add("insertMenu");

            let nameLabel= document.createElement("label");
            nameLabel.setAttribute("for", "nameInput");
            nameLabel.innerText="Nume: ";

            let imgLabel= document.createElement("label");
            imgLabel.setAttribute("for", "imgInput");
            imgLabel.innerText="Link imagine: ";

            let priceLabel= document.createElement("label");
            priceLabel.setAttribute("for", "priceInput");
            priceLabel.innerText="Pret: ";
            
            let yearLabel= document.createElement("label");
            yearLabel.setAttribute("for", "yearInput");
            yearLabel.innerText="An de fabricatie: ";
            
            let kmLabel= document.createElement("label");
            kmLabel.setAttribute("for", "kmInput");
            kmLabel.innerText="Kilometri: ";
            
            let nameInput= document.createElement("input");
            nameInput.setAttribute("type","text");
            nameInput.id="nameInput";
            nameInput.style.width="100%";

            let imgInput= document.createElement("input");
            imgInput.setAttribute("type","text");
            imgInput.id="imgInput";
            imgInput.style.width="100%";

            let priceInput= document.createElement("input");
            priceInput.setAttribute("type","text");
            priceInput.id="priceInput";
            priceInput.style.width="100%";

            let yearInput= document.createElement("input");
            yearInput.setAttribute("type","text");
            yearInput.id="yearInput";
            yearInput.style.width="100%";

            let kmInput= document.createElement("input");
            kmInput.setAttribute("type","text");
            kmInput.id="kmInput";
            kmInput.style.width="100%";

            let addButton= document.createElement("button");
            addButton.classList.add("button");
            addButton.classList.add("add");
            addButton.innerText="Inserare";
            addButton.setAttribute("onClick","addCar()");

            insertMenu.appendChild(nameLabel);
            insertMenu.appendChild(nameInput);
            insertMenu.appendChild(imgLabel);
            insertMenu.appendChild(imgInput);
            insertMenu.appendChild(priceLabel);
            insertMenu.appendChild(priceInput);
            insertMenu.appendChild(yearLabel);
            insertMenu.appendChild(yearInput);
            insertMenu.appendChild(kmLabel);
            insertMenu.appendChild(kmInput);
            insertMenu.appendChild(addButton);

            body.append(insertMenu);
            }
        })
    
    })


    function logUser(item){
        var loggedState = {
            state: 1,
            name : item
        }
        fetch('http:/localhost:3000/logged', {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(loggedState)
        }).then(function(response) {
            window.location.reload();
        })
    }

    function logOut(){
        var loggedState = {
            state: 0,
            name: "None"
        }
        fetch('http:/localhost:3000/logged', {
            method: 'put',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(loggedState)
        }).then(function(response) {
            window.location.reload();
        })
    }

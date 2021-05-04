// json-server --watch cars.json
// keyboard listener event pe login 59
// click listener event pe butoanele de delete si edit din car 54 -> 73
// .onclick pe login 48


var body = document.getElementsByTagName("body")[0];

let deleted = document.getElementById("deleted");
deleted.classList.remove("title");
deleted.removeAttribute("onclick");
deleted.parentNode.removeChild(deleted);


fetch('http:/localhost:3000/cars', {
    method: 'get'
}).then((response) => {
    response.json().then((cars)=>{

        let Container = document.getElementById("carContainer");
        
        for(let i=0 ; i < cars.length ; i++){
            
                let carId=cars[i].id;
                console.log(carId);

                let carDiv = document.createElement("div");
                carDiv.classList.add("car");
                Container.appendChild(carDiv);

                let carIcon = document.createElement("div");
                carIcon.classList.add("car-icon");
                carIcon.style.backgroundImage="url("+cars[i].img+")";
                carDiv.appendChild(carIcon);

                let carTitle = document.createElement("p");
                carTitle.classList.add("car-title");
                carTitle.innerText=cars[i].name;
                carDiv.appendChild(carTitle);

                let carPrice = document.createElement("p");
                carPrice.classList.add("car-content");
                carPrice.innerText="Preț: " + cars[i].price + "€";
                carDiv.appendChild(carPrice);

                let carYear = document.createElement("p");
                carYear.classList.add("car-content");
                carYear.innerText="An de fabricație: " + cars[i].year;
                carDiv.appendChild(carYear);

                let carOdometer = document.createElement("p");
                carOdometer.classList.add("car-content");
                carOdometer.classList.add("bott");
                carOdometer.innerText="Kilometraj: " + cars[i].odometer+"km";
                carDiv.appendChild(carOdometer);

                 fetch('http:/localhost:3000/logged', {
                    method: 'get'
                 }).then((response)=> {
                    response.json().then((logged)=>{

                         if(logged.state==1){
                            let deleteButton = document.createElement("img");

                            deleteButton.setAttribute("src","Images/delete.png");


                            //deleteButton.setAttribute("onClick","deleteCar("+ carId +")");
                            deleteButton.addEventListener("click", function(){deleteCar(carId)});

                            deleteButton.classList.add("deleteButton");
                            carDiv.appendChild(deleteButton);

                            let editButton = document.createElement("img");

                            editButton.setAttribute("src", "Images/edit.png");

                            //editButton.setAttribute("onclick","editCar("+ carId + ")");
                            editButton.addEventListener("click", function(){editCar(carId)});

                            editButton.classList.add("editButton");

                            carDiv.appendChild(editButton);
                         }

                      })
                    
                 })

        }
    })
})

function deleteCar(carId){
    fetch('http://localhost:3000/cars/' + carId, {
        method: 'delete',
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        window.location.reload();
    })

}

function editCar(carId){
    let nameA = document.getElementById("nameInput").value;
    let priceA = document.getElementById("priceInput").value;
    let yearA = document.getElementById("yearInput").value;
    let kmA = document.getElementById("kmInput").value;
    let imgA = document.getElementById("imgInput").value;

    let newCar = {
        name: nameA,
        price: priceA,
        year: yearA,
        odometer: kmA,
        img: imgA
    }

    fetch('http://localhost:3000/cars/' + carId, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
    }).then(function(response) {
        window.location.reload();
    })

}

function addCar(){

    let nameA = document.getElementById("nameInput").value;
    let priceA = document.getElementById("priceInput").value;
    let yearA = document.getElementById("yearInput").value;
    let kmA = document.getElementById("kmInput").value;
    let imgA = document.getElementById("imgInput").value;

    let newCar = {
        name: nameA,
        price: priceA,
        year: yearA,
        odometer: kmA,
        img: imgA
    }

    fetch('http://localhost:3000/cars', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
    }).then(function(response) {
       window.location.reload();
    })

    console.log(newCar);
}
var express = require('express');
var router = express.Router();

let dbService = require("../service/dbService");
let dbRepository = require("../repository/dbRepository");

router.get("/cars", (req, res) => {

    let carsList = dbService.getAllCars();
    if (carsList!= undefined && carsList.length !=0){
        res.status(200).send(carsList);
    }
    else {
        res.status(404).send("No dogs found!");
    }
});


router.get("/admins", (req, res) => {

    let adminList = dbService.getAllAdmins();
    if (adminList!= undefined && adminList.length !=0){
        res.status(200).send(adminList);
    }
    else {
        res.status(404).send("No admins found!");
    }
});


router.get("/logged", (req, res) => {

    let logged = dbService.getLogged();
    res.status(200).send(logged);
});


router.post("/admins", (req,res) => {

    let newAdmin = dbService.addAdmin(req.body);
    res.status(200).send(newAdmin);

})

router.post("/cars", (req,res) => {
    console.log(req);
    let newCar = dbService.addCar(req.body);
    res.status(200).send(newCar);
});


router.get("/cars/:id", (req,res) => {
    let carsList = dbService.getAllCars();
    let id = req.params.id;
    let checkExists = false;

    carsList.forEach(car => {
       console.log(car.id);
        if(car.id == id){
            checkExists = true;
            res.status(200).send(car);
        }
    })

    if(checkExists === false) {
        res.status(404).send("No car found!");
    }
});

router.get("/admins/:id", (req,res) => {
    let adminsList = dbService.getAllAdmins();
    let id = req.params.id;
    let checkExists = false;

    adminsList.forEach(admin => {
       console.log(admin.id);
        if(admin.id == id){
            checkExists = true;
            res.status(200).send(admin);
        }
    })

    if(checkExists === false) {
        res.status(404).send("No car found!");
    }
})

router.put("/cars/:id", (req,res) => {

    const carsList = dbService.getAllCars();
    let id = req.params.id;
    let checkExists = false;

    for(let i=0; i<carsList.length; i++){
        if(carsList[i].id==id) {
            if(req.body.name){
                carsList[i].name = req.body.name;
            }

            if(req.body.img){
                carsList[i].img = req.body.img;
            }

            if(req.body.price){
                carsList[i].price = req.body.price;
            }

            if(req.body.odometer){
                carsList[i].odometer = req.body.odometer;
            }

            if(req.body.year){
                carsList[i].year = req.body.year;
            }

            checkExists = true;
            break;
        }
    }

    if(checkExists === true) {
        dbRepository.writeJSONFileCars(carsList);
        res.status(200).send("Car successfully updated!");
    }
    else {
        res.status(404).send("No car found!");
    }
})

router.put("/logged", (req,res) => {
    let logStatus = dbService.changeLogged(req.body);
    res.status(200).send(logStatus);

})

router.delete("/cars/:id", (req, res) => {
    const carsList = dbService.getAllCars();
    let id = req.params.id;
    let checkExists = false;
    for(let i = 0; i < carsList.length; i++) {
        if(carsList[i].id == id) {
            checkExists = true;
            //sterg cinele de pe pozitia i
            // splice sterge de la indexul i atatea elemente cate indica al doilea argument
            carsList.splice(i, 1);
            break;
        }
    }
  
    if(checkExists === true) {
        dbRepository.writeJSONFileCars(carsList);
        res.status(200).send("Car deleted!");
    } else {
        res.status(404).send("Car not found!");
    }
  });


module.exports = router;
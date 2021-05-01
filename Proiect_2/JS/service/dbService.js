const uuid = require("uuid");

let dbRepository = require("../repository/dbRepository");

module.exports.getAllCars = () => {
    const carsList = dbRepository.readJSONFileCars();
    return carsList;
}

module.exports.getAllAdmins = () => {
    const adminList = dbRepository.readJSONFileAdmins();
    return adminList;
}

module.exports.getLogged = () => {
    const Logged = dbRepository.readJSONFileLogged();
    return Logged;
}

module.exports.addCar = (newCar) => {
    const carsList = dbRepository.readJSONFileCars();

    newCar.id = uuid.v4.apply();

    carsList.push(newCar);

    dbRepository.writeJSONFileCars(carsList);

    return newCar;
}

module.exports.addAdmin = (newAdmin) => {
    const adminList = dbRepository.readJSONFileAdmins();

    newAdmin.id = uuid.v4.apply();

    adminList.push(newAdmin);

    dbRepository.writeJSONFileAdmins(adminList);

    return newAdmin;
}

module.exports.changeLogged = (newLogged) => {

    dbRepository.writeJSONFileLogged(newLogged);
    return newLogged;
}
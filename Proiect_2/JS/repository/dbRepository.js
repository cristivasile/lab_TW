const fs = require("fs");

function readJSONFileCars(){
    return JSON.parse(fs.readFileSync("db.json"))["cars"];
}

module.exports.readJSONFileCars = () => {
    return JSON.parse(fs.readFileSync("db.json"))["cars"];
}

function readJSONFileAdmins(){
    return JSON.parse(fs.readFileSync("db.json"))["admins"];
}

module.exports.readJSONFileAdmins = () => {
    return JSON.parse(fs.readFileSync("db.json"))["admins"];
}

function readJSONFileLogged(){
    return JSON.parse(fs.readFileSync("db.json"))["logged"];
}

module.exports.readJSONFileLogged = () => {
    return JSON.parse(fs.readFileSync("db.json"))["logged"];
}

module.exports.writeJSONFileCars = (content) => {
    let contentA = readJSONFileAdmins();
    let contentL = readJSONFileLogged();
    fs.writeFileSync(
        "db.json",
        JSON.stringify({cars: content, admins: contentA, logged: contentL}, null, 4),
        "utf8",
        err => {
            if(err) {
                console.log(err);
            }
        }
    )
}

module.exports.writeJSONFileAdmins = (content) => {
    let contentC = readJSONFileCars();
    let contentL = readJSONFileLogged();
    fs.writeFileSync(
        "db.json",
        JSON.stringify({cars: contentC, admins: content, logged: contentL}, null, 4),
        "utf8",
        err => {
            if(err) {
                console.log(err);
            }
        }
    )
}

module.exports.writeJSONFileLogged = (content) => {
    console.log(content);
    let contentA = readJSONFileAdmins();
    let contentC = readJSONFileCars();
    fs.writeFileSync(
        "db.json",
        JSON.stringify({cars: contentC, admins: contentA, logged: content}, null, 4),
        "utf8",
        err => {
            if(err) {
                console.log(err);
            }
        }
    )
}
const Zanrovi = require("./Zanrovi.js");
const provjera = require("./provjera.js");

exports.greska501 = function(zahtjev, odgovor){
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = {greska: "metoda nije implementirana"}
    odgovor.send(JSON.stringify(poruka));
}

exports.greska405 = function(zahtjev, odgovor){
    odgovor.type("application/json")
    odgovor.status(405);
    let poruka = {greska: "metoda nije dopuštena"}
    odgovor.send(JSON.stringify(poruka));
}

exports.sviZanrovi = function(zahtjev, odgovor){
    odgovor.type("application/json")
    if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
        return;
    let zanr = new Zanrovi();
    zanr.sviZanr().then((zanrovi) => {
        console.log(zanrovi);
        odgovor.send(JSON.stringify(zanrovi));
    });
}

exports.dodajZanrove = function(zahtjev, odgovor){
    odgovor.type("application/json")
    if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
        return;
    let podaci = zahtjev.body;
    let zanr = new Zanrovi();
    zanr.dodajZanr(podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    })
}

exports.obrisiZanrove = function(zahtjev, odgovor){
    odgovor.type("application/json")
    if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
        return;
    let zanrovi = new Zanrovi();
    zanrovi.brisiZanr().then((poruka) =>{
        odgovor.send(JSON.stringify(poruka));
    })
}

exports.getZanroviID = function(zahtjev, odgovor){
    odgovor.type("application/json")
    if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
        return;
    let zanrovi = new Zanrovi();
    let id = zahtjev.params.id;
    zanrovi.ZanrID(id).then((zanr) =>{
        console.log(zanr);
        odgovor.send(JSON.stringify(zanr));
    })
}

exports.azurirajZanroveID = function(zahtjev, odgovor){
    odgovor.type("application/json")
    if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
        return;
    let id = zahtjev.params.id;
    let podaci = zahtjev.body;
    let zanrovi = new Zanrovi();
    zanrovi.azurirajZanrID(id, podaci).then((poruka) =>{
        odgovor.send(JSON.stringify(poruka));
    })
}

exports.obrisiZanroveID = function(zahtjev, odgovor){
    odgovor.type("application/json")
    if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
        return;
    let id = zahtjev.params.id;
    let podaci = zahtjev.body;
    let zanrovi = new Zanrovi();
    zanrovi.brisiZanrID(id, podaci).then((poruka) =>{
        odgovor.send(JSON.stringify(poruka));
    })
}

const Filmovi = require("./Filmovi.js");
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

exports.greska501ZaDuziUrl = function(zahtjev, odgovor){
    odgovor.type("application/json")
    let stranica = zahtjev.query.stranica;
    let brojFilmova = zahtjev.query.brojFilmova;
    let datum = zahtjev.query.datum;
    let zanr = zahtjev.query.zanr;
    let naziv = zahtjev.query.naziv;
    let sortiraj = zahtjev.query.sortiraj;

    if(!stranica || !brojFilmova || !datum || !zanr || !naziv || !sortiraj){
        odgovor.type("application/json")
        odgovor.status(417);
        let poruka = {greska: "neočekivani podaci"}
        odgovor.send(JSON.stringify(poruka));
    }
    else if(stranica != null || brojFilmova != null || datum != null || zanr != null || naziv != null || sortiraj != null){
        odgovor.type("application/json")
        odgovor.status(501);
        let poruka = {greska: "metoda nije implementirana"}
        odgovor.send(JSON.stringify(poruka));
    }
}

exports.getFilmoviDuziUrl = function(zahtjev, odgovor){

    odgovor.type("application/json")
    if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
        return;
    let filmovi = new Filmovi();
    let stranica = Number(zahtjev.query.stranica);
    let brojFilmova = Number(zahtjev.query.brojFilmova);
    let datum = zahtjev.query.datum;
    let zanr = Number(zahtjev.query.zanr);
    let naziv = zahtjev.query.naziv;
    let sortiraj = zahtjev.query.sortiraj;

    if(stranica == null || brojFilmova==null){
        odgovor.status("417");
        odgovor.send({greska: "neocekivani podaci"});
        return;
    } 

    filmovi.filmoviStranica(stranica, brojFilmova, datum, zanr, naziv, sortiraj).then((filmovi) => {
        odgovor.send(filmovi);
    }).catch((greska) => {
        odgovor.json(greska);
    });
}

exports.postFilmoviDuziUrl = function(zahtjev, odgovor){
    odgovor.type("application/json")
    if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
        return;
    let filmovi = new Filmovi();
    let stranica = zahtjev.query.stranica;
    let brojFilmova = zahtjev.query.brojFilmova;
    let datum = zahtjev.query.datum;
    let zanr = zahtjev.query.zanr;
    let naziv = zahtjev.query.naziv;
    let sortiraj = zahtjev.query.sortiraj;

    if(stranica == null || brojFilmova==null){
        odgovor.status("417");
        odgovor.send({greska: "neocekivani podaci"});
        return;
    } 

}

exports.getFilmoviID = function(zahtjev, odgovor){
    odgovor.type("application/json")
    if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
        return;
    let filmovi = new Filmovi();
    let id = zahtjev.params.id;
    filmovi.FilmoviID(id).then((film) =>{
        console.log(film);
        odgovor.send(JSON.stringify(film));
    })
}

exports.azurirajFilmoviID = function(zahtjev, odgovor){
    odgovor.type("application/json")
    if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
        return;
    let id = zahtjev.params.id;
    let podaci = zahtjev.body;
    let filmovi = new Filmovi();
    filmovi.azurirajFilmoviID(id, podaci).then((poruka) =>{
        odgovor.send(JSON.stringify(poruka));
    })
}

exports.obrisiFilmoviID = function(zahtjev, odgovor){
    odgovor.type("application/json")
    if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
        return;
    let id = zahtjev.params.id;
    let podaci = zahtjev.body;
    let filmovi = new Filmovi();
    filmovi.brisiFilmoviID(id, podaci).then((poruka) =>{
        odgovor.send(JSON.stringify(poruka));
    })
}


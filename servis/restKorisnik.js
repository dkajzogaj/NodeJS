const Korisnik = require("./Korisnik.js");
const provjera = require("./provjera.js");

exports.getKorisnici = function(zahtjev, odgovor) {
    odgovor.type("application/json")
    if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
        return;
    let kor = new Korisnik();
    kor.sviKorisnici().then((korisnici) => {
        console.log(korisnici);
        odgovor.send(JSON.stringify(korisnici));
    });
}

exports.postKorisnici = function(zahtjev, odgovor) {
    odgovor.type("application/json")
    if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
        return;
    let podaci = zahtjev.body;
    let kor = new Korisnik();
    kor.kreirajNovogKorisnika(podaci).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    })
}

exports.putKorisnici = function(zahtjev, odgovor){
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = {greska: "metoda nije implementirana"}
    odgovor.send(JSON.stringify(poruka));
}

exports.deleteKorisnici = function(zahtjev, odgovor){
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = {greska: "metoda nije implementirana"}
    odgovor.send(JSON.stringify(poruka));
}

exports.getKorisniciKorime = function(zahtjev, odgovor){
    odgovor.type("application/json")
    if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
        return;
    let kor = new Korisnik();
    let korime = zahtjev.params.korime;
    kor.odredeniKorisnik(korime).then((korisnik) =>{
        console.log(korisnik);
        odgovor.send(JSON.stringify(korisnik));
    })
}

exports.postKorisniciKorime = function(zahtjev, odgovor){
    odgovor.type("application/json")
    odgovor.status(405);
    let poruka = {greska: "metoda nije dopuštena"}
    odgovor.send(JSON.stringify(poruka));
}

exports.putKorisniciKorime = function(zahtjev, odgovor){
    odgovor.type("application/json")
    if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
        return;
    let korime = zahtjev.params.korime;
    let podaci = zahtjev.body;
    let kor = new Korisnik();
    kor.azurirajKorisnika(korime, podaci).then((poruka) =>{
        odgovor.send(JSON.stringify(poruka));
    })
}

exports.deleteKorisniciKorime = function(zahtjev, odgovor){
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = {greska: "metoda nije implementirana"}
    odgovor.send(JSON.stringify(poruka));
}

exports.getKorisniciAktivacija = function(zahtjev, odgovor){
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = {greska: "metoda nije implementirana"}
    odgovor.send(JSON.stringify(poruka));
}

exports.postKorisniciAktivacija = function(zahtjev, odgovor){
    odgovor.type("application/json")
    odgovor.status(405);
    let poruka = {greska: "metoda nije dopuštena"}
    odgovor.send(JSON.stringify(poruka));
}

exports.putKorisniciAktivacija = function(zahtjev, odgovor){
    odgovor.type("application/json")
    if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
        return;
    let kor = new Korisnik();
    let korime = zahtjev.params.korime;
    kor.aktivirajKorisnika(korime).then((poruka) => {
        odgovor.send(JSON.stringify(poruka));
    });
}

exports.deleteKorisniciAktivacija = function(zahtjev, odgovor){
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = {greska: "metoda nije implementirana"}
    odgovor.send(JSON.stringify(poruka));
}

exports.getKorisniciPrijava = function(zahtjev, odgovor){
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = {greska: "metoda nije implementirana"}
    odgovor.send(JSON.stringify(poruka));
}

exports.postKorisniciPrijava = function(zahtjev,odgovor){
    odgovor.type("application/json")
    if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
        return;
    let kdao = new Korisnik();
    let korime = zahtjev.params.korime;
    kdao.odredeniKorisnik(korime).then((korisnik) => {
        console.log(korisnik)
        console.log(zahtjev.body)
        if(korisnik!=null && korisnik.lozinka==zahtjev.body.lozinka)
            odgovor.send(JSON.stringify(korisnik));
        else{ 
            odgovor.status(401)
            odgovor.send(JSON.stringify({greska: "Krivi podaci!"}))
        }
    });
}

exports.putKorisniciPrijava = function(zahtjev,odgovor){
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = {greska: "metoda nije implementirana"}
    odgovor.send(JSON.stringify(poruka));
}

exports.deleteKorisniciPrijava = function(zahtjev, odgovor){
    odgovor.type("application/json")
    odgovor.status(501);
    let poruka = {greska: "metoda nije implementirana"}
    odgovor.send(JSON.stringify(poruka));
}
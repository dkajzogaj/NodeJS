const konst= require("../konstante.js");
const express = require(konst.dirModula + 'express');
const sesija = require(konst.dirModula+'express-session')
const kolacici = require(konst.dirModula+'cookie-parser')
const Konfiguracija = require("../konfiguracija");
const portovi = require(konst.dirPortova + "portovi.js");
const htmlUpravitelj = require("./htmlUpravitelj.js");
const portRest = require(konst.dirPortova + "portovi_rest.js").dkajzogaj20;
const fetchUpravitelj = require("./fetchUpravitelj.js");
const provjera = require("../servis/provjera.js");
const port = portovi.dkajzogaj20;
const server = express();

let konfiguracija = new Konfiguracija();

konfiguracija.ucitajKonfiguraciju();

function pokreniServer() {

    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use(kolacici())
    server.use(sesija({
        secret: konst.tajniKljucSesija, 
        saveUninitialized: true,
        cookie: {  maxAge: 1000 * 60 * 60 * 3 },
        resave: false
    }));
    
    provjera.provjeriIme();
    provjera.provjeriLozinku();
    provjera.provjeriBroj();
    provjeriRest();
    cssislike();

    pripremiPutanjePocetna();
    pripremiputanjeDokumentacija();
    pripremiputanjeOdjava();
    pripremiputanjeProfil();
    pripremiputanjePregledFilmova();
    pripremiputanjeFilm();
    pripremiputanjeGalerija();
    pripremiputanjeSlika();
    pripremiputanjePrijedlogFilmova();
    pripremiputanjeZanrovi();
    pripremiPutanjeAutentifikacija();
    pripremiPutanjePretrazivanjeFilmova();

    server.use("/js", express.static(__dirname + "/js"));
    server.use((zahtjev, odgovor) => {
        odgovor.status(404);
        var poruka = { greska: "Stranica nije pronađena!" };
        odgovor.send(JSON.stringify(poruka));
    });

    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });
}

let konf = new Konfiguracija();
konf.ucitajKonfiguraciju().then(pokreniServer).catch((greska) => {
    console.log(greska);
    if (process.argv.length == 2)
        console.error("Potrebno je dati naziv datoteke");
    else
        console.error("Nije moguće otvoriti datoteku: " + greska.path);
    process.exit()
});

function cssislike(){
    server.use(express.static("Aplikacija"));
    server.use(express.static("materijali"));
    server.use(express.static("dokumentacija"));
}

function pripremiPutanjePocetna() {
    server.get("/", htmlUpravitelj.pocetna);
    server.get('/dajSveZanrove', fetchUpravitelj.dajSveZanrove);
    server.get('/dajDvaFilma', fetchUpravitelj.dajDvaFilma);
}

function pripremiputanjeDokumentacija(){
    server.get("/dokumentacija", htmlUpravitelj.dokumentacija);
}

function pripremiputanjeOdjava(){
    server.get("/odjava", htmlUpravitelj.odjava);
}

function pripremiputanjeProfil(){
    server.get("/korisnik", fetchUpravitelj.korisnik);
    server.get("/profil", htmlUpravitelj.profil);
    server.put("/profil", htmlUpravitelj.profil);
    server.post("/profil", htmlUpravitelj.profil);
}

function pripremiputanjePregledFilmova(){
    server.get("/filmoviPregled", htmlUpravitelj.pregledFilmova);
    server.get("/dajSveFilmove", fetchUpravitelj.dajSveFilmove);
}

function pripremiputanjeFilm(){
    server.get("/film", htmlUpravitelj.film);
}

function pripremiputanjeGalerija(){
    server.get("/galerijaSlika", htmlUpravitelj.galerijaSlika);
}

function pripremiputanjeSlika(){
    server.get("/slika", htmlUpravitelj.slika);
}

function pripremiputanjePrijedlogFilmova(){
    server.get("/prijedloziFilmova", htmlUpravitelj.prijedloziFilmova);
}

function pripremiputanjeZanrovi(){
    server.get("/zanrovi", htmlUpravitelj.zanrovi);
    server.post("/zanrovi", htmlUpravitelj.zanrovi);
}

function pripremiPutanjePretrazivanjeFilmova() {
    server.get('/filmoviPretrazivanje', htmlUpravitelj.filmoviPretrazivanje);
    server.post('/filmoviPretrazivanje', fetchUpravitelj.filmoviPretrazivanje);
    server.post('/dodajFilm', fetchUpravitelj.dodajFilm);
}

function pripremiPutanjeAutentifikacija() {
    server.get("/registracija", htmlUpravitelj.registracija);
    server.post("/registracija", htmlUpravitelj.registracija);
    server.get("/odjava", htmlUpravitelj.odjava);
    server.get("/prijava", htmlUpravitelj.prijava);
    server.post("/prijava", htmlUpravitelj.prijava);
    server.get("/getJWT", fetchUpravitelj.getJWT);
    server.get("/aktivacijaRacuna", fetchUpravitelj.aktvacijaRacuna);
}

async function provjeriRest(){
    let odgovor = await fetch("http://spider.foi.hr:" + portRest + "/api/korisnici?korime=" + konfiguracija.dajKonf()["rest.korime"]+ "&lozinka=" + konfiguracija.dajKonf()["rest.lozinka"])
    if(odgovor.status == 400 || odgovor.status == 401){
        console.log("Zahtjev za REST servis nije uspješan!");
        process.exit();
    }
    else if(odgovor.status == 200)
        console.log("Uspješna veza sa REST servisom")
}   
const konst = require("../konstante.js");
const express = require(konst.dirModula + 'express');
const Konfiguracija = require("../konfiguracija");
const portovi = require(konst.dirPortova + "portovi_rest.js");
const restKorisnik=require("./restKorisnik.js");
const RestTMDB = require("./restTMDB.js");
const restFilmovi = require("./restFilmovi.js");
const restZanrovi = require("./restZanrovi.js");
const fsPromise = require("fs/promises");
const provjera = require("./provjera.js");

const port = portovi.dkajzogaj20;
const server = express();


let konf = new Konfiguracija();
konf.ucitajKonfiguraciju().then(pokreniServer).catch((err) => {
    console.error(err);
    if(process.argv.length==2)
        console.error("Potrebno je unjeti i naziv konfiguracija")
    else    
        console.error("Ne moguće otvoriti datoteku");
    process.exit();
}
);

function pokreniServer(){
    server.use(express.urlencoded({ extended: true }));
    server.use(express.json());

    provjera.provjeriAPI();
    provjera.provjeriIme();
    provjera.provjeriLozinku();
    provjera.provjeriBroj();
    restKorisnici();
    restTMDB();

    server.use((zahtjev, odgovor) => {
        odgovor.status(404)
        var odg = { greska: "nema resursa!" }
        odgovor.send(JSON.stringify(odg));
    });

    server.listen(port, () => {
        console.log(`Server pokrenut na portu: ${port}`);
    });
}

function restTMDB() {
    let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);

    server.get("/api/filmovi", restFilmovi.getFilmoviDuziUrl);
    server.post("/api/filmovi", restFilmovi.postFilmoviDuziUrl);
    server.put("/api/filmovi", restFilmovi.greska501ZaDuziUrl);
    server.delete("/api/filmovi", restFilmovi.greska501ZaDuziUrl);

    server.get("/api/filmovi/:id", restFilmovi.getFilmoviID);
    server.post("/api/filmovi/:id", restFilmovi.greska405);
    server.put("/api/filmovi/:id", restFilmovi.azurirajFilmoviID);
    server.delete("/api/filmovi/:id", restFilmovi.obrisiFilmoviID);

    server.get("/api/zanr", restZanrovi.sviZanrovi);
    server.post("/api/zanr", restZanrovi.dodajZanrove);  
    server.put("/api/zanr", restZanrovi.greska501);
    server.delete("/api/zanr", restZanrovi.obrisiZanrove);

    server.get("/api/zanr/:id", restZanrovi.getZanroviID);
    server.post("/api/zanr/:id", restZanrovi.greska405);  
    server.put("/api/zanr/:id", restZanrovi.azurirajZanroveID);
    server.delete("/api/zanr/:id", restZanrovi.obrisiZanroveID);

    server.get("/api/tmdb/zanr", restTMDB.getZanr.bind(restTMDB));
    server.post("/api/tmdb/zanr", restZanrovi.greska501);  
    server.put("/api/tmdb/zanr", restZanrovi.greska501);
    server.delete("/api/tmdb/zanr", restZanrovi.greska501);



    server.get("/api/tmdb/filmovi", restTMDB.getFilmovi.bind(restTMDB));
    server.post("/api/tmdb/filmovi", restTMDB.greska501);
    server.put("/api/tmdb/filmovi", restTMDB.greska501); 
    server.delete("/api/tmdb/filmovi", restTMDB.greska501); 
}


function restKorisnici(){
    
    server.get("/api/korisnici", restKorisnik.getKorisnici);
    server.post("/api/korisnici", restKorisnik.postKorisnici);
    server.put("/api/korisnici", restKorisnik.putKorisnici);
    server.delete("/api/korisnici", restKorisnik.deleteKorisnici);

    server.get("/api/korisnici/:korime", restKorisnik.getKorisniciKorime);
    server.post("/api/korisnici/:korime", restKorisnik.postKorisniciKorime);
    server.put("/api/korisnici/:korime", restKorisnik.putKorisniciKorime);
    server.delete("/api/korisnici/:korime", restKorisnik.deleteKorisniciKorime);

    server.get("/api/korisnici/:korime/aktivacija", restKorisnik.getKorisniciAktivacija);
    server.post("/api/korisnici/:korime/aktivacija", restKorisnik.postKorisniciAktivacija);
    server.put("/api/korisnici/:korime/aktivacija", restKorisnik.putKorisniciAktivacija);
    server.delete("/api/korisnici/:korime/aktivacija", restKorisnik.deleteKorisniciAktivacija);

    server.get("/api/korisnici/:korime/prijava", restKorisnik.getKorisniciPrijava);
    server.post("/api/korisnici/:korime/prijava", restKorisnik.postKorisniciPrijava);
    server.put("/api/korisnici/:korime/prijava", restKorisnik.putKorisniciPrijava);
    server.delete("/api/korisnici/:korime/prijava", restKorisnik.deleteKorisniciPrijava);

}
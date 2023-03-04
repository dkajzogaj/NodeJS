const TMDB = require("./TMDB.js");
const provjera = require("./provjera.js");

module.exports = class RestTMDB{
    constructor(api_kljuc) {
        this.tmdbKlijent = new TMDB(api_kljuc);
        console.log(api_kljuc);
        
        //this.tmdbKlijent.dohvatiFilm(500).then(console.log).catch(console.log);
    }

    getZanr(zahtjev, odgovor) {
        console.log(this);
        if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
            return;
        this.tmdbKlijent.getZanrovi().then((zanrovi) => {
            odgovor.type("application/json")
            odgovor.send(zanrovi);
        }).catch((greska) => {
            odgovor.json(greska);
        });
    }

    getFilmovi(zahtjev, odgovor) {
        console.log(this);
        odgovor.type("application/json")
        if(!provjera.provjeri(zahtjev.query.korime, zahtjev.query.lozinka, zahtjev, odgovor))
            return;
        let stranica = zahtjev.query.stranica;
        let rijeci = zahtjev.query.kljucnaRijec;

        if(stranica == null || rijeci==null){
            odgovor.status("417");
            odgovor.send({greska: "neocekivani podaci"});
            return;
        } 

        this.tmdbKlijent.getFilmKljucnaRijec(rijeci,stranica).then((filmovi) => {
            //console.log(filmovi);
            odgovor.send(filmovi);
        }).catch((greska) => {
            odgovor.json(greska);
        });
    }

    greska501(zahtjev,odgovor){
        odgovor.type("application/json")
        let stranica = zahtjev.query.stranica;
        let rijeci = zahtjev.query.kljucnaRijec;

        if(!stranica || !rijeci){
            odgovor.type("application/json")
            odgovor.status(417);
            let poruka = {greska: "neočekivani podaci"}
            odgovor.send(JSON.stringify(poruka));
        }
        else if(stranica != null || rijeci !=null){
            
            odgovor.status(501);
            let poruka = {greska: "metoda nije implementirana"}
            odgovor.send(JSON.stringify(poruka));
        } 
    }
}
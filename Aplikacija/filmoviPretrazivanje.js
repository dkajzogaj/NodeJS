const konst = require("../konstante.js");
const portRest = require(konst.dirPortova + "portovi_rest.js").dkajzogaj20;
const url = "http://spider.foi.hr:" + portRest + "/api";
const kodovi = require("./moduli/kodovi.js")
const Konfiguracija = require("../konfiguracija.js");
let konfiguracija = new Konfiguracija();

konfiguracija.ucitajKonfiguraciju();

class FilmoviZanroviPretrazivanje {

    async dohvatiFilmove(stranica, kljucnaRijec = "") {
        let putanja = url + "/tmdb/filmovi?stranica=" + stranica + "&kljucnaRijec=" + kljucnaRijec +"&korime=" +konfiguracija.dajKonf()["rest.korime"] + "&lozinka=" + konfiguracija.dajKonf()["rest.lozinka"];
        console.log(putanja)
        let odgovor = await fetch(putanja);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        console.log(filmovi)
        return filmovi;
    }
    
    async dohvatiSveZanrove() {
        let odgovor = await fetch(url + "/zanr?korime=" + konfiguracija.dajKonf()["rest.korime"] + "&lozinka=" + konfiguracija.dajKonf()["rest.lozinka"]);
        let podaci = await odgovor.text();
        console.log(podaci);
        let zanrovi = JSON.parse(podaci);
        return zanrovi;
    }

    async dohvatiSveFilmove() {
        let odgovor = await fetch(url + "/filmovi?stranica=1&brojFilmova=100&korime=" + konfiguracija.dajKonf()["rest.korime"] + "&lozinka=" + konfiguracija.dajKonf()["rest.lozinka"]);
        let podaci = await odgovor.text();
        console.log(podaci);
        let zanrovi = JSON.parse(podaci);
        return zanrovi;
    }

    async dohvatiNasumceFilm(zanr) {
        let odgovor = await fetch(url + "/filmovi?stranica=1&brojFilmova=20&korime=" + konfiguracija.dajKonf()["rest.korime"] + "&lozinka=" +konfiguracija.dajKonf()["rest.lozinka"]);
        let podaci = await odgovor.text();
        let filmovi = JSON.parse(podaci);
        let BrojFilmovaPoZanru = Object.keys(filmovi).length;
        let rez = [filmovi[kodovi.dajNasumceBroj(0,BrojFilmovaPoZanru)],
                    filmovi[kodovi.dajNasumceBroj(0,BrojFilmovaPoZanru)]];
        return rez;
    }

    async dohvatiKorisnika(id){
        let odgovor = await fetch(url + "/korisnici/" + id + "?korime=" + konfiguracija.dajKonf()["rest.korime"] + "&lozinka=" +konfiguracija.dajKonf()["rest.lozinka"]);
        let podaci = await odgovor.text();
        let korisnik = JSON.parse(podaci);
        return korisnik;
    }
}



module.exports = FilmoviZanroviPretrazivanje;
const Baza = require("./baza.js");

module.exports = class Korisnik{

    constructor(){
        this.baza = new Baza();
    }

    async sviKorisnici(){
        this.baza.spojiSeNaBazu();
        let sql = "SELECT * FROM Korisnik;"
        var podaci = await this.baza.izvrsiUpit(sql, []);
        return podaci;
    }

    async kreirajNovogKorisnika(korisnik){
        console.log(korisnik);
        let sql = 'INSERT INTO Korisnik (ime,prezime,lozinka,email,korime, Uloge_korisnika_id, aktivacijski_kod, totp_kljuc) VALUES (?,?,?,?,?,?,?,?)';
        let podaci = [korisnik.ime, korisnik.prezime, korisnik.lozinka, korisnik.email, korisnik.korime,3, korisnik.aktivacijski_kod, korisnik.totp_kljuc];
        await this.baza.izvrsiUpit(sql, podaci);
        return true;
    }

    async odredeniKorisnik(korime){
        this.baza.spojiSeNaBazu();
        let sql = "SELECT * FROM Korisnik WHERE korime=?;"
        var podaci = await this.baza.izvrsiUpit(sql, [korime]);
        this.baza.zatvoriVezu();
        if(podaci.length == 1)
            return podaci[0];
        else
            return null;
    }

    async azurirajKorisnika(korime, korisnik){
        let sql = 'UPDATE Korisnik SET ime=?, prezime=? WHERE korime=?';
        let podaci = [korisnik.ime, korisnik.prezime, korime];
        await this.baza.izvrsiUpit(sql,podaci).catch(
            greska=> console.log(greska)
        )
        return true;
    }

    async aktivirajKorisnika(korime){
        let sql = 'UPDATE Korisnik SET Uloge_korisnika_id=1 WHERE korime=?';
        let podaci = [korime];
        await this.baza.izvrsiUpit(sql,podaci);
        return true;
    }
}
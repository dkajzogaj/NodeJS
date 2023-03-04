const Baza = require("./baza.js");

module.exports = class Zanr{

    constructor(){
        this.baza = new Baza();
    }

    async sviZanr(){
        this.baza.spojiSeNaBazu();
        let sql = "SELECT * FROM Zanr;"
        var podaci = await this.baza.izvrsiUpit(sql, []);
        return podaci;
    }

    async dodajZanr(zanr){
        console.log(zanr);
        let sql = 'INSERT INTO Zanr (id, naziv, opis, id_tmdb) VALUES (?,?,?,?)';
        let podaci = [zanr.ime, zanr.naziv, zanr.opis, zanr.id_tmdb];
        await this.baza.izvrsiUpit(sql, podaci);
        return true;
    }

    async brisiZanr(){
        let sql = "DELETE FROM Zanr WHERE NOT EXISTS(SELECT NULL FROM Filmovi_Zanr WHERE Filmovi_Zanr.Zanr_id = Zanr.id)";
		await this.baza.izvrsiUpit(sql,[]);
		return true;
    }

    async ZanrID(id){
        this.baza.spojiSeNaBazu();
        let sql = "SELECT * FROM Zanr WHERE id=?;"
        var podaci = await this.baza.izvrsiUpit(sql, [id]);
        this.baza.zatvoriVezu();
        if(podaci.length == 1)
            return podaci[0];
        else
            return null;
    }

    async azurirajZanrID(id, zanr){
        let sql = 'UPDATE Zanr SET id=?, naziv=?, opis=?, id_tmdb=?  WHERE id=?';
        let podaci = [zanr.id, zanr.naziv, zanr.opis, zanr.id_tmdb, id];
        await this.baza.izvrsiUpit(sql,podaci);
        return true;
    }

    async brisiZanrID(id,zanr){
        let sql = "DELETE FROM Zanr WHERE id=?";
		await this.baza.izvrsiUpit(sql,[id]);
		return true;
    }
}
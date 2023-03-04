const Baza = require("./baza.js");

module.exports = class Filmovi{

    constructor(){
        this.baza = new Baza();
    }

    async filmoviStranica(stranica, brojFilmova, datum, zanr, naziv, sortiraj){
        this.baza.spojiSeNaBazu();
        let sql = "SELECT * FROM Filmovi";
        let podaci =[];

        if(datum){
            sql += ' WHERE datum_unosa<=?'
            podaci.push(datum);
        }
        if(zanr){
            if(datum){
                sql += " AND id IN (SELECT Filmovi_id FROM Filmovi_Zanr WHERE Zanr_id=?)";
                podaci.push(zanr);
            }
            else if(!datum){
                podaci.push(zanr);
                sql += " WHERE id IN (SELECT Filmovi_id FROM Filmovi_Zanr WHERE Zanr_id=?)";
            }
        }

        if(naziv){
            if(datum || zanr){
                podaci.push(naziv);
                sql += " AND naslov LIKE ?";
            }
            else if(!datum || !zanr){
                podaci.push(naziv);
                sql += " WHERE naslov LIKE ?";
            }
        }
        if(sortiraj){
            switch(sortiraj){
                case d:{
                    sql += " ORDER BY datum_unosa";
                    podaci.push(sortiraj);
                    break;
                }
                case z:{
                    podaci.push(sortiraj);
                    sql += " ORDER BY naslov";
                    break;
                }
                case n:{
                    podaci.push(sortiraj);
                    break;
                }
            }
        }
        podaci.push(brojFilmova);
        sql += ' LIMIT ?';
        console.log(podaci);
        
        var upit = await this.baza.izvrsiUpit(sql, podaci);
        this.baza.zatvoriVezu();
        return upit;
    }

    async FilmoviID(id){
        this.baza.spojiSeNaBazu();
        let sql = "SELECT * FROM Filmovi WHERE id=?;"
        var podaci = await this.baza.izvrsiUpit(sql, [id]);
        this.baza.zatvoriVezu();
        if(podaci.length == 1)
            return podaci[0];
        else
            return null;
    }

    async azurirajFilmoviID(id, filmovi){
        let sql = 'UPDATE Filmovi SET id=?, odrasli=?, pozadina_url=?, budzet=? , tmdb_url=?, id_tmdb=?, id_imdb=?, jezik=?, izvorni_naslov=?, opis=?, popularnost=?, poster_url=?, datum_objave=?, prihod=?, vrijeme_trajanja=?, status=?, tagline=?, naslov=?, video=?, prosjek_glasanja=?, brojevi_glasova=?, datum_unosa=?, total_results=?, total_pages=? WHERE id=?';
        let podaci = [filmovi.id, filmovi.odrasli, filmovi.pozadina_url, filmovi.budzet, filmovi.tmdb_url, filmovi.id_tmdb, filmovi.id_imdb, filmovi.jezik, filmovi.izvorni_naslov, filmovi.opis, filmovi.popularnost, filmovi.poster_url, filmovi.datum_objave, filmovi.prihod, filmovi.vrijeme_trajanja, filmovi.status, filmovi.tagline, filmovi.naslov, filmovi.video, filmovi.prosjek_glasanja, filmovi.brojevi_glasova, filmovi.datum_unosa, filmovi.total_results, filmovi.total_pages, id];
        await this.baza.izvrsiUpit(sql,podaci);
        return true;
    }

    async brisiFilmoviID(id,filmovi){
        let sql = "DELETE FROM Filmovi WHERE id=?";
		await this.baza.izvrsiUpit(sql,[id]);
		return true;
    }
}
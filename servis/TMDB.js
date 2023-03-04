module.exports = class TMDB{
    bazicniURL = "https://api.themoviedb.org/3"; 

    constructor(apiKljuc){
        this.apiKljuc = apiKljuc; 
     }

     async getZanrovi(){
        let resurs = "/genre/movie/list";
        let odgovor = await this.Zahtjev(resurs);
        return odgovor;
     }
     
     async getFilm(id){
        let resurs = "/movie/"+id;
        let odgovor = await this.Zahtjev(resurs);
        return odgovor;
     }

     async getFilmKljucnaRijec(rijeci,stranica){
        let resurs = "/discover/movie";
        let parametri = {sort_by: "popularity.desc",
                         include_adult: false,
                         include_video: false,
                         page: stranica,
                         with_keywords: await this.KljucneRijeci(rijeci)};
        
        let odgovor = await this.Zahtjev(resurs,parametri);
        return odgovor;
     }

     async Zahtjev(resurs,parametri=""){
        let zahtjev = this.bazicniURL+resurs+"?api_key="+this.apiKljuc;
        for(let p in parametri){
            zahtjev+="&"+p+"="+parametri[p];
        }    
        console.log(zahtjev);
        let odgovor = await fetch(zahtjev);
        let rezultat = await odgovor.text();
        return rezultat;
    }

     async KljucneRijeci(rijeci){
        let resurs = "/search/keyword";
        let odgovor = "";
        if(rijeci=="") return odgovor;
        let prva = true;
        for(let rijec of rijeci.split(",")){
        let parametri = {query: rijec, page: 1}
        let o = await this.Zahtjev(resurs,parametri);
        let r = JSON.parse(o);
        if (r.results.length == 0) return "0";
        console.log(r)
        if(prva){
        odgovor += r.results[0].id
        prva = false;
        } else
        odgovor += ","+r.results[0].id
        }
        console.log(odgovor)
        return odgovor;
        }
  }
       

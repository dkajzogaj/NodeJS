let url = "http://spider.foi.hr:12086";

window.addEventListener("load",async ()=>{
    let main = document.getElementsByTagName("main")[0];
    let prikaz = "";
    for(let p of await dohvatiZanrove()){
        prikaz+= "Žanr: " + p.naziv + "<br>Filmovi: ";
        let filmovi = await dohvatiFilmove(p.id);
            prikaz+=filmovi[0]["naslov"];
            prikaz+=" + " +filmovi[1]["naslov"];  
            prikaz+="<br> <br>"  
    }
    main.innerHTML = prikaz+"</ol>";
});

async function dohvatiZanrove(){
    let odgovor = await fetch(url+"/dajSveZanrove");
    let podaci = await odgovor.text();
    console.log(podaci);
    let zanrovi = JSON.parse(podaci);
    return zanrovi;
}

async function dohvatiFilmove(zanr){
    let odgovor = await fetch(url+"/dajDvaFilma?zanr="+zanr);
    let podaci = await odgovor.text();
    let filmovi = JSON.parse(podaci);
    return filmovi;
}

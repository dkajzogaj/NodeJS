let url = "http://spider.foi.hr:12086";

window.addEventListener("load",async ()=>{
    let main = document.getElementsByTagName("main")[0];
    let tablica = "<table id=tablica border=1>";
    tablica += "<tr><th>Id</th><th>Jezik</th><th>Naslov original</th><th>Naslov</th><th>Opis</th></tr>"
    for(let p of await dohvatiFilmove()){
        tablica += "<tr>";
        tablica += "<td>" + p.id + "</td>"
        tablica += "<td>" + p.jezik+ "</td>"
        tablica += "<td>" + p.naslov + "</td>"
        tablica += "<td>" + p.izvorni_naslov + "</td>"
        tablica += "<td>" + p.opis + "</td>"
        tablica += "</tr>";
    }
    tablica += "</table>";
    main.innerHTML = tablica;
});

async function dohvatiFilmove(){
    let odgovor = await fetch(url+"/dajSveFilmove");
    let podaci = await odgovor.text();
    console.log(podaci);
    let zanrovi = JSON.parse(podaci);
    return zanrovi;
}
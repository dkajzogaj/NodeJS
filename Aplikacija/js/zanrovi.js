let url = "http://spider.foi.hr:12086";

window.addEventListener("load",async ()=>{
    let main = document.getElementsByTagName("div")[0];
    let prikaz = ""
    for(let p of await dohvatiZanrove()){
        prikaz+=p.naziv + "<br>";
        
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
let url = "http://spider.foi.hr:12086";

window.addEventListener("load",async ()=>{
    let main = document.getElementsByTagName("div")[0];
    let prikaz = "<div>";
    let p = await Korisnik();
        prikaz+="Ime korisnika: "+ p.ime +"<br>";
        prikaz+="Prezime korisnika: " +p.prezime+"<br>";
        prikaz+="Email korisnika: " +p.email+"<br>";
        prikaz+="Korime korisnika: " +p.korime+"<br>";
        prikaz+="Id uloge korisnika: "+ p.Uloge_korisnika_id+"<br>";  
    main.innerHTML += prikaz +"</div>";
});

async function Korisnik(){
    let odgovor = await fetch(url+"/korisnik");
    let podaci = await odgovor.text();
    let korisnik = JSON.parse(podaci);
    return korisnik;
}

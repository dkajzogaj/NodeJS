const Konfiguracija = require("../konfiguracija.js");
let konfiguracija = new Konfiguracija();

konfiguracija.ucitajKonfiguraciju();


exports.provjeri = function (korime, lozinka, zahtjev, odgovor) {  

    let imekonf = konfiguracija.dajKonf()["rest.korime"];
    let lozinkakonf =  konfiguracija.dajKonf()["rest.lozinka"];

    if (!korime || !lozinka || !provjeriImeiLozinku()) {
        odgovor.type("application/json")
        odgovor.status(400);
        let poruka = {greska: "nevaljani zahtjev"}
        odgovor.send(JSON.stringify(poruka));
        return false;
    }
    else if (korime != imekonf || lozinka != lozinkakonf) {
        odgovor.type("application/json")
        odgovor.status(401);
        let poruka = {greska: "neautoriziran pristup"}
        odgovor.send(JSON.stringify(poruka));
        return false;
    }
    return true;
}

exports.provjeriIme = function(){

    let provjeri = konfiguracija.dajKonf();
    var ime = provjeri["rest.korime"];
    var reIme = /^[\w]{15,20}$/;
    
    try{
        if(!ime.match(reIme)){
            throw new Error("nevaljani zahtjev, korime je krivo!");
            process.exit();
    }}catch(error){
        error.statusCode = 400;
        throw error;
    }

}

exports.provjeriLozinku = function(){

    let provjeri = konfiguracija.dajKonf();
    var lozinka = provjeri["rest.lozinka"];
    var reLozinka = /^.{20,100}$/;
    
    try{
        if(!lozinka.match(reLozinka)){
            throw new Error("nevaljani zahtjev, lozinka je kriva!");
            process.exit();
    }}catch(error){
        error.statusCode = 400;
        throw error;
    }

}

exports.provjeriBroj = function(){

    let provjeri = konfiguracija.dajKonf();
    var brojstr = provjeri["app.broj.stranica"];
    var reBroj = '^[5-9]$|^[1-9][0-9]$|^(100)$';

    try{
        if(!brojstr.match(reBroj)){
            throw new Error("nevaljani zahtjev, unesite broj izmedu 5-100 za broj stranica!");
            process.exit();
    }}catch(error){
       error.statusCode = 400;
        throw error;
    }

}

exports.provjeriAPI = function(){
    let provjeri = konfiguracija.dajKonf();
    var tmdb = provjeri["tmdb.apikey.v3"];
    var tmdbv = provjeri["tmdb.apikey.v4"];

    try{
        if(!tmdb || !tmdbv){
            throw new Error("nevaljani zahtjev, fali tmdb api key!");
            process.exit();
    }}catch(error){
       error.statusCode = 400;
        throw error;
    }
}

function provjeriImeiLozinku(){
    let provjeri = konfiguracija.dajKonf();
    var ime = provjeri["rest.korime"];
    var reIme = /^[\w]{15,20}$/;
    var lozinka = provjeri["rest.lozinka"];
    var reLozinka = /^.{20,100}$/;

    if(ime.match(reIme) && lozinka.match(reLozinka))
        return true;

}
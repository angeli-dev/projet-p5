// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()

const guiLettre = gui.addFolder('Lettres')
const guiLangue =gui.addFolder('Langues')
const guiCouleur = gui.addFolder('Couleurs')
const guiGrille = gui.addFolder('Grille')

const params = {
    Download_Image: () => save(),
    Random_Seed: 0,
    Nb_mots: 20,
    Couleur_fond: "#ebe8d4",
    Couleur_mots: "#25231f",
    Mots_inexistants: false
}
const paramsGrille = {
    Divisions_Horizontales: 4,
    Divisions_Verticales: 15
}
const paramsLangue = {
    Italien: true,
    Français: true,
    Anglais: true,
    Allemand: true
}
const paramsLettre = {
    a: false,
    b: true,
    c: true,
    d: true,
    e: false,
    f: false,
    g: false,
    h: false,
    i: false,
    j: false,
    k: false,
    l: true,
    m: false,
    n: false,
    o: true,
    p: true,
    q: true,
    r: false,
    s: false,
    t: false,
    u: false,
    v: false,
    w: false,
    x: false,
    y: false,
    z: false
}

gui.add(params, "Random_Seed", 0, 100, 1)
gui.add(params, "Nb_mots", 0, 100, 1)
gui.add(params, "Mots_inexistants")

guiGrille.add(paramsGrille, "Divisions_Horizontales",0, 100, 1)
guiGrille.add(paramsGrille, "Divisions_Verticales", 0, 100, 1)

guiCouleur.addColor(params, "Couleur_mots")
guiCouleur.addColor(params, "Couleur_fond")

guiLettre.add(paramsLettre, "a")
guiLettre.add(paramsLettre, "b");
guiLettre.add(paramsLettre, "c");
guiLettre.add(paramsLettre, "d");
guiLettre.add(paramsLettre, "e");
guiLettre.add(paramsLettre, "f");
guiLettre.add(paramsLettre, "g");
guiLettre.add(paramsLettre, "h");
guiLettre.add(paramsLettre, "i");
guiLettre.add(paramsLettre, "j");
guiLettre.add(paramsLettre, "k");
guiLettre.add(paramsLettre, "l");
guiLettre.add(paramsLettre, "m");
guiLettre.add(paramsLettre, "n");
guiLettre.add(paramsLettre, "o");
guiLettre.add(paramsLettre, "p");
guiLettre.add(paramsLettre, "q");
guiLettre.add(paramsLettre, "r");
guiLettre.add(paramsLettre, "s");
guiLettre.add(paramsLettre, "t");
guiLettre.add(paramsLettre, "u");
guiLettre.add(paramsLettre, "v");
guiLettre.add(paramsLettre, "w");
guiLettre.add(paramsLettre, "x");
guiLettre.add(paramsLettre, "y");
guiLettre.add(paramsLettre, "z");

guiLangue.add(paramsLangue, "Italien");
guiLangue.add(paramsLangue, "Français");
guiLangue.add(paramsLangue, "Anglais");
guiLangue.add(paramsLangue, "Allemand");

gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function draw() {

    //initialisation variables
    let liste_mots = [];
    let liste_lettres = [];
    let x = 0;
    let y = 0;
    let new_x = 0;
    let size = [18, 36, 72]
    let spacing = [0, 1, 2, 3, 4, 5]
    let tableau_x = [0 ,1, 2, 3, 4]
    let tableau_y = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    let modulo = 0;
    let coeff = 0
    


    //construction liste lettre
    for (const element in paramsLettre) {
        if (paramsLettre[element] == true) {
            liste_lettres.push(element)
        }
    }

    // concatenation des mots
    let allWords=[];
    if (paramsLangue.Anglais == true)
    {
        allWords= allWords.concat(result_en);
    }
    if (paramsLangue.Français == true)
    {
        allWords = allWords.concat(result_fr);
    }
    if (paramsLangue.Italien == true)
    {
        allWords= allWords.concat(result_it);
    }
    if (paramsLangue.Allemand == true)
    {
        allWords= allWords.concat(result_de);
    }
    //console.log(allWords)
    
    
    // filtrage des mots
    // pour chaque mot, on ne récupère pas les mots (filter) dont l'une des lettres (some) n'est pas dans la liste liste_lettres (includes)
    liste_mots = allWords.filter(mot => !mot.split("").some(char => !liste_lettres.includes(char)));

    //chaines de Markov
    if (params.Mots_inexistants == true) {

        let chaineMots="";
        let objNgramme={};
        let debut=[];
        let ordre=3;
        let nbreLettreMax = 10;
        
        for (let i=0;i<liste_mots.length;i++){
            let lettres=liste_mots[i].substring(0,ordre);
            if (lettres.length==ordre){
                debut.push(lettres);
            }
        }
        for (let i=0; i<liste_mots.length;i++){
            chaineMots=chaineMots+liste_mots[i]+" ";
        }
        for (let i=0;i<chaineMots.length;i++){
            let ngramme=chaineMots.substring(i,i+ordre)
            if (!objNgramme[ngramme]){
                objNgramme[ngramme]=[]
                objNgramme[ngramme].push(chaineMots.charAt(i+ordre));
            }
            else {
                objNgramme[ngramme].push(chaineMots.charAt(i+ordre));
            }
        }
    }

    
    
    background(params.Couleur_fond)
    randomSeed(params.Random_Seed)
    let n = params.Nb_mots;
    
    //draw text  façon Marc Adrian
    for (let i = 0; i < n ; i++) {
        fill(params.Couleur_mots);
        textFont(myFont);
        textAlign(CENTER, CENTER);
        textSize(random(size));
        
        //méthode Mark Adrian
        //coeff = random(spacing)
        //new_x = x + (width / 4) * coeff;
        //modulo = new_x % width;
        //y += ((new_x - modulo) / width) * height / 15;
        //x = modulo;

        //Méthode plus simple
        x = random(tableau_x)*(width/paramsGrille.Divisions_Horizontales);
        y = random(tableau_y)*(height/paramsGrille.Divisions_Verticales);

        if (params.Mots_inexistants == false){
            text(random(liste_mots), x, y, width / paramsGrille.Divisions_Horizontales, height / paramsGrille.Divisions_Verticales);
        }

        //creer nouveau mot (Markov)
        if (params.Mots_inexistants == true) {
           let ngrammCourant=random(debut);
           let resultat=ngrammCourant
           for (i=0;i<nbreLettreMax;i++){
               let possible=objNgramme[ngrammCourant];
               let prochain=random(possible);
               if (prochain==" "){
                   break;
               }
               resultat=resultat+prochain;
               ngrammCourant=resultat.substring(resultat.length-ordre,resultat.length);
            }
            text(resultat, x, y, width / paramsGrille.Divisions_Horizontales, height / paramsGrille.Divisions_Verticales);
        }
        
        //console.log(x)
          
    }
}

// -------------------
//    Initialization
// -------------------
let result_fr;
let result_en;
let result_it;
let result_de;
let myFont;

function preload() {
    result_fr = loadStrings('assets/liste_fr.txt');
    result_en = loadStrings('assets/liste_en.txt');
    result_it = loadStrings('assets/liste_it.txt');
    result_de = loadStrings('assets/liste_de.txt');
    myFont = loadFont('assets/Helvetica.ttf');
}

function setup() {
    p6_CreateCanvas();
}

function windowResized() {
    p6_ResizeCanvas()
}
// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI();

const guiLettre = gui.addFolder('Lettres');
const guiLangue = gui.addFolder('Langues');
const guiCouleur = gui.addFolder('Couleurs');
const guiGrille = gui.addFolder('Grille');
const guiMarkov = gui.addFolder('Caractéristiques des mots inventés');

const params = {
    Download_Image: () => save(),
    Random_Seed: 0,
    Nb_mots: 20,
    Couleur_fond: "#ebe8d4",
    Couleur_mots: "#25231f",
    Mots_inventes: false
};
const paramsGrille = {
    Nb_colonnes: 4,
    Nb_lignes: 15
};
const paramsMarkov = {
    nbreLettreMax: 10,
    ordre: 3
};

const paramsLangue = {
    Italien: true,
    Français: true,
    Anglais: true,
    Allemand: true
};
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

gui.add(params, "Random_Seed", 0, 100, 1);
gui.add(params, "Nb_mots", 0, 100, 1);
gui.add(params, "Mots_inventes");

guiGrille.add(paramsGrille, "Nb_colonnes", 0, 20, 1);
guiGrille.add(paramsGrille, "Nb_lignes", 0, 20, 1);

guiMarkov.add(paramsMarkov, "nbreLettreMax", 0, 20, 1);
guiMarkov.add(paramsMarkov, "ordre", 0, 10, 1);

guiCouleur.addColor(params, "Couleur_mots");
guiCouleur.addColor(params, "Couleur_fond");


for (const key of Object.keys(paramsLettre)) guiLettre.add(paramsLettre, key);

for (const key of Object.keys(paramsLangue)) guiLangue.add(paramsLangue, key);


gui.add(params, "Download_Image");

// -------------------
//       Drawing
// -------------------

function draw() {
    //initialisation variables
    const n = params.Nb_mots;
    const size = [18, 36, 72];
    const ordre = paramsMarkov.ordre;//donne l'ordre du n_gramme
    const nbreLettreMax = paramsMarkov.nbreLettreMax;
    let chaineMots = "";
    let objNgramme = {};
    let debut = [];
    
    //construction liste lettre
    const liste_lettres = Object.keys(paramsLettre).filter(key => paramsLettre[key] == true);
    
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
    
    // filtrage des mots
    // pour chaque mot, on ne récupère pas les mots (filter) dont l'une des lettres (some) n'est pas dans la liste liste_lettres (includes)
    const liste_mots = allWords.filter(mot => !mot.split("").some(char => !liste_lettres.includes(char)));

    //chaines de Markov
    if (params.Mots_inventes == true)
    {    
        chainesMarkov(ordre, chaineMots, objNgramme, debut, liste_mots);
    }

    background(params.Couleur_fond);
    randomSeed(params.Random_Seed);
    
    //draw text
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
        const x = floor(random(paramsGrille.Nb_colonnes))*(width/paramsGrille.Nb_colonnes);
        const y = floor(random(paramsGrille.Nb_lignes))*(height/paramsGrille.Nb_lignes);

        // creer nouveau mot (Markov) ou en sélectionne un depuis la liste
        const mot = params.Mots_inventes ? createWord(debut, objNgramme, ordre, nbreLettreMax) : random(liste_mots);
        text(mot, x, y, width / paramsGrille.Nb_colonnes, height / paramsGrille.Nb_lignes); 
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
    p6_ResizeCanvas();
}

function chainesMarkov(ordre, chaineMots, objNgramme, debut, liste_mots) {
    //complète le tableau "debut" avec les n-gramme que l'on trouve à chaque début de mot (s'il existe).
    for (let i=0;i<liste_mots.length;i++){
        let lettres=liste_mots[i].substring(0,ordre);
        if (lettres.length==ordre){
            debut.push(lettres);
        }
    }
    for (let i=0; i<liste_mots.length;i++){
        chaineMots=chaineMots+liste_mots[i]+" ";
    }
    //parcourt de la chaîne de caractères "chaineMots"
    for (let i=0;i<chaineMots.length;i++){
        let ngramme = chaineMots.substring(i, i + ordre)
        //vérifie si l'objet "objNgramme" possède déjà un attribut de la suite de caractère étudiée
        if (!objNgramme[ngramme]) {
            //créer un tableau vide pour la valeur de l'attribut de la suite de caractère étudiée
            objNgramme[ngramme] = []
            //place le caractère qui suit la suite de caractère étudiée dans le tableau associé objNgramme[caractère étudié]
            objNgramme[ngramme].push(chaineMots.charAt(i + ordre));
        }
        else {
            objNgramme[ngramme].push(chaineMots.charAt(i+ordre));
        }
    }
}

function createWord(debut, objNgramme, ordre, nbreLettreMax) {
    //tire au sort un des n-grammes
    let ngrammCourant = random(debut);
    let resultat = ngrammCourant
    for (let i = 0; i < nbreLettreMax; i++) {
        //prochain contient un caractère tiré au sort dans le tableau associé à la suite de caractère 
        let possible = objNgramme[ngrammCourant];
        let prochain = random(possible);
        //stop la boucle si le caractère tiré au sort est un espace (afin d'éviter des "mots à trou")
        if (prochain == " ") {
            break;
        }
        resultat = resultat + prochain;
        //sélectionne le dernier n-gramme du mot en cours de construction
        ngrammCourant = resultat.substring(resultat.length - ordre, resultat.length);
    }
    return resultat;
}
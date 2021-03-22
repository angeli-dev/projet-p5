// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    //Ellipse_Size: 30,
    Download_Image: () => save(),
    Random_Seed: 0,
    Nb_mots: 20
}

//gui.add(params, "Ellipse_Size", 0, 100, 1)
gui.add(params, "Random_Seed", 0, 100, 1)
gui.add(params, "Nb_mots", 0, 50, 1)
gui.add(params, "Download_Image")

// -------------------
//       Drawing
// -------------------

function draw() {
    background("#ebe8d4")
    /*fill("white")
    noStroke()
    ellipse(mouseX, mouseY, params.Ellipse_Size)*/
    randomSeed(params.Random_Seed)
    let n = params.Nb_mots;

    //draw text
    let x = 0;
    let y = 0;
    let new_x = 0;
    let size = [18, 36, 72]
    let spacing = [0, 1, 2, 3, 4, 5]
    let modulo = 0;
    let coeff=0;

    for (let i = 0; i < n; i++) {
        fill('#25231f');
        textFont(myFont);
        textAlign(CENTER, CENTER);
        textSize(random(size));
        
        coeff = random(spacing)
        //console.log(mot+coeff)
        new_x = x + 225 * coeff;
        modulo = new_x % 900;
        y += ((new_x - modulo) / 900)*60;    
        x = modulo;
        
        text(random(liste_mots), x, y, 225, 60);
    }
        
        
         
}



// -------------------
//    Initialization
// -------------------
let result_fr;
let result_en;
let result_it;
let myFont;
function preload() {
    result_fr = loadStrings('assets/liste_fr.txt');
    result_en = loadStrings('assets/liste_en.txt');
    result_it = loadStrings('assets/liste_en.txt');
    myFont = loadFont('assets/Helvetica.ttf');
}

let liste_mots=[];
let liste_lettres = ["b","c","d","l","o","p","q"];
function setup() {
    p6_CreateCanvas();

    // concatenation des mots
    const allWords = result_fr.concat(result_en).concat(result_it);

    // filtrage des mots
    // pour chaque mot, on ne récupère pas les mots (filter) dont l'une des lettres (some) n'est pas dans la liste liste_lettres (includes)
    liste_mots = allWords.filter(mot => !mot.split("").some(char => !liste_lettres.includes(char));

    console.log(liste_mots);
}

function windowResized() {
    p6_ResizeCanvas()
}
// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    //Ellipse_Size: 30,
    Download_Image: () => save(),
    Random_Seed: 0,
    Nb_mots: 25
}

//gui.add(params, "Ellipse_Size", 0, 100, 1)
gui.add(params, "Random_Seed", 0, 100, 1)
gui.add(params, "Nb_mots", 0, 100, 1)
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
let result;
let myFont;
function preload() {
    result = loadStrings('assets/liste_francais.txt');
    myFont = loadFont('assets/Helvetica.ttf');
}

let liste_mots=[];
let liste_lettres = ["b","c","d","l","o","p","q"];
function setup() {
    p6_CreateCanvas();

    //créer liste de mots conrtenant les caractères
    for (const mot of result) {
        let caracteres = mot.split("");
        let drapeau = true;
        for (const caractere of caracteres) {
            if(liste_lettres.indexOf(caractere)==-1)
            {
                drapeau = false;
                break;
            }
        }
        if (drapeau){
            liste_mots.push(mot);
        }
    }
    console.log(liste_mots);
}

function windowResized() {
    p6_ResizeCanvas()
}
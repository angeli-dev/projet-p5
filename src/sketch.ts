// -------------------
//  Parameters and UI
// -------------------

const gui = new dat.GUI()
const params = {
    Ellipse_Size: 30,
    Download_Image: () => save(),
}
gui.add(params, "Ellipse_Size", 0, 100, 1)
gui.add(params, "Download_Image")

// -------------------
//       AJAX
// -------------------
/*
console.log("hello");
class Ajax {
    url: string;
    xmlData: string;
    mode: boolean; 
    response: string;
    objHttpReq:any;

    constructor (postUrl: string, postXml: string, postMode: boolean) {
        this.url = postUrl;
        this.xmlData = postXml;
        this.mode = postMode;       
        this.objHttpReq = new XMLHttpRequest(); 
        this.objHttpReq.mode = this.mode;   

        this.objHttpReq.onreadystatechange =()=> this.OnRStateChange();

        this.objHttpReq.open("Post", this.url, this.mode);
        this.objHttpReq.send(this.xmlData);         
    }                   

    OnRStateChange(){               
        if (this.objHttpReq.readyState==4 && this.objHttpReq.status==200)
                    //here this refers to Ajax
        {
            //alert(xmlhttp.status);
            if( this.objHttpReq.mode == false)
            {
                alert(this.objHttpReq.responseText);
            }
            else
            {
                alert(this.objHttpReq.responseText);
            }
        }   
    }
}   

var liste = new Ajax("liste_francais.txt", "", false);
*/



// -------------------
//       Drawing
// -------------------

function draw() {
    background("#495782")
    fill("white")
    noStroke()
    ellipse(mouseX, mouseY, params.Ellipse_Size)
}


// -------------------
//    Initialization
// -------------------
let result;
function preload() {
  result = loadStrings('assets/liste_francais.txt');
}

let liste_mots=[];
let liste_lettres = ["b","c","d","l","o","p","q"];
function setup() {
    p6_CreateCanvas();
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
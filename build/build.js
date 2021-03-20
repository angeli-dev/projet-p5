var gui = new dat.GUI();
var params = {
    Download_Image: function () { return save(); },
    Random_Seed: 0,
    Nb_mots: 20
};
gui.add(params, "Random_Seed", 0, 100, 1);
gui.add(params, "Nb_mots", 0, 50, 1);
gui.add(params, "Download_Image");
function draw() {
    background("#ebe8d4");
    randomSeed(params.Random_Seed);
    var n = params.Nb_mots;
    var x = 0;
    var y = 0;
    var new_x = 0;
    var size = [18, 36, 72];
    var spacing = [0, 1, 2, 3, 4, 5];
    var modulo = 0;
    var coeff = 0;
    for (var i = 0; i < n; i++) {
        fill('#25231f');
        textFont(myFont);
        textAlign(CENTER, CENTER);
        textSize(random(size));
        coeff = random(spacing);
        new_x = x + 225 * coeff;
        modulo = new_x % 900;
        y += ((new_x - modulo) / 900) * 60;
        x = modulo;
        text(random(liste_mots), x, y, 225, 60);
    }
}
var result_fr;
var result_en;
var result_it;
var myFont;
function preload() {
    result_fr = loadStrings('assets/liste_fr.txt');
    result_en = loadStrings('assets/liste_en.txt');
    result_it = loadStrings('assets/liste_en.txt');
    myFont = loadFont('assets/Helvetica.ttf');
}
var liste_mots = [];
var liste_lettres = ["b", "c", "d", "l", "o", "p", "q"];
function setup() {
    p6_CreateCanvas();
    for (var _i = 0, result_fr_1 = result_fr; _i < result_fr_1.length; _i++) {
        var mot = result_fr_1[_i];
        var caracteres = mot.split("");
        var drapeau = true;
        for (var _a = 0, caracteres_1 = caracteres; _a < caracteres_1.length; _a++) {
            var caractere = caracteres_1[_a];
            if (liste_lettres.indexOf(caractere) == -1) {
                drapeau = false;
                break;
            }
        }
        if (drapeau) {
            liste_mots.push(mot);
        }
    }
    for (var _b = 0, result_it_1 = result_it; _b < result_it_1.length; _b++) {
        var mot = result_it_1[_b];
        var caracteres = mot.split("");
        var drapeau = true;
        for (var _c = 0, caracteres_2 = caracteres; _c < caracteres_2.length; _c++) {
            var caractere = caracteres_2[_c];
            if (liste_lettres.indexOf(caractere) == -1) {
                drapeau = false;
                break;
            }
        }
        if (drapeau) {
            liste_mots.push(mot);
        }
    }
    for (var _d = 0, result_en_1 = result_en; _d < result_en_1.length; _d++) {
        var mot = result_en_1[_d];
        var caracteres = mot.split("");
        var drapeau = true;
        for (var _e = 0, caracteres_3 = caracteres; _e < caracteres_3.length; _e++) {
            var caractere = caracteres_3[_e];
            if (liste_lettres.indexOf(caractere) == -1) {
                drapeau = false;
                break;
            }
        }
        if (drapeau) {
            liste_mots.push(mot);
        }
    }
    console.log(liste_mots);
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map
var gui = new dat.GUI();
var params = {
    Ellipse_Size: 30,
    Download_Image: function () { return save(); },
};
gui.add(params, "Ellipse_Size", 0, 100, 1);
gui.add(params, "Download_Image");
function draw() {
    background("#495782");
    fill("white");
    noStroke();
    ellipse(mouseX, mouseY, params.Ellipse_Size);
}
var result;
function preload() {
    result = loadStrings('assets/liste_francais.txt');
}
var liste_mots = [];
var liste_lettres = ["b", "c", "d", "l", "o", "p", "q"];
function setup() {
    p6_CreateCanvas();
    for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
        var mot = result_1[_i];
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
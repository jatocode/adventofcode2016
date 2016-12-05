var md5hex = require('md5-hex');
var canvas = document.getElementById('advent-canvas');
var width = canvas.offsetWidth;
var height = canvas.offsetHeight;

var renderer = PIXI.autoDetectRenderer(width,height,{
    view: canvas
});
renderer.backgroundColor = 0x002040;

var stage = new PIXI.Container();
var letters = [];
for(var i=0;i<8;i++) {
    letters[i] = new PIXI.Text('_', {fontType:'courier', fontSize: '70px', fill: '#00FF00'});
    letters[i].x = width/2 - 300 + 75*i;
    letters[i].y = height/2;
    stage.addChild(letters[i]);
}
renderer.render(stage);

var doorID = 'ffykfhsq';

var index = 0;
var found = 0;
var password = new Array(8);

update();

function update() {

    if(found < 8) {

        var md5 = md5hex(doorID + index++);

        if(md5.startsWith('00000')) {
            var pos = md5[5];
            if(pos < 8 && password[pos] == undefined) {
                password[pos] = md5[6];
                found++;
                console.log(md5);
            }
        }
    }
    for(var i=0;i<password.length; i++) {
        var l = password[i];
        if(l == undefined) 
            letters[i].text = String.fromCharCode(Math.random()*26+97); 
        else
            letters[i].text = l; 
    }
    renderer.render(stage);
    requestAnimationFrame(update);
};

function  kalk(){

var F1=document.getElementById('F1').value
var F2=document.getElementById('F2').value
var R=document.getElementById('R').value
var L=document.getElementById('L').value
var C=document.getElementById('C').value
var C0=document.getElementById('C0').value


F1=parseFloat(F1)
F2=parseFloat(F2)
R=parseFloat(R)
L=parseFloat(L)
C=parseFloat(C) 
C0=parseFloat(C0)


L=L/1000;
C= C/1000000000;
C0=C0/1000000000;
console.log(L);
console.log(C);
console.log(C0);


// var ur=((1/L/C) *(1/L/C));
// var ua= (((1/L)*((1/C) + (1/C0))) * ((1/L)*((1/C) + (1/C0))));
// var k= ((ua-ur)/ua);
tochka=[]
fasa=[]
var u=[]
var dps1 = []
var dps2 = []



// document.getElementById("ua").innerHTML=ua
// document.getElementById("ur").innerHTML=ur
// document.getElementById("k").innerHTML=k
N=(F2-F1)/150000
i=F1
max = 0;
min = 100;
fmin = 0;
fmax=0;
k=0;
while (i<=F2){
    w= i*2*3.14;
    G= R/(R*R+(w*L-1/w/C)*(w*L-1/w/C));
    B = w*C0-(w*L-1/w/C)/(R*R+(w*L-1/w/C)*(w*L-1/w/C));
    Y = G*G+B*B;
    yy= Math.sqrt(Y);
    // if (yy>max) {max=yy; 
    //     fmax=i }
    // if (yy<min) {min=yy; 
    //     fmin= i }
    
    
    
    //yyy = Math.abs(yy);
    e = Math.atan(B/G);
    if ((-0.000001<=e) && (e<0.001)) {
        fasa.push(e);
        tochka.push(i)
    }
    //tochka.push(yyy);
    //fasa.push(e);
    //tochka.push(yy);
    m=i;
    u.push(m);
        dps1.push({
        x: m,
        y: e});
        // dps2.push({
        // x:m,
        // y:e});
    
    
    //console.log(dps1);
    // console.log(tochka);
    
    i=i+N
    //console.log(tochka[i])
}
fmin = tochka.slice(-1);
fmax =  tochka[0];

k= (fmin*fmin-fmax*fmax)/fmax/fmax;
k=Math.sqrt(k);

console.log(fasa);
console.log(tochka);

document.getElementById("ua").innerHTML=fmin
document.getElementById("ur").innerHTML=fmax
document.getElementById("k").innerHTML=k

var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    data: [{
        type: "spline",
        markerSize: 0,
        dataPoints: dps1 
    }]
});
chart.render();



}
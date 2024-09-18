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


chastota = []
tochka=[]
Y1=[]
Y2=[]
var u=[]
var dps1 = []
var dps2 = []


N=(F2-F1)/5000
i=F1
min07 = 100;
max = 0;
min = 0;
f2 = 0;
df = 0;
fmax=0;
y07 = 0;
k=0;
while (i<=F2){
    w= i*2*3.14;
    G= R/(R*R+(w*L-1/w/C)*(w*L-1/w/C));
    B = w*C0-(w*L-1/w/C)/(R*R+(w*L-1/w/C)*(w*L-1/w/C));
    Y = G*G+B*B;
    tochka.push(Y);
    chastota.push(i);


    if (Y>max) {max=Y; 
        fmax=i }
   
    y07 = max * 0.7;
    d07 = Math.abs(Y-y07);
    
    if (d07 < min07){
        f2 = i;
        min07= Y-y07;
    }
    df = (f2 - fmax)*2;
    Q = fmax/df;
    
    
    m=i;
    u.push(m);
        dps1.push({
        x: m,
        y: Y});
        
    
    i=i+N
}

document.getElementById("ua").innerHTML=df
document.getElementById("ur").innerHTML=fmax
document.getElementById("k").innerHTML=Q

var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    axisY: {
            stripLines: [{
            value: df,
            label: "0.7"
        }]
    },
    data: [{
        type: "spline",
        markerSize: 0,
        dataPoints: dps1 
    }]
});
chart.render();
}

// window.addEventListener('load',function(){

// })

  

const canvas=document.getElementById('canvas')
const ctx=canvas.getContext('2d');
canvas.height=400;
canvas.width=480;
 
var mouse={
    x:null,
    y:null
 }
 var lastmouse={
    x:null,
    y:null
 }
 var d=new Date()
  
 window.addEventListener('mousemove',function(e){
    lastmouse.x=mouse.x;
    lastmouse.y=mouse.y;
    mouse.x=e.clientX-canvas.offsetLeft+240;
    mouse.y=e.clientY-canvas.offsetTop+200;
 
     
     
    })
window.addEventListener('resize',function(e){
    canvas.width=480;
    canvas.height=400;
    
})


class ball{
    constructor(x,y,speedX,speedY,radius){
        this.x=x;
        this.y=y;
        this.speedX=speedX;
        this.speedY=speedY;
        this.radius=radius; 
    }
    draw() {
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2,false)
          ctx.fillStyle='white';
         ctx.fill() 
    }
    update(){
        
         ctx.clearRect(0,0,canvas.width,canvas.height) 
        this.x+=this.speedX;
        this.y+=this.speedY;
        if(this.y+this.radius>=380 && this.x+this.radius>=mouse.x-60 && this.x<=mouse.x-60){
            this.speedX=-this.speedX; 
            this.speedY=-this.speedY; 
        }
        else if(this.y+this.radius>=380 && this.x-this.radius<=mouse.x+60 && this.x>=mouse.x+60){
            this.speedX=-this.speedX; 
            this.speedY=-this.speedY; 
        }
        else if(this.y+this.radius>=380 && this.x>=mouse.x-60 && this.x<=mouse.x+60){ 
            this.speedY=-this.speedY;
         }
         else if(this.y+this.radius>380 ){
            console.log('refresh')
             // location.reload()
            
         }  
         //&& this.x+this.radius<mouse.x-60 && this.x-this.radius>mouse.x+60
         else if(this.x-this.radius<=0 || this.x+this.radius>=480){this.speedX=-this.speedX; }
        else if(this.y-this.radius<=0 || this.y+this.radius>=400){this.speedY=-this.speedY; }
        this.draw()
    }
}

class bricks{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.height=height;
        this.width=width;
        this.present=true;
    }
    draw(){
        if(this.present==true){
            ctx.beginPath()
            ctx.strokeStyle='white'
            ctx.lineWidth=2;
            ctx.strokeRect(this.x*40,this.y*10,this.width,this.height);
            ctx.fillStyle='blue'
            ctx.fillRect(this.x*40,this.y*10,this.width,this.height);
        }
       
     }
}

var ball1=new ball(240,350,2,-2,10);
function boardmaker(){
    if(mouse.x< 60){
         ctx.fillRect(0 ,380,120,20)
         return;
    }
    if(mouse.x> 420){
        ctx.fillRect(360 ,380,120,20)
        return;
   }
    ctx.fillStyle='white' 
    ctx.fillRect(mouse.x-60 ,380,120,20)
}

// function iscloseenough(ball,brick){
//     if(brick.present==true && ball.y-ball.radius<=brick.y+ brick.height && ball.x>=)
// }



var bricklist=[];
for( var i=0;i<5;i++){
    for(var j=0;j<12;j++){
         bricklist.push(new bricks(j,i,40,10))
    } 
}

 window.addEventListener('click',main)

function main(){
    window.removeEventListener('click',main)
    setInterval( function(){
        ball1.update()
        for(var i=bricklist.length-1;i>=0;i--){
            if(bricklist[i].present==true &&  ball1.y-ball1.radius<= bricklist[i].y*bricklist[i].height+bricklist[i].height && ball1.x>=bricklist[i].x*bricklist[i].width && ball1.x<=bricklist[i].x*bricklist[i].width+bricklist[i].width){
                ball1.speedY=-ball1.speedY;
                bricklist[i].present=false
                break;
            }
        }
        ball1.speedX+=.005
        boardmaker()
        for(var i=0;i<bricklist.length;i++){
            bricklist[i].draw()
        }  
    
    },1); 

}



 

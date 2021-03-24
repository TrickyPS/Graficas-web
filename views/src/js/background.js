var boxes = [],
    c = document.getElementById('container'),
    n = 50; 

new TimelineMax()
  .set(c, {width:'140%', height:300, left:'-20%', bottom:-35, perspective:800, transformPerspective:500})
  .set('.fog', {width:'200%', height:'100%', backgroundImage:'url(assets/fog.png)'})
  .set('.fog1', {backgroundPosition:'200px 180px', backgroundImage:'url(assets/fog2.png)', scale:1.2, alpha:0.0})
  .from('.fog1', 5, {rotation:0.01, x:-512*1.2, ease:Power0.easeNone, repeat:-1}, 0)
  .from('.fog2', 9, {rotation:0.01, x:-512, ease:Power0.easeNone, repeat:-1}, 0)
  
for (var i=0; i<n; i++){

  var b = document.createElement('div');
  b.className += 'box';
  boxes.push(b);
  c.appendChild(b);

  new TimelineMax()
    .set(b, {
      width:'100%',
      height:50,
      y:i*5.25,
      backgroundImage:'url(assets/waterDaytime.jpg)',
      backgroundPosition:'0px -'+String(i*5)+"px",
      transformOrigin:'50% -100%'
    }, 0)
    .to(b, 1.2, {
      y:'-='+String(40*(i/n)),
      scaleX:0.95+i/n*0.15,
      scaleY:2-i/n,
      rotation:0.01,
      yoyo:true,
      repeat:-1,
      ease:Sine.easeInOut
    }, i/n)
    .to(b, 2, {
      x:-30,
      yoyo:true,      
      repeat:-1,
      ease:Sine.easeInOut
    }, i/n)
  
}
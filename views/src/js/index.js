function SoundClick(){
    var aud = document.getElementById("soundclick");
    aud.play()
}




$("#btn_pc").click(function(){
    $(this).hide();
    $("#btn_multi").hide();
    $('#btn_back').show();
    $('#btn_empezar').show();
    $('#logo').hide();
    $('#carousel').show();
});

$("#btn_multi").click(function(){

    window.localStorage.setItem("modo","multijugador");
    window.localStorage.setItem("mapa",1);

    $(this).hide();
    $("#btn_pc").hide();
    $('#btn_back').show();
    $('#btn_empezar_multi').show();
    $('#logo').hide();
    $('#carousel').show();
});

$("#btn_back").click(function(){
  window.localStorage.removeItem("modo");
  window.localStorage.removeItem("mapa");
    $(this).hide();
    $('#btn_empezar').hide();
    $('#btn_empezar_multi').hide();
    $("#btn_pc").show();
    $("#btn_multi").show();
    $('#logo').show();
    $('#carousel').hide();
});


$("#btn_pc").click(function(){
  
  var
    carousels = document.querySelectorAll('.carousel')
  ;

  for (var i = 0; i < carousels.length; i++) {
    carousel(carousels[i]);
  }
});

$("#btn_multi").click(function(){
  var
    carousels = document.querySelectorAll('.carousel')
  ;

  for (var i = 0; i < carousels.length; i++) {
    carousel(carousels[i]);
   
  }
});

function carousel(root) {
  var
    figure = root.querySelector('figure'),
    nav = root.querySelector('nav'),
    images = figure.children,
    n = images.length ,
    
    gap = root.dataset.gap || 0,
    bfc = 'bfc' in root.dataset,
    
    theta =  2 * Math.PI / n,
    currImage = 0
  ;
  setupCarousel(n, parseFloat(getComputedStyle(images[0]).width));
  window.addEventListener('resize', () => { 
    setupCarousel(n, parseFloat(getComputedStyle(images[0]).width)) 
  });

  setupNavigation();

  function setupCarousel(n, s) {
    var 
      apothem = s / (2* Math.tan(Math.PI / n)) 
    ;
    console.log(apothem);
    figure.style.transformOrigin = `50% 50% ${ -apothem}px`;

    for (var i = 0; i < n; i++)
      images[i].style.padding = `${gap}px`;
    for (i = 1; i < n; i++) {
      images[i].style.transformOrigin = `50% 50% ${- apothem}px`;
      images[i].style.transform = `rotateY(${i * theta}rad)`;
    }
    if (bfc)
      for (i = 0; i < n; i++)
         images[i].style.backfaceVisibility = 'hidden';
    
    rotateCarousel(currImage);
  }

  function setupNavigation() {
    nav.addEventListener('click', onClick, false);
    
    function onClick(e) {
      e.stopPropagation();
      
      var t = e.target;
      if (t.tagName.toUpperCase() != 'BUTTON')
        return;
      
      if (t.classList.contains('next')) {

        currImage++;
      }
      else {
        currImage--;
      }
      //alert(currImage);
      rotateCarousel(currImage);
    }
      
  }

  function rotateCarousel(imageIndex) {
    figure.style.transform = `rotateY(${imageIndex * -theta}rad)`;
  }
  
}
var container = document.querySelector('.container');
var pageGroup = document.querySelector('.pageGroup');
var shredderGroup = document.querySelector('.shredderGroup');
var stripGroup = document.querySelector('.stripGroup');
var nullObject = document.querySelector('.null-object');
var pageMask = document.querySelector('.pageMask');
var lightBlink = document.querySelector('.lightBlink');
var link = document.querySelector('.link');

var bendLeftAmount = 0;
var bendRightAmount = 0;
nullObject.bendL = 0;
nullObject.bendR = 0;

var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
TweenMax.set(pageMask, {
  attr:{
    y:(isFirefox) ? 300 : 0
  }
})

TweenMax.set([container, 'svg'], {
  position: 'absolute',
  top: '50%',
  left: '50%',
  xPercent: -50,
  yPercent: -50
});
//blink the light
TweenMax.to(lightBlink, 0.3, {
  fill: '#fff',
  repeat: -1,
  ease: SteppedEase.config(1),
  yoyo: true
})
var tl = new TimelineMax({
  delay: 0.2,
  repeat: -1,
  onRepeat: resetBends
});

tl.set(pageMask, {
    y: 300
  })
  .set(pageGroup, {
    y: -300
  })
  .set('.strip', {
    y: -300
  })
  .to(pageMask, 1, {
  attr:{
    y: (isFirefox) ? -300 : 0
  },
  y:(isFirefox) ? 0 : -300,
    ease: Power1.easeInOut
  })

  .to(pageGroup, 1, {
    y: 300,
    ease: Power1.easeInOut
  }, '-=1')

  .to('.strip', 0.5, {
    y: -20,
    ease: Power1.easeOut
  }, '-=0.5')

  .to(nullObject, 0.8, {
      bendL: 0,
      onUpdate: bendLeft,
      ease: SlowMo.ease.config(0.1, 0.8, false)
    }, '-=0.3')
  .to(nullObject, 0.8, {
    bendR: 0,
    onUpdate: bendRight,
    ease: SlowMo.ease.config(0.4, 0.8, false)
  }, '-=0.8')
  .to('.left', 0.3, {
    rotation: 3
  }, '-=0.5')

.staggerTo('.strip', 0.6, {
  y: 300,
  ease: Power4.easeIn
}, 0.07, '-=0.5')

function bendLeft() {
  bendLeftAmount -= 0.6;

  TweenMax.set('.left', {
    attr: {
      d: "M214,360c0,0,0,126.7,0,138 c0,36.3," + bendLeftAmount + ",72," + bendLeftAmount + ",72"
    }
  })

}

function bendRight() {
  bendRightAmount += 0.6;

  TweenMax.set('.right', {
    attr: {
      d: "M399,360c0,0,0,132.7,0,144	c0,30.3," + bendRightAmount + ",66," + bendRightAmount + ",66"
    }
  })

}

function resetBends() {

  bendLeftAmount = 0;
  TweenMax.set('.left', {
    attr: {
      d: "M214,360c0,0,0,126.7,0,138 c0,36.3," + bendLeftAmount + ",72," + bendLeftAmount + ",72"
    }
  });

  bendRightAmount = 0;
  TweenMax.set('.right', {
    attr: {
      d: "M399,360c0,0,0,132.7,0,144	c0,30.3," + bendRightAmount + ",66," + bendRightAmount + ",66"
    }
  })

}

link.onclick = function(e){
  				window.open('https://codepen.io/chrisgannon/pen/BNaVQO', '_new');
}


// badge scroll
const badgeEl = document.querySelector('header .badges');

// to-top
const toTopEl = document.querySelector('.to-top')

// lodash
// _.throttle(함수(){},시간)
// window.addEventListener('scroll',function(){
//   console.log(window.scrollY)
// })
window.addEventListener('scroll',_.throttle(function(){
  console.log(window.scrollY)
  // 배지의 위치가 500이상이면 보이고 이하면 안보이게 처리
  if(window.scrollY > 500){
    // gsap lbs
    //gsap.to(요소, 지속시간, {옵션})
    // badgeEl.style.display = 'none'
    gsap.to(badgeEl,.6,{
      opacity:0,
      display :'none'
    });
    gsap.to(toTopEl, .7, {
      x : 0
    });
  } else {
    // badgeEl.style.display = 'block';
    gsap.to(badgeEl,.6,{
      opacity:1,
      display:'block'
    });
    gsap.to(toTopEl, .7, {
      x : 100
    });
  };
},300));

//to-top 버튼 클릭 상단 이동
toTopEl.addEventListener('click',function(){
  gsap.to(window, .7,{
    // 쓸려면 플러그인 연결이 되어야함
    scrollTo:0
  })
})

// 순차적으로 visual 안의 이미지를 보여줌
// 이미지 부분을 fade--in 그룹화
const fadeEls = document.querySelectorAll(".visual .fade--in");
fadeEls.forEach(function(fadeIn,idx){
  //gsap.to(요소,시간,{옵션})
  gsap.to(fadeIn,1,{
    // 0.7초, 1.4초, 2.1초, 2.8초
    // index 번호*.7 만큼 딜레이
    delay:(idx+1) * .7,
    opacity:1
  })
});

// 공지사항 스와이퍼 적용
// 스와이퍼를 여려개 담기 위해 변수에 적용
// 객체 생성 -> 대상
const swiper = new Swiper('.notice-line .swiper',{
  direction : 'vertical',
  autoplay : true,
  loop :true
});

// pagination: ... 버튼
// navigation: 화살표
const swiper2 = new Swiper('.promotion .swiper',{
  slidesPerView : 3, //화면의 3개의 요소를 보여준다(안넣으면 기본 1개)
  spaceBetween : 10, //슬라이드 사이의 여백
  centeredSlides : true, // 1번 슬라이드를 가운데 배치
  loop:true, //무한반복
  autoplay:{
    delay : 5000
  },
  pagination : {
    el : '.promotion .swiper-pagination',
    clickable:true
  },
  navigation : {
    prevEl : '.promotion .swiper-button-prev',
    nextEl : '.promotion .swiper-button-next',
  }
})

const swiper3 = new Swiper('.awards .swiper',{
  autoplay :true,
  loop:true,
  spaceBetween:30,
  slidesPerView:5,
  navigation:{
    prevEl : '.awards .swiper-button-prev',
    nextEl : '.awards .swiper-button-next'
  }
})


//토글버튼 클릭시 promotion 닫힘 & 열림
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion')

let isHidePromotion = false;

promotionToggleBtn.addEventListener('click',()=>{
  // 동적 표현
  isHidePromotion = !isHidePromotion;
  if(isHidePromotion){
    // isHidePromotion이 true일 때 실행
    promotionEl.classList.add('hide')
  } else{
    // isHidePromotion이 false일 때 실행
    promotionEl.classList.remove('hide')
  }
})




//floating 움직임을 적용
// random()를 사용해서 무작위 숫자를 추출
// random()->최대값, 최소값
function random(min,max){
  // .toFixed를 통해 반환된 문자데이터를(소수점 2자리까지 반환)
  // parseFloat을 통해서 소수점을 가지는 숫자로 반환
  // Math.random() 0~1까지 표현0.00001도 포함
  // (max - min) + min ->난수값을 갖기 위해 max값만 안쓰고 min값과 같이 씀->임의의 숫자를 계속 뽑아내기 위해(max값만 쓰면 고정값)
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

// 유튜브 위 이미지, 추가 동작 적용
// gsap.to(요소, 시간,{옵션})
// selector(요소)
// delay(시간)
// size(범위)
function floatingObject(selector, delay,size){
  gsap.to(selector, random(1.5, 2.5),{
    // y축으로 움직이는 범위
    y : size,
    repeat: -1,
    // 무한 반복, 자바스크립트에서 지원하는 동작
    yoyo : true,
    // gsap의 easesing 
    ease : Power1.easeInOut,
    delay : random(0,delay)
    
  })
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

// scroll magic
const spyEls = document.querySelectorAll('.scroll-spy')
// 여러개의 이미지라 forEach
spyEls.forEach(function(spyEl){
  new ScrollMagic
  // scrollMagic에서 사용
    .Scene({
      //보여질 여부를 감사, 요소 지정
      triggerElement : spyEl,
      // 화면의 높이를 0에서 1이라 보고 .8위치에 오면 적용
      // 기능이 걸려있는 부분(실행 위치)
      triggerHook : .8,
    })
    // setClassToggle -> spyEl에 show클래스를 추가
    .setClassToggle(spyEl,'show')
    .addTo(new ScrollMagic.Controller())
});



// to-top 버튼을 클릭하면 문서의 상단으로 이동
// gsap에서 모든 기능들을 구현 한다면
// 로딩시간 등 무거운 사이트가 된다.
// 이를 보완하기 위해 별도기능 즉 기능별로 구현
// gsap ScrollToPlugin cdn
// window에서 적용 ->상단의 window 이벤트로 이동 작성
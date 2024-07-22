// youtube Api(youtube iframe API 2~3번 까지 복붙)

let tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// onYouTubeIframeAPIReady 함수 이름은,
// youtube Iframe Player API에서 사용하는 이름이기 때문에
// 다른 이름으로 작성하면 안된다.
// 함수는 전역으로 등록해야 한다
function onYouTubeIframeAPIReady() {
  new YT.Player('player', {
    videoId: 'An6LvWQuj_8', //최초로 재생할 영상 id
    playerVars : { 
      autoplay: true,
      loop : true,
      playlist:'An6LvWQuj_8' //반복 재생할 영상 id
    },
    events: {
      'onReady': function(e){
        e.target.mute() //음소거
      }
    }
  });
}

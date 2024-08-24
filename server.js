let http = require('http'); //node.js가 가지고 있는 모듈(http) 불러오기
let url= require('url'); //url 모듈 가져오기
function start(route, handle) {
  function onRequest(request, response) { // 요청, 응답 
    let pathname= url.parse(request.url).pathname;
    let queryData=url.parse(request.url,true).query;

    route(pathname, handle, response,queryData.productId);
  }
  
  http.createServer(onRequest).listen(8888); //포트 번호
  // localhost:8888
}

exports.start = start; // 바깥에서 start를 사용할 수 있게 한다는 뜻
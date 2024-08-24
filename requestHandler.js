const fs = require('fs');
const main_view = fs.readFileSync('./main.html', 'utf-8');
const orderlist_view = fs.readFileSync('./orderlist.html', 'utf-8');

const mariadb = require('./database/connect/mariadb');

function main(response) {
  console.log ('main');


  mariadb.query("SELECT * FROM product" , function(err,rows){
    console.log(rows);
  });

  response.writeHead(200,{'Content-Type':'text/html; charset=UTF-8'}); // 웹 서버가 클라이언트에게 응답을 해줄 때 => 코드 200(정상) , 응답 타입: html
  response.write(main_view); // 화면에 뿌려줄 데이터  
  response.end(); // 응답 날아감
}

function redRacket(response) {
  fs.readFile('./img/redRacket.png',function(err, data){
    response.writeHead(200,{'Content-Type':'text/html; charset=UTF-8'}); 
    response.write(data); 
    response.end();
  }) 
}

function blueRacket(response) {
  fs.readFile('./img/blueRacket.png',function(err, data){
    response.writeHead(200,{'Content-Type':'text/html; charset=UTF-8'}); 
    response.write(data); 
    response.end();
  }) 
}

function blackRacket(response) {
  fs.readFile('./img/blackRacket.png',function(err, data){
    response.writeHead(200,{'Content-Type':'text/html; charset=UTF-8'}); 
    response.write(data); 
    response.end();
  }) 
}

function order(response, productId){
  response.writeHead(200,{'Content-Type':'text/html; charset=UTF-8'}); 

  mariadb.query("INSERT INTO orderlist VALUES ("+productId+", '"+ new Date().toLocaleDateString() + "');",function(err,rows){
    console.log(rows);
  });

  response.write('order page'); 
  response.end();
}

function orderlist(response) {
  response.writeHead(200,{'Content-Type':'text/html; charset=UTF-8'});

  mariadb.query("SELECT * FROM orderlist" , function (err,rows) {
    response.write(orderlist_view);

    rows.forEach(element => {
      response.write("<tr>"
                    +"<td>"+element.product_id+"</td>" 
                    +"<td>"+element.order_date+"</td>" 
                    +"</tr>"
      )
    });

    response.write("</table>");
    response.end();
  })

}

let handle = {}; // key:value
handle['/']= main;
handle['/order']=order;
handle['/orderlist']=orderlist;

/* img directory */
handle['/img/redRacket.png']=redRacket;
handle['/img/blueRacket.png']=blueRacket;
handle['/img/blackRacket.png']=blackRacket;

exports.handle = handle;
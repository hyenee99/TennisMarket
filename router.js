function route(pathname, handle, response, productId) {
  console.log('pathname : '+ pathname);

  if(typeof handle[pathname] === 'function'){
    handle[pathname](response,productId);
  }
  else {
    response.writeHead(404,{'Content-Type':'text/html; charset=UTF-8'}); 
    response.write('Not Found'); 
    response.end(); 
  }
}

exports.route = route;
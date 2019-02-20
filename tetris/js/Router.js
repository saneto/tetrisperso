export default class Router{
	constructor()
	{
  		this.routes = {};
	}

	addroute(pathName, path, idview) {
      this.routes[pathName] = {path: path, idview :idview };
  }

  remove(name) {
      delete this.routes[name];
  }


	navigate(pathName)
	{
      this.ajaxCall(this.routes[pathName].path,this.routes[pathName].idview);
	}

  router()
  {
    var url = location.hash.slice(1) || '/';
    this.navigate(url);
  }

  ajaxCall(Url,idview)
  { 
    let xmlhttp = new XMLHttpRequest();

       xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == XMLHttpRequest.DONE) {   
             if (xmlhttp.status == 200) {
                 document.getElementById(idview).innerHTML = xmlhttp.responseText;
             }
             else if (xmlhttp.status == 400) {
                alert('There was an error 400');
             }
             else {
                 alert('something else other than 200 was returned');
             }
          }
      };

      xmlhttp.open("GET", Url, true);
      xmlhttp.send()
  }

}
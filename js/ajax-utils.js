(function(global){
	//set up a name space
	var ajaxUtils = {};

	//return http request; 
	function getRequestObject(){
		if(window.XMLHttpRequest){
			return (new XMLHttpRequest());
		}
		else{
			global.alert("ajax is not supported!");
			return (null);
		}
	}

	//get request  
	ajaxUtils.sendGetRequest = 
  	function(requestUrl, responseHandler, isJsonResponse) {
    	var request = getRequestObject();
    	request.onreadystatechange = 
      	function() { 
        	handleResponse(request, 
                       responseHandler,
                       isJsonResponse); 
      };
    request.open("GET", requestUrl, true);
    request.send(null); // for POST only
  };

	//function handleresponse  封装好的代码

	function handleResponse(request, responseHandler, isJsonResponse){
		if((request.readyState == 4) &&
     (request.status == 200)){
			// Default to isJsonResponse = true
	    if (isJsonResponse == undefined) {
	      isJsonResponse = true;
	    }

	    if (isJsonResponse) {
	      responseHandler(JSON.parse(request.responseText));
	    }
	    else {
	      responseHandler(request.responseText);
	    }
	  }
	}

	global.$ajaxUtils = ajaxUtils;
})(window);
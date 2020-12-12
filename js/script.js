$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });

  // In Firefox and Safari, the click event doesn't retain the focus
  // on the clicked button. Therefore, the blur event will not fire on
  // user clicking somewhere else in the page and the blur event handler
  // which is set up above will not be called.
  // Refer to issue #28 in the repo.
  // Solution: force focus on the element that the click event fired on
  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });
});

//IMDINVOK
(function(global){
  var dc = {};

  var homeHtml = "snippets/home-snippets.html";

  //inserting innerhtml on selected element
  var insertHtml = (selector,html) => {
    document.querySelector(selector).innerHTML = html;
  }

  //show loading icon
  var showLoading = function(selector){
    let html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector,html);
  }

  //on page load
  document.addEventListener("DOMContentLoaded",(event) =>{
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(homeHtml,(responseText) => {
      document.querySelector("#main-content")
      .innerHTML = responseText;
    }, false);
  });

  global.$dc = dc;
})(window);
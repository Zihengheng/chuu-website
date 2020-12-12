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

  // specify urls
  var homeHtml = "snippets/home-snippets.html";
  var categoriesTitleHtml = "snippets/categories-title-snippets.html";
  var categoryHtml = "snippets/categoty-snippet.html";
  //json file
  var allCategoriesUrl =
  "https://davids-restaurant.herokuapp.com/categories.json";
 

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

  // Return substitute of '{{propName}}'
  // with propValue in given 'string'
  var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
  }

  //on page load
  document.addEventListener("DOMContentLoaded",(event) =>{
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(homeHtml,(responseText) => {
      document.querySelector("#main-content")
      .innerHTML = responseText;
    }, false);
  });

  //load menu categories
  dc.loadMenuCategories = function(){
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(allCategoriesUrl,
      buildAndShowCategories);
  }

  //// Build HTML for the categories page
  function buildAndShowCategories(categories){
    //load title snippets
    $ajaxUtils.sendGetRequest(categoriesTitleHtml,
      (categoriesTitleHtml)=> {
        $ajaxUtils.sendGetRequest(categoryHtml,
          (categoryHtml) => {
            var categoriesViewHtml =
            buildCategoriesViewHtml(categories,
                                    categoriesTitleHtml,
                                    categoryHtml);
            insertHtml("#main-content", categoriesViewHtml);
          },false);
      },false);
  }

  // Using categories data and snippets html
  // build categories view HTML to be inserted into page
  function buildCategoriesViewHtml(categories,
                                 categoriesTitleHtml,
                                 categoryHtml) {

  var finalHtml = categoriesTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over categories
  for (var i = 0; i < categories.length; i++) {
    // Insert category values
    var html = categoryHtml;
    var name = "" + categories[i].name;
    var short_name = categories[i].short_name;
    html =
      insertProperty(html, "name", name);
    html =
      insertProperty(html,
                     "short_name",
                     short_name);
    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
  }

  global.$dc = dc;
})(window);
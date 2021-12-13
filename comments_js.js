var csvArray = [],
    sectionName = "",
    userName = "",
    annotation = " ",
    comment = "",
    changed = 0,
    timestamp = "",
    artboardName = "",
    pageName = document.title;

function comma4dash(commaStr) {
  return commaStr.replace(/,/g, '-'); //will replace commas for a dash
}


var elements = document.querySelectorAll('#ccx-comments-list li');
Array.prototype.forEach.call(elements, function(el, i){
  if (el.classList.contains("global-section-header")) {
    sectionName = el.querySelectorAll(".title.truncated")[0].textContent;
    csvArray.push(pageName + "," + sectionName + ", - , - ,-" + artboardName + "," + "\n");
    return;
  }
  if (document.querySelectorAll("div[data-stringtype='artboardName']").length>0) {
    sectionName = document.querySelectorAll("div[data-stringtype='artboardName']")[0].innerText;
  }
  if (el.querySelectorAll(".timestamp").length>0) {
    timestamp = el.querySelectorAll(".timestamp")[0].textContent;
    changed = 1;
  }
  if (el.querySelectorAll(".user-name").length>0) {
    userName = el.querySelectorAll(".user-name")[0].childNodes[0].textContent;
    changed = 1;
  }
  if (el.querySelectorAll(".comment-text").length>0) {
    comment = el.querySelectorAll(".comment-text span div")[0].textContent;
    comment = comment.replace(/(\r\n|\n|\r)/gm,""); //remove line breaks
    changed = 1;
  }
  if (el.querySelectorAll(".annotation-marker").length>0) {
    annotation = el.querySelectorAll(".annotation-marker")[0].textContent;
    changed = 1;
  } else (annotation = " ");

  changed?(csvArray.push(pageName + "," + comma4dash(sectionName) + "," + comma4dash(artboardName) + comma4dash(timestamp) + "," + comma4dash(userName) + ",\"" + comma4dash(comment) + "\"," + annotation + "\n"), changed=0):'';

});

console.dir (csvArray.join(""));

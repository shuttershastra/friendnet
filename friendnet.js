function getSWF(movieName) { if (navigator.appName.indexOf("Microsoft") != -1) { return window[movieName]; } else { if(document[movieName].length != undefined){ return document[movieName][1]; } return document[movieName]; }

} 

function loadFriends() {
  var req = opensocial.newDataRequest();

  req.add(req.newFetchPersonRequest(opensocial.DataRequest.PersonId.OWNER), 'viewer');

  var opt_params = {};
  opt_params[opensocial.DataRequest.PeopleRequestFields.MAX] = 100; 

  req.add(req.newFetchPeopleRequest('OWNER_FRIENDS', opt_params), 'viewerFriends');
  req.send(onLoadFriends);
}

function onLoadFriends(data) {

  output(data.get("viewer").getData().getDisplayName());

  var viewer = data.get('viewer').getData();
  var count=indata.getTotalSize(); 
  var viewerFriends = data.get('viewerFriends').getData();
  
  html = new Array();
  html.push('<ul>');
  viewerFriends.each(function(person) {
    //html.push('<li>' + person.getDisplayName() + "</li>");
    getSWF('FlexJSTutorial').addPerson(person.getDisplayName() , '42', 'male');
  });
  html.push('</ul>');
  document.getElementById('friends').innerHTML = html.join('');
  //document.getElementById('fcount').innerHTML = '' + count;
  //document.getElementById('me').innerHTML = viewer.getDisplayName();
  gadgets.window.adjustHeight();
}

function init() {
  var app = getSWF('FlexJSTutorial');
  if (!app) output('app missing');
  else app.addPerson('loading ...', '23', 'bb');
  loadFriends();
}

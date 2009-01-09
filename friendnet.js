function getSWF(movieName) { 
  if (navigator.appName.indexOf("Microsoft") != -1) { 
    return window[movieName]; 
  } else { 
    if(document[movieName].length != undefined) { 
      return document[movieName][1]; } 
    return document[movieName]; 
  }
} 

function loadFriends() {
  var req = opensocial.newDataRequest();

  req.add(req.newFetchPersonRequest('OWNER'), 'viewer');

  var opt_params = {};
  opt_params[opensocial.DataRequest.PeopleRequestFields.MAX] = 100; 

  req.add(req.newFetchPeopleRequest('OWNER_FRIENDS', opt_params), 'viewerFriends');
  req.send(onLoadFriends);
}

function onLoadFriends(data) {

  //output(data.get("viewer").getData().getDisplayName());

  var viewer = data.get('viewer').getData();
  var count=indata.getTotalSize(); 
  var viewerFriends = data.get('viewerFriends').getData();
  
  html = new Array();
  html.push('<ul>');
  viewerFriends.each(function(person) {
    html.push('<li>' + person.getDisplayName() + "</li>");    
  });
  html.push('</ul>');
  getSWF('EISample').add_friends(html.join(''));
  document.getElementById('friends').innerHTML = html.join('');
  //document.getElementById('fcount').innerHTML = '' + count;
  //document.getElementById('me').innerHTML = viewer.getDisplayName();
  //gadgets.window.adjustHeight();
}

function init() {
  var app = getSWF('EISample');
  if (!app) output('app missing');
  else {
    app.add_friends('loading ...');
  }
  loadFriends();
}

function loadFriends() {
  var req = opensocial.newDataRequest();

  req.add(req.newFetchPersonRequest(opensocial.DataRequest.PersonId.OWNER), 'viewer');

  var opt_params = {};
  opt_params[opensocial.DataRequest.PeopleRequestFields.MAX] = 100; 

  req.add(req.newFetchPeopleRequest('OWNER_FRIENDS', opt_params), 'viewerFriends');
  req.send(onLoadFriends);
}

function onLoadFriends(data) {
  var viewer = data.get('viewer').getData();
  var count=indata.getTotalSize(); 
  var viewerFriends = data.get('viewerFriends').getData();
  
  html = new Array();
  html.push('<ul>');
  viewerFriends.each(function(person) {
    html.push('<li>' + person.getDisplayName() + "</li>");
  });
  html.push('</ul>');
  document.getElementById('friends').innerHTML = html.join('');
  document.getElementById('fcount').innerHTML = count;
  document.getElementById('me').innerHTML = viewer.getDisplayName();
}

function init() {
  loadFriends();
}

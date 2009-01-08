function loadFriends() {
  var req = opensocial.newDataRequest();
  req.add(req.newFetchPersonRequest(opensocial.DataRequest.PersonId.OWNER), 'viewer');


  var viewerFriends = opensocial.newIdSpec({ "userId" : "OWNER", "groupId" : "FRIENDS" });
  var opt_params = {};
  opt_params[opensocial.DataRequest.FilterType ] = opensocial.DataRequest.FilterType.ALL;

  req.add(req.newFetchPeopleRequest(viewerFriends, opt_params), 'viewerFriends');
  req.send(onLoadFriends);
}

function onLoadFriends(data) {
  var viewer = data.get('viewer').getData();
  var viewerFriends = data.get('viewerFriends').getData();
  
  html = new Array();
  html.push('<ul>');
  viewerFriends.each(function(person) {
    html.push('<li>' + person.getDisplayName() + "</li>");
  });
  html.push('</ul>');
  document.getElementById('friends').innerHTML = html.join('');
}

function init() {
  loadFriends();
}

function loadFriends() {
  var req = opensocial.newDataRequest();
  req.add(req.newFetchPersonRequest('VIEWER'), 'viewer');
  req.add(req.newFetchPeopleRequest('VIEWER_FRIENDS'), 'viewerFriends');
  req.send(onLoadFriends);
}

function onLoadFriends(data) {
  var viewer = data.get('viewer').getData();
  var viewerFriends = data.get('viewerFriends').getData();
  
  html = new Array();
  html.push('<select id="person">');
  viewerFriends.each(function(person) {
    html.push('<option value="' + person.getId() + '">' + person.getDisplayName() + "</option>");
  });
  html.push('</select>');
  document.getElementById('friends').innerHTML = html.join('');
}

function init() {
  loadFriends();
}

/** From http://www.jstott.me.uk/jscoord/ **/
function Distance (latFrom, lngFrom, latTo, lngFrom) {
  var er = 6366707; /** Meters **/

  var latFrom = deg2rad(latFrom);
  var lngFrom = deg2rad(lngFrom);
  var latTo   = deg2rad(latTo);
  var lngTo   = deg2rad(lngTo);

  var x1 = er * Math.cos(lngFrom) * Math.sin(latFrom);
  var y1 = er * Math.sin(lngFrom) * Math.sin(latFrom);
  var z1 = er * Math.cos(latFrom);

  var x2 = er * Math.cos(lngTo) * Math.sin(latTo);
  var y2 = er * Math.sin(lngTo) * Math.sin(latTo);
  var z2 = er * Math.cos(latTo);

  var d = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)+(z1-z2)*(z1-z2));

  return d;
}

function deg2rad(x) {
  return x * (Math.PI / 180);
}

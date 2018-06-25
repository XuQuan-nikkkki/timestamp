exports.timeFormat = function(str, len) {
  if(str.length < len) {
    str = "0" + str;
    return exports.timeFormat(str, len);
  } else if(str.length == len) {
    return str;
  }
}

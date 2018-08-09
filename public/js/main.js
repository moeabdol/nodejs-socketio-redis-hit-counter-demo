$(document).ready(function() {
  var arr1 = [1, 2, 3, 4, 5];
  var arr2 = [6, 7, 8, 9, 10];

  function addArrays() {
    return arr1 + ',' + arr2;
  }

  console.log(addArrays());

  var socket = io('http://localhost:3000');

  socket.on('connect', function() {
    console.log('connected to server');

    if (window.location.hash) {
      const hashID = window.location.hash.substring(1);
      socket.emit('hello', { hashID: hashID });
    }
  });

  socket.on('stats', hits => {
    document.getElementById('hitCount').innerText = hits;
  });
});

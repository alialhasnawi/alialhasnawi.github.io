document.addEventListener('DOMContentLoaded', function(e) {
  const glCanvas = document.querySelector('#glCanvas');
  const GL = glCanvas.getContext('webgl');

  if (GL === null) {
    alert('Please enable WebGL in order to use this <3');
    return;
  }

  GL.clearColor(1.0, 0.0, 1.0, 1.0);
  GL.clear(GL.COLOR_BUFFER_BIT);

});
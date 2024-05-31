function myFunction() {
    var x = document.getElementsByClassName("mission-msg");
    if (x.style.visibility === 'hidden') {
      x.style.visibility = 'visible';
    } else {
      x.style.visibility = 'hidden';
    }
  }
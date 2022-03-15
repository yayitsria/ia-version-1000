// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, options);
});
  // Add your javascript here

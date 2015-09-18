 
/*
  Updated: 2014-08-13 11:47:25.160165
  Readable Source in //Ceres/training/webmaps/Bsouthga_mugroup/webdev_repo/stateOfRetirement/js/
  bsouthga(at)urban(dot)org
*/

function ie_check(func){if($('html').prop('class')==="")func();else{$('body').empty();$('body').append('<div id="browser_check">'+'<h2>Ancient Browser Alert!</h2> '+'<p>'+'Hello! <br/><br/> You appear to be using a version of Internet Explorer less than 10.0. '+'The graphics on this site require modern technology not present in older versions of Internet Explorer. '+'<em id="using_ie_10">If you are actually using Internet Explorer 10 or greater</em>, make sure that <a href="http://windows.microsoft.com/en-us/internet-explorer/use-compatibility-view#ie=ie-10-win-7">"Compatibility View"</a> is not enabled. '+'Otherwise, consider <a href="http://browsehappy.com/?locale=en">upgrading to a modern browser</a>. <br/><br/><a href="http://www.urban.org">Return to Urban\'s website</a>'+'</p>'+'<div>');}}
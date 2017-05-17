// Isotope filtering
//========================================
var $grid = $('.checklist').isotope();
setTimeout(function(){
  $grid.isotope({
    transitionDuration: 0,
    filter: ".series-b, .series-a"
  });
}, 0);

var currentStage = 'series-b';
var currentClickId = '';
var liChecked = [];
var hash = '';

// Show series-a items
$('.filter-bar .seriesa').on( 'click', function() {
  $(this).parent().parent().removeClass('selected-two selected-three').addClass('selected-one');
  $grid.isotope({
    transitionDuration: 300,
    filter: ".series-a"
  });
  currentStage = 'series-a';
  countCheck(currentStage);
  changeHash();
});
// Show series-b items
$('.filter-bar .seriesb').on( 'click', function() {
  $(this).parent().parent().removeClass('selected-one selected-three').addClass('selected-two');
  $grid.isotope({
    transitionDuration: 300,
    filter: ".series-b, .series-a"
  });
  currentStage = 'series-b';
  countCheck(currentStage);
  changeHash();
});
// Show post-series-b item
$('.filter-bar .post-seriesb').on( 'click', function() {
  $(this).parent().parent().removeClass('selected-two selected-one').addClass('selected-three');
  $grid.isotope({
    transitionDuration: 300,
    filter: '*'
  })
  currentStage = 'post-series-b';
  countCheck(currentStage);
  changeHash();
});

// Smooth scrolling
//========================================
$('nav a').click(function(e){
  e.preventDefault();
  $('nav li').removeClass('active');
  $(this).parent().addClass('active');
  var target = $(this).attr('href');

  $('html, body').animate({
    scrollTop: $(target).offset().top - 100
  }, 1000);
});

// Check
//========================================
$('.check').click(function(){
  var liClicked = $(this).parent().parent().attr('id');
  currentClickId = liClicked;
  if ($(this).hasClass('checked')) {
    $(this).removeClass('checked');
    $(this).parent().find('.expend-bar').removeClass('checked');
    for ( var i = 0; i < liChecked.length; i++ ) {
      if ( liChecked[i] === liClicked ) {
        var index = liChecked.indexOf(liChecked[i]);
        liChecked.splice(index, 1);
      }
    }
  }
  else {
    $(this).addClass('checked');
    $(this).parent().find('.expend-bar').addClass('checked');
    liChecked.push(liClicked);
  }
  countCheck(currentStage);
  changeHash();
});

// Expend/collapse
//========================================
$('.btn, .expend-bar').click(function(){
  var parent = $(this).parent().parent();
  var body = $(parent).find(".body");

  if ($(parent).hasClass('expend')) {
    $(parent).removeClass('expend');
    $(body).slideUp(300);
    $grid.isotope();
  }
  else {
    $(parent).addClass('expend');
    $(body).slideDown(300);
    $grid.isotope();
  }
});

// Open/close menu mobile
//========================================
$('.burger').click(function(){
  $('.mobile-menu').show();
  setTimeout(function(){
    $('.mobile-menu').addClass('open');
  }, 100);
});
$('.close, .mobile-menu .nav a').click(function(){
  $('.mobile-menu').removeClass('open');

  setTimeout(function(){
    $('.mobile-menu').hide();
  }, 600);
});

// Open share links in a popup
//========================================
$('.social a, .social-mob a').click(function(e){
  e.preventDefault();
  function mypopup(link) {
    mywindow = window.open(link, "Share it!", "location=1,status=1,scrollbars=1,  width=900,height=700");
    mywindow.moveTo(window.innerWidth/4, 100);
  }
  mypopup($(this).attr('href'));
});

// Scrollspy
//========================================
$(function() {
  var lastId,
      topMenu = $("nav ul"),
      topMenuHeight = topMenu.outerHeight()+200,
      menuItems = topMenu.find("a"),
      scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      });
  menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - 120;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 1000);
    e.preventDefault();
  });

  $(window).scroll(function(){
     var fromTop = $(this).scrollTop()+topMenuHeight;
     var cur = scrollItems.map(function(){
       if ($(this).offset().top < fromTop)
         return this;
     });
     cur = cur[cur.length-1];
     var id = cur && cur.length ? cur[0].id : "";

     if (lastId !== id) {
         lastId = id;
         menuItems
           .parent().removeClass("active")
           .end().filter("[href='#"+id+"']").parent().addClass("active");
     }
  });
});

// Progress bar
//========================================
var checkedItems = 0;
var items = 0;
function countCheck ( stage ) {
  if ( stage === "series-a" ) {
    items = $('.series-a .check').length;
    checkedItems = $('.series-a .check.checked').length;
  }
  else if ( stage === "series-b" ) {
    items = $('.series-a .check').length;
    items = items + $('.series-b .check').length;
    checkedItems = $('.series-a .check.checked').length;
    checkedItems = checkedItems + $('.series-b .check.checked').length;
  }
  else {
    items = $('.header .check').length;
    checkedItems = $('.header .check.checked').length;
  }

  var progressBar = Math.round((checkedItems * 100) / items);
  $('.progression span').text('Progress: '+progressBar+'%');
  $('.barre').css('width', progressBar+'%');
}

// Add unique id to checks
//========================================
$(window).on( 'load', function() {
  var liLength = $('.checklist li').length;
  for ( var i = 0; i < liLength; i++ ) {
    var li = $('.checklist li')[i];
    $(li).attr('id', i);
  }
});

// Change hash
//========================================
function changeHash() {
  if ( liChecked.length === 0 ) {
    location.hash = 'stage='+ currentStage;
  }
  else {
    location.hash = 'stage='+ currentStage +'#check='+ liChecked.toString();
  }
}
function populateWithHash() {
  var hasFilter = location.hash.match( /[a-zA-Z]+/i );
  if ( hasFilter === null ) {
    $('.select-block').addClass('selected-two');
    currentStage = 'series-b';
    return;
  }
  else {
    hasFilter = hasFilter.input.split("#");
    if ( hasFilter[1] === 'stage=series-a' | hasFilter[1] === 'stage=series-b' | hasFilter[1] === 'stage=post-series-b' ) {
      var stage = hasFilter[1].replace("stage=", "");
      currentStage = stage;
      if ( stage === 'series-a') {
        $('.select-block').addClass('selected-one');
      }
      else if ( stage === 'series-b' ) {
        $('.select-block').addClass('selected-two');
        $grid.isotope({
          transitionDuration: 300,
          filter: ".series-a, .series-b"
        });
      }
      else {
        $('.select-block').addClass('selected-three');
        $grid.isotope({
          transitionDuration: 300,
          filter: "*"
        });
      }
      if ( hasFilter[2] != null ) {
        var checks = hasFilter[2].replace("check=", "");
        checks = checks.split(',');
        liChecked = checks;
        for ( var i = 0; i < checks.length; i++ ) {
          $('#'+checks[i]).find('.check').addClass('checked');
          $('#'+checks[i]).find('.expend-bar').addClass('checked');
        }
        countCheck(stage);
      }
    }
    else {
      $('.select-block').addClass('selected-one');
      currentStage = 'series-a';
      location.hash = '/';
    }
  }
}
$(window).on( 'load', populateWithHash );

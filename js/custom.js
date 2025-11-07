
// ===================== ОБЩИЕ =====================

var win = $(window);

// viewport dimensions
var ww = win.width();
var wh = win.height();

$(document).ready(function () {

  // load functions
  imageBG();
  grid();
  handleDates();

});

win.on('load', function () {

  setTimeout(function () {
    $('#preloader').addClass('hide');
  }, 512);

  // load functions
  grid();

});

win.on('resize', function () {

  // viewport dimensions
  ww = win.width();
  wh = win.height();

  // load functions
  grid();


});


// ================= ОБРАБОТКА ДАТ =================

function handleDates() {

  $('#gimme-current-date').text(new Date().toLocaleDateString('ru-RU'));

  $('.gimme-current-year').text(new Date().getFullYear());
  
  $('.gimme-year-diff').each(function() {
      var startYear = parseInt($(this).data('start-year'), 10);
      if (!isNaN(startYear)) {
          var currentYear = new Date().getFullYear();
          var diff = currentYear - startYear;
          var yearText = getYearText(diff);
          $(this).text(diff + ' ' + yearText);
      }
  });
  
  // Функция для определения правильного окончания
  function getYearText(diff) {
      var lastDigit = diff % 10;
      var lastTwoDigits = diff % 100;
      
      if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
          return 'лет';
      }
      if (lastDigit === 1) {
          return 'год';
      }
      if (lastDigit >= 2 && lastDigit <= 4) {
          return 'года';
      }
      return 'лет';
  }
}


// ============== ФОН ДЛЯ ИЗОБРАЖЕНИЙ ==============

function imageBG() {

  $('.imageBG').each(function () {
    var image = $(this).data('img');

    $(this).css({
      backgroundImage: 'url(' + image + ')',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    });
  });

}

// =============== ПЛАВНАЯ ПРОКРУТКА ===============

function smoothScrollTo(target) {
  if (target === 'top') {
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    return;
  }

  const element = $(`#${target}, .${target}`).first();

  if (element.length) {
    const elementPosition = element.offset().top;
    const offsetPosition = elementPosition - 64;
    
    $('html, body').animate({
      scrollTop: offsetPosition
    }, 'slow');
  } else {
    console.warn(`Элемент с id или классом "${target}" не найден`);
  }
}

$('#back-to-top').on('click', (e) => {
  e.preventDefault();
  smoothScrollTo('top');
});

// Обработчики для кнопок
$('#to-portfolio, #back-to-portfolio').on('click', (e) => {
  e.preventDefault();
  smoothScrollTo('portfolio');
});

$('#to-projects, #back-to-projects').on('click', (e) => {
  e.preventDefault();
  smoothScrollTo('projects');
});


// ================= ISOTOPE СЕТКА =================

function grid() {

  var container = $('.grid');

  for (var i = 0; i < container.length; i++) {
    var active_container = $(container[i]);
    var container_width = active_container.width();

    var items = active_container.find('.entry');

    var cols = parseInt(active_container.data('cols'), 10);
    var margin = parseInt(active_container.data('margin'), 10);
    var height = parseFloat(active_container.data('height'));
    var double_height = parseFloat(active_container.data('double-height'));

    if (!margin) margin = 0;
    if (!double_height) double_height = 2;

    // set margins to the container
    active_container.css('margin', -Math.floor(margin / 2) + 'px');

    if (ww >= 991) {
      if (!cols) cols = 3;
      // Large screens: use original column count
    } else if (ww >= 576) {
      // Medium screens: always 2 columns
      cols = 2;
    } else {
      // Small screens: 1 column for original 3 or less, 2 columns for original 4+
      cols = (cols >= 4) ? 2 : 1;
    }

    var items_width = Math.floor((container_width / cols) - margin);
    var items_height = Math.floor(items_width * height);
    var items_double_height = items_height * double_height;
    var items_margin = Math.floor(margin / 2);

    items.each(function () {
      $(this).css('width', items_width + 'px');
      $(this).css('height', items_height + 'px');
      $(this).css('margin', items_margin + 'px');

      if (!height) $(this).css('height', 'auto');

      // Add .wdt2 or .hgt2 to the portfolio item for varoius layout sizes
      if ($(this).hasClass('wdt2') && ww >= 576) $(this).css('width', (items_width * 2) + (items_margin * 2) + 'px');  
      if ($(this).hasClass('hgt2') ) $(this).css('height', items_double_height + (items_margin * 2) + 'px');
      if ($(this).hasClass('opt-hgt2') && (ww >= 991 || ww <= 576)) $(this).css('height', items_double_height + (items_margin * 2) + 'px');
    });

    // isotope
    active_container.isotope({
      itemSelector: '.entry',
      transitionDuration: '.2s',
      hiddenStyle: {
        opacity: 0
      },
      visibleStyle: {
        opacity: 1
      },
      masonry: {
        columnWidth: items_width + margin

      }
    });

    $('#filters li a').on('click', function (e) {
      e.preventDefault();

      var filter = $(this).attr('href');

      $('#filters li a').removeClass('active');
      $(this).addClass('active');

      active_container.isotope({
        filter: filter
      });
    });
  };

}

const asciiArt = `
 ███▄    █  ▄████▄    ██████ ▄▄▄█████▓ ██▀███  
 ██ ▀█   █ ▒██▀ ▀█  ▒██    ▒ ▓  ██▒ ▓▒▓██ ▒ ██▒
▓██  ▀█ ██▒▒▓█    ▄ ░ ▓██▄   ▒ ▓██░ ▒░▓██ ░▄█ ▒
▓██▒  ▐▌██▒▒▓▓▄ ▄██▒  ▒   ██▒░ ▓██▓ ░ ▒██▀▀█▄  
▒██░   ▓██░▒ ▓███▀ ░▒██████▒▒  ▒██▒ ░ ░██▓ ▒██▒
░ ▒░   ▒ ▒ ░ ░▒ ▒  ░▒ ▒▓▒ ▒ ░  ▒ ░░   ░ ▒▓ ░▒▓░
░ ░░   ░ ▒░  ░  ▒   ░ ░▒  ░ ░    ░      ░▒ ░ ▒░
   ░   ░ ░ ░        ░  ░  ░    ░        ░░   ░ 
         ░ ░ ░            ░              ░     
           ░                                   
`;
console.log(asciiArt);






/* TOP MENU ESTATICO*/
$(document).ready(function() {
    var actualSection = $('.navegacion .filiales').children('a').html();
    var menuActual = null;
    var timerOut = null;
    $('.navegacion .filiales').click(function(evt) {
        evt.preventDefault();
        var margin = 0;
        $(this).children('span').toggleClass('glyphicon-triangle-top');
        if ($(this).children('span').hasClass('glyphicon-triangle-top')){
            $(this).children('a').html('Negocios Especializados')
        }
        else {
            $(this).children('a').html(actualSection)
            margin = '-1000px';
        }
        $('.navegacion .top-menu > .container-fluid  > .row').animate({'margin-top':margin});
    });
    
    $('.navbar .toggle-submenu a').click(function(evt) {
        evt.preventDefault();
    })
    $('.navegacion .submenu').mouseover(function(evt) {
        clearTimeout(timerOut);
        menuActual.parent().addClass('over');
        $('.navegacion .navbar .active').addClass('mute');
    });
    
    $('.navegacion .submenu').mouseout(function(evt) {
        $('.navegacion .navbar .over').removeClass('over');
        $('.navegacion .navbar .active').removeClass('mute');
        timerOut = setTimeout(function() {
            $('.navegacion .submenu').fadeOut();
        }, 50);
    });
    
    $('.navbar .toggle-submenu a').mouseover(function(evt) {
        clearTimeout(timerOut);
        menuActual = $(this);
        menuActual.parent().addClass('over');
        $('.navegacion .submenu').fadeIn();
        $('.navegacion .navbar .active').addClass('mute');
        $('.navegacion .submenu > .contenido > .container-fluid > .row').css({'display': 'none'});
        var target = $(this).attr('href');
        $(target).css({'display':'block'});
    });
    
    $('.navbar .toggle-submenu a').mouseout(function(evt) {
        $('.navegacion .navbar .over').removeClass('over');
        $('.navegacion .navbar .active').removeClass('mute');
        timerOut = setTimeout(function() {
            $('.navegacion .submenu').fadeOut();
        }, 50);
    });
    
    
    $('.navegacion .navbar-toggle').click(function() {
        $('.navegacion .sidebar').height('100%');
        $('.navegacion .sidebar').addClass('in');
        $('.navegacion .sidebar .contenido').animate({'margin-right': '0'});
    });
    
    $('.navegacion .sidebar .close').click(function() {
        $('.navegacion .sidebar').removeClass('in');
        $('.navegacion .sidebar .contenido').animate({'margin-right': '-100%'}, function() {
            $('.navegacion .sidebar').height('0');
        });
    });
});

$(document).ready(function() {
    $('.expandible+ul').slideUp();
    $('.expandible.active+ul').slideToggle();
    $('.expandible.active').find('.glyphicon').toggleClass('glyphicon-minus');
    $('.expandible').click(function() {
        $(this).next().slideToggle();
        $(this).toggleClass('active');
        $(this).find('.glyphicon').toggleClass('glyphicon-minus');
    });
});
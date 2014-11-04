(function ($, w) {
  var rest = 'url(http://colinbate.bitbucket.org/owl-me/owl.png)',
      fly = 'url(http://colinbate.bitbucket.org/owl-me/owl-flap.png)',
      flyOff = function (e) {
        var $t = $(e.target),
            top = $t.offset().top,
            w = (Math.random() * $(window).width()) - 120,
            flap = setInterval(function () {
              if ($t.hasClass('owl-flap')) {
                $t.css('backgroundImage', rest);
              } else {
                $t.css('backgroundImage', fly);
              }
              $t.toggleClass('owl-flap');
            }, 70);
        $t.animate({ top: ['-150px', 'swing'], left: [w + 'px', 'swing'] },
          {
            duration: 1600 + (top * 2),
            complete: function () {
              clearInterval(flap);
            }
          }
        );
      };

  $.fn.owlMe = function () {
    return this.each(function () {
      var $t = $(this);
      if ($t.hasClass('owl-me')) {
        return;
      }
      var pos = $t.offset();
      pos.top -= 94;
      pos.left += ($t.outerWidth() / 2) - 60;
      $t.addClass('owl-me');
      var attachId = $t.attr('id') || Math.floor(Math.random() * 100000);
      var $owl = $('<div></div>').attr('id', 'owl-' + attachId).css({
        position: 'absolute',
        width: '120px',
        height: '100px',
        margin: 0,
        padding: 0,
        backgroundColor: 'transparent',
        backgroundImage: rest,
        backgroundRepeat: 'no-repeat',
        zIndex: 25,
      }).click(flyOff).appendTo('body').offset(pos);
    });
  };
  $('<div></div>').css({position:'absolute',top:'-1000px',backgroundImage:fly}).appendTo('body');
  $('button,.btn,.button,.pure-button,input[type="button"],input[type="submit"]').owlMe();
  w.owlme = true;
}(jQuery, window));
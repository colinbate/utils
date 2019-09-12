(function ($, w) {
  var rest = 'url(https://utilities.bate.dev/owl-me/owl.png)',
      fly = 'url(https://utilities.bate.dev/owl-me/owl-flap.png)',
      $w = $(window),
      flap = function ($t) {
        return setInterval(function () {
          if ($t.hasClass('owl-flap')) {
            $t.css('backgroundImage', rest);
          } else {
            $t.css('backgroundImage', fly);
          }
          $t.toggleClass('owl-flap');
        }, 70);
      },
      randomInt = function (max) {
        return Math.floor(Math.random() * max);
      },
      flyOff = function (e) {
        var $t = $(e.target),
            top = $t.offset().top,
            w = randomInt($w.width()) - 120,
            flapRef = flap($t);
        $t.animate({ top: ['-150px', 'swing'], left: [w + 'px', 'swing'] },
          {
            duration: 1600 + (top * 2),
            complete: function () {
              clearInterval(flapRef);
              $t.remove();
            }
          }
        );
      },
      flyIn = function ($owl) {
        var $t = $owl,
            perch = $t.data('perch'),
            w = randomInt($w.width()) - 120,
            flapRef = flap($t);
        $t.offset({top: -150, left: w}).show().animate({
            top: [perch.top + 'px', 'swing'],
            left: [perch.left + 'px', 'swing']
          },
          {
            duration: 1600 + (perch.top * 2),
            complete: function () {
              clearInterval(flapRef);
              $t.click(flyOff);
            }
          }
        );
      },
      flyThrough = function ($owl, ww, wh) {
        var flapRef = flap($owl);
        $owl.offset({
          top: randomInt(wh),
          left: -120
        }).show().animate({
            top: [randomInt(wh) + 'px', 'swing'],
            left: [ww + 'px', 'swing']
          },
          {
            duration: ww * 4,
            complete: function () {
              clearInterval(flapRef);
              $owl.remove();
            }
          })
      },
      flyMeThrough = function ($owl, ww, wh) {
        return function () {
          flyThrough($owl, ww, wh);
        };
      },
      addOwl = function (id) {
        var attachId = id || randomInt(100000);
        return $('<div></div>').attr('id', 'owl-' + attachId).css({
          position: 'absolute',
          width: '120px',
          height: '100px',
          margin: 0,
          padding: 0,
          backgroundColor: 'transparent',
          backgroundImage: rest,
          backgroundRepeat: 'no-repeat',
          zIndex: 2500,
        }).hide().appendTo('body');
      };

  $.fn.owlMe = function () {
    var totalOwls = this.length,
        ii, wh, ww;
    if (!this.length) {
      totalOwls = randomInt(5) + 3;
      ww = $w.outerWidth() + 1;
      wh = $w.outerHeight() - 100;
      for (ii = 0; ii < totalOwls; ii += 1) {
        setTimeout(flyMeThrough(addOwl(), ww, wh), (ii + 3) * 550);
      }
      return this;
    }
    return this.each(function (whichOwl) {
      var $t = $(this);
      if ($t.hasClass('owl-me')) {
        return;
      }
      var pos = $t.offset();
      pos.top -= 94;
      pos.left += ($t.outerWidth() / 2) - 60;
      $t.addClass('owl-me');
      var $owl = addOwl($t.attr('id')).data('perch', pos);
      setTimeout(function () {
        flyIn($owl);
      }, (whichOwl + 5) * 140);
    });
  };
  $('<div></div>').css({position:'absolute',top:'-1000px',backgroundImage:fly}).appendTo('body');
  $('button,.btn,.button,.pure-button,input[type="button"],input[type="submit"]').owlMe();
  w.owlme = true;
}(jQuery, window));
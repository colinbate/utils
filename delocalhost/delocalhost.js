(function ($) {
	var $input = $('#machineName');
	var $output = $('#bookmark');
    var $example = $('#example');
    var $exblock = $('#exblock');
    var $link = $output.find('a');
    var pre = "javascript:(function(a){a=window.location.href;prompt('URL',a.replace(/^(https?:\\/\\/)localhost(.*)/,'$1";
    var post = "$2'));return%20false;}());";
	$(document).on('input', '#machineName', function (e) {
        if ($.trim($input.val()) === '') {
            $output.hide();
            $exblock.hide();
        } else {
            $link.attr('href', pre + $input.val() + post);
            $example.text($input.val());
            $output.show();
            $exblock.show();
        }
    });
}(jQuery));
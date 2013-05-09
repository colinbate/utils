(function ($, cssify) {
	var $input = $('#xpath');
	var $output = $('#cssout');
	$('#convert').on('click', function () {
		$output.text(cssify($input.val()));
	});
}(jQuery, cssify));
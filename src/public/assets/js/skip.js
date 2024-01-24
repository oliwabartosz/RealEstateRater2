const checkbox_required = $('input[type="checkbox"]');
const radio_input = $('input[type="radio"]');
const form_input = $('input[name="bath_no"]');

checkbox_required.on('click', function(){
    if (checkbox_required.is(':checked')) {
        radio_input.attr('required', false);
        form_input.attr('required', false);
    } else {
        radio_input.attr('required', true);
        form_input.attr('required', true);
    }
});
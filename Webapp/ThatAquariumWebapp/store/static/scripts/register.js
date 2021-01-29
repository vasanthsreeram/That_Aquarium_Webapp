$(document).ready(function() {
    errorCheck = false;
    try {
       errors = $(".error-5").contents()[1]["innerText"].split(/\n/);
    }
    catch (err) {
        errorCheck = true
    };
    if (errorCheck == false) {
        $(".error-5").html($(".error-5").contents()[1]["innerText"].split(/\n/)[1])
    };
    var form_fields = document.getElementsByTagName('input')
        form_fields[1].placeholder='Full Name';
        form_fields[1].className='email';
        form_fields[2].placeholder='Email';
        form_fields[2].type='email';
        form_fields[2].className='email';
        form_fields[3].placeholder='Password';
        form_fields[3].className='password';
        form_fields[4].placeholder='Confirm Password';
        form_fields[4].className='password';
});
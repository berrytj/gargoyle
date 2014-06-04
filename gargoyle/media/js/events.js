$(function() {
    $('#emailForAccount').blur(function() {
        console.log('hello?');
        var email = encodeURIComponent($(this).val());
        $.getJSON('/account/accounts_for_email/{}/'.format(email)).done(function(accounts) {
            $('#accountSelect').html(
                _.map(
                    function(account) {
                        return '<option value="{}">{}</option>'.format(
                            account[0],
                            account[1]
                        );
                    },
                    accounts
                )
            );
        });
    });
});

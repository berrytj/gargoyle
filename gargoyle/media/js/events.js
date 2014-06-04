$(function() {
    $('.conditionsForm').delegate('.emailForAccount', 'blur', function() {
        var email = encodeURIComponent($(this).val());
        $.getJSON('/account/accounts_for_email/{}/'.format(email), function(accounts) {
            $('.accountSelect').html(
                _.map(
                    accounts,
                    function(account) {
                        return '<option value="{}">{}</option>'.format(
                            account[0],
                            account[1]
                        );
                    }
                )
            );
        });
    });
});

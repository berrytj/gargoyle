var insert_option_for_each_account = function(accounts, $input) {
    var options = _.map(accounts,
                        function(account) {
                            return '<option value="{}">{}</option>'.format(account[0],
                                                                           account[1]);
                        });
    $input
        .parents('.conditionsForm')
        .find('select.accountSelect')
        .html(options.join(''));
};


$(function() {
    $('table.switches')
        .delegate('input.emailForAccount',
                  'blur',
                  function() {
                      var that = this;
                      var email = encodeURIComponent($(this).val());

                      $.getJSON('/account/accounts_for_email/{}/'.format(email),
                                function(accounts) {
                                    insert_option_for_each_account(accounts, $(that));
                                });
                  })
        .delegate('button.findAccounts',
                  'click',
                  function(e) {
                      e.preventDefault();
                      $('input.emailForAccount').blur();
                  });
});

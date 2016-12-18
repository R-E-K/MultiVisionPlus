(function() {
    'use strict';

    describe('mvUser', function () {
        beforeEach(module('app'));

        describe('isAdmin', function () {
            it('should return false if the roles array does not have an admin entry',
                inject(function (mvUser) {
                    var user = new mvUser();
                    user.roles = ['not_admin'];
                    expect(user.isAdmin()).to.be.false;
                }));

            it('should return true if the role array does have an admin entry',
                inject(function (mvUser) {
                    var user = new mvUser();
                    user.roles = ['admin'];
                    expect(user.isAdmin()).to.be.true;
                }));
        });
    });

})();
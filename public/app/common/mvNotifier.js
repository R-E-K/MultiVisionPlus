angular.module('app').value('mvToaster', toastr);

angular.module('app').factory('mvNotifier', function(mvToaster) {
    return {
        notify: function(msg) {
            mvToaster.success(msg);
            console.log(msg);
        }
    }
})
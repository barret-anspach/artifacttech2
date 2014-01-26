angular.module('artifactApp').service('currentId', function(){
    return {
        currentId: 'home',
        setId: function(id){
            this.currentId = id;
            window.console.log(this.currentId);
        }
    }
});

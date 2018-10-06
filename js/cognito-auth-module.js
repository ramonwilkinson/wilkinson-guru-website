
var cognitoAuthGlobals = window.cognitoAuthGlobals || {};

var cognitoAuth = (function () {
    
  // Private variables/methods ------------------------------------------------

  var poolData = { 
    UserPoolId : 'us-east-1_PAUCl3r7z',
    ClientId : '1mrpnvhboldoh5pck00gk60ama'
  };
  var region = 'us-east-1';

  // Public methods -----------------------------------------------------------
  return {
    init: function(){
      cognitoAuthGlobals.userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    },

    signin: function(username, password){
      //Hack for now
      var authenticationData = {
        Username : 'ramonwil',  //username
        Password : 'Fred0001!', //password
      };
      
      var authenticationDetails = 
        new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
      
      var userData = {
          Username : authenticationData.Username,
          Pool : cognitoAuthGlobals.userPool
      };

      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          cognitoAuthGlobals.accessToken = result.getAccessToken().getJwtToken();
            
          /* Use the idToken for Logins Map when Federating User Pools with 
             identity pools or when passing through an Authorization Header 
             to an API Gateway Authorizer*/
          cognitoAuthGlobals.idToken = result.idToken.jwtToken;
        },

        onFailure: function(err) {
            alert(err);
        }
      })
    }
  }
})();

//myGradesCalculate.failing(); // 'You failed 2 times.' 
//myGradesCalculate.average(); // 'Your average grade is 70.33333333333333.'

//cognitoAuth.init();
//cognitoAuth.signin("","");
var cognitoAuth = (function () {
    
  // Private variables/methods ------------------------------------------------

  var poolData = { 
    UserPoolId : 'us-east-1_PAUCl3r7z',
    ClientId : '1mrpnvhboldoh5pck00gk60ama'
  };
  var region = 'us-east-1';

  // uninitiazed variables
  var userPool;
  var accessToken;
  var idToken;

  // Public methods -----------------------------------------------------------
  return {
    init: function(){
      userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
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
          Pool : userPool
      };

      var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
      
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            accessToken = result.getAccessToken().getJwtToken();
            
            /* Use the idToken for Logins Map when Federating User Pools with 
                identity pools or when passing through an Authorization Header 
                to an API Gateway Authorizer*/
            idToken = result.idToken.jwtToken;
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
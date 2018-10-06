(function () {
  $(document).ready(function () {
      cognitoAuth.init();
      userController.init(configConstants);
    });
}());


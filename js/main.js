(function () {
  $(document).ready(function () {
      userController.init(configConstants);
      cognitoAuth.init();
  });
}());


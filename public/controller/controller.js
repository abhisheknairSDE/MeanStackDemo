function AppCtrl($scope, $http) {
  console.log("Hello Wold from Controller");

  var refresh = function () {
    $http.get("/contactlist").success(function (response) {
      $scope.contactlist = response;
      $scope.contact = "";
    });
  };

  refresh();

  $scope.addContact = function () {
    if (
      $scope.validateEmail() &&
      $scope.validateName() &&
      $scope.validateNumber()
    ) {
      console.log($scope.contact);
      $http.post("/contactlist", $scope.contact).success(function (response) {
        console.log(response);
        refresh();
      });
    } else {
      alert("Input Fields are not valid!");
    }
  };

  $scope.edit = function (id) {
    $http.get("/contactlist/" + id).success(function (response) {
      $scope.contact = response;
    });
  };

  $scope.update = function () {
    const isNameValid = $scope.validateName();
    const isEmailValid = $scope.validateEmail();
    const isNumberValid = $scope.validateNumber();
    if (isNameValid && isEmailValid && isNumberValid) {
      $http
        .put("/contactlist/" + $scope.contact._id, $scope.contact)
        .success(function (response) {
          refresh();
        });
    } else {
      alert("Input Fields are not valid!");
    }
  };

  $scope.remove = function (id) {
    $http.delete("/contactlist/" + id).success(function (response) {
      console.log(response);
      refresh();
    });
  };

  $scope.validateName = function () {
    const name = $scope.contact.name;
    if (/^[A-Z][A-Za-z0-9]*$/.test(name)) {
      return true;
    } else {
      alert(
        "You have entered an invalid name(name must begin with a capital letter)!"
      );
      return false;
    }
  };

  $scope.validateEmail = function () {
    const email = $scope.contact.email;
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    alert("You have entered an invalid email address!");
    return false;
  };

  $scope.validateNumber = function () {
    const number = $scope.contact.number;
    if (/^\(\d{3}\) \d{3}-\d{4}$/.test(number)) {
      return true;
    } else {
      alert("Enter a valid number");
      return false;
    }
  };
}

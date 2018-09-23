
var app = angular.module("myapp",['ngSanitize']);

app.controller('ctrl', function ($scope, $http) {

    $scope.langList = [];
//displaying the data in the yandex json object
    $http.get("https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=trnsl.1.1.20180922T205924Z.6fdf248a0b740149.63741c61db985ab7ddff58ba06d7e5780c529a3b").success(function (data) {
        if(data != null && data.langs != null){
            $scope.langList = data.langs; // Assigns all languages and thier codes from json object data

        }
    });
// Incase of data not validate
    $http.get("https://translate.yandex.net/api/v1.5/tr.json/getLangs?ui=en&key=trnsl.1.1.20180922T205924Z.6fdf248a0b740149.63741c61db985ab7ddff58ba06d7e5780c529a3b").error(function (data) {
        alert("There was some error processing your request. Please try after some time.");
    });

    $scope.getTranslateText = function () {
        $scope.textOut = "";
        var sourceText = $scope.sourceText; // Assigning to the local variables
        var sourceLan = $scope.sourceLan;
        var destLan = $scope.destLan;
        if (sourceText != null && sourceText != "" && sourceLan != null && sourceLan != "")  //checking the values of source text and source language to be not empty

        {
            if(destLan == null || destLan == ""){
                destLan = 'en';
            }
// handler is assigned with the json object data
            var handler = $http.get("https://translate.yandex.net/api/v1.5/tr.json/translate?" +
                "key=trnsl.1.1.20180922T205924Z.6fdf248a0b740149.63741c61db985ab7ddff58ba06d7e5780c529a3b" +
                "&text=" + sourceText + "&" +
                "lang=" + sourceLan + "-" + destLan);
      //checks whether the fucntion works or not
            handler.success(function (data) // if the translate function processed then the handler is initiated
            {
                if (data != null && data.text != null)  //verifies the data and displays the translated text
                {
                    $scope.textOut = "<strong>Translated Text : "+ data.text[0]+"<strong>";
                }
                else
                    {
                    $scope.textOut = "No Translation Details exist for the Input Details";
                }
            });
            // either function or data given is having any problem
            handler.error(function (data) {
                alert("There was some error processing your request. Please try after some time.");
            });
        }
        //incase of source text or source lang having problem
        else
            {
            $scope.textOut = "Source Text or Source Language cannot be empty";
        }
    }
});
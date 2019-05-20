"use strict";

(function(){
  angular
  .module("app", ['ngMaterial'])
  .controller("dashboardController", dashboardController);

  function dashboardController($scope){
    console.log(angular)
    $scope.title = "Omelas Dashboard"
    $scope.textHeight = {height: "100px", 'overflow-x': "scroll"};
    $scope.showExpandText = true;


    $scope.viewFullText = function(index){
      var isoDiv = document.getElementById("text+"+index);
      if(isoDiv.style.height){
        isoDiv.style = {};
        document.getElementById("cta+"+index).innerHTML = "Collapse Full Text";
      } else {
        isoDiv.style.height = "100px";
        isoDiv.style.overflowX = "scroll";
        document.getElementById("cta+"+index).innerHTML = 'Expand to View Full Text';
      }
    };

    $scope.socialMediaPosts = [
      {
        "Home": "#6 Loyola (11-4)",
        "Away": "#10 Syracuse (9-4)",
        "Time": "12:00 pm",
        "Watch": "ESPNU",
        "Coverage": "Preview",
        "date": "2019-05-11T16:00:00.000Z"
      },
      {
        "Home": "#2 Yale (12-3)",
        "Away": "#17 Georgetown (13-4)",
        "Time": "2:30 pm",
        "Watch": "ESPNU",
        "Coverage": "Preview",
        "date": "2019-05-11T18:30:00.000Z"
      },
      {
        "Home": "#3 Penn (11-3)",
        "Away": "#19 Army (13-4)",
        "Time": "5:00 pm",
        "Watch": "ESPNU",
        "Coverage": "Preview",
        "date": "2019-05-11T21:00:00.000Z"
      },
      {
        "Home": "#4 Virginia (13-3)",
        "Away": "Robert Morris (9-7)",
        "Time": "7:30 pm",
        "Watch": "ESPNU",
        "Coverage": "Preview",
        "date": "2019-05-11T23:30:00.000Z"
      },
      {
        "Home": "#6 Loyola (11-4)",
        "Away": "#10 Syracuse (9-4)",
        "Time": "12:00 pm",
        "Watch": "ESPNU",
        "Coverage": "Preview",
        "date": "2019-05-12T16:00:00.000Z"
      },
      {
        "Home": "#2 Yale (12-3)",
        "Away": "#17 Georgetown (13-4)",
        "Time": "2:30 pm",
        "Watch": "ESPNU",
        "Coverage": "Preview",
        "date": "2019-05-12T18:30:00.000Z"
      },
      {
        "Home": "#3 Penn (11-3)",
        "Away": "#19 Army (13-4)",
        "Time": "5:00 pm",
        "Watch": "ESPNU",
        "Coverage": "Preview",
        "date": "2019-05-12T21:00:00.000Z"
      },
      {
        "Home": "#4 Virginia (13-3)",
        "Away": "Robert Morris (9-7)",
        "Time": "7:30 pm",
        "Watch": "ESPNU",
        "Coverage": "Preview",
        "date": "2019-05-12T23:30:00.000Z"
      },
      {
        "Home": "#1 Penn State (14-1)",
        "Away": "UMBC (7-8)",
        "Time": "12:00 pm",
        "Watch": "ESPNU",
        "Coverage": "Preview",
        "date": "2019-01-01T17:00:00.000Z"
      },
      {
        "Home": "#12 Towson (11-4)",
        "Away": "#5 Maryland (11-4)",
        "Time": "2:30 pm",
        "Watch": "ESPNU",
        "Coverage": "Preview",
        "date": "2019-01-01T19:30:00.000Z"
      },
      {
        "Home": "#7 Duke (11-4)",
        "Away": "Richmond (10-6)",
        "Time": "5:00 pm",
        "Watch": "ESPNU",
        "Coverage": "Preview",
        "date": "2019-01-01T22:00:00.000Z"
      },
      {
        "Home": "#8 Notre Dame (8-6)",
        "Away": "#16 Johns Hopkins (8-7)",
        "Time": "7:30 pm",
        "Watch": "ESPNU",
        "Coverage": "Preview",
        "date": "2019-01-02T00:30:00.000Z"
      }
    ]
    

  $scope.posts = new Array();
  var reactions = new Array();
  var csv = new Array();
  $scope.socialMediaPosts.forEach(function(post){
    console.log("post = ", post)
    var manipulatedPost = post;
    
    // {
    //   user: post.user,
    //   text: post.text,
    //   time: post.time,
    //   location: post.location,
    //   reactions: parseInt(post.reactions),
    //   comments: parseInt(post.comments),
    //   shares: parseInt(post.shares),
    //   page_url: post.Page_URL
    // }

    $scope.posts.push(manipulatedPost)
    reactions.push(post.reactions)

    var string = post.user + "; " +
    // post.text + "; " +
    post.time + "; " +
    post.location + "; " +
    post.reactions + "; " +
    post.comments + "; " +
    post.shares + "; " +
    post.Page_URL + "\n"


  })

  $scope.sortBy = function(propertyName, sortReverse) {
    console.log(sortReverse)
   $scope.sortReverse = !sortReverse;
   $scope.propertyName = propertyName;

   if($scope.sortReverse){
     $scope.srcUrl = "images/down.png"
   } else {
     $scope.srcUrl = "images/up.png"
   }

 };

  $scope.exportCSV = function(){
    var HTMLtable = document.getElementById('sm-table').innerHTML;
    var table = document.getElementById('sm-table');

    var columnHeaders = table.childNodes[1].childNodes[1].children;

    var headers = ""
    for(var i = 0; i < columnHeaders.length; i++){
      if(columnHeaders[i].innerText === "Location"){
        // headers = headers + "City;Country;"
        headers = headers + columnHeaders[i].innerText.trim() +";"
      }  else if (columnHeaders[i].innerText === "Text") {

      } else {
        headers = headers + columnHeaders[i].innerText.trim() +";"
      }
    }

    $scope.tableData = ""
    var rows = table.childNodes[3].childNodes;
    for(var r = 0; r < rows.length; r++){
      var row = rows[r].childNodes;
      row.forEach(function(td, index){
        if(td.nodeName === 'TD'){
          // console.log(td)
          // console.log(td.childNodes.length)
          if(td.childNodes.length === 1){
            // console.log(td.innerHTML)

            $scope.tableData = $scope.tableData + td.innerHTML.trim() + ";"
          } else if(td.childNodes.length === 5){
            // console.log(td.childNodes[1].innerText + ";")
            // $scope.tableData = $scope.tableData + td.childNodes[1].innerText + " END OF ARABIC;"
            // $scope.tableData = $scope.tableData + td.childNodes[1].innerHTML + "; "
          } else if(td.childNodes.length === 3){
            // console.log(td.childNodes)
            $scope.tableData = $scope.tableData + td.childNodes[1].href + ";"
          }
        }
      })
        $scope.tableData = $scope.tableData + '\n'
    }

    var csv = headers.trim() + '\r\n' + $scope.tableData;
    var a = document.createElement('a');
    a.textContent='download';
    a.id = "download"
    a.download="omeals_filter="+ $scope.searchFilter+ "_date=" + new Date()+".csv";
    a.href='data:text/csv;charset=utf-8,'+escape(csv);
    a.click();
    return headers + '\r' + $scope.tableData
  }


  };

})();

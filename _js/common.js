"use strict";


//■■■■■■■■■■■■■■■■■■■
// firebase 初期設定
//■■■■■■■■■■■■■■■■■■■
const UsersColRef = firestore.collection("users");
const InOutStatus = document.querySelector("#InOutStatus");


//----------------------------------------
// 入室・退室
//----------------------------------------
function timestamp() {
  var position = navigator.geolocation.getCurrentPosition(test2, function (e) {
    alert(e.message);
  });

  //   ログインユーザーのドキュメント・サブコレクション取得
  var CurrentUser = Auth.currentUser;
  var CurrentDocRef = firestore.doc("users/" + CurrentUser.uid);
  var CurrentColRef = firestore.collection(
    "users/" + CurrentUser.uid + "/TimeStamps"
  );

  function test2(position) {
    // アラート表示

    var date = new Date(position.timestamp);
    var geo_text = "緯度:" + position.coords.latitude + "\n";
    geo_text += "経度:" + position.coords.longitude + "\n";
    geo_text += "高度:" + position.coords.altitude + "\n";
    geo_text += "取得時刻:" + date.toLocaleString() + "\n";

    // alert(geo_text);

    CurrentDocRef.get(CurrentDocRef)
      .then(function (doc) {
        if (doc.data().status == "退勤中") {
          // var CurrentStatus = doc.data().status;
          var NewStats = "出勤中";
          CurrentDocRef.update({
            status: NewStats,
          });
          $("#time").text(NewStats + "...");
          $("#InOutStatus").text(NewStats);
          $("#InOut").text("退勤する");
          // alert("出勤しました");
          CurrentColRef.add({
            name: CurrentUser.email,
            createdAt: new Date(),
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            status: NewStats,
          }).then(function (AddDocRef) {
            console.log(AddDocRef.id);
            var AddId = AddDocRef.id;
            var AddDocRoundCol = firestore.collection(
              "users/" +
                CurrentUser.uid +
                "/TimeStamps/" +
                AddId +
                "/RoundTimeStamps"
            );
            // RoundTimeStampsに出勤ドキュメント追加
            AddDocRoundCol.add({
              name: CurrentUser.email,
              createdAt: new Date(),
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              status: NewStats,
              type: "StartWork",
            });
          });
        } else {
          var NewStats = "退勤中";
          CurrentDocRef.update({
            status: NewStats,
          });
          $("#time").text(NewStats + "...");
          $("#InOutStatus").text(NewStats);
          $("#InOut").text("出勤する");
          // RoundTimeStampsに退勤ドキュメント追加

          CurrentColRef.orderBy("createdAt", "desc")
            .limit(1)
            .get()
            .then(function (querySnapshot) {
              querySnapshot.forEach((doc) => {
                var AddDocRoundCol = firestore.collection(
                  "users/" +
                    CurrentUser.uid +
                    "/TimeStamps/" +
                    doc.id +
                    "/RoundTimeStamps"
                );

                // RoundTimeStampsに退勤ドキュメント追加
                AddDocRoundCol.add({
                  name: CurrentUser.email,
                  createdAt: new Date(),
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  status: NewStats,
                  type: "EndWork",
                });
              });
            });
        }
      })
      .catch(function (eroor) {
        console.log(eroor);
      });
  }
}

//----------------------------------------
// ドロップダウン
//----------------------------------------

// 稼働タイプ｜ドロップダウン
// $(".drop-type").on("click", function () {
//   var state = $(this).text();
//   var wtype = $(this).data("id");
//   $("#dropdownMenuButton-type").text(state);
//   $(".hide-container").hide();
//   $(`#${wtype}`).show();
// });

// 勤怠表示
$(".nav-link-kintai").on("click", function () {
  $(".hide-container").hide();
  $(`#kintai-container`).show();
});

// ドコモ表示
$(".nav-link-docomo").on("click", function () {
  $(".hide-container").hide();
  $(`#docomo-container`).show();
});

// SKP表示
$(".nav-link-skp").on("click", function () {
  $(".hide-container").hide();
  $(`#skp-container`).show();
});

// OCN-1表示
$(".nav-link-ocn-1").on("click", function () {
  $(".hide-container").hide();
  $(`#ocn-container`).show();
  $(`#start-work`).show();
});

// OCN-2表示
$(".nav-link-ocn-2").on("click", function () {
  $(".hide-container").hide();
  $(`#ocn-container`).show();
  $(`#enter-shop`).show();
});

// OCN-3表示
$(".nav-link-ocn-3").on("click", function () {
  $(".hide-container").hide();
  $(`#ocn-container`).show();
  $(`#exit-shop`).show();
});

// OCN-4表示
$(".nav-link-ocn-4").on("click", function () {
  $(".hide-container").hide();
  $(`#ocn-container`).show();
  $(`#leave-work`).show();
});

// OCN-5表示
$(".nav-link-ocn-5").on("click", function () {
  $(".hide-container").hide();
  $(`#ocn-container`).show();
  $(`.ocn-report-list-container`).show();
  $(`.ocn-reoprt-mail-container`).show();

  var user = firebase.auth().currentUser;
  var TGUserId = user.uid;

  GetOcnList(TGUserId);
});

// 「自分の報告一覧」表示
$(".bav-link-selfrepo").on("click", function () {
  $(".hide-container").hide();
  $(`#self-report-container`).show();
  var user = firebase.auth().currentUser;
  var TGUserId = user.uid;

  GetSelfRepoList(TGUserId, "Work");
});

// 「ドコモ報告一覧」表示
$("#self-repo-docomo").on("click", function () {
  // $(".hide-container").hide();
  // $(`#self-report-container`).show();
  var user = firebase.auth().currentUser;
  var TGUserId = user.uid;
  GetSelfRepoList(TGUserId, "docomo");
});

// 「SKP報告一覧」表示
$("#self-repo-skp").on("click", function () {
  // $(".hide-container").hide();
  // $(`#self-report-container`).show();
  var user = firebase.auth().currentUser;
  var TGUserId = user.uid;
  GetSelfRepoList(TGUserId, "skp");
});

// 「OCN報告一覧」表示
$("#self-repo-ocn-tablink").on("click", function () {
  // $(".hide-container").hide();
  // $(`#self-report-container`).show();
  var user = firebase.auth().currentUser;
  var TGUserId = user.uid;
  GetSelfRepoList(TGUserId, "ocn");
});

// OCN出退勤リストの表示
function GetOcnList(TGUserId) {
  console.log(TGUserId);

  var TimeStampColRef = firestore.collection(
    "users/" + TGUserId + "/TimeStamps"
  );
  var count = 1;

  TimeStampColRef.orderBy("createdAt", "desc")
    .limit(1)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // RoundTimeコレクション取得
        var RoundDocCol = firestore.collection(
          "users/" + TGUserId + "/TimeStamps/" + doc.id + "/RoundTimeStamps"
        );

        RoundDocCol.where("type", "==", "ocnRoundStart")
          .get()
          .then(function (qs) {
            qs.forEach(function (doc) {
              // var createdData = doc.data().createdAt.toDate();
              var CreateDate = doc.data().createdAt.toDate();
              var year = CreateDate.getFullYear();
              var month = CreateDate.getMonth() + 1;
              var day = CreateDate.getDate();
              var hour = CreateDate.getHours();
              var minutes = CreateDate.getMinutes();
              var sec = CreateDate.getSeconds();
              var RoundStartRepFeild = doc.data().startRepo;
              var OcnDateTime = `${year}年${month}月${day}日 ${hour}:${minutes}:${sec}`;
              console.log(OcnDateTime);
              // 行挿入
              $(".oncRoundStartTime").text(OcnDateTime);
              $(".startRepFeild").text(RoundStartRepFeild);

              var count = 1;
              RoundDocCol.where("type", "==", "ocnShopStart")
                .orderBy("createdAt", "desc")
                .get()
                .then(function (qs) {
                  qs.forEach(function (doc) {
                    // var createdData = doc.data().createdAt.toDate();
                    var CreateDate = doc.data().createdAt.toDate();
                    var year = CreateDate.getFullYear();
                    var month = CreateDate.getMonth() + 1;
                    var day = CreateDate.getDate();
                    var hour = CreateDate.getHours();
                    var minutes = CreateDate.getMinutes();
                    var sec = CreateDate.getSeconds();
                    var roundStartRep = doc.data().roundStartRepo;
                    var roundStartTask = doc.data().roundStartTask;
                    var roundStartNext = doc.data().roundStartNext;
                    var roundStartOther = doc.data().roundStartOther;

                    var OcnDateTime = `${year}年${month}月${day}日 ${hour}:${minutes}:${sec}`;
                    console.log(OcnDateTime);
                    var ocnShopRepo = `${roundStartRep}\n${roundStartTask}\n${roundStartNext}\n${roundStartOther}`;
                    // 行挿入
                    $(`.ocnShopStartTime${count}`).text(OcnDateTime);
                    $(`.RoundStartRepFeild${count}`).text(ocnShopRepo);

                    count += 1;
                  });
                })
                .catch(function (error) {
                  console.log(error);
                });

              RoundDocCol.where("type", "==", "ocnShopEnd")
                .get()
                .then(function (qs) {
                  qs.forEach(function (doc) {
                    // var createdData = doc.data().createdAt.toDate();
                    var CreateDate = doc.data().createdAt.toDate();
                    var year = CreateDate.getFullYear();
                    var month = CreateDate.getMonth() + 1;
                    var day = CreateDate.getDate();
                    var hour = CreateDate.getHours();
                    var minutes = CreateDate.getMinutes();
                    var sec = CreateDate.getSeconds();
                    var roundEndRep = doc.data().roundEndRepo;

                    var OcnDateTime = `${year}年${month}月${day}日 ${hour}:${minutes}:${sec}`;
                    console.log(OcnDateTime);
                    // 行挿入
                    $(".ocnShopEndTime").text(OcnDateTime);
                    $(".RoundEndRepFeild").text(roundEndRep);
                  });
                })
                .catch(function (error) {
                  console.log(error);
                });

              RoundDocCol.where("type", "==", "ocnRoundEnd")
                .get()
                .then(function (qs) {
                  qs.forEach(function (doc) {
                    // var createdData = doc.data().createdAt.toDate();
                    var CreateDate = doc.data().createdAt.toDate();
                    var year = CreateDate.getFullYear();
                    var month = CreateDate.getMonth() + 1;
                    var day = CreateDate.getDate();
                    var hour = CreateDate.getHours();
                    var minutes = CreateDate.getMinutes();
                    var sec = CreateDate.getSeconds();
                    var roundRepFeild = doc.data().endRepo;

                    var OcnDateTime = `${year}年${month}月${day}日 ${hour}:${minutes}:${sec}`;
                    console.log(OcnDateTime);
                    // 行挿入
                    $(".ocnRoundEndTime").text(OcnDateTime);
                    $(".roundRepFeild").text(roundRepFeild);
                  });
                })
                .catch(function (error) {
                  console.log(error);
                });
            });
          });
      });
    });
}

// 店舗｜ドロップダウン
$(".drop-shop").on("click", function () {
  var state = $(this).text();
  $("#dropdownMenuButton-skp").text(state);
});

//----------------------------------------
// スカパーラウンド
//----------------------------------------
// ラウンド地点の記録
function SkpRoundBtn() {
  copyToClipboard();

  navigator.geolocation.getCurrentPosition(Conf, function (e) {
    alert(e.message);
  });

  function Conf(position) {
    // var reportText = $('.copyTargetAll').val();
    var shopName = $("#dropdownMenuButton-skp").text();
    var impDate = $("#text-area-skp1").val();
    var startTime = $("#text-area-skp2").val();
    var endTime = $("#text-area-skp3").val();
    var human = $("#text-area-skp4").val();
    var report = $("#text-area-skp5").val();
    var task = $("#text-area-skp6").val();
    var nextAction = $("#text-area-skp7").val();
    var remarks = $("#text-area-skp8").val();
    var CurrentUser = Auth.currentUser;
    var CurrentColRef = firestore.collection(
      "users/" + CurrentUser.uid + "/TimeStamps"
    );

    CurrentColRef.orderBy("createdAt", "desc")
      .limit(1)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          var AddDocRoundCol = firestore.collection(
            "users/" +
              CurrentUser.uid +
              "/TimeStamps/" +
              doc.id +
              "/RoundTimeStamps"
          );

          var result = confirm(`${shopName}でラウンドしますか？`);
          if (result) {
            // RoundTimeStampsに出勤ドキュメント追加
            AddDocRoundCol.add({
              name: CurrentUser.email,
              createdAt: new Date(),
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              status: shopName,
              impDate: impDate,
              startTime: startTime,
              endTime: endTime,
              human: human,
              report: report,
              task: task,
              nextAction: nextAction,
              remarks: remarks,
              type: "skp",
            });
            alert(`${shopName}でラウンドを記録しました。お疲れさまです！`);
            $(".copyTargetAll").remove();
          }
        });
      });
  }
}

//----------------------------------------
// OCNラウンド
//----------------------------------------
// 「出発報告」
function roundStartBtn() {
  copyToClipboard();

  navigator.geolocation.getCurrentPosition(Conf, function (e) {
    alert(e.message);
  });

  function Conf(position) {
    var startRepo = $("#text-area-ocn1").val();
    var shopName = $("#dropdownMenuButton-ocn").text();
    var CurrentUser = Auth.currentUser;
    var CurrentColRef = firestore.collection(
      "users/" + CurrentUser.uid + "/TimeStamps"
    );

    CurrentColRef.orderBy("createdAt", "desc")
      .limit(1)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          var AddDocRoundCol = firestore.collection(
            "users/" +
              CurrentUser.uid +
              "/TimeStamps/" +
              doc.id +
              "/RoundTimeStamps"
          );

          var result = confirm(`${shopName}でラウンドしますか？`);
          if (result) {
            // RoundTimeStampsに出勤ドキュメント追加
            AddDocRoundCol.add({
              name: CurrentUser.email,
              createdAt: new Date(),
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              status: shopName,
              startRepo: startRepo,
              roundStartRepo: "",
              roundStartTask: "",
              roundStartNext: "",
              roundStartOther: "",
              roundEndRepo: "",
              endRepo: "",
              remarks: "-",
              type: "ocnRoundStart",
            });
            alert(`${shopName}でラウンドを記録しました。お疲れさまです！`);
            $(".copyTargetAll").remove();
          }
        });
      });
  }
}

// 「入店報告」
function shopStartBtn() {
  copyToClipboard();

  navigator.geolocation.getCurrentPosition(Conf, function (e) {
    alert(e.message);
  });

  function Conf(position) {
    var roundStartRepo = $("#text-area-ocn2").val();
    var roundStartTask = $("#text-area-ocn3").val();
    var roundStartNext = $("#text-area-ocn4").val();
    var roundStartOther = $("#text-area-ocn5").val();
    var shopName = $("#dropdownMenuButton-ocn").text();
    var CurrentUser = Auth.currentUser;
    var CurrentColRef = firestore.collection(
      "users/" + CurrentUser.uid + "/TimeStamps"
    );

    CurrentColRef.orderBy("createdAt", "desc")
      .limit(1)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          var AddDocRoundCol = firestore.collection(
            "users/" +
              CurrentUser.uid +
              "/TimeStamps/" +
              doc.id +
              "/RoundTimeStamps"
          );

          var result = confirm(`${shopName}でラウンドしますか？`);
          if (result) {
            // RoundTimeStampsに出勤ドキュメント追加
            AddDocRoundCol.add({
              name: CurrentUser.email,
              createdAt: new Date(),
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              status: shopName,
              startRepo: "",
              roundStartRepo: roundStartRepo,
              roundStartTask: roundStartTask,
              roundStartNext: roundStartNext,
              roundStartOther: roundStartOther,
              roundEndRepo: "",
              endRepo: "",
              remarks: "-",
              type: "ocnShopStart",
            });
            alert(`${shopName}でラウンドを記録しました。お疲れさまです！`);
            $(".copyTargetAll").remove();
          }
        });
      });
  }
}

// 「退店報告」
function shopEndBtn() {
  copyToClipboard();

  navigator.geolocation.getCurrentPosition(Conf, function (e) {
    alert(e.message);
  });

  function Conf(position) {
    var roundEndRepo = $("#text-area-ocn6").val();
    var shopName = $("#dropdownMenuButton-ocn").text();
    var CurrentUser = Auth.currentUser;
    var CurrentColRef = firestore.collection(
      "users/" + CurrentUser.uid + "/TimeStamps"
    );

    CurrentColRef.orderBy("createdAt", "desc")
      .limit(1)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          var AddDocRoundCol = firestore.collection(
            "users/" +
              CurrentUser.uid +
              "/TimeStamps/" +
              doc.id +
              "/RoundTimeStamps"
          );

          var result = confirm(`${shopName}でラウンドしますか？`);
          if (result) {
            // RoundTimeStampsに出勤ドキュメント追加
            AddDocRoundCol.add({
              name: CurrentUser.email,
              createdAt: new Date(),
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              status: shopName,
              startRepo: "",
              roundStartRepo: "",
              roundStartTask: "",
              roundStartNext: "",
              roundStartOther: "",
              roundEndRepo: roundEndRepo,
              endRepo: "",
              remarks: "-",
              type: "ocnShopEnd",
            });
            alert(`${shopName}でラウンドを記録しました。お疲れさまです！`);
            $(".copyTargetAll").remove();
          }
        });
      });
  }
}

// 「終了報告」
function roundEndBtn() {
  copyToClipboard();

  navigator.geolocation.getCurrentPosition(Conf, function (e) {
    alert(e.message);
  });

  function Conf(position) {
    var endRepo = $("#text-area-ocn7").val();
    var shopName = $("#dropdownMenuButton-ocn").text();
    var CurrentUser = Auth.currentUser;
    var CurrentColRef = firestore.collection(
      "users/" + CurrentUser.uid + "/TimeStamps"
    );

    CurrentColRef.orderBy("createdAt", "desc")
      .limit(1)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach((doc) => {
          var AddDocRoundCol = firestore.collection(
            "users/" +
              CurrentUser.uid +
              "/TimeStamps/" +
              doc.id +
              "/RoundTimeStamps"
          );

          var result = confirm(`${shopName}でラウンドしますか？`);
          if (result) {
            // RoundTimeStampsに出勤ドキュメント追加
            AddDocRoundCol.add({
              name: CurrentUser.email,
              createdAt: new Date(),
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              status: shopName,
              startRepo: "",
              roundStartRepo: "",
              roundStartTask: "",
              roundStartNext: "",
              roundStartOther: "",
              roundEndRepo: "",
              endRepo: endRepo,
              remarks: "-",
              type: "ocnRoundEnd",
            });
            alert(`${shopName}でラウンドを記録しました。お疲れさまです！`);
            $(".copyTargetAll").remove();
          }
        });
      });
  }
}

//----------------------------------------
// リロード
//----------------------------------------
function Reload() {
  setInterval(location.reload(), 1500);
}

//----------------------------------------
// クリップボード コピー
//----------------------------------------
function copyToClipboard() {
  var clipbord = $('<textarea class="copyTargetAll"></textarea>');
  var element = "";

  $(".copyTarget").each((i, elm) => {
    element = element + "\r\n\r\n" + elm.value;
  });

  console.log(element);

  clipbord.text(element);
  $("#main-container-container").append(clipbord);

  // コピー対象をJavaScript上で変数として定義する
  // var copyTarget = $(".copyTarget");

  // コピー対象のテキストを選択する
  // copyTarget.select();
  $(".copyTargetAll").select();

  // 選択しているテキストをクリップボードにコピーする
  document.execCommand("Copy");
  // clipbord.remove();

  // コピーをお知らせする
  alert("コピーできました！");
}

//----------------------------------------
// メール送信
//----------------------------------------
$(".mailCheck").click(function () {
  var mailto = "mailto:yhirano.109@gmail.com?subject=";
  var title = $("#mailTitle").val() + "&body=";
  var body = $("#mailBody")
    .val()
    .replace(/\r|\n|\r\n/g, "%0D%0A");

  var mailhref = mailto + title + body;
  console.log(mailhref);
  $(".mailBtn").attr("href", mailhref);
});

// 自分の出勤リストの表示
// function GetSelfRepoList(TGUserId, type) {
//     console.log(TGUserId);
//     var count = 1;

//     var TimeStampColRef = firestore.collection("users/" + TGUserId + "/TimeStamps");

//     // 勤怠のリスト
//     TimeStampColRef.orderBy("createdAt", "desc")
//       .get()
//       .then(function (querySnapshot) {
//         querySnapshot.forEach(function (doc) {
//           // RoundTimeコレクション取得
//           var RoundDocCol = firestore.collection(
//             "users/" + TGUserId + "/TimeStamps/" + doc.id + "/RoundTimeStamps"
//           );

//         // 勤怠 || 開始
//           RoundDocCol.where("type", "==", "StartWork")
//             .get()
//             .then(function (qs) {
//               qs.forEach(function (doc) {
//                 // var createdData = doc.data().createdAt.toDate();
//                 var CreateDate = doc.data().createdAt.toDate();
//                 var year = CreateDate.getFullYear();
//                 var month = CreateDate.getMonth() + 1;
//                 var day = CreateDate.getDate();
//                 var hour = CreateDate.getHours();
//                 var minutes = CreateDate.getMinutes();
//                 var sec = CreateDate.getSeconds();
//                 var RoundStartRepFeild = doc.data().startRepo;
//                 var OcnDateTime = `${year}年${month}月${day}日 ${hour}:${minutes}:${sec}`
//                 console.log(OcnDateTime);

//                 // var newAnchor  = document.createElement("p");
//                 var nweDatetxt = document.createTextNode(year + "年" + month + "月" + day + "日 " + `${hour}:${minutes}:${sec}`);

//                 // divタグ作成
//                 var newDiv = $('<div/>', {
//                   class: "d-flex w-100 justify-content-between",
//                 })
//                 .append($('<h6/>', {
//                   text: "ココにタイトル"
//                 }))
//                 .append($('<small>', {
//                   text: `${year}年${month}月${day}日 ${hour}:${minutes}:${sec}`,
//                 }));

//                 // aタグ作成
//                 var newAnchor = $('<a>', {
//                   href: `#work-${count}`,
//                   class: "list-group-item list-group-item-action",
//                 })
//                 .attr({
//                   'data-toggle': "collapse",
//                   'aria-current': 'false',
//                   'role': 'button',
//                   'aria-expanded': 'true',
//                   'area-controls': `work-${count}`
//                 })
//                 .append(newDiv)
//                 .append($('<small>', {
//                   class: 'mb-1 d-block text-left',
//                   text: '何かしらのテキスト',
//                 }))

//                 // 行挿入
//                 $("#self-repo-work-list").append(newAnchor);
//                 count += 1;
//       });
//     });
//   });
//   }).catch((e) => {
//       consolo.log(e)
//   })
// };

// 自分の出勤リストの表示
function GetSelfRepoList(TGUserId, type) {
  console.log(TGUserId);
  var StartWorkCount = 1;
  var EndWorkCount = 1;
  var ocnRoundStartCount = 1;
  var ocnShopStartCount = 1;
  var ocnShopEndCount = 1;
  var ocnRoundEndCount = 1;

  var TimeStampColRef = firestore.collection(
    "users/" + TGUserId + "/TimeStamps"
  );

  // 勤怠のリスト
  TimeStampColRef.orderBy("createdAt", "desc")
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // RoundTimeコレクション取得
        var RoundDocCol = firestore.collection(
          "users/" + TGUserId + "/TimeStamps/" + doc.id + "/RoundTimeStamps"
        );

        if (type === "Work") {
          // 勤怠 || 開始
          RoundDocCol.where("type", "==", `Start${type}`)
            .get()
            .then(function (qs) {
              qs.forEach(function (doc) {
                // 日付データ作成
                var DateTime = MakeDate(doc);

                // divタグ作成
                var newDiv = $("<div/>", {
                  class: `d-flex w-100 justify-content-between timeStamp${StartWorkCount}`,
                })
                  .append(
                    $("<h6/>", {
                      text: "出勤時間表示",
                    })
                  )
                  .append(
                    $("<small>", {
                      text: `出勤時間：${DateTime}`,
                    })
                  );

                // アコーディオンdivタグ作成
                var ColalpsnewDiv = $("<div/>", {
                  id: `collaps-${type}-${StartWorkCount}`,
                  class: `collapse timeStamp-${type}-${StartWorkCount}`,
                })
                  .append(
                    $("<h6/>", {
                      text: "ココにタイトル",
                    })
                  )
                  .append(
                    $("<small>", {
                      text: `出勤時間：${DateTime}`,
                    })
                  );

                // aタグ作成
                var newAnchor = $("<a>", {
                  href: `#collaps-${type}-${StartWorkCount}`,
                  class: "list-group-item list-group-item-action",
                })
                  .attr({
                    "data-toggle": "collapse",
                    "aria-current": "false",
                    role: "button",
                    "aria-expanded": "true",
                    "area-controls": `work-${StartWorkCount}`,
                  })
                  .append(newDiv)
                  .append(
                    $("<i>", {
                      class: "bi bi-arrow-bar-down",
                    })
                  );

                $("#self-repo-work-list").append(newAnchor);
                $(newAnchor).append(ColalpsnewDiv);
              });
              StartWorkCount += 1;
            });
          // 勤怠 || 終了
          RoundDocCol.where("type", "==", `End${type}`)
            .get()
            .then(function (qs) {
              qs.forEach(function (doc) {
                // 日付データ作成
                var DateTime = MakeDate(doc);
                $(`.timeStamp${EndWorkCount}`).append(
                  $("<small>", {
                    text: `退勤時間：${DateTime}`,
                  })
                );
                EndWorkCount += 1;
              });
            });
        } else if (type === "ocn") {
          var ocnRoundStart = `${type}RoundStart`;
          var ocnShopStart = `${type}ShopStart`;
          var ocnShopEnd = `${type}ShopEndocnShopEnd`;
          var ocnRoundEnd = `${type}RoundEnd`;

          // リスト内の要素削除
          RemoveResult(type);
          // ラウンドスタート || OCN
          RoundDocCol.where("type", "==", ocnRoundStart)
            .get()
            .then(function (qs) {
              qs.forEach(function (doc) {
                // 日付データ作成
                var DateTime = MakeDate(doc);

                // divタグ作成
                var newDiv = $("<div/>", {
                  class: `d-flex px-5 w-100 justify-content-between timeStamp-${type}-${ocnRoundStartCount}`,
                })
                  .append(
                    $("<h6/>", {
                      text: "ココにタイトル",
                    })
                  )
                  .append(
                    $("<small>", {
                      text: `出勤時間：${DateTime}`,
                    })
                  );

                // アコーディオンdivタグ作成
                var ColalpsnewDiv = $("<div/>", {
                  id: `collaps-${type}-${ocnRoundStartCount}`,
                  class: `collapse`,
                }).append(
                  $("<table>", {
                    class: "table",
                  })
                  .append(
                    $('<thead/>')
                  .append($('<tr/>')
                    .append(
                      $("<th/>", {
                        class: "col",
                        text: "稼動店舗",
                      })
                    )
                    .append(
                      $("<th/>", {
                        class: "col",
                        text: `活動報告`,
                      })
                    )
                    .append(
                      $("<th/>", {
                        class: "col",
                        text: `課題`,
                      })
                    )
                    .append(
                      $("<th/>", {
                        class: "col",
                        text: `次回アクション`,
                      })
                    )
                    .append(
                      $("<th/>", {
                        class: "col",
                        text: `備考`,
                      })
                    )
                  )
                  )
                .append($('<tbody/>', {
                  class: `tbody-${type}`
                }))
                );

                // aタグ作成
                var newAnchor = $("<a>", {
                  href: `#collaps-${type}-${ocnRoundStartCount}`,
                  class: `list-group-item list-group-item-action list-${type}-${ocnRoundStartCount}`,
                })
                  .attr({
                    "data-toggle": "collapse",
                    "aria-current": "false",
                    role: "button",
                    "aria-expanded": "true",
                    "area-controls": `work-${ocnRoundStartCount}`,
                  })
                  .append(newDiv)
                  .append(
                    $("<i>", {
                      class: "bi bi-arrow-bar-down",
                    })
                  );

                // 行挿入
                $("#self-repo-ocn-list").append(newAnchor);
                $(newAnchor).append(ColalpsnewDiv);
                ocnRoundStartCount += 1;
              });

              // 勤怠 || 終了
              RoundDocCol.where("type", "==", ocnRoundEnd)
                .get()
                .then(function (qs) {
                  qs.forEach(function (doc) {
                    // 日付データ作成
                    var DateTime = MakeDate(doc);
                    $(`.timeStamp-${type}-${ocnRoundEndCount}`).append(
                      $("<small>", {
                        text: `退勤時間：${DateTime}`,
                      })
                    );
                    ocnRoundEndCount += 1;
                  });
                });
            });

          // ショップスタート || OCN
          RoundDocCol.where("type", "==", ocnShopStart)
            .get()
            .then(function (qs) {
              qs.forEach(function (doc) {
                // 日付データ作成
                var DateTime = MakeDate(doc);

                // divタグ作成
                $(`.tbody-${type}`)
                .append($('<tr/>')
                  .append(
                    $("<td/>", {
                      class: "col",
                      text: `店舗ラウンド${ocnShopStartCount}`,
                    })
                  )
                  .append(
                    $("<td/>", {
                      class: "col",
                      text: `${doc.data().roundStartRepo}`,
                    })
                  )
                  .append(
                    $("<td/>", {
                      class: "col",
                      text: `${doc.data().roundStartTask}`,
                    })
                  )
                  .append(
                    $("<td/>", {
                      class: "col",
                      text: `${doc.data().roundStartNext}`,
                    })
                  )
                  .append(
                    $("<td/>", {
                      class: "col",
                      text: `${doc.data().roundStartOther}`,
                    })
                  )
                );

                // 行挿入
                // $(`#list-${type}-${ocnRoundStartCount}`).append(newDiv);
                ocnShopStartCount += 1;
              });
            });
        } else {
        }
      });
    })
    .catch((e) => {
      console.log(e);
    });
}

// 日付データ化

function MakeDate(doc) {
  var CreateDate = doc.data().createdAt.toDate();
  var year = CreateDate.getFullYear();
  var month = CreateDate.getMonth() + 1;
  var day = CreateDate.getDate();
  var hour = CreateDate.getHours();
  var minutes = CreateDate.getMinutes();
  var sec = CreateDate.getSeconds();
  // var RoundStartRepFeild = doc.data().startRepo;
  var DateTime = `${year}年${month}月${day}日 ${hour}:${minutes}:${sec}`;
  return DateTime;
}

// OCNリスト削除
function RemoveResult(type) {
  const parent = document.getElementById(`self-repo-${type}-list`);
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

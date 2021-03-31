<template>
  <div id="conatiner" class="mt-8 mr-4">
    <h2 class="text-2xl text-gray-600 font-semibold text-left ml-4">
      打刻修正{{ beforeModifyType }}
    </h2>
    <div class="bg-white py-5 rounded-md ml-4 shadow-md dark:bg-gray-800">
      <div class="flex flex-col md:flex-row align-bottom">
        <label class="text-sm py-2 mx-4 mt-2 md:my-2">日付選択</label>
        <div class="flex">
          <datepicker
            v-model="selected"
            :locale="locale"
            :upperLimit="to"
            :lowerLimit="from"
            class="border-2 border-gray-500 rounded py-1 px-2 m-2 w-4/5 mx-0 md:w-auto"
          />
          <button
            @click="getReport"
            class="bg-blue-500 hover:bg-blue-700 mailCheck text-white font-bold px-4 py-1 my-2 mx-auto ml-0 md:ml-3 rounded"
          >
            表示
          </button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 front_container mx-4">
        <div class="border border-gray-400 rounded-lg">
          <h3 class="text-left text-lg font-semibold text-gray-600 m-4">
            打刻データ修正
          </h3>
          <table class="mx-auto w-11/12">
            <tr>
              <td class="p-3 text-right text-gray-600 w-1/5">打刻区分</td>
              <td class="p-3 text-left w-4/5">
                <span class="font-semibold text-gray-600">{{
                  selectedStatus
                }}</span
                >打刻区分は自動で判別されます
              </td>
            </tr>
            <tr>
              <td class="p-3 text-right text-gray-600 w-1/5">時刻</td>
              <td class="p-3 text-left w-4/5">
                <span class="font-semibold text-gray-600">{{
                  beforeModifyTime
                }}</span
                ><input
                  v-model="selected_mdtime"
                  type="time"
                  class="border rounded-sm border-gray-400 p-1"
                />
              </td>
            </tr>
            <tr>
              <td class="p-3 text-right text-gray-600 w-1/5">打刻場所</td>
              <td class="p-3 text-left w-4/5">
                <select
                  :options="options"
                  v-model="selected_place"
                  class="w-11/12 mx-auto border border-gray-400 rounded py-1 px-2 m-1"
                >
                  <option disabled value="">選択してください</option>
                  <option
                    v-for="(option, index) in options"
                    :value="option"
                    :key="index"
                  >
                    {{ option }}
                  </option>
                </select>
              </td>
            </tr>
            <tr>
              <td class="p-3 text-right text-gray-600 w-1/5">備考</td>
              <td class="p-3 text-left">
                <textarea
                  name=""
                  id=""
                  rows="4"
                  class="w-11/12 border rounded-sm border-gray-400 p-2"
                ></textarea>
              </td>
            </tr>
          </table>
          <div class="bg-gray-300 rounded-b-md text-right pr-4">
            <button
              @click="ModifyTime(w_items[0][6])"
              class="bg-red-500 hover:bg-red-700 text-white rounded-md py-1 px-5 my-2"
            >
              打刻
            </button>
          </div>
        </div>
        <div class="border border-gray-400 rounded-lg md:ml-4 mt-3 md:mt-0">
          <div class="mt-3 text-xs text-right text-red-500">
            <small>※矢印の後ろは未承認打刻適用後の時間となります。</small>
          </div>
          <table class="mx-auto w-11/12">
            <tr class="border-t border-gray-400">
              <td class="p-3 text-left w-2/5 text-gray-400">労働時間</td>
              <td class="p-3 text-left">{{ calc_hour }}時間{{ calc_min }}分</td>
            </tr>
            <tr class="border-t border-gray-400">
              <td class="p-3 text-left w-2/5 text-gray-400">休憩時間</td>
              <td class="p-3 text-left">0時間0分</td>
            </tr>
            <tr class="border-t border-gray-400">
              <td class="p-3 text-left w-2/5 text-gray-400">
                シフト外労働時間
              </td>
              <td class="p-3 text-left">0時間0分</td>
            </tr>
            <tr class="border-t border-gray-400">
              <td class="p-3 text-left w-2/5 text-gray-400">残業時間</td>
              <td class="p-3 text-left">0時間0分</td>
            </tr>
            <tr class="border-t border-gray-400">
              <td class="p-3 text-left w-2/5 text-gray-400">深夜労働時間</td>
              <td class="p-3 text-left">0時間0分</td>
            </tr>
            <tr class="border-t border-gray-400">
              <td class="p-3 text-left w-2/5 text-gray-400">状態</td>
              <td class="p-3 text-left">0時間0分</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div
      id="attention-box"
      class="my-3 ml-4 pb-3 bg-white rounded-md shadow-md dark:bg-gray-800"
    >
      <div class="bg-gray-400 h-10 rounded-t-md">
        <h2 class="pl-4 pt-2 text-left font-semibold text-gray-700">
          打刻一覧
        </h2>
      </div>

      <div class="mt-2">
        <table class="mx-6">
          <thead class="bg-gray-300">
            <tr>
              <td class="p-2 w-2/12">打刻区分</td>
              <td class="p-2 w-2/12">時刻</td>
              <td class="p-2 w-2/12">打刻方法</td>
              <td class="p-2 w-2/12">打刻場所</td>
              <td class="p-2 w-2/12">打刻備考等</td>
              <td class="p-2 w-2/12">修正・削除</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(w_item, index) in w_items" :key="index">
              <td class="text-sm border px-4 py-2">{{ w_item[0] }}</td>
              <td class="text-sm border px-4 py-2">{{ w_item[1] }}</td>
              <td class="text-sm border px-4 py-2">PCマイページ修正</td>
              <td class="text-sm border px-4 py-2">
                ICT事業部 -> 大阪事業部 -> 0-1
              </td>
              <td class="text-sm border px-4 py-2 text-left">備考：</td>
              <td class="text-sm border px-4 py-2">
                <span v-if="w_item[4] == 'beforeModify'">承認待ち</span>
                <span v-if="w_item[4] == 'beforeDelete'">削除待ち</span>
                <div class="flex">
                  <button
                    @click="Edit_Time(w_item[0], w_item[1], w_item[5])"
                    :id="['edit-btn_' + index]"
                    class="block md:mx-1 lg:mx-auto bg-blue-500 hover:bg-blue-700 rounded-lg text-white py-1 px-3"
                  >
                    修正
                  </button>
                  <button
                    v-if="
                      w_item[4] != 'beforeModify' && w_item[4] != 'beforeDelete'
                    "
                    @click="DeleteTime(w_item[6], w_item[5])"
                    :id="['edit-btn_' + index]"
                    class="block md:mx-1 lg:mx-auto bg-red-500 hover:bg-red-700 rounded-lg text-white py-1 px-3"
                  >
                    削除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Datepicker from "vue3-datepicker";
// import { ref, watch } from "vue";
// // const selected = ref(new Date());

export default {
  name: "FixTime",
  data() {
    return {
      selected: "",
      selected_place: "",
      selected_mdtime: "",
      options: ["foo", "bar", "baz"],
      w_items: [],
      calt_time: [],
      calc_hour: "0",
      calc_min: "0",
      ws_time: Date,
      we_time: Date,
      selectedStatus: "",
      beforeModifyType: "",
      beforeModifyTime: "",
    };
  },
  components: {
    Datepicker,
  },
  methods: {
    ModifyTime: function (WorkInTime) {
      if (this.selected_mdtime != "") {
        navigator.geolocation.getCurrentPosition(Conf, function (e) {
          alert(e.message);
        });

        var self = this;
        var CurrentUser = firebase.auth().currentUser;
        var TGUserId = CurrentUser.uid;
        var TimeStampColRef = firebase
          .firestore()
          .collection("users/" + TGUserId + "/TimeStamps");

        var SD = self.Date_FS_change()[0];
        var ED = self.Date_FS_change()[1];
        var MD = self.Date_FS_change()[2];

        function Conf(position) {
          TimeStampColRef.orderBy("createdAt")
            .startAt(SD)
            .endAt(ED)
            .get()
            .then(function (qs) {
              qs.forEach(function (doc) {
                // RoundTimeコレクション取得
                var RoundDocCol = firebase
                  .firestore()
                  .collection(
                    "users/" +
                      TGUserId +
                      "/TimeStamps/" +
                      doc.id +
                      "/RoundTimeStamps"
                  );

                RoundDocCol.orderBy("createdAt", "asc")
                  .limit(1)
                  .get()
                  .then(function (qs) {
                    qs.forEach(function (doc) {
                      if (self.beforeModifyType == "") {
                        if (doc.data().createdAt.toDate() > MD.toDate()) {
                          self.beforeModifyType = "StartWork";
                        } else {
                          self.beforeModifyType = "EndWork";
                        }
                      }
                    });
                  })
                  .then(function () {
                    RoundDocCol.add({
                      name: CurrentUser.email,
                      createdAt: MD,
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude,
                      status: "beforeModify",
                      startRepo: "",
                      roundStartRepo: "",
                      roundStartTask: "",
                      roundStartNext: "",
                      roundStartOther: "",
                      roundEndRepo: "",
                      endRepo: "",
                      remarks: "-",
                      type: self.beforeModifyType,
                    });
                  })
                  .then(function () {
                    self.beforeModifyType = "";
                    self.beforeModifyTime = "";
                    self.selected_mdtime = "";
                  });
              });
            })
            .then(function () {
              self.getReport();
            });
        }
      } else {
        alert("時刻が正しくありません。");
      }
    },
    DeleteTime: function (beforeDeleteTime, beforeDeleteType) {
      navigator.geolocation.getCurrentPosition(Conf, function (e) {
        alert(e.message);
      });

      var self = this;
      var CurrentUser = firebase.auth().currentUser;
      var TGUserId = CurrentUser.uid;
      var TimeStampColRef = firebase
        .firestore()
        .collection("users/" + TGUserId + "/TimeStamps");

      var SD = self.Date_FS_change("")[0];
      var ED = self.Date_FS_change("")[1];
      var DD = self.Date_FS_change(beforeDeleteTime)[3];

      function Conf(position) {
        TimeStampColRef.orderBy("createdAt")
          .startAt(SD)
          .endAt(ED)
          .get()
          .then(function (qs) {
            qs.forEach(function (doc) {
              // RoundTimeコレクション取得
              var RoundDocCol = firebase
                .firestore()
                .collection(
                  "users/" +
                    TGUserId +
                    "/TimeStamps/" +
                    doc.id +
                    "/RoundTimeStamps"
                );
              RoundDocCol.add({
                name: CurrentUser.email,
                createdAt: DD,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                status: "beforeDelete",
                startRepo: "",
                roundStartRepo: "",
                roundStartTask: "",
                roundStartNext: "",
                roundStartOther: "",
                roundEndRepo: "",
                endRepo: "",
                remarks: "-",
                type: beforeDeleteType,
              });
            });
          })
          .then(function () {
            self.getReport();
          });
      }
    },
    Edit_Time: function (status, beformodifytime, beforeModifyType) {
      console.log(status);
      console.log(beformodifytime);

      this.selectedStatus = status + " → ";
      this.beforeModifyTime = beformodifytime + " → ";
      this.beforeModifyType = beforeModifyType;
      console.log(this.beforeModifyType);
    },
    toDoubleDigits: function (num) {
      num += "";
      if (num.length === 1) {
        num = "0" + num;
      }
      return num;
    },
    Date_FS_change: function (beforeDeleteTime) {
      var DateStart = this.selected;
      var _SD = new Date(DateStart);

      var _sd = new Date(
        _SD.getFullYear(),
        _SD.getMonth(),
        _SD.getDate(),
        0,
        0,
        0
      );
      var _ed = new Date(
        _SD.getFullYear(),
        _SD.getMonth(),
        _SD.getDate() + 1,
        0,
        0,
        0
      );
      var _dd = new Date(beforeDeleteTime);

      // 修正時刻
      var SMD_time = this.selected_mdtime;
      var _md_time = Number(SMD_time.slice(0, 2));
      var _md_sec = Number(SMD_time.slice(3, 5));

      var _md = new Date(
        _SD.getFullYear(),
        _SD.getMonth(),
        _SD.getDate(),
        _md_time,
        _md_sec,
        0
      );

      var SD = firebase.firestore.Timestamp.fromDate(_sd);
      var ED = firebase.firestore.Timestamp.fromDate(_ed);
      var MD = firebase.firestore.Timestamp.fromDate(_md);
      var DD = firebase.firestore.Timestamp.fromDate(_dd);

      return [SD, ED, MD, DD];
    },
    getReport: function () {
      // リスト初期化
      this.w_items.splice(0, this.w_items.length);

      var self = this;
      var user = firebase.auth().currentUser;
      var TGUserId = user.uid;
      var TimeStampColRef = firebase
        .firestore()
        .collection("users/" + TGUserId + "/TimeStamps");

      var SD = self.Date_FS_change()[0];
      var ED = self.Date_FS_change()[1];

      TimeStampColRef.orderBy("createdAt")
        .startAt(SD)
        .endAt(ED)
        .get()
        .then(function (qs) {
          qs.forEach(function (doc) {
            // RoundTimeコレクション取得
            var RoundDocCol = firebase
              .firestore()
              .collection(
                "users/" +
                  TGUserId +
                  "/TimeStamps/" +
                  doc.id +
                  "/RoundTimeStamps"
              );

            // OCN業務開始
            RoundDocCol.where("type", "==", "StartWork")
              .get()
              .then(function (StartWork) {
                StartWork.forEach(function (qs) {
                  var _wsItem = [];

                  var CreateDate = qs.data().createdAt.toDate();
                  var year = CreateDate.getFullYear();
                  var month = self.toDoubleDigits(CreateDate.getMonth() + 1);
                  var day = self.toDoubleDigits(CreateDate.getDate());
                  var hour = self.toDoubleDigits(CreateDate.getHours());
                  var minutes = self.toDoubleDigits(CreateDate.getMinutes());
                  // var sec = self.toDoubleDigits(CreateDate.getSeconds());
                  var DateTime =
                    year +
                    "年" +
                    month +
                    "月" +
                    day +
                    "日 " +
                    `${hour}:${minutes}`;

                  self.ws_time = CreateDate;
                  _wsItem.push(
                    "入室",
                    DateTime,
                    qs.data().latitude,
                    qs.data().longitude,
                    qs.data().status,
                    qs.data().type,
                    CreateDate
                  );
                  self.w_items.push(_wsItem);
                });
              });
            // OCN業務開始
            RoundDocCol.where("type", "==", "EndWork")
              .get()
              .then(function (EndWork) {
                EndWork.forEach(function (qs) {
                  var _weItem = [];

                  var we_CreateDate = qs.data().createdAt.toDate();
                  var year = we_CreateDate.getFullYear();
                  var month = self.toDoubleDigits(we_CreateDate.getMonth() + 1);
                  var day = self.toDoubleDigits(we_CreateDate.getDate());
                  var hour = self.toDoubleDigits(we_CreateDate.getHours());
                  var minutes = self.toDoubleDigits(we_CreateDate.getMinutes());
                  // var sec = self.toDoubleDigits(we_CreateDate.getSeconds());
                  var DateTime =
                    year +
                    "年" +
                    month +
                    "月" +
                    day +
                    "日 " +
                    `${hour}:${minutes}`;
                  self.we_time = we_CreateDate;
                  _weItem.push(
                    "退室",
                    DateTime,
                    qs.data().latitude,
                    qs.data().longitude,
                    qs.data().status,
                    qs.data().type,
                    we_CreateDate
                  );
                  self.w_items.push(_weItem);
                });
              })
              .then(function () {
                if (self.we_time != "") {
                  var workTime = new Date(self.we_time - self.ws_time);
                  self.calc_hour = Math.floor(
                    Math.abs(workTime) / (60 * 60 * 1000)
                  );
                  self.calc_min = Math.floor(
                    (Math.abs(workTime) / (60 * 1000)) % 60
                  );

                  var wt_hour = workTime.getHours();
                  var wt_minutes = workTime.getMinutes();
                  var wt_seconds = workTime.getSeconds();
                  var workTime = `${wt_hour}:${wt_minutes}:${wt_seconds}`;
                }
              });
          });
        });
    },
  },
  mounted() {
    this.selected = new Date();
    this.getReport();
  },
};
</script>

<style>
@media screen and (max-width: 410px) {
  #conatiner {
    max-width: 320px;
  }
}

table {
  display: block;
  overflow-x: scroll;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
</style>

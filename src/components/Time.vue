<template>
  <div class="my-3 mx-3 pb-3 bg-white rounded-md shadow-md dark:bg-gray-800">
    <div>
      <div class="bg-gray-400 h-12 rounded-t-md">
        <h2 class="text-xl in-outstate pt-2 font-semibold">
          {{ CurrentStatus }}
        </h2>
      </div>
      <h1 class="mt-6 text-5xl sm:text-6xl text-gray-800 dark:text-white">
        {{ time }}
      </h1>
      <div class="selelctOptions">
        <label class="text-xs text-gray-600">打刻場所を選択して下さい。</label>
        <select
          :options="options"
          v-model="selected"
          class="block mx-auto border border-gray-300 rounded py-1 px-2 m-1"
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
        <textarea
          placeholder="備考"
          cols="30"
          rows="3"
          class="border border-gray-300 rounded py-1 px-2 m-2"
        ></textarea>
      </div>
    </div>
    <div>
      <button
        @click="TimeStamp"
        class="px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-blue-500 rounded hover:bg-gray-600 focus:outline-none"
        type="button"
      >
        Push
      </button>
    </div>
    <div>
      <input
        type="checkbox"
        name="is_yakin"
        class="border border-gray-300 rounded py-1 px-2 m-2"
      />
      <label for="is_yakin">夜勤モード</label>
      <div id="monthly_summary_information">
        <span class="inline-block">総計: 131:10</span>
        <span class="inline-block ml-4">休憩: 13:00</span>
        <span class="inline-block ml-4">残業: 0:00</span>
        <span class="inline-block ml-4">深夜: 0:20</span>
      </div>
    </div>
  </div>

  <div
    id="attention-box"
    class="my-3 mx-3 pb-3 bg-white rounded-md shadow-md dark:bg-gray-800"
  >
    <div class="bg-gray-400 h-10 rounded-t-md">
      <h2 class="pt-2">以下の項目の確認をお願い致します。</h2>
    </div>

    <div>
      <table class="table-fixed mx-2 mt-2">
        <tbody>
          <tr>
            <td class="w-60 border px-4 py-2 text-sm text-gray-600">
              打刻漏れ・打刻間違い
            </td>
            <td class="w-60 border px-4 py-2">858</td>
          </tr>
          <tr class="bg-gray-100">
            <td class="w-60 border px-4 py-2 text-sm text-gray-600">
              打刻エラー
            </td>
            <td class="w-60 border px-4 py-2">112</td>
          </tr>
          <tr>
            <td class="w-60 border px-4 py-2 text-sm text-gray-600">
              シフト募集
            </td>
            <td class="w-60 border px-4 py-2">1,280</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "time",
  data() {
    return {
      time: "",
      CurrentStatus: "読込中…",
      selected: "",
      options: ["foo", "bar", "baz"],
    };
  },

  methods: {
    do: function () {
      this.time = setInterval(() => {
        var now = new Date();
        this.time = now.toLocaleString();
      }, 1000);
    },
    StatusChange: function () {
      let self = this;
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          firebase
            .firestore()
            .doc(`users/${user.uid}`)
            .get()
            .then(function (qs) {
              console.log(user.uid);
              console.log(qs.data().status);
              self.CurrentStatus = qs.data().status;
            });
        }
      });
    },
    TimeStamp: function () {
      var self = this;
      var position = navigator.geolocation.getCurrentPosition(
        test2,
        function (e) {
          alert(e.message);
        }
      );

      //   ログインユーザーのドキュメント・サブコレクション取得
      var CurrentUser = firebase.auth().currentUser;
      var CurrentDocRef = firebase.firestore().doc("users/" + CurrentUser.uid);
      var CurrentColRef = firebase
        .firestore()
        .collection("users/" + CurrentUser.uid + "/TimeStamps");

      function test2(position) {
        CurrentDocRef.get(CurrentDocRef)
          .then(function (doc) {
            if (doc.data().status == "退勤中") {
              // var CurrentStatus = doc.data().status;
              var NewStats = "出勤中";
              CurrentDocRef.update({
                status: NewStats,
              });
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
                var AddDocRoundCol = firebase
                  .firestore()
                  .collection(
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
                self.StatusChange();
              });
            } else {
              var NewStats = "退勤中";
              CurrentDocRef.update({
                status: NewStats,
              });
              // RoundTimeStampsに退勤ドキュメント追加

              CurrentColRef.orderBy("createdAt", "desc")
                .limit(1)
                .get()
                .then(function (querySnapshot) {
                  querySnapshot.forEach((doc) => {
                    var AddDocRoundCol = firebase
                      .firestore()
                      .collection(
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
                      status: "confirm",
                      type: "EndWork",
                    });
                  });
                });

              self.StatusChange();
            }
          })
          .then(function () {
            this.StatusChange();
          })
          .catch(function (eroor) {
            console.log(eroor);
          });
      }
    },
  },
  mounted() {
    this.do();
    this.StatusChange();
  },
};
</script>

<style scoped>
button {
  width: 400px;
}

.selelctOptions > select,
textarea {
  width: 400px;
}

#attention-box {
  width: 45%;
}

@media screen and (max-width: 997px) {
  button {
    width: 300px;
  }

  .selelctOptions > select,
  textarea {
    width: 300px;
  }

  #attention-box {
    width: 320px;
  }
}
</style>
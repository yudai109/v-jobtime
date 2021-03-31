<template>
    <div class="input-group d-flex flex-column mb-3 mx-3 my-3">
        <h2 class="text-2xl font-semibold text-left ml-4">OCNのラウンド業務終了報告</h2>
        <p class="border-b text-sm text-left ml-4 mt-2 pb-4">OCNのラウンド業務終了報告です。<br>メールボタンを押すと、デフォルトのメール送信画面に移ります。<font-awesome-icon class="question-icon" icon="question-circle" size="sm" /></p>
        <!-- ラウンド退店 -->
        <div id="exit-shop" class="form-group hide-container mt-12">
            <label class="text-left bg-gary-600" for="text-area-ocn6">ラウンド退店</label>
            <textarea v-model="roundEndRepo" class="p-2 form-textarea mt-1 block border rounded-sm w-full exit-shop^text" id="text-area-ocn6" rows="6"></textarea>
            <!-- <button class="btn btn-danger copy-btn mt-2" onclick="copyToClipboard()">コピーする</button> -->
            <p><button class="btn text-white font-bold py-2 px-4 rounded" id="Round" @click="shopEndBtn">ラウンド</button></p>
        </div>
       <!-- mail -->
        <div id="mail-container">
          <button id="mailTo" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded"><a class="p-0 m-0" :href="href">メール送信</a></button>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: "OcnRoundEnd",
  data() {
      return {
          roundEndRepo: "",
          href: "",
      }
  },
  methods: {
      shopEndBtn: function() {
        var self = this;
        navigator.geolocation.getCurrentPosition(Conf, function (e) {
            alert(e.message);
        });

        function Conf(position) {
            var CurrentUser = firebase.auth().currentUser;
            var CurrentColRef = firebase.firestore().collection(`users/${CurrentUser.uid}/TimeStamps`);

            CurrentColRef.orderBy("createdAt", "desc")
            .limit(1)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach((doc) => {
                var AddDocRoundCol = firebase.firestore().collection(`users/${CurrentUser.uid}/TimeStamps/${doc.id}/RoundTimeStamps`);

                var result = confirm(`ラウンドしますか？`);
                if (result) {
                    // RoundTimeStampsに出勤ドキュメント追加
                    AddDocRoundCol.add({
                    name: CurrentUser.email,
                    createdAt: new Date(),
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    status: "confirm",
                    startRepo: "",
                    roundStartRepo: "",
                    roundStartTask: "",
                    roundStartNext: "",
                    roundStartOther: "",
                    roundEndRepo: self.roundEndRepo,
                    endRepo: "",
                    remarks: "-",
                    type: "ocnRoundEnd",
                    });
                }
                });
                
                var mailto = `mailto:yhirano.109@gmail.com?subject=開始報告&body=`;
                var body = self.endRepo.replace(/\r|\n|\r\n/g, "%0D%0A");

                var mailhref = mailto + body;
                console.log(mailhref);
                self.href = mailhref;
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
  }
};
</script>

<style scoped>
button {
    margin-top: 10px;
    width: 250px;
}
.btn {
    background-color: #ed8936;
}

.btn:hover {
    background-color: #c05621;
}

</style>
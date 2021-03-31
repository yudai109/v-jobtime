<template>
    <!-- 報告メール -->
    <div class="grid md:grid-cols-2 mt-12 mx-2">
         <h2 class="text-2xl font-semibold text-left ml-4">OCNの終了メール編集画面</h2>
        <p class="border-b text-sm text-left ml-4 mt-2 pb-4">OCNの終了メール編集画面です。<br>メールボタンを押すと、デフォルトのメール送信画面に移ります。<font-awesome-icon class="question-icon" icon="question-circle" size="sm" /></p>
        <div class="hide-container ocn-report-list-container flex-fill pr-2 rounded-top">
            <div href="#" class="p-0 d-flex" aria-current="true">
                <div class="rounded border bg-white d-flex flex-column flex-sm-row w-100 justify-content-between bg-secondary px-2 mb-3">
                    <h5 class="mb-0 p-2">出発報告</h5>
                    <hr>
                    <p class="p-2 text-sm">{{ oncStartRepo }}</p>
                </div>
                <div v-for="(osr_item, index) in reverseItems" :key="index" class="rounded border bg-white d-flex flex-column flex-sm-row w-100 justify-content-between bg-secondary px-2 mb-3">
                    <h5 class="mb-0 p-2">入店報告:{{ index }}</h5>
                    <hr>
                    <p class="p-2 text-sm">{{ osr_item[0] }}</p>
                </div>
                <div class="rounded border bg-white d-flex flex-column flex-sm-row w-100 justify-content-between bg-secondary px-2 mb-3">
                    <h5 class="mb-0 p-2">退店報告</h5>
                    <hr>
                    <pre class="p-2 text-sm">{{ roundEndRepo }}</pre>
                </div>
                <div class="rounded border bg-white d-flex flex-column flex-sm-row w-100 justify-content-between bg-secondary px-2 mb-3">
                    <h5 class="mb-0 p-2">終了報告</h5>
                    <hr>
                    <p class="p-2 text-sm">{{ endRepo }}</p>
                </div>
            </div>
            <div>
                <label class="text-sm">日付選択</label>
                <datepicker
                    v-model="selected"
                    :locale="locale"
                    :upperLimit="to"
                    :lowerLimit="from"
                    class="border-2 border-gray-500 rounded px-2 py-1 "
                />
            </div>
            <button @click="getReport" class="bg-blue-500 hover:bg-blue-700 mailCheck text-white font-bold py-2 px-4 my-2 rounded">レポート取得</button>
        </div>

        <div class="hide-container ocn-reoprt-mail-container flex-fill mt-3">
            <label for="text-area-ocn8">メール編集画面</label>
            <div class="form-floating mb-3">
                <label for="mailTitle">件名</label>
                <input v-model="mailTitle" type="email" class="rounded mt-1 block border w-full p-2" id="mailTitle" placeholder="件名">
            </div>
            <div class="form-floating">
                <label for="mailBody">本文</label>
                <textarea v-model="mailBody" class="rounded p-2 form-textarea mt-1 block border w-full" placeholder="本文" id="mailBody" style="height: 350px"></textarea>
            </div>
            <div class="mt-2">
                <button @click="SetText" class="btn mailCheck text-white font-bold py-2 px-4 rounded">本文確定</button>
            </div>
            <div class="mt-2">
                <button @click="mailBodyPush" class="mailCheck bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded"><a :href="mailhref">メール送信</a></button>
            </div>
        </div>
    </div>

</template>

<script>
import firebase from 'firebase'
import Datepicker from 'vue3-datepicker'
import { ref } from 'vue'
const selected = ref(new Date())

export default {
    name: "OcnMail",
    data() {
        return {
            osr_items: [],
            oncStartRepo: "",
            ocnRoundStartRepo: "",
            roundEndRepo: "",
            endRepo: "",
            mailTitle: "",
            mailBody: "",
            mailhref: "",
            selected: "",
        }
    },
    components: {
        Datepicker
    },
    methods: {
        SetText: function() {
            var mailto = `mailto:yhirano.109@gmail.com?subject=${this.mailTitle}&body=`;
            var mailBody = this.mailBody.replace(/\r|\n|\r\n/g, "%0D%0A");
            this.mailhref = `${mailto}${mailBody}`;
        },
        mailBodyPush: function() {
                        var CurrentUser = firebase.auth().currentUser;
            var CurrentColRef = firebase.firestore().collection(
                "users/" + CurrentUser.uid + "/TimeStamps"
            );

            var self = this;
            navigator.geolocation.getCurrentPosition(Conf, function (e) {
            alert(e.message);
            });

            function Conf(position) {
                var CurrentUser = firebase.auth().currentUser;
                var CurrentColRef = firebase.firestore().collection(
                    "users/" + CurrentUser.uid + "/TimeStamps"
                );
                CurrentColRef.orderBy("createdAt", "desc")
                    .limit(1)
                    .get()
                    .then(function (querySnapshot) {
                        querySnapshot.forEach((doc) => {
                        var AddDocRoundCol = firebase.firestore().collection(
                            "users/" +
                            CurrentUser.uid +
                            "/TimeStamps/" +
                            doc.id +
                            "/RoundTimeStamps"
                        );
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
                            roundEndRepo: "",
                            endRepo: "",
                            mailBody: self.mailBody,
                            remarks: "-",
                            type: "ocnMail",
                            });
                    });
                })
            }
        },
        getReport: function() {
            var self = this;

            self.osr_items.splice(0, self.osr_items.length)
            self.oncStartRepo = ""
            self.ocnRoundStartRepo = ""
            self.roundEndRepo = ""
            self.endRepo = ""
            self.mailTitle = ""
            self.mailBody = ""
            self.mailhref = ""

            var user = firebase.auth().currentUser;
            var TGUserId = user.uid
            var TimeStampColRef = firebase.firestore().collection("users/" + TGUserId + "/TimeStamps");

            var DateStart = this.selected;
            var _SD = new Date(DateStart);

            var _sd = new Date(_SD.getFullYear(), _SD.getMonth(), _SD.getDate(), 0, 0, 0);
            var _ed = new Date(_SD.getFullYear(), _SD.getMonth(), _SD.getDate() + 1, 0, 0, 0);

            var SD = firebase.firestore.Timestamp.fromDate(_sd);
            var ED = firebase.firestore.Timestamp.fromDate(_ed);

            TimeStampColRef.orderBy("createdAt").startAt(SD).endAt(ED)
            .get()
            .then(function(qs) {
                qs.forEach(function(doc) {
                    // RoundTimeコレクション取得
                    var RoundDocCol = firebase.firestore().collection("users/" + TGUserId + "/TimeStamps/" + doc.id + "/RoundTimeStamps");
                    // OCN業務開始
                    RoundDocCol.where("type", "==", "ocnStart")
                    .get()
                    .then(function(oncStartdoc) {
                        oncStartdoc.forEach(function(qs) {
                            self.oncStartRepo = qs.data().startRepo;
                            self.mailBody = qs.data().startRepo;
                        })
                    })
                    .then(function() {
                        // OCNラウンド開始
                        RoundDocCol.where("type", "==", "ocnRoundStart")
                        .get()
                        .then(function(oncRoundStartdoc) {
                            oncRoundStartdoc.forEach(function(qs) {
                                var _ors_item = [];
                                var roundStartRepo = qs.data().roundStartRepo;
                                var roundStartTask = qs.data().roundStartTask;
                                var roundStartNext = qs.data().roundStartNext;
                                var roundStartOther = qs.data().roundStartOther;
                                var ocnRoundStartRepo = `${roundStartRepo}\n${roundStartTask}\n${roundStartNext}\n${roundStartOther}`
                                // self.ocnRoundStartRepo = ocnRoundStartRepo;
                                // self.mailBody = `${self.mailBody}\n\n${ocnRoundStartRepo}`;

                                _ors_item.push(ocnRoundStartRepo);
                                self.osr_items.push(_ors_item);
                                console.log(self.osr_items)
                            })
                        })
                        .then(function() {
                            var reversedItems = self.osr_items.slice().reverse();
                            console.log(reversedItems)
                            for(var ors_item in reversedItems) {
                                console.log(ors_item)
                                self.mailBody = `${self.mailBody}\n\n${reversedItems[ors_item]}`;
                            }
                        })
                        .then(function() {
                            // OCNラウンド終了
                            RoundDocCol.where("type", "==", "ocnRoundEnd")
                            .get()
                            .then(function(oncRoundEnddoc) {
                                oncRoundEnddoc.forEach(function(qs) {
                                    self.roundEndRepo = qs.data().roundEndRepo;
                                    self.mailBody = `${self.mailBody}\n\n${qs.data().roundEndRepo}`;
                                })
                            })
                        })
                        .then(function() {
                            // OCN業務終了
                            RoundDocCol.where("type", "==", "ocnEnd")
                            .get()
                            .then(function(oncEnddoc) {
                                oncEnddoc.forEach(function(qs) {
                                    self.endRepo = qs.data().endRepo;
                                    self.mailBody = `${self.mailBody}\n\n${qs.data().endRepo}`;
                                    // console.log(self.mailBody)
                                })
                            })
                        })
                        .then(function() {
                            // OCN業務終了
                            RoundDocCol.where("type", "==", "ocnMail")
                            .get()
                            .then(function(ocnMailDco) {
                                ocnMailDco.forEach(function(qs) {
                                    if(qs.exists) {
                                        self.mailBody = "";
                                        self.mailBody = qs.data().mailBody;
                                    } else {
                                        console.log('ありｍせん')
                                        console.log(self.mailBody)
                                    }
                                })
                            })
                        })
                    })
                });
            })
        },
    },
    computed: {
        reverseItems() {
            return this.osr_items.slice().reverse();
        }
    }
};
</script>

<style scoped>
button {
    width: 250px;
}

.btn {
    margin-top: 10px;
    background-color: #ed8936;
}

.btn:hover {
    background-color: #c05621;
}

</style>
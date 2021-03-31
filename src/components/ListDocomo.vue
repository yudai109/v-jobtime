<template>
<div id="conatiner">
    <h1>ドコモ</h1>
        <div class="flex flex-col md:flex-row align-bottom">
            <label class="text-sm py-2 mx-4 mt-2 md:my-2">日付選択</label>
            <datepicker
                v-model="selected"
                :locale="locale"
                :upperLimit="to"
                :lowerLimit="from"
                class="border-2 border-gray-500 rounded py-1 px-2 m-2"
            />
            <button @click="getReport" class="bg-blue-500 hover:bg-blue-700 mailCheck text-white font-bold px-4 py-1 my-2 mx-auto md:mx-0 rounded">レポート取得</button>
        </div>

        <div class="w-full mx-auto md:p-8">
        <ul class="mx-4 my-3 text-left">
            <li class="pb-1" v-for="(item, index) in items" :key="index">
                <div class="shadow-md">
                    <div class="tab w-full overflow-hidden border-t">
                        <input @click="OpenList" class="absolute opacity-0" :id="['tab-single-' + index]" type="radio" name="tabs">
                        <label class="md:flex justify-between w-full p-4 pb-2 leading-normal cursor-pointer" :for="['tab-single-' + index]">
                            <div class="px-2 md:px-0">
                                <h3 class="text-sm font-semibold"><span class="px-5 py-1 mr-3 text-xs border rounded-2xl text-green-500 border-green-500">勤怠</span>{{ createdAt }}｜OCN報告</h3>
                                <p class="my-2 md:mt-3 pl-2 text-xs text-gray-400">緯度：{{latitude}} 経度：{{ longitude }}</p>
                            </div>
                            <div class="px-2 md:px-0">
                                <button class="py-1 px-6 mr-2 border rounded-2xl text-xs bg-blue-500 text-white">編集</button>
                                <button class="py-1 px-6 border rounded-2xl text-xs ">下書き</button>
                            </div>
                        </label>
                            <div class="tab-content overflow-hidden border-l-2 bg-gray-100 border-blue-500 leading-normal">
                                <p class="p-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, architecto, explicabo perferendis nostrum, maxime impedit atque odit sunt pariatur illo obcaecati soluta molestias iure facere dolorum adipisci eum? Saepe, itaque.</p>
                            </div>
                    </div>
                </div>
            </li>
        </ul>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'
import Datepicker from 'vue3-datepicker'
import { ref } from 'vue'
const selected = ref(new Date())

var setCheck;

export default {
    name: 'ListDocomo',
    data() {
        return {
            items: [],
            selected: "",
            createdAt: "",
            latitude: "",
            longitude: "",
            status: "",
        }
    },
    components: {
        Datepicker,
    },
    methods: {
    getReport: function() {
            var self = this;
            var user = firebase.auth().currentUser;
            var TGUserId = user.uid
            var TimeStampColRef = firebase.firestore().collection("users/" + TGUserId + "/TimeStamps");

            var DateStart = this.selected;
            var _SD = new Date(DateStart);

            var _sd = new Date(_SD.getFullYear(), _SD.getMonth(), _SD.getDate(), 0, 0, 0);
            var _ed = new Date(_SD.getFullYear(), _SD.getMonth(), _SD.getDate() + 1, 0, 0, 0);

            var SD = firebase.firestore.Timestamp.fromDate(_sd);
            var ED = firebase.firestore.Timestamp.fromDate(_ed);

            var count = 0;

            TimeStampColRef.orderBy("createdAt").startAt(SD).endAt(ED)
            .get()
            .then(function(qs) {
                qs.forEach(function(doc) {
                    // RoundTimeコレクション取得
                    var RoundDocCol = firebase.firestore().collection("users/" + TGUserId + "/TimeStamps/" + doc.id + "/RoundTimeStamps");
                    // OCN業務開始
                    RoundDocCol.where("type", "==", "OcnAtart")
                    .get()
                    .then(function(StartWork) {
                        StartWork.forEach(function(qs) {

                            var CreateDate = doc.data().createdAt.toDate();
                            var year = CreateDate.getFullYear();
                            var month = CreateDate.getMonth() + 1;
                            var day = CreateDate.getDate();
                            var hour = CreateDate.getHours();
                            var minutes = CreateDate.getHours();
                            var sec = CreateDate.getSeconds();
                            var DateTime = year + "年" + month + "月" + day + "日 " + `${hour}:${minutes}:${sec}`

                            self.createdAt = DateTime;
                            self.latitude = qs.data().latitude;
                            self.longitude = qs.data().longitude;
                            self.status = qs.data().status;
                        })
                    })
                });
            })
        },
        OpenList: function(e) {
            console.log('yyy')
            console.log(setCheck)
                if(setCheck != this){
                    setCheck = this;
                    console.log('aaa')
                }else{
                    e.target.checked = false;
                    setCheck = null;
                    console.log('bbb')
                }
        },
        DocomoList: function() {
            var self = this;
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
                            self.status = qs.data().startRepo;
                            self.mailBody = qs.data().startRepo;
                        })
                    })
                    .then(function() {
                        // OCNラウンド開始
                        RoundDocCol.where("type", "==", "ocnRoundStart")
                        .get()
                        .then(function(oncRoundStartdoc) {
                            oncRoundStartdoc.forEach(function(qs) {
                                var roundStartRepo = qs.data().roundStartRepo;
                                var roundStartTask = qs.data().roundStartTask;
                                var roundStartNext = qs.data().roundStartNext;
                                var roundStartOther = qs.data().roundStartOther;
                                var ocnRoundStartRepo = `${roundStartRepo}\n${roundStartTask}\n${roundStartNext}\n${roundStartOther}`
                                self.ocnRoundStartRepo = ocnRoundStartRepo;
                                self.mailBody = `${self.mailBody}\n\n${ocnRoundStartRepo}`;
                            })
                        })
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
                            })
                        })
                    })
                });
            })
        }
    },
}
</script>

<style>

.question {
    visibility: hidden;
}

.question-icon:hover .question {
    visibility: visible;
}

/* Tab content - closed */
.tab-content {
    max-height: 0;
    -webkit-transition: max-height .35s;
    -o-transition: max-height .35s;
    transition: max-height .35s;
}
/* :checked - resize to full height */
.tab input:checked ~ .tab-content {
    max-height: 100vh;
}

/* Label formatting when open */
.tab input:checked + div{
    /*@apply text-xl p-5 border-l-2 border-brue-500 bg-gray-100 text-blue*/
    font-size: 1.25rem; /*.text-xl*/
    padding: 1.25rem; /*.p-5*/
    border-left-width: 2px; /*.border-l-2*/
    border-color: #4299E1; /*.border-blue*/
    background-color: #f8fafc; /*.bg-gray-100 */
    color: #4299E1; /*.text-blue*/
}

/* Icon */
.tab label::after {
    float:right;
    right: 0;
    top: 0;
    display: block;
    width: 1.5em;
    height: 1.5em;
    line-height: 1.5;
    font-size: 1.25rem;
    text-align: center;
    -webkit-transition: all .35s;
    -o-transition: all .35s;
    transition: all .35s;
}

/* Icon formatting - closed */
.tab input[type=checkbox] + label::after {
    content: "+";
    font-weight:bold; /*.font-bold*/
    border-width: 1px; /*.border*/
    border-radius: 9999px; /*.rounded-full */
    border-color: #b8c2cc; /*.border-grey*/
}
.tab input[type=radio] + label::after {
    content: "\25BE";
    font-weight:bold; /*.font-bold*/
    border-width: 1px; /*.border*/
    border-radius: 9999px; /*.rounded-full */
    border-color: #b8c2cc; /*.border-grey*/
}

/* Icon formatting - open */
.tab input[type=checkbox]:checked + label::after {
    transform: rotate(315deg);
    background-color: #4299E1; /*.bg-blue*/
    color: #f8fafc; /*.text-grey-lightest*/
}
.tab input[type=radio]:checked + label::after {
    transform: rotateX(180deg);
    background-color: #4299E1; /*.bg-blue*/
    color: #f8fafc; /*.text-grey-lightest*/
}

</style>
<template>
<div id="conatiner">
    <h1>OCN</h1>
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
        <!-- 出勤報告 -->
        <div class="w-full mx-auto md:p-6 md:pb-2">
            <h3 class="text-left ml-4 text-gray-600">出勤報告</h3>
            <hr>
            <ul class="mx-4 my-3 text-left">
                <li v-if="workStartItems.length === 0">この日の報告はありません</li>
                <li class="pb-1" v-for="(ws_item, index) in workStartItems" :key="index">
                    <div class="shadow-md">
                        <div class="tab w-full overflow-hidden border-t">
                            <input @click="OpenList" class="absolute opacity-0" :id="['ows-tab-single-' + index]" type="radio" name="tabs">
                            <label class="md:flex justify-between w-full p-4 pb-2 leading-normal cursor-pointer" :for="['ows-tab-single-' + index]">
                                <div class="px-2 md:px-0">
                                    <h3 class="text-sm font-semibold"><span class="px-5 py-1 mr-3 text-xs border rounded-2xl text-green-500 border-green-500">勤怠</span>{{ ws_item[0] }}｜OCN報告</h3>
                                    <p class="my-2 md:mt-3 pl-2 text-xs text-gray-400">緯度：{{ws_item[1]}} 経度：{{ ws_item[2] }}</p>
                                </div>
                                <div class="px-2 md:px-0">
                                    <button class="py-1 px-6 mr-2 border rounded-2xl text-xs bg-blue-500 text-white">編集</button>
                                    <button class="py-1 px-6 border rounded-2xl text-xs ">下書き</button>
                                </div>
                            </label>
                                <div class="tab-content overflow-hidden border-l-2 bg-gray-100 border-blue-500 leading-normal">
                                    <p class="p-5">出勤報告<br>{{ ws_item[3] }}</p>
                                </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- ラウンド開始報告 -->
        <div class="w-full mx-auto md:p-6 md:pb-2">
            <h3 class="text-left ml-4 text-gray-600">ラウンド開始報告</h3>
            <hr>
            <ul class="mx-4 my-3 text-left">
                <li v-if="roundStartItems.length === 0">この日の報告はありません</li>
                <li class="pb-1" v-for="(rs_item, index) in roundStartItems" :key="index">
                    <div class="shadow-md">
                        <div class="tab w-full overflow-hidden border-t">
                            <input @click="OpenList" class="absolute opacity-0" :id="['ors-tab-single-' + index]" type="radio" name="tabs">
                            <label class="md:flex justify-between w-full p-4 pb-2 leading-normal cursor-pointer" :for="['ors-tab-single-' + index]">
                                <div class="px-2 md:px-0">
                                    <h3 class="text-sm font-semibold"><span class="px-5 py-1 mr-3 text-xs border rounded-2xl text-green-500 border-green-500">勤怠</span>{{ rs_item[0] }}｜OCNラウンド開始報告</h3>
                                    <p class="my-2 md:mt-3 pl-2 text-xs text-gray-400">緯度：{{rs_item[1]}} 経度：{{ rs_item[2] }}</p>
                                </div>
                                <div class="px-2 md:px-0">
                                    <button class="py-1 px-6 mr-2 border rounded-2xl text-xs bg-blue-500 text-white">編集</button>
                                    <button class="py-1 px-6 border rounded-2xl text-xs ">下書き</button>
                                </div>
                            </label>
                                <div class="tab-content overflow-hidden border-l-2 bg-gray-100 border-blue-500 leading-normal">
                                    <p class="p-5">{{ rs_item[3] }}</p>
                                    <p class="p-5">{{ rs_item[4] }}</p>
                                    <p class="p-5">{{ rs_item[5] }}</p>
                                    <p class="p-5">{{ rs_item[6] }}</p>
                                </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- ラウンド終了報告 -->
        <div class="w-full mx-auto md:p-6 md:pb-2">
            <h3 class="text-left ml-4 text-gray-600">ラウンド終了報告</h3>
            <hr>
            <ul class="mx-4 my-3 text-left">
                <li v-if="roundEndItems.length === 0">この日の報告はありません</li>
                <li class="pb-1" v-for="(re_item, index) in roundEndItems" :key="index">
                    <div class="shadow-md">
                        <div class="tab w-full overflow-hidden border-t">
                            <input @click="OpenList" class="absolute opacity-0" :id="['ore-tab-single-' + index]" type="radio" name="tabs">
                            <label class="md:flex justify-between w-full p-4 pb-2 leading-normal cursor-pointer" :for="['ore-tab-single-' + index]">
                                <div class="px-2 md:px-0">
                                    <h3 class="text-sm font-semibold"><span class="px-5 py-1 mr-3 text-xs border rounded-2xl text-green-500 border-green-500">勤怠</span>{{ re_item[0] }}｜OCNラウンド終了報告</h3>
                                    <p class="my-2 md:mt-3 pl-2 text-xs text-gray-400">緯度：{{re_item[1]}} 経度：{{ re_item[2] }}</p>
                                </div>
                                <div class="px-2 md:px-0">
                                    <button class="py-1 px-6 mr-2 border rounded-2xl text-xs bg-blue-500 text-white">編集</button>
                                    <button class="py-1 px-6 border rounded-2xl text-xs ">下書き</button>
                                </div>
                            </label>
                                <div class="tab-content overflow-hidden border-l-2 bg-gray-100 border-blue-500 leading-normal">
                                    <p class="p-5">出勤報告<br>{{ re_item[3] }}</p>
                                </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 業務終了報告 -->
        <div class="w-full mx-auto md:p-6 md:pb-2">
            <h3 class="text-left ml-4 text-gray-600">退勤報告</h3>
            <hr>
            <ul class="mx-4 my-3 text-left">
                <li v-if="workEndItems.length === 0">この日の報告はありません</li>
                <li class="pb-1" v-for="(we_item, index) in workEndItems" :key="index">
                    <div class="shadow-md">
                        <div class="tab w-full overflow-hidden border-t">
                            <input @click="OpenList" class="absolute opacity-0" :id="['owe-tab-single-' + index]" type="radio" name="tabs">
                            <label class="md:flex justify-between w-full p-4 pb-2 leading-normal cursor-pointer" :for="['owe-tab-single-' + index]">
                                <div class="px-2 md:px-0">
                                    <h3 class="text-sm font-semibold"><span class="px-5 py-1 mr-3 text-xs border rounded-2xl text-green-500 border-green-500">勤怠</span>{{ we_item[0] }}｜OCN業務終了報告</h3>
                                    <p class="my-2 md:mt-3 pl-2 text-xs text-gray-400">緯度：{{we_item[1]}} 経度：{{ we_item[2] }}</p>
                                </div>
                                <div class="px-2 md:px-0">
                                    <button class="py-1 px-6 mr-2 border rounded-2xl text-xs bg-blue-500 text-white">編集</button>
                                    <button class="py-1 px-6 border rounded-2xl text-xs ">下書き</button>
                                </div>
                            </label>
                                <div class="tab-content overflow-hidden border-l-2 bg-gray-100 border-blue-500 leading-normal">
                                    <p class="p-5">出勤報告<br>{{ we_item[3] }}</p>
                                </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <!-- 業務終了メール -->
        <div class="w-full mx-auto md:p-6 md:pb-2">
            <h3 class="text-left ml-4 text-gray-600">業務終了メール</h3>
            <hr>
            <ul class="mx-4 my-3 text-left">
                <li v-if="mailBodyItems.length === 0">この日の報告はありません</li>
                <li class="pb-1" v-for="(mb_item, index) in mailBodyItems" :key="index">
                    <div class="shadow-md">
                        <div class="tab w-full overflow-hidden border-t">
                            <input @click="OpenList" class="absolute opacity-0" :id="['oem-tab-single-' + index]" type="radio" name="tabs">
                            <label class="md:flex justify-between w-full p-4 pb-2 leading-normal cursor-pointer" :for="['oem-tab-single-' + index]">
                                <div class="px-2 md:px-0">
                                    <h3 class="text-sm font-semibold"><span class="px-5 py-1 mr-3 text-xs border rounded-2xl text-green-500 border-green-500">勤怠</span>{{ mb_item[0] }}｜OCN業務終了メール</h3>
                                    <p class="my-2 md:mt-3 pl-2 text-xs text-gray-400">緯度：{{mb_item[1]}} 経度：{{ mb_item[2] }}</p>
                                </div>
                                <div class="px-2 md:px-0">
                                    <button class="py-1 px-6 mr-2 border rounded-2xl text-xs bg-blue-500 text-white">編集</button>
                                    <button class="py-1 px-6 border rounded-2xl text-xs ">下書き</button>
                                </div>
                            </label>
                                <div class="tab-content overflow-hidden border-l-2 bg-gray-100 border-blue-500 leading-normal">
                                    <p class="p-5">出勤報告<br>{{ mb_item[3] }}</p>
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
    name: 'ListWork',
    data() {
        return {
            workStartItems: [],
            roundStartItems: [],
            roundEndItems: [],
            workEndItems: [],
            mailBodyItems: [],
            selected: "",
            ows_createdAt: "",
            ors_createdAt: "",
            ore_createdAt: "",
            owe_createdAt: "",
            oem_createdAt: "",
            latitude: "",
            longitude: "",
            status: "",
            startRepo: "",
            roundStartRepo: "",
            roundStartTask: "",
            roundStartNext: "",
            roundStartOther: "",
            roundEndRepo: "",
            endRepo: "",
            mailBody: "",
        }
    },
    components: {
        Datepicker,
    },
    methods: {
    getReport: function() {
            // リスト初期化
            this.workStartItems.splice(0, this.workStartItems.length)
            this.roundStartItems.splice(0, this.roundStartItems.length)
            this.roundEndItems.splice(0, this.roundEndItems.length)
            this.workEndItems.splice(0, this.workEndItems.length)

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
                    RoundDocCol.where("type", "==", "ocnStart")
                    .get()
                    .then(function(ocnStart) {
                        ocnStart.forEach(function(qs) {
                            var _item = []

                            var CreateDate = qs.data().createdAt.toDate();
                            console.log(CreateDate)
                            var year = CreateDate.getFullYear();
                            var month = CreateDate.getMonth() + 1;
                            var day = CreateDate.getDate();
                            var hour = CreateDate.getHours();
                            var minutes = CreateDate.getMinutes();
                            var sec = CreateDate.getSeconds();
                            var DateTime = year + "年" + month + "月" + day + "日 " + `${hour}:${minutes}:${sec}`

                            self.ows_createdAt = DateTime;
                            self.latitude = qs.data().latitude;
                            self.longitude = qs.data().longitude;
                            self.status = qs.data().status;
                            self.startRepo = qs.data().startRepo;

                            _item.push(self.ows_createdAt, self.latitude, self.longitude, self.startRepo);
                            console.log(_item)
                            self.workStartItems.push(_item);
                        })
                    })
                    .then(
                        // OCNラウンド開始
                        RoundDocCol.where("type", "==", "ocnRoundStart")
                        .get()
                        .then(function(ocnStart) {
                            ocnStart.forEach(function(qs) {
                                var _roundStartItem = []
    
                                var CreateDate = qs.data().createdAt.toDate();
                                console.log(CreateDate)
                                var year = CreateDate.getFullYear();
                                var month = CreateDate.getMonth() + 1;
                                var day = CreateDate.getDate();
                                var hour = CreateDate.getHours();
                                var minutes = CreateDate.getMinutes();
                                var sec = CreateDate.getSeconds();
                                var DateTime = year + "年" + month + "月" + day + "日 " + `${hour}:${minutes}:${sec}`
    
                                self.ors_createdAt = DateTime;
                                self.latitude = qs.data().latitude;
                                self.longitude = qs.data().longitude;
                                self.status = qs.data().status;
                                self.roundStartRepo = qs.data().roundStartRepo;
                                self.roundStartTask = qs.data().roundStartTask;
                                self.roundStartNext = qs.data().roundStartNext;
                                self.roundStartOther = qs.data().roundStartOther;
    
                                _roundStartItem.push(self.ors_createdAt, self.latitude, self.longitude, self.roundStartRepo, self.roundStartTask, self.roundStartNext, self.roundStartOther);
                                console.log(_roundStartItem)
                                self.roundStartItems.push(_roundStartItem);
                            })
                        })
                    )
                    .then(
                        // OCNラウンド終了
                        RoundDocCol.where("type", "==", "ocnRoundEnd")
                        .get()
                        .then(function(ocnStart) {
                            ocnStart.forEach(function(qs) {
                                var _roundEndItem = []

                                var CreateDate = qs.data().createdAt.toDate();
                                console.log(CreateDate)
                                var year = CreateDate.getFullYear();
                                var month = CreateDate.getMonth() + 1;
                                var day = CreateDate.getDate();
                                var hour = CreateDate.getHours();
                                var minutes = CreateDate.getMinutes();
                                var sec = CreateDate.getSeconds();
                                var DateTime = year + "年" + month + "月" + day + "日 " + `${hour}:${minutes}:${sec}`

                                self.ore_createdAt = DateTime;
                                self.latitude = qs.data().latitude;
                                self.longitude = qs.data().longitude;
                                self.status = qs.data().status;
                                self.roundEndRepo = qs.data().roundEndRepo;

                                _roundEndItem.push(self.ore_createdAt, self.latitude, self.longitude, self.roundEndRepo);
                                console.log(_roundEndItem)
                                self.roundEndItems.push(_roundEndItem);
                            })
                        })
                    )
                    .then(
                        // OCN業務終了
                        RoundDocCol.where("type", "==", "ocnEnd")
                        .get()
                        .then(function(ocnStart) {
                            ocnStart.forEach(function(qs) {
                                var _endItem = []
    
                                var CreateDate = qs.data().createdAt.toDate();
                                console.log(CreateDate)
                                var year = CreateDate.getFullYear();
                                var month = CreateDate.getMonth() + 1;
                                var day = CreateDate.getDate();
                                var hour = CreateDate.getHours();
                                var minutes = CreateDate.getMinutes();
                                var sec = CreateDate.getSeconds();
                                var DateTime = year + "年" + month + "月" + day + "日 " + `${hour}:${minutes}:${sec}`
    
                                self.owe_createdAt = DateTime;
                                self.latitude = qs.data().latitude;
                                self.longitude = qs.data().longitude;
                                self.status = qs.data().status;
                                self.endRepo = qs.data().endRepo;
    
                                _endItem.push(self.owe_createdAt, self.latitude, self.longitude, self.endRepo);
                                console.log(_endItem)
                                self.workEndItems.push(_endItem);
                            })
    
                        })
                    )
                    .then(
                        // OCN業務終了メール
                        RoundDocCol.where("type", "==", "ocnMail")
                        .get()
                        .then(function(ocnMail) {
                            ocnMail.forEach(function(qs) {
                                var _mailItem = []
    
                                var CreateDate = qs.data().createdAt.toDate();
                                console.log(CreateDate)
                                var year = CreateDate.getFullYear();
                                var month = CreateDate.getMonth() + 1;
                                var day = CreateDate.getDate();
                                var hour = CreateDate.getHours();
                                var minutes = CreateDate.getMinutes();
                                var sec = CreateDate.getSeconds();
                                var DateTime = year + "年" + month + "月" + day + "日 " + `${hour}:${minutes}:${sec}`
    
                                self.oem_createdAt = DateTime;
                                self.latitude = qs.data().latitude;
                                self.longitude = qs.data().longitude;
                                self.status = qs.data().status;
                                self.mailBody = qs.data().mailBody;

                                console.log(self.mailBody)
    
                                _mailItem.push(self.oem_createdAt, self.latitude, self.longitude, self.mailBody);
                                console.log(_mailItem)
                                self.mailBodyItems.push(_mailItem);
                            })
    
                        })
                    )
                });
            })
        },
        OpenList: function(e) {
            console.log(setCheck)
                if(setCheck != this){
                    setCheck = this;
                }else{
                    e.target.checked = false;
                    setCheck = null;
                }
        },
        // OcnList: function() {
        //     var self = this;
        //     var user = firebase.auth().currentUser;
        //     var TGUserId = user.uid
        //     var TimeStampColRef = firebase.firestore().collection("users/" + TGUserId + "/TimeStamps");

        //     var DateStart = this.selected;
        //     var _SD = new Date(DateStart);

        //     var _sd = new Date(_SD.getFullYear(), _SD.getMonth(), _SD.getDate(), 0, 0, 0);
        //     var _ed = new Date(_SD.getFullYear(), _SD.getMonth(), _SD.getDate() + 1, 0, 0, 0);

        //     var SD = firebase.firestore.Timestamp.fromDate(_sd);
        //     var ED = firebase.firestore.Timestamp.fromDate(_ed);

        //      TimeStampColRef.orderBy("createdAt").startAt(SD).endAt(ED)
        //     .get()
        //     .then(function(qs) {
        //         qs.forEach(function(doc) {
        //             // RoundTimeコレクション取得
        //             var RoundDocCol = firebase.firestore().collection("users/" + TGUserId + "/TimeStamps/" + doc.id + "/RoundTimeStamps");
        //             // OCN業務開始
        //             RoundDocCol.where("type", "==", "ocnStart")
        //             .get()
        //             .then(function(oncStartdoc) {
        //                 oncStartdoc.forEach(function(qs) {
        //                     self.status = qs.data().startRepo;
        //                     self.mailBody = qs.data().startRepo;
        //                 })
        //             })
        //             .then(function() {
        //                 // OCNラウンド開始
        //                 RoundDocCol.where("type", "==", "ocnRoundStart")
        //                 .get()
        //                 .then(function(oncRoundStartdoc) {
        //                     oncRoundStartdoc.forEach(function(qs) {
        //                         var roundStartRepo = qs.data().roundStartRepo;
        //                         var roundStartTask = qs.data().roundStartTask;
        //                         var roundStartNext = qs.data().roundStartNext;
        //                         var roundStartOther = qs.data().roundStartOther;
        //                         var ocnRoundStartRepo = `${roundStartRepo}\n${roundStartTask}\n${roundStartNext}\n${roundStartOther}`
        //                         self.ocnRoundStartRepo = ocnRoundStartRepo;
        //                         self.mailBody = `${self.mailBody}\n\n${ocnRoundStartRepo}`;
        //                     })
        //                 })
        //             })
        //             .then(function() {
        //                 // OCNラウンド終了
        //                 RoundDocCol.where("type", "==", "ocnRoundEnd")
        //                 .get()
        //                 .then(function(oncRoundEnddoc) {
        //                     oncRoundEnddoc.forEach(function(qs) {
        //                         self.roundEndRepo = qs.data().roundEndRepo;
        //                         self.mailBody = `${self.mailBody}\n\n${qs.data().roundEndRepo}`;
        //                     })
        //                 })
        //             })
        //             .then(function() {
        //                 // OCN業務終了
        //                 RoundDocCol.where("type", "==", "ocnEnd")
        //                 .get()
        //                 .then(function(oncEnddoc) {
        //                     oncEnddoc.forEach(function(qs) {
        //                         self.endRepo = qs.data().endRepo;
        //                         self.mailBody = `${self.mailBody}\n\n${qs.data().endRepo}`;
        //                     })
        //                 })
        //             })
        //         });
        //     })
        // }
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
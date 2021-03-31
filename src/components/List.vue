<template>
<div id="conatiner" class="mt-8">
    <h2 class="text-2xl font-semibold text-left ml-4">自分の報告一覧</h2>
    <p class="border-b text-sm text-left ml-4 mt-2 pb-4">自分が行った申請報告の一覧です。<br>検索画面より申請の検索やCSVダウンロードを行うことが出来ます。<font-awesome-icon class="question-icon" icon="question-circle" size="sm" /></p>
        <div class="mt-5">
            <ul class="flex justify-items-center md:justify-start md:ml-4 justify-center">
                <li @click="ChangeComponent('ListWork')" class="text-blue-400 hover:text-blue-700 px-4 py-2 border-2 rounded-t-md"><button @click="getWorkReport" >勤怠</button></li>
                <li @click="ChangeComponent('ListDocomo')" class="text-blue-400 hover:text-blue-700 px-4 py-2 border-2 rounded-t-md"><button @click="getReport" >ドコモ</button></li>
                <li @click="ChangeComponent('ListSKP')" class="text-blue-400 hover:text-blue-700 px-4 py-2 border-2 rounded-t-md"><button @click="getReport" >スカパー</button></li>
                <li @click="ChangeComponent('ListOcn')" class="text-blue-400 hover:text-blue-700 px-4 py-2 border-2 rounded-t-md"><button @click="getOcnReport" >OCN</button></li>
            </ul>
        </div>
        <div>

        <component :is="current" />
        <!-- <div class="w-full mx-auto md:p-8">
        <ul class="mx-4 my-3 text-left">
            <li class="pb-1" v-for="(item, index) in items" :key="index">
                <div class="shadow-md">
                    <div class="tab w-full overflow-hidden border-t">
                        <input @click="OpenList" class="absolute opacity-0" :id="['tab-single-' + index]" type="radio" name="tabs">
                        <label class="md:flex justify-between w-full p-4 pb-2 leading-normal cursor-pointer" :for="['tab-single-' + index]">
                            <div class="px-2 md:px-0">
                                <h3 class="text-sm font-semibold"><span class="px-5 py-1 mr-3 text-xs border rounded-2xl text-green-500 border-green-500">勤怠</span>{{ createdAt }}｜勤怠打刻履歴</h3>
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
        </div> -->
    </div>
</div>
</template>

<script>
import firebase from 'firebase'
import Datepicker from 'vue3-datepicker'
import ListWork from "@/components/ListWork.vue";
import ListOcn from "@/components/ListOcn.vue";
import ListDocomo from "@/components/ListDocomo.vue";
import ListSKP from "@/components/ListSKP.vue";
import { ref } from 'vue'
const selected = ref(new Date())

var setCheck;

export default {
    name: 'List',
    data() {
        return {
            items: [],
            selected: "",
            createdAt: "",
            latitude: "",
            longitude: "",
            status: "",
            current: "ListWork",
        }
    },
    components: {
        Datepicker,
        ListWork,
        ListOcn,
        ListDocomo,
        ListSKP
    },
    methods: {
        ChangeComponent:function(tg) {
            this.current = tg;
        },
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
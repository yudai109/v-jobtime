<template>
    <div id="sidebar" :class="{'show': showSidebar}" class="rerative bg-gray-700 md:block flex flex-col w-12 py-8 border-r dark:bg-gray-800 dark:border-gray-600">
        <h2 class="mb-3 text-3xl font-semibold text-center text-gray-100 dark:text-white">V</h2>
        <div @click="SideOpener" class="bg-white py-2">
            <button class="text-gray"><font-awesome-icon icon="exchange-alt" size="lg" /></button>
        </div>

        <div v-show="isOpen" class="show-text flex flex-col items-center mt-6 -mx-2">
            <h4 class="mx-2 font-medium text-gray-100 dark:text-gray-200 hover:underline">{{ username }}</h4>
        </div>
        
        <div class="flex flex-col justify-between flex-1 mt-4">
            <nav>
                <a @click="Time" class="flex items-center px-4 py-1 tex1-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200" href="#">
                    <font-awesome-icon v-show="isOpen" icon="clock" class="text-gray-100" size="lg" />
                    <span v-show="isOpen" class="show-text mx-4 font-medium">勤怠</span>
                </a>
                <a @click="FixTime" class="flex items-center px-4 py-1 tex1-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200" href="#">
                    <font-awesome-icon v-show="isOpen" icon="clock" class="text-gray-100" size="lg" />
                    <span v-show="isOpen" class="show-text mx-4 font-medium">打刻修正</span>
                </a>

                <!-- 勤怠 -->
                <a @click="Attendance" class="flex items-center px-4 py-1 mt-1 text-gray-600 ext-gray-700 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    <font-awesome-icon v-show="isOpen" icon="record-vinyl" class="text-gray-100" size="lg" />
                    <span v-show="isOpen" class="show-text mx-4 font-medium">イベント</span>
                </a>
                <div class="pl-3 ext-gray-600 text-left">
                    <p v-show="isOpen" class="show-text text-gray-400 pl-4 pb-1 text-sm ">販売支援</p>
                    <ul>
                        <li v-show="isOpen" class="show-text pl-10 pb-1 text-gray-700 ext-gray-600 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-600"><a href="https://pro.form-mailer.jp/fms/cf139d30218840">準備完了/入店</a></li>
                        <li v-show="isOpen" class="show-text pl-10 pb-1 text-gray-700 ext-gray-600 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-600"><a href="https://pro.form-mailer.jp/fms/0c703e70218843">稼働報告</a></li>
                    </ul>
                    <p v-show="isOpen" class="show-text text-gray-400 pl-4 pb-1 text-sm ">イベント</p>
                    <ul>
                        <li v-show="isOpen" class="show-text pl-10 pb-1 text-gray-700 ext-gray-600 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-600"><a href="https://pro.form-mailer.jp/fms/cf139d30218840">準備完了/入店</a></li>
                        <li v-show="isOpen" class="show-text pl-10 pb-1 text-gray-700 ext-gray-600 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-600"><a href="https://pro.form-mailer.jp/fms/40c407a3218867">稼働報告</a></li>
                        <li v-show="isOpen" class="show-text pl-10 pb-1 text-gray-700 ext-gray-600 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-600"><a href="https://pro.form-mailer.jp/fms/b7e90ecf218921">参加報告</a></li>
                    </ul>
                </div>

                <!--  OCN報告 -->
                <a class="flex items-center px-4 py-1 mt-1 text-gray-600 ext-gray-700 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    <font-awesome-icon v-show="isOpen" icon="circle-notch" class="text-gray-100" size="lg" />

                    <span v-show="isOpen" class="show-text mx-4 font-medium">OCN</span>
                </a>
                <div class="pl-3 ext-gray-600 text-left">
                    <p v-show="isOpen" class="show-text text-gray-400 pl-4 pb-1 text-sm">販売支援</p>
                    <ul>
                        <li v-show="isOpen" @click="ocnStart" class="show-text pl-10 pb-1 text-gray-700 ext-gray-600 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-600"><a>出発</a></li>
                        <li v-show="isOpen" @click="ocnRoundStart" class="show-text pl-10 pb-1 text-gray-700 ext-gray-600 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-600"><a>ラウンド入店</a></li>
                        <li v-show="isOpen" @click="ocnRoundEnd" class="show-text pl-10 pb-1 text-gray-700 ext-gray-600 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-600"><a>ラウンド退店</a></li>
                        <li v-show="isOpen" @click="ocnEnd" class="show-text pl-10 pb-1 text-gray-700 ext-gray-600 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-600"><a>終了</a></li>
                    </ul>
                    <p v-show="isOpen" class="show-text text-gray-400 pl-4 pb-1 text-sm ">業務報告</p>
                    <ul>
                        <li v-show="isOpen" @click="ocnMail" class="show-text pl-10 pb-1 text-gray-700 ext-gray-600 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:bg-gray-200 hover:text-gray-600"><a>メール報告</a></li>
                    </ul>
                </div>

                <a @click="List" class="flex items-center px-4 py-1 mt-1 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700">
                    <font-awesome-icon v-show="isOpen" icon="cog" class="text-gray-100" size="lg" />
                    <span v-show="isOpen" class="show-text ml-4 font-medium">報告リスト</span>
                </a>
                <a @click="WorkCalender" class="flex items-center px-4 py-1 mt-1 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700">
                    <font-awesome-icon v-show="isOpen" icon="cog" class="text-gray-100" size="lg" />
                    <span v-show="isOpen" class="show-text ml-4 font-medium">出勤簿</span>
                </a>
<!-- 
                <a @click="Account" class="flex items-center px-4 py-1 mt-1 text-gray-600 transition-colors duration-200 transform dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700">
                    <font-awesome-icon v-show="isOpen" icon="cog" class="text-gray-100" size="lg" />
                    <span v-show="isOpen" class="show-text ml-4 font-medium">アカウント</span>
                </a> -->

                <div class=" flexitems-center justify-between mt-4">
                    <button v-show="isOpen" @click="signOut" class="w-5/6 px-4 py-2 leading-5 text-gray transition-colors duration-200 transform bg-white hover:bg-gray-400 rounded focus:outline-none" type="button">
                        ログアウト
                    </button>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
    name: 'Sidebar',
    data() {
        return {
            username: firebase.auth().currentUser.email,
            isOpen: true,
            showSidebar: true,
            width: "",
        }
    },
    methods: {
        signOut: function() {
            firebase.auth().signOut()
            .then(() => {
                this.$router.push('/signin')
            })
        },
        Time: function() {
            this.$emit('Time');
            this.SideOpener();
        },
        FixTime: function() {
            this.$emit('FixTime');
            this.SideOpener();
        },
        Account: function() {
            this.$emit('Account');
            this.SideOpener();
        },
        Attendance: function() {
            this.$emit('Attendance');
            this.SideOpener();
        },
        ocnStart: function() {
            this.$emit('ocnStart');
            this.SideOpener();
        },
        ocnRoundStart: function() {
            this.$emit('ocnRoundStart');
            this.SideOpener();
        },
        ocnRoundEnd: function() {
            this.$emit('ocnRoundEnd');
            this.SideOpener();
        },
        ocnEnd: function() {
            this.$emit('ocnEnd');
            this.SideOpener();
        },
        ocnMail: function() {
            this.$emit('ocnMail');
            this.SideOpener();
        },
        List: function() {
            this.$emit('List');
            this.SideOpener();
        },
        WorkCalender: function() {
            this.$emit('WorkCalender');
            this.SideOpener();
        },
        SideOpener: function() {
            if(this.showSidebar) {
                this.isOpen = false;
                setTimeout(() => {
                    this.showSidebar = false;
                }, 10)
            } else {
                this.showSidebar = true;
                setTimeout(() => {
                    this.isOpen = true;
                }, 200)
            }
        },
    }
}

</script>

<style scoped>
    #sidebar {
        transition:  all .2s ease-in-out;
    }

    .show {
        width: 270px;
        transition:  all .3s ease-in-out;
    }
    
    .show-text {
        color: #F7FAFC;
    }

    @media screen and (max-width: 997px) {
        .show-text {
            font-size: 14px;
            margin-top: 5px;
        }
    }

</style>
<template>
    <div class="max-w-sm mt-5 sm:mx-auto mx-2 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="px-6 py-4">
            <h2 class="text-3xl font-bold text-center text-gray-700 dark:text-white">ログイン</h2>

            <form>
                <div class="w-full mt-4">
                    <input v-model="username" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="email" placeholder="Email" aria-label="Email Address">
                </div>

                <div class="w-full mt-4">
                    <input v-model="password" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="password" placeholder="Password" aria-label="Password">
                </div>

                <div class="flexitems-center justify-between mt-4">
                    <button @click="signIn" class="w-full px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="button">
                        ログイン
                    </button>
                </div>
            </form>
        </div>

        <div class="flex items-center justify-center py-4 text-center bg-gray-100 dark:bg-gray-700">
            <span class="text-sm text-gray-600 dark:text-gray-200">パスワードを忘れた場合</span>
            <router-link to="/signup" href="#" class="mx-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-500">こちら→</router-link>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'Signin',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        signIn: function() {
            firebase.auth().signInWithEmailAndPassword(this.username, this.password)
            .then(user => {
                alert('ログインしました: ', user.email)
                this.$router.push('/')
            })
            .catch(error => {
                alert(error.message)
            })
        }
    }
}
</script>

<style>

</style>
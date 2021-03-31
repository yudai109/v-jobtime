<template>

<div class="container ml-4 mt-6 text-left">
  <h2 class="text-2xl font-bold text-gray-600">出勤簿</h2>
    <h2 class="text-xl text-gray-600 ">{{ currentDate.format('YYYY年MM月') }}の出勤情報</h2>
    <button class="bg-blue-400 rounded-lg px-4 py-1 text-gray-100 " @click="prevMonth"><font-awesome-icon class="mr-2" icon="chevron-left" />前の月</button>
    <button class="bg-blue-400 rounded-lg px-4 py-1 text-gray-100 ml-2" @click="nextMonth">次の月<font-awesome-icon class="ml-2" icon="chevron-right" /></button>
  <!-- <div>
    <input id="search_type_month" type="checkbox">
    <label for="search_type_month" class="ml-3">指定月</label>
     <font-awesome-icon icon="chevron-left"/>
        <select :years="years" v-model="selected_yaer" class="mx-auto border border-gray-300 rounded py-1 px-1 m-1" id="search_type_month_year">
          <option v-for="(year, index) in years" :value="year" :key="index">
            {{ year }}
          </option>
        </select>
        <label for="search_type_month_year">年</label>
        <select :months="months" v-model="selected_month" class="mx-auto border border-gray-300 rounded py-1 px-1 m-1" id="search_type_month_month">
          <option v-for="(month, index) in months" :value="month" :key="index">
            {{ month }}
          </option>
        </select>
        <label for="search_type_month_month">月</label>
     <font-awesome-icon icon="chevron-right" />
  </div> -->
</div>

  <div class="mx-auto px-auto">
    <CalenderInfo />
    <table class="ml-4 my-3">
        <thead class="border-b-4 border-double  border-gray-600 bg-gray-200">
          <tr>
            <th class="border-r border-gray-300 text-wrap p-2" scope="col">日付</th>
            <th class="border-r border-gray-300 text-wrap p-2" scope="col">休日<br />区分</th>
            <th class="border-r border-gray-300 text-wrap p-2" scope="col">シフト時間</th>
            <th class="border-r border-gray-300 text-wrap p-2" scope="col">出勤時刻</th>
            <th class="border-r border-gray-300 text-wrap p-2" scope="col">退勤時刻</th>
            <th class="border-r border-gray-300 text-wrap p-2" scope="col">労働時間</th>
            <th class="border-r border-gray-300 text-wrap p-2" scope="col">シフト外労働時間</th>
            <th class="border-r border-gray-300 text-wrap p-2" scope="col">残業時間</th>
            <th class="border-r border-gray-300 text-wrap p-2" scope="col">深夜時間</th>
            <th class="border-r border-gray-300 text-wrap p-2" scope="col">休憩時間</th>
            <th class="border-r border-gray-300 text-wrap p-2" scope="col">勤怠状況</th>
          </tr>
        </thead>
      <tbody>
            <tr v-for="(day, index) in calendars" :key="index" class="border-b border-gray-400">
            <td class="border-r border-gray-300 p-2"><a href="">{{ day.format('MM/DD(ddd)') }}</a></td>
            <td class="border-r border-gray-300"></td>
            <td class="border-r border-gray-300"></td>
            <td class="border-r border-gray-300"></td>
            <td class="border-r border-gray-300"></td>
            <td class="border-r border-gray-300"></td>
            <td class="border-r border-gray-300"></td>
            <td class="border-r border-gray-300"></td>
            <td class="border-r border-gray-300"></td>
            <td class="border-r border-gray-300"></td>
            <td class="border-r border-gray-300"></td>
        </tr>
      </tbody>
      <tfoot class="border-t-4 border-double  border-gray-600 bg-gray-200">
          <tr>
                <th class="p-3" scope="row" colspan="2">合計</th>
                <td class="p-3 border-r border-gray-300"></td>
                <td class="p-3 border-r border-gray-300"></td>
                <td class="p-3 border-r border-gray-300"></td>
                <td class="p-3 border-r border-gray-300"></td>
                <td class="p-3 border-r border-gray-300"></td>
                <td class="p-3 border-r border-gray-300"></td>
                <td class="p-3 border-r border-gray-300"></td>
                <td class="p-3 border-r border-gray-300"></td>
                <td class="p-3 border-r border-gray-300"></td>
          </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import moment from "moment";
import CalenderInfo from "@/components/CalenderInfo.vue";

moment.locale("ja", {weekdaysShort: ["日","月","火","水","木","金","土"], });

export default {
    name: "WorkCalendar",
    data() {
        return {
            currentDate: moment(),
        };
    },
    components: {
        CalenderInfo,
    },
    methods: {
        getStartDate() {
            let date = moment(this.currentDate);
            return date.startOf("month");
        },
        getEndDate() {
            let date = moment(this.currentDate);
            return date.endOf("month");
        },
        getCalendar() {

            const startDate =this.getStartDate();
            const endDate = this.getEndDate();
            console.log(startDate);
            console.log(endDate);
            var days = moment.duration(endDate - startDate).days() + 1;
            var dates = [...Array(days).keys()].map(v => startDate.clone().add(v, 'days'));
            return dates
        },
        nextMonth() {
            this.currentDate = moment(this.currentDate).add(1, "month");
        },
        prevMonth() {
            this.currentDate = moment(this.currentDate).subtract(1, "month");
        },
    },
    computed: {
        calendars() {
            return this.getCalendar();
        },
    },
};
</script>


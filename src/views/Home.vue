<template>
  <div class="home">
    <Header/>
    <div class="main-container flex">
      <Sidebar v-on:Account="Account" v-on:Time="Time" v-on:FixTime="FixTime" v-on:Attendance="Attendance" v-on:ocnStart="OcnStart" v-on:ocnRoundStart="OcnRoundStart" v-on:ocnRoundEnd="OcnRoundEnd" v-on:ocnEnd="OcnEnd" v-on:ocnMail="OcnMail" v-on:List="List" v-on:WorkCalender="WorkCalender"/>
      <div class="w-11/12">
        <component :is="current"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import Time from "@/components/Time.vue";
import FixTime from "@/components/FixTime.vue";
import Account from "@/components/Account.vue";
import Attendance from "@/components/Attendance.vue";
import OcnStart from "@/components/OcnStart.vue";
import OcnRoundStart from "@/components/OcnRoundStart.vue";
import OcnRoundEnd from "@/components/OcnRoundEnd.vue";
import OcnEnd from "@/components/OcnEnd.vue";
import OcnMail from "@/components/OcnMail.vue";
import List from "@/components/List.vue";
import WorkCalender from "@/components/WorkCalender.vue";


export default {
  name: "Home",
  components: {
    Header,
    Sidebar,
    Time,
    FixTime,
    Account,
    Attendance,
    OcnStart,
    OcnRoundStart,
    OcnRoundEnd,
    OcnEnd,
    OcnMail,
    List,
    WorkCalender
  },
  data() {
    return {
      current: "Time",
    }
  },
  methods: {
    Time:function() {
      this.current = "Time";
    },
    FixTime:function() {
      this.current = "FixTime";
    },
    Account:function() {
      this.current = "Account";
    },
    Attendance:function() {
      this.current = "Attendance";
    },
    OcnStart:function() {
      this.current = "OcnStart";
    },
    OcnRoundStart:function() {
      this.current = "OcnRoundStart";
    },
    OcnRoundEnd:function() {
      this.current = "OcnRoundEnd";
    },
    OcnEnd:function() {
      this.current = "OcnEnd";
    },
    OcnMail:function() {
      this.current = "OcnMail";
    },
    List:function() {
      this.current = "List";
    },
    WorkCalender:function() {
      this.current = "WorkCalender";
    },
  },
};
</script>

<style scoped>

  .main-container {
    height: 135vh;
  }

  button {
    margin-top: 10px;
    width: 30%;
    background-color: #e53e3e;
  }

  button:hover {
    background-color: #c53030;
  }
</style>
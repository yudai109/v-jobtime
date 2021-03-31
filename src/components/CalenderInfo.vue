<template>

<!-- ユーザー情報 -->
<div class="flex flex-col md:flex-row">
  <div id="attention-box" class="my-3 mx-3 pb-3 bg-white rounded-md shadow-md dark:bg-gray-800">
    <div class="bg-gray-400 h-10 rounded-t-md">
      <h2 class="pt-2">ユーザー情報</h2>
    </div>

    <div>
      <table class="table-fixed mx-2 mt-2">
        <tbody>
          <tr>
            <td class="w-60 border px-4 py-2 text-sm text-gray-600">年月</td>
            <td class="w-60 border px-4 py-2">スタッフコード</td>
          </tr>
          <tr class="bg-gray-100">
            <td class="w-60 border px-4 py-2 text-sm text-gray-600">スタッフコード</td>
            <td class="w-60 border px-4 py-2">112</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">所属グループ</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">所定労働日数</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- 基本項目 -->
  <div id="attention-box" class="my-3 mx-3 pb-3 bg-white rounded-md shadow-md dark:bg-gray-800">
    <div class="bg-gray-400 h-10 rounded-t-md">
      <h2 class="pt-2">基本項目</h2>
    </div>

    <div>
      <table class="table-fixed mx-2 mt-2">
        <tbody>
          <tr>
            <td class="w-60 border px-4 py-2 text-sm text-gray-600">実働日数</td>
            <td class="w-60 border px-4 py-2">858</td>
          </tr>
          <tr class="bg-gray-100">
            <td class="w-60 border px-4 py-2 text-sm text-gray-600">平均出勤日数</td>
            <td class="w-60 border px-4 py-2">112</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">休日出勤日数</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">欠勤日数</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">遅刻回数</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">相対回数</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 労働時間 -->
  <div id="attention-box" class="my-3 mx-3 pb-3 bg-white rounded-md shadow-md dark:bg-gray-800">
    <div class="bg-gray-400 h-10 rounded-t-md">
      <h2 class="pt-2">労働時間</h2>
    </div>
    <div>
      <table class="table-fixed mx-2 mt-2">
        <tbody>
          <tr>
            <td class="w-60 border px-4 py-2 text-sm text-gray-600">実労働時間</td>
            <td class="w-60 border px-4 py-2">858</td>
          </tr>
          <tr class="bg-gray-100">
            <td class="w-60 border px-4 py-2 text-sm text-gray-600">月規定労働時間</td>
            <td class="w-60 border px-4 py-2">112</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">実残業時間</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">実深夜時間</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">平日労働時間</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">平日残業時間</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">休日労働時間</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">休日残業時間</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">休日深夜時間</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- 本日時点休暇残日数 -->
  <div id="attention-box" class="my-3 mx-3 pb-3 bg-white rounded-md shadow-md dark:bg-gray-800">
    <div class="bg-gray-400 h-10 rounded-t-md">
      <h2 class="pt-2">本日時点休暇残日数</h2>
    </div>

    <div>
      <table class="table-fixed mx-2 mt-2">
        <tbody>
          <tr>
            <td class="w-60 border px-4 py-2 text-sm text-gray-600">有給</td>
            <td class="w-60 border px-4 py-2">858</td>
          </tr>
          <tr class="bg-gray-100">
            <td class="w-60 border px-4 py-2 text-sm text-gray-600">代休</td>
            <td class="w-60 border px-4 py-2">112</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">振急</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">忌引休暇</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">転居休暇</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">結婚休暇</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">シフト休業</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">1日休業</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">時短休業</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">忌引</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">教育訓練</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
          <tr>
            <td class=" w-60 border px-4 py-2 text-sm text-gray-600">看護休暇</td>
            <td class=" w-60 border px-4 py-2">1,280</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "CalenderInfo",
  data() {
    return {
      selected_yaer: "2021",
      selected_month: "3",
      years: [
        '2021',
        '2022',
        '2023'
      ],
      months: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
      ],
    };
  },
};
</script>

<style scoped>
button {
  width: 400px;
}

.selelctOptions > select,textarea {
  width: 400px;
}

#attention-box {
  width: 45%;
}



@media screen and (max-width: 997px) {
  button {
    width: 300px;
  }

  .selelctOptions > select,textarea {
    width: 300px;
  }

  #attention-box {
  width: 320px;
}

}

</style>
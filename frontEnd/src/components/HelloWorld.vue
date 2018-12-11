<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button id="getData" v-on:click="getData">测试后端转发请求</button>

    <button id="getDay" v-on:click="getToday">历史上的今天</button>
    <div style="border:1px solid #333;">
      <h4>测试后端返回数据的结果</h4>
      <div class="list" v-for="item in userList" v-bind:key="item.id">
        姓名 {{item.name}}, 年龄：{{item.age}}
      </div>
    </div>
    <ul class=historyTodayList style="border:2px solid #ff0000">
      <li v-for="item in historyTodayList" v-bind:key="item._id">
        <h4 class="title">{{item.title}} &nbsp;{{item.year}}年{{item.month}}月{{item.day}}日（{{item.lunar}}）</h4>
        <img v-bind:src="item.pic" />
        <p>{{item.des}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import config from '@/config.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome',
      userList : [],
      historyTodayList : []
    }
  },
  methods:{
    getData:function(){
      var api = config.endHost+'/?a=1&b=2'
      var that = this;
      that.$http.get(api).then(function(res){
          console.log('success',res);
          that.userList = res.body.users;
      },function(err){
        console.log('err',err)
      })
    },
    getToday:function(){
      let that = this;
      let theDate = new Date();
      let month = theDate.getMonth()+1;
      let date = theDate.getDate();
      let api = config.endHost+'/getTodayEvent/?month='+month+'&day='+date;
      that.$http.get(api).then(function(res){
        console.log('today event success',res);
        that.historyTodayList = res.body.result;
      },function(err){
        console.log('today event err',err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

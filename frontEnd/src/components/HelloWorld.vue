<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button id="getData" v-on:click="getData">测试后端转发请求</button>

    <button id="getDay" v-on:click="getToday">历史上的今天</button>
    <div style="border:1px solid #333;">
      <h2>测试后端返回数据的结果</h2>
      <div class="list" v-for="item in userList" v-bind:key="item.id">
        姓名 {{item.name}}, 年龄：{{item.age}}
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome',
      userList : []
    }
  },
  methods:{
    getData:function(){
      var api = config.endHost+'/?a=1&b=2'
      var that = this;
      this.$http.get(api).then(function(res){
          console.log('success',res);
          that.userList = res.body.users;
      },function(err){
        console.log('err',err)
      })
    },
    getToday:function(){
      let date = new Date();
      let day = date.getDay();
      let month = date.getMonth()+1;
      let api = config.endHost+'/getTodayEvent/?month='+month+'&day='+day;
      this.$http.get(api).then(function(res){
        console.log('today event success',res);
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

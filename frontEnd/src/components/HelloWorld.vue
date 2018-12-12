<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- <div class="buttons">
      <button id="getData" v-on:click="getData">测试后端转发请求</button>
      <button id="getDay" v-on:click="getToday">历史上的今天</button>
    </div> -->

    <form action="/clientImg" method="post" style="border:1px solid blue">
      <input type="file" name="img" @change="changeFile"/>
      <button type="submit" v-on:click="postImg">提交来识别图片</button>
      <div class="showImg">
        <h3>提交的图片</h3>
        <div class="imgAndResult">
          <div class="img">
            <img v-if="showImg" :src="avatar" style="width:400px;">
          </div>
          <ul>
            <li v-for="item in results" :key="item.score">您的图片{{item.score*100}}% 是{{item.root}}&gt;&gt;{{item.keyword}}</li>
          </ul>
        </div>
      </div>
    </form>

    <!-- <div style="border:1px solid #333;">
      <h4>测试后端返回数据的结果</h4>
      <div class="list" v-for="item in userList" v-bind:key="item.id">
        姓名 {{item.name}}, 年龄：{{item.age}}
      </div>
    </div>
    <div class="historyToday">
      <h3>历史上的今天</h3>
      <ul class=historyTodayList style="border:2px solid #ff0000">
        <li v-for="item in historyTodayList" v-bind:key="item._id">
          <h4 class="title">{{item.title}} &nbsp;{{item.year}}年{{item.month}}月{{item.day}}日（{{item.lunar}}）</h4>
          <img v-bind:src="item.pic" />
          <p>{{item.des}}</p>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import config from '@/config.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to 百度图片识别',
      userList : [],
      historyTodayList : [],
      showImg:false,
      avatar: '',
      file: '',
      results:[]
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
    },
    //选择了文件
    changeFile: function(e){
        let file = e.target.files[0];
        if(file) {
            this.file = file
            console.log(this.file)
            let reader = new FileReader()
            let that = this
            reader.readAsDataURL(file)
            reader.onload= function(e){
                // 这里的this 指向reader
                that.avatar = this.result
                that.showImg = true;
            }
        }
    },
    //提交图片用于检测
    postImg:function(e){
      var that = this;
      e.preventDefault();
      let fileData = {};
      fileData = this.file
      console.log('fileData', typeof fileData, fileData)
      let data = new FormData()
      data.append('multfile', fileData);
      that.$http.post(config.endHost+'/clientImg',data,{header:{"Content-Type":"multipart/form-data"}}).then(function(res){
        console.log(res);
        that.results = res.body.result;
      },function(err){
        console.log(err);
      }).catch(function(err){
        console.log('upload catch err',err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.showImg{
  display:flex;
  flex-direction:column;
}
.imgAndResult{
  display:flex;
}
</style>

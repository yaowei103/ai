<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button id="getData" v-on:click="getData">Get Data</button>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome！'
    }
  },
  methods:{
    getData:function(){
      var api = 'http://localhost:3000/users'
      this.$http.get(api).then(function(res){
          console.log('success',res);
      },function(err){
        console.log('err',err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

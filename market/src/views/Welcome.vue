<template>
  <div>
    {{welcome}}
  </div>
</template>
<script>

export default {
  created(){

  },
  data:()=>({
    welcome:"欢迎进入房屋中介管理系统!"
  }),
  methods:{

  }
}
</script>
<style scoped>
  div{
    font-size: 60px;
    font-weight: bold;
    text-align: center;
    color: black;
    letter-spacing: 10px;
    margin-top:20vh;
  }
</style>
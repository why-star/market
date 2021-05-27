<template>
<div>
  <snow></snow>
    <div class="home" style="width:300px;margin: 0 auto;padding-top:250px">
      <h1 style="text-align:center;font-size:50px;" id="titleH1">登录界面</h1>
      <a-form :form="form" @submit="doSubmit">
        <a-form-item>
          <a-input placeholder="用户名" 
            v-decorator="['userName', { rules: [{ required: true, message: '登录账户不能为空!' }] }]"
          >
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
      </a-form-item>
      <a-form-item>
          <a-input type="password" placeholder="密码" 
            v-decorator="['userPwd', { rules: [{ required: true, message: '登录密码不能为空!' }] }]"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
      </a-form-item>
      <a-form-item style="text-align:center">
          <a-button type="primary" html-type="submit" style="margin-right:100px">登录</a-button>
          <a-button type="danger"  @click="showModal2">注册</a-button>
      </a-form-item>
      </a-form>
      <a-modal v-model="visible2" title="注册账号" @ok="handleOk2" 
          ok-text="确认" 
          cancel-text="取消"
          @cancel="handleCancel2"
        >
        <a-form-model
          ref="ruleForm2"
          :model="form2"
          :rules="rules2"
          :label-col="labelCol2"
          :wrapper-col="wrapperCol2"
        >
        <a-form-model-item ref="name" label="昵称" prop="name">
            <a-input
              v-model="form2.name"
              @blur="
                () => {
                  $refs.name.onFieldBlur();
                }
              "
               placeholder="请输入昵称"
            />
          </a-form-model-item>
        <a-form-model-item ref="iphone" label="号码:" prop="iphone">
            <a-input
              v-model="form2.iphone"
              @blur="
                () => {
                  $refs.iphone.onFieldBlur();
                }
              "
              placeholder="请输入手机号码" 
            />
          </a-form-model-item>
          <a-form-model-item ref="userName" label="账号" prop="userName">
            <a-input
              v-model="form2.userName"
              @blur="
                () => {
                  $refs.userName.onFieldBlur();
                }
              "
               placeholder="请输入您的账号"
            />
          </a-form-model-item>
          <a-form-model-item ref="userPwd" label="密码" prop="userPwd">
            <a-input-password
              v-model="form2.userPwd"
              @blur="
                () => {
                  $refs.userPwd.onFieldBlur();
                }
              "
               placeholder="请输入您的密码"
            />
          </a-form-model-item>
          <a-form-model-item ref="userPwdT" label="确认密码" prop="userPwdT">
            <a-input-password
              v-model="form2.userPwdT"
              @blur="
                () => {
                  $refs.userPwdT.onFieldBlur();
                }
              "
               placeholder="再次确认密码"
            />
          </a-form-model-item>
        </a-form-model>
      </a-modal>
      <audio src="../../public/audio/纯音乐 - 遇见 (钢琴版).mp3" id="audio" ref="au" controls loop  autoplay hidden="true"></audio>
    </div>
    </div>
</template>
<script>
import snow from './Snow';
export default {
  name: "Home",
  components: {
    snow
  },
  data(){
    return{
      form: this.$form.createForm(this),
      users:[],
      labelCol2: { span: 4 },
      wrapperCol2: { span: 14 },
      visible2: false,// 添加弹出层的表单数据
      form2: {
        name:"",
        userName:"",
        userPwd:"",
        userPwdT:"",
        iphone:""
      },
      rules2: {
        name:[ { required: true, message: '请输入昵称!', trigger: 'onsubmit',},],
        userName:[ { required: true, message: '账号至少六位数字!', trigger: 'onsubmit',pattern: /^\d{6,}$/, },],
        userPwdT:[ { required: true, message: '请再次输入密码!', trigger: 'onsubmit'},],
        iphone: [{ required: true, message: '请输入正确的手机号码!', trigger: 'onsubmit',pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,},],
        userPwd:[{ required: true, message: '密码数字字母混合大于6位!', trigger: 'onsubmit',pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,},],
     }
    }
  },
  mounted () {
    window.onload = function () {
      window.onclick = function(event) {
        if (document.getElementById("audio")!=null) {
          let music = document.getElementById("audio");
          music.play();
        }
      }
    }
  },
  created(){
    //data.json必须放在public文件夹中
    this.$http.post("/UserLogin")
    .then(response=>{
      this.users = response.data;
      console.log(this.users)
    }).catch(error=>{
      console.log(error);
    });
  },
  methods:{
      //更新
      handleOk2(e) {
        
          let yn = true;

          // 回调函数参数为bool类型的valid
          this.$refs.ruleForm2.validate(valid => {

          // 循环判断输入的id是否已经存在
          for (let index = 0; index < this.users.length; index++) {

            //判断是否相等
            if (this.form2.userName == this.users[index].userName) {
                yn =false;
            }
          }
          if (yn == false) {
              this.$message.error("该账号已被注册!");
          }else{
          if (this.form2.userPwd != this.form2.userPwdT) {
            this.$message.error("两次密码不一致!请重新输入!");
          }else{
            // valid为true
            if (valid) {

                alert('注册成功!');

                // 讲表单内容赋值给对象obj
                let obj = this.form2;
                
                this.$http.post('/AddUser',obj).then(res =>{
                  console.log(res);
                  this.$http.post("/UserLogin")
                  .then(response=>{
                    this.users = response.data;
                  })
                })

                this.$refs.ruleForm2.resetFields();

                //隐藏弹出层
                this.visible2 = false;

              } else {

                //valid为false编号重复或用户未输入
                this.$message.error("请正确输入注册信息!");
                return false;
              }
            }
          }
        });
      },

      // 更新弹出层的取消时间
      handleCancel2(){

        // 重置表单的数据
        this.$refs.ruleForm2.resetFields();
      },

      showModal2() {
      this.visible2 = true;
    },
    openMessage() {
      const key = 'updatable';
      this.$message.loading({ content: '登录中...', key });
      setTimeout(() => {
        this.$message.success({ content: '登录成功!', key, duration: 1 });
        this.$router.push("/main");
      }, 2500);
    },
    doSubmit(e){
      //取消默认行为
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          //console.log(values);
          var flag = false;
          for(var i=0;i<this.users.length;i++){
            if(this.users[i].userName == values.userName &&
                this.users[i].userPwd == values.userPwd){
                flag = true;
              //将当前登录的用户保存在SessionStorage中
              window.sessionStorage.setItem("user",this.users[i].Name);
              break;
            }
          }
          if(flag){
            this.openMessage();
          }
          else
          {
            this.$message.error("用户名或密码错误");
          }
        }
      });
    }
  },
};
</script>
<style scoped>
.ant-form{
  width: 300px !important;
  position: relative;
  z-index: 999;
}
#titleH1{
  letter-spacing: 10px;
  font-weight: bold;
  font-family: 楷体;
  width: 300px;
  color: orange;
}
.ant-form[data-v-26084dc2]{
  width: 100% !important;
}
</style>

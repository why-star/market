<template>
   <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
      
    <a-form-model-item ref="name" label="客户姓名" prop="name">
      <a-input
        v-model="form.name"
      />
    </a-form-model-item>
    <a-form-model-item ref="phone" label="联系电话" prop="phone">
      <a-input
        v-model="form.phone"
      />
    </a-form-model-item>
    <a-form-model-item ref="houseArea" label="建筑面积" prop="houseArea">
      <a-input
        v-model="form.houseArea"
      />
    </a-form-model-item>
    <a-form-model-item ref="pric" label="价格(万元)" prop="pric">
      <a-input
        v-model="form.pric"
      />
    </a-form-model-item>
    <a-form-model-item label="房屋种类" prop="houseType">
      <a-select v-model="form.houseType">
        <a-select-option value="平房">
          平房
        </a-select-option>
        <a-select-option value="楼房">
          楼房
        </a-select-option>
        <a-select-option value="其他">
          其他
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="房屋户型" prop="houseStyle">
      <a-select v-model="form.houseStyle">
        <a-select-option value="单间">
          单间
        </a-select-option>
        <a-select-option value="一室一厅">
          一室一厅
        </a-select-option>
        <a-select-option value="三室一厅">
          三室一厅
        </a-select-option>
        <a-select-option value="独门独院">
          独门独院
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="装修情况" prop="finishCase">
      <a-select v-model="form.finishCase">
        <a-select-option value="未装修">
          未装修
        </a-select-option>
        <a-select-option value="简单装修">
          简单装修
        </a-select-option>
        <a-select-option value="中档装修">
          中档装修
        </a-select-option>
        <a-select-option value="高档装修">
          高档装修
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="出售情况" prop="sale">
      <a-select v-model="form.sale">
        <a-select-option value="已出售">
          已出售
        </a-select-option>
        <a-select-option value="未出售">
          未出售
        </a-select-option>
      </a-select>
    </a-form-model-item>
        <a-form-model-item ref="address" label="房屋地址" prop="address">
      <a-input id="address"
        v-model="form.address"
      />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit">
        确定
      </a-button>
      <a-button style="margin-left: 10px;" @click="resetForm">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>

export default {
  data:()=>({
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      // other: '',
      form: {
        name:"",
        houseArea: '',
        phone: "",
        pric: "",
        houseType: "",
        houseStyle: "",
        finishCase: "",
        address:"",
        sale:""
      },
      rules: {
        name: [{ required: true, message: '请输入姓名!',trigger:"onsubmit"}],
        pric: [{ required: true, message: '请输入正确的价格!',pattern: new RegExp(/^[1-9]\d*$/, "g"),trigger:"onsubmit"}],
        houseArea: [{ required: true, message: '请输入正确的房屋面积!',pattern: new RegExp(/^[1-9]\d*$/, "g"),trigger:"onsubmit"}],
        houseType: [{ required: true, message: '请输入房屋种类!',trigger:"onsubmit"}],
        houseStyle: [{ required: true,message: '请选择房屋户型!',trigger:"onsubmit"}],
        finishCase: [{ required: true, message: '请选择装修情况!',trigger:"onsubmit"}],
        phone: [{ required: true, message: '请输入正确的手机号!',pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,trigger:"onsubmit"}],
        address: [{ required: true, message: '请输入房屋地址!',trigger:"onsubmit"}],
        sale: [{ required: true, message: '请输入出售情况!',trigger:"onsubmit"}],
      },
  }),
  methods:{
    onSubmit() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            let obj = this.form;
            this.$http.post("/AddSellItemMes",obj).then(res=>{
              console.log(res);
            })
            alert('添加成功!');
            this.$refs.ruleForm.resetFields();
          } else {
            return false;
          }
        });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  },
  components:{

  }
}
</script>
<style scoped>
.ant-input{
  width: 30%;
}
form .ant-select{
  width: 40%;
}
.ant-btn{
  margin-left: 48px !important;
}
.ant-table-tbody > tr > td{
  text-align: center !important;
}
.ant-form-item{
  margin-bottom: 16px !important;
}        
#address{
  width: 60% !important;
}                                                       
</style>
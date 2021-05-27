<template>
  <a-layout id="layout">

    <a-layout-sider class="left-menu" :trigger="null" collapsible>
      <div class="logo">管理信息</div>
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-sub-menu key="sub1">
          <span slot="title"><span>出租房屋信息管理</span></span>
          <a-menu-item v-for="(item,index) in menuOne" :key="index">
            <router-link :to="item.path">
              {{item.name}}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title"><span>出售房屋信息管理</span></span>
          <a-menu-item v-for="(item,index) in menuTwo" :key="'2-'+index">
           <router-link :to="item.path">
              {{item.name}}
            </router-link>
          </a-menu-item>    
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title"><span>求租信息管理</span></span>
          <a-menu-item v-for="(item,index) in menuThree" :key="'3-'+index">
          <router-link :to="item.path">
              {{item.name}}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <span slot="title"><span>求购信息管理</span></span>
         <a-menu-item v-for="(item,index) in menuFour" :key="'4-'+index">
           <router-link :to="item.path">
              {{item.name}}
            </router-link>
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff;display:flex;justify-content: space-between;">
        <span class="header-title">
          <router-link to="/main">
            房屋中介管理系统
          </router-link>
        </span>
        <template>
          <a-avatar icon="user" id="tx"/>
          <a-dropdown>
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
              {{user}}<a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item>
                <a href="javascript:;" @click="countDown">
                  <a-icon type="edit" />
                  修改密码
                </a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;" @click="logOut">
                  <a-icon type="logout"/>
                    注销登录
                  </a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>   
  </a-layout>
</template>
<script>
export default {
  created(){
    this.user = this.user = window.sessionStorage.getItem('user');
  },
  data:()=>({
    menuOne:[
      {
        name:"显示全部信息",
        path:"/oneAllMes",
      },
      {
        name:"查询信息",
        path:"/oneSearchMes"
      },
      {
        name:"插入信息",
        path:"/oneAddMes"
      },
      {
        name:"修改信息",
        path:"/oneChangeMes"
      },
      {
        name:"删除信息",
        path:"/oneDeleteMes"
      },
      {
        name:"合租信息添加",
        path:"/oneAddJr"
      },
      {
        name:"合租信息查询",
        path:"/oneSearchJr"
      },
      {
        name:"合租信息删除",
        path:"/oneDeleteJr"
      }
    ],
    menuTwo:[
      {
        name:"显示全部信息",
        path:"/twoAllMes"
      },
      {
        name:"查询信息",
        path:"/twoSearchMes"
      },
      {
        name:"插入信息",
        path:"/twoAddMes"
      },
      {
        name:"修改信息",
        path:"/twoDeleteMes"
      }
    ],

    menuThree:[
      {
        name:"显示全部信息",
        path:"/threeAllMes"
      },
      {
        name:"记录信息",
        path:"/threeRecordMes"
      },
      {
        name:"删除信息",
        path:"/threeDeleteMes"
      }
    ],

    menuFour:[
      {
        name:"显示全部信息",
        path:"/fourAllMes"
      },
      {
        name:"记录信息",
        path:"/fourRecordMes"
      },
      {
        name:"修改信息",
        path:"/fourChangeMes"
      }
    ],
    user:"",
  }),
  methods:{
      countDown() {
        let secondsToGo = 5;
        const modal = this.$success({
          title: '实在懒得写了,别改密码了凑合用吧!',
          content: ` 倒计时 ${secondsToGo} 秒自动退出.`,
        });
        const interval = setInterval(() => {
          secondsToGo -= 1;
          modal.update({
            content: `倒计时 ${secondsToGo} 秒自动退出.`,
          });
        }, 1000);
        setTimeout(() => {
          clearInterval(interval);
          modal.destroy();
        }, secondsToGo * 1000);
    },
    // 注销账号
    logOut(){
      let $this = this;
      this.$confirm({
        title: '确定注销此账号吗?',
        content: '一旦注销将返回登录界面,谨慎操作!',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          $this.openMessage();
        },
        onCancel() {
          console.log('No');
        },
      });
    },
    openMessage() {
      const key = 'updatable';
      this.$message.loading({ content: '注销中...', key });
      setTimeout(() => {
        this.$message.success({ content: '注销成功!', key, duration: 1 });
        this.$router.push("/");
      }, 2500);
    },
  }
};
</script>
<style>

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width:8px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
-webkit-box-shadow:inset006pxrgba(0,0,0,0.3);
border-radius:10px;
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
border-radius:10px;
background: rgb(97, 97, 97, 0.7);
-webkit-box-shadow:inset006pxrgba(0,0,0,0.5);
}
::-webkit-scrollbar-thumb:window-inactive {
background:rgba(0, 0, 0, 0.4);
}

#layout {
  height: 100vh;
}
#layout .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#layout .trigger:hover {
  color: #1890ff;
}
.ant-layout-header{
  height: 60px !important;
  line-height: 60px !important;
  position: relative;
}
#layout .logo {
  height: 28px;
  line-height: 28px;
  text-align: center;
  color: #ffffff;
  font-size: 25px;
  font-weight: bold;
  font-family: 楷体;
  letter-spacing: 10px;
  margin: 16px;
}
.header-title{
  letter-spacing: 5px;
  background: #fff;
  font-size:22px;
  color:rgb(0 61 230);
  font-weight:bold;
}
.left-menu{
  overflow-y: scroll;
}
#tx{
  margin-top: 14px;
  position: absolute;
  right: 108px;
}
</style>

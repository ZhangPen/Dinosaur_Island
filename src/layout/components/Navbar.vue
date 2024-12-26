<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <search id="header-search" class="right-menu-item" />

        <error-log class="errLog-container right-menu-item hover-effect" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <lang-select class="right-menu-item hover-effect" />

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <img :src="userInfo.avatar + '?imageView2/1/w/80/h/80'" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="dialogVisible = true">
            <span style="display:block;">{{ $t('navbar.changeThePassword') }}</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog :visible.sync="dialogVisible" :title="$t('operationPrompt.changeCurrentPassword')" width="30%" draggable class="dialogSty">
      <el-form ref="ruleFormRef" :model="userPswForm" :rules="rulesFrom" label-width="90px" status-icon>
        <el-form-item :label="$t('operationPrompt.oldPassword')" prop="oldPsw">
          <el-input v-model="userPswForm.oldPsw" type="passWord" />
        </el-form-item>
        <el-form-item :label="$t('operationPrompt.newPassword')" prop="newPsw">
          <el-input v-model="userPswForm.newPsw" type="passWord" />
        </el-form-item>
        <el-form-item :label="$t('operationPrompt.confirmPassword')" prop="confirmPsw">
          <el-input v-model="userPswForm.confirmPsw" type="passWord" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">{{ $t('permission.cancel') }}</el-button>
        <el-button @click="savePsw">{{ $t('permission.confirm') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import LangSelect from '@/components/LangSelect'
import Search from '@/components/HeaderSearch'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    LangSelect,
    Search
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'userInfo',
      'device'
    ])
  },
  data() {
    return {
      dialogVisible: false,
      userPswForm: {
        oldPsw: '',
        newPsw: '',
        confirmPsw: ''
      },
      rulesFrom: {
        oldPsw: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newPsw: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmPsw: [
          { required: true, message: '请再次输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    savePsw() {
      const { oldPsw, userPsw, newPsw, confirmPsw } = this.userPswForm
      this.$refs.ruleFormRef.validate(valid => {
        if (valid) {
          if (oldPsw != userPsw || newPsw != confirmPsw) {
            this.$message({
              message: this.$t('operationPrompt.passError'),
              type: 'error'
            })
            return
          }
          // modifyPsw({
          //   name: userInfo.userName,
          //   psw: userPswForm.newPsw,
          // }).then((res) => {
          //   if (res.code == 200) {
          //     ElMessage({
          //       showClose: true,
          //       message: '修改成功',
          //       type: 'success'
          //     })
          //     dialogVisible.value = false
          //     LogOut()
          //   } else {
          //     ElMessage({
          //       showClose: true,
          //       message: '必填项不能为空',
          //       type: 'error'
          //     })
          //   }
          // })
        }
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>

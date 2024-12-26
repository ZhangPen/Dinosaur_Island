<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header">
      <span>{{ $t('txtAll.title') }}</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <img :src="userInfo.avatar" alt="" style="width: 100px;height: 100px;border-radius: 50%;text-align: center">
        <div>{{ userInfo.name }}</div>
        <div>SteamID: {{ userInfo.steamId }}</div>
        <div>
          <span style="margin-right: 30px;"><i class="el-icon-user" />普通玩家</span>
          <span><i class="el-icon-medal" />{{ userInfo.level }}等级</span>
        </div>
      </div>
    </div>

    <div class="user-bio">
      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>{{ $t('txtAll.userRights') }}</span></div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <div>{{ $t('txtAll.integral') }}</div>
            <div class="bigSize">1000</div>
          </div>
          <div class="progress-item">
            <div>{{ $t('txtAll.rechargeAmount') }}</div>
            <div class="bigSize">{{ 553232 | formatted }}</div>
          </div>
          <div class="progress-item">
            <div>{{ $t('txtAll.giftAmount') }}</div>
            <div class="bigSize">{{ 43 | formatted }}</div>
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Profile',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.text-muted {
    color: #777;
}

.user-profile {
    .box-center {
        padding: 10px;
        text-align: center;
        font-size: 16px;
        div{
            margin: 8px 0;
        }
    }

    .user-role {
        padding-top: 10px;
        font-weight: 400;
        font-size: 14px;
    }

    .box-social {
        padding-top: 30px;

        .el-table {
            border-top: 1px solid #dfe6ec;
        }
    }

    .user-follow {
        padding-top: 20px;
    }
}

.user-bio {
    margin-top: 10px;
    color: #606266;

    span {
        padding-left: 4px;
    }

    .user-bio-section {
        font-size: 14px;
        padding: 15px 0;

        .user-bio-section-header {
            border-top: 1px solid #dfe6ec;
            padding-top: 20px;
            font-weight: bold;
            margin-left: 20px;
        }
    }
}

.user-bio-section-body {
    display: flex;
    justify-content: space-around;

    .progress-item {
        width: 30%;
        border: 1px solid #dfe6ec;
        border-radius: 8px;
        font-size: 14px;
        padding: 10px;
        margin-top: 20px;
        text-align: center;

        .bigSize {
            font-size: 20px;
            color: #e4393c;
            margin-top: 20px;
        }
    }
}
</style>

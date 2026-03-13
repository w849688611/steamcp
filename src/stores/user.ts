import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface UserInfo {
  wechatNickname: string
  wechatAvatar: string
  steamId: string
  steamNickname: string
  steamAvatar: string
  steamLevel: number
  steamGamesCount: number
  isLoggedIn: boolean
  isSteamBound: boolean
  isBanned: boolean
  banReason?: string
  banExpireDate?: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInfo>({
    wechatNickname: '',
    wechatAvatar: '',
    steamId: '',
    steamNickname: '',
    steamAvatar: '',
    steamLevel: 0,
    steamGamesCount: 0,
    isLoggedIn: false,
    isSteamBound: false,
    isBanned: false,
  })

  const isFullyAuthenticated = computed(() => user.value.isLoggedIn && user.value.isSteamBound)

  function setWechatInfo(nickname: string, avatar: string) {
    user.value.wechatNickname = nickname
    user.value.wechatAvatar = avatar
    user.value.isLoggedIn = true
  }

  function setSteamInfo(info: {
    steamId: string
    steamNickname: string
    steamAvatar: string
    steamLevel: number
    steamGamesCount: number
  }) {
    user.value.steamId = info.steamId
    user.value.steamNickname = info.steamNickname
    user.value.steamAvatar = info.steamAvatar
    user.value.steamLevel = info.steamLevel
    user.value.steamGamesCount = info.steamGamesCount
    user.value.isSteamBound = true
  }

  function logout() {
    user.value = {
      wechatNickname: '',
      wechatAvatar: '',
      steamId: '',
      steamNickname: '',
      steamAvatar: '',
      steamLevel: 0,
      steamGamesCount: 0,
      isLoggedIn: false,
      isSteamBound: false,
      isBanned: false,
    }
  }

  return {
    user,
    isFullyAuthenticated,
    setWechatInfo,
    setSteamInfo,
    logout,
  }
})

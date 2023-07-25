import { defineStore } from 'pinia'

const useUser = defineStore('userAbout', {
  state: () => ({
    userName: '',
    userId: 0,
    token: ''
  })
})

export default useUser

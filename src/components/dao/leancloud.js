import AV from 'leancloud-storage'
class Leancloud {
  constructor() {
    this.APP_ID = '86t8rMn6wqyJwqwFKsuBqjie-gzGzoHsz'
    this.APP_KEY = '49cGO1dtTXdWqRlDJq8OarIb'
  }

  init() {
    AV.init({
      appId: this.APP_ID,
      appKey: this.APP_KEY
    })
  }
}
export default new Leancloud()

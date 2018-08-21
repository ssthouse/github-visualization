export default class RepositoryBean {
  constructor(name, count, isFork = false) {
    this.name = name
    this.count = count
    this.isFork = isFork
  }
}

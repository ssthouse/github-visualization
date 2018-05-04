<template>
  <div>
    <v-avatar
      :tile="false"
      size="120px"
      class="grey lighten-4"
    >
      <img :src="avatarUrl" alt="avatar">
    </v-avatar>

    <v-list>
      <template v-for="item in repositoryList">
        <div :key="item.id">
          <span>{{item.name}}</span>
        </div>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {}
  },
  computed: {
    avatarUrl() {
      return this.$store.state.userInfo.avatarUrl
    },
    repositoryList() {
      return this.$store.state.userInfo.repositoryList
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

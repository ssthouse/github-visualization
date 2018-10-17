<template>
  <div>
    <v-chip color="blue" text-color="white" class="label">
      <v-avatar>
        <v-icon>account_circle</v-icon>
      </v-avatar>
      <strong>People you follow:</strong>
    </v-chip>
    <v-chip class="user-chip mouseHand" @click="chooseUser(user.username)" v-for="user in userList" v-bind:key="user.id" selected>
      <v-avatar color="teal">
        <img :src="user.avatarUrl">
      </v-avatar>
      {{`${user.username}`}}
      <v-progress-circular class="loading-circle" :style="{opacity : loading ? 1: 0}" indeterminate color="teal" :loading="loading">
      </v-progress-circular>
    </v-chip>
  </div>
</template>

<script>
export default {
  name: 'users-card',
  data() {
    return {}
  },
  props: ['userList', 'loading'],
  methods: {
    chooseUser(username) {
      this.$emit('selectUser', username)
    }
  },
  computed: {},
  created: function() {}
}
</script>

<style scoped lang="less">
.mouseHand * {
  cursor: pointer;
}
.user-chip {
  position: relative;

  .loading-circle {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
  }
}
</style>

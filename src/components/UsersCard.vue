<template>
  <div>
    <v-chip color="blue" text-color="white" class="label">
      <v-avatar>
        <v-icon>account_circle</v-icon>
      </v-avatar>
      <strong>People you follow:</strong>
    </v-chip>
    <v-chip @click="chooseUser(user.username)" v-for="user in userList" v-bind:key="user.id" selected class="mouseHand">
      <v-avatar color="teal">
        <img :src="user.avatarUrl">
      </v-avatar>
      {{`${user.username}`}}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: 'users-card',
  data() {
    return {}
  },
  props: ['userList'],
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
</style>

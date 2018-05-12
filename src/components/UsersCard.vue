<template>
  <div>
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
      console.log(username)
    }
  },
  computed: {},
  created: function() {}
}
</script>

<style>
.mouseHand * {
  cursor: pointer;
}
</style>

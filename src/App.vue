<template>
  <v-app>
    <v-content style="background-color: #f7f7f7;min-height: 100px;overflow: hidden;">
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>


export default {
  name: 'App',
};
</script>

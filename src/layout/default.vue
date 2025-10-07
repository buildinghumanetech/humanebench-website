<template>
  <v-app>
    <v-app-bar app color="secondary" dark class="flex items-center px-6">
      <img src="../assets/logo.svg" alt="Logo" class="w-32 mr-4" />
    </v-app-bar>

    <v-main class="min-h-[70vh]">
      <router-view />
    </v-main>

    <v-footer app color="secondary" dark class="justify-center py-4">
      <p class="text-center">&copy; {{ new Date().getFullYear() }} HumaneBench</p>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
</script>

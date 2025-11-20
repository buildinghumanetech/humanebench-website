<template>
  <v-app>
    <v-app-bar color="#fff4e0" class="px-6" flat elevation="0">
      <v-container class="d-flex justify-space-between align-center py-2">
        <img 
          @click="$router.push({ name: 'home' })" 
          src="../assets/images/logos/logo.svg" 
          alt="Building Humane Technology"
          class="h-12 cursor-pointer hover:opacity-80 transition-opacity" 
        />
        <div class="d-flex ga-4 align-center">
          <v-btn text class="text-none" @click="$router.push({ name: 'home' })">Home</v-btn>
          <v-btn text class="text-none" @click="$router.push({ name: 'principles' })">Principles</v-btn>
          <v-btn text class="text-none" @click="$router.push({ name: 'whitepaper' })">Whitepaper</v-btn>
          <v-btn text class="text-none" href="mailto:erika@buildinghumanetech.com">Contact</v-btn>
          <v-btn text class="text-none" href="https://github.com/buildinghumanetech/humanebench" target="_blank">Github</v-btn>
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="bg-[#fff4e0]">
      <v-container class="py-12 min-h-[70vh]">
        <router-view />
      </v-container>
    </v-main>

    <v-footer class="py-6 bg-[#fff4e0]" padless>
      <v-container>
        <v-row>
          <v-col cols="12" md="10" class="d-flex align-start">
            <img @click="$router.push({ name: 'home' })" src="../assets/images/logos/logo.svg" alt="Building Humane Technology"
               class="h-12 cursor-pointer hover:opacity-80 transition-opacity"  />
          </v-col>
          <v-col cols="12" md="2" class="d-flex flex-column items-start">
            <p class="mb-2 font-weight-bold">Follow us</p>
            <div class="d-flex flex-column gap-2">
              <a href="https://www.linkedin.com/company/building-humane-technology/" target="_blank"
                class="d-flex items-center gap-2 text-black no-underline">
                <v-icon size="24">mdi-linkedin</v-icon>
                LinkedIn
              </a>
              <a href="https://x.com/buildhumanetech" target="_blank"
                class="d-flex items-center gap-2 text-black no-underline">
                <v-icon>
                  <template #default>
                    <img class="h-6 w-6" src="../assets/images/icons/x.png" />
                  </template>
                </v-icon>
                X
              </a>
              <a href="https://www.facebook.com/people/Building-Humane-Technology/61572489819739/" target="_blank"
                class="d-flex items-center gap-2 text-black no-underline">
                <v-icon size="24">mdi-facebook</v-icon>
                Facebook
              </a>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
export default {
};
</script>

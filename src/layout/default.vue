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
          <v-col cols="12" md="3" class="d-flex flex-column mb-4">
            <img @click="$router.push({ name: 'home' })" src="../assets/images/logos/logo.svg" alt="Building Humane Technology"
               class="h-12 cursor-pointer hover:opacity-80 transition-opacity"  />
          </v-col>

          <v-col cols="12" md="3" class="d-flex flex-column mb-4">
            <p class="mb-3 font-weight-bold text-body-2">Follow us</p>
            <div class="d-flex flex-column gap-1">
              <a href="https://humanetech.substack.com/" target="_blank" class="text-body-2 text-grey-darken-2" style="text-decoration: none;">
                Substack
              </a>
              <a href="https://www.linkedin.com/company/building-humane-technology/" target="_blank" class="text-body-2 text-grey-darken-2" style="text-decoration: none;">
                LinkedIn
              </a>
              <a href="https://x.com/buildhumanetech" target="_blank" class="text-body-2 text-grey-darken-2" style="text-decoration: none;">
                X
              </a>
            </div>
          </v-col>

          <v-col cols="12" md="3" class="d-flex flex-column mb-4">
            <p class="mb-3 font-weight-bold text-body-2">Join us</p>
            <div class="d-flex flex-column gap-1">
              <a href="https://luma.com/buildinghumanetech?k=c" target="_blank" class="text-body-2 text-grey-darken-2" style="text-decoration: none;">
                Luma
              </a>
              <a href="https://luma.com/ec49487t" target="_blank" class="text-body-2 text-grey-darken-2" style="text-decoration: none;">
                Dec 2 AMA
              </a>
              <span class="text-body-2 text-grey-darken-2">Slack community</span>
            </div>
          </v-col>

          <v-col cols="12" md="3" class="d-flex flex-column mb-4">
            <p class="mb-3 font-weight-bold text-body-2">Support our work</p>
            <p class="text-body-2 text-grey-darken-2 mb-2">We're all volunteers.</p>
            <a href="https://donate.stripe.com/aEU00Sajl3TPgzm3cg" target="_blank" class="text-body-2 text-grey-darken-2 mb-4" style="text-decoration: none;">
              Donate to version 2
            </a>

            <p class="mb-2 font-weight-bold text-body-2 mt-4">Contact</p>
            <a href="mailto:info@buildinghumanetech.com" class="text-body-2 text-grey-darken-2" style="text-decoration: none;">
              info@buildinghumanetech.com
            </a>
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

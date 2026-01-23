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
        <div class="d-none d-md-flex ga-4 align-center">
          <v-btn text class="text-none" @click="$router.push({ name: 'home' })">Home</v-btn>
          <v-btn text class="text-none" @click="$router.push({ name: 'principles' })">Principles</v-btn>
          <v-btn text class="text-none" @click="$router.push({ name: 'whitepaper' })">Whitepaper</v-btn>
          <v-btn text class="text-none" @click="$router.push({ name: 'case-studies' })">Case Studies</v-btn>
          <v-btn text class="text-none" href="mailto:info@buildinghumanetech.com">Contact</v-btn>
          <v-btn text class="text-none" href="https://github.com/buildinghumanetech/humanebench" target="_blank">
            <v-icon left size="20">mdi-github</v-icon>
            Github
          </v-btn>
        </div>
        <v-app-bar-nav-icon class="d-md-none" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary location="right" color="#fff4e0">
      <v-list>
        <v-list-item @click="$router.push({ name: 'home' })">
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push({ name: 'principles' })">
          <v-list-item-title>Principles</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push({ name: 'whitepaper' })">
          <v-list-item-title>Whitepaper</v-list-item-title>
        </v-list-item>
        <v-list-item @click="$router.push({ name: 'case-studies' })">
          <v-list-item-title>Case Studies</v-list-item-title>
        </v-list-item>
        <v-list-item href="mailto:info@buildinghumanetech.com">
          <v-list-item-title>Contact</v-list-item-title>
        </v-list-item>
        <v-list-item href="https://github.com/buildinghumanetech/humanebench" target="_blank">
          <v-list-item-title>
            <v-icon left size="20">mdi-github</v-icon>
            Github
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-[#fff4e0]">
      <v-container class="py-12 min-h-[70vh]">
        <router-view />
      </v-container>
    </v-main>

    <v-footer class="py-6 bg-[#fff4e0]" padless>
      <v-container>
        <v-row>
          <v-col cols="12" md="4" lg="3" class="d-flex flex-column mb-4">
            <div>
              <img @click="$router.push({ name: 'home' })" src="../assets/images/logos/logo.svg" alt="Building Humane Technology"
                 class="h-12 cursor-pointer hover:opacity-80 transition-opacity mb-4"  />
            </div>
          </v-col>

          <v-col cols="12" md="4" lg="3" class="d-flex flex-column mb-4">
            <p class="mb-3 font-weight-bold text-body-2">Follow us</p>
            <div class="d-flex flex-column gap-1">
              <a href="https://humanetech.substack.com/" target="_blank" class="text-body-2 text-grey-darken-2 d-flex align-center gap-2" style="text-decoration: none;">
                <v-icon size="18" color="grey-darken-2">mdi-newspaper-variant-outline</v-icon>
                Substack
              </a>
              <a href="https://www.linkedin.com/company/building-humane-technology/" target="_blank" class="text-body-2 text-grey-darken-2 d-flex align-center gap-2" style="text-decoration: none;">
                <v-icon size="18" color="grey-darken-2">mdi-linkedin</v-icon>
                LinkedIn
              </a>
              <a href="https://x.com/buildhumanetech" target="_blank" class="text-body-2 text-grey-darken-2 d-flex align-center gap-2" style="text-decoration: none;">
                <v-icon size="18" color="grey-darken-2">mdi-twitter</v-icon>
                X
              </a>
            </div>
          </v-col>

          <v-col cols="12" md="4" lg="3" class="d-flex flex-column mb-4">
            <p class="mb-3 font-weight-bold text-body-2">Join us</p>
            <div class="d-flex flex-column gap-1">
              <a href="https://luma.com/buildinghumanetech?k=c" target="_blank" class="text-body-2 text-grey-darken-2 d-flex align-center gap-2" style="text-decoration: none;">
                <v-icon size="18" color="grey-darken-2">mdi-calendar</v-icon>
                Event calendar
              </a>
              <a href="https://github.com/buildinghumanetech/humanebench" target="_blank" class="text-body-2 text-grey-darken-2 d-flex align-center gap-2" style="text-decoration: none;">
                <v-icon size="18" color="grey-darken-2">mdi-github</v-icon>
                GitHub
              </a>
              <a href="https://join.slack.com/t/humane-technology/shared_invite/zt-3iz76xy2r-LLYmcNclQjzEtj73HfQOqQ" class="text-body-2 text-grey-darken-2 d-flex align-center gap-2" style="text-decoration: none;">
                <v-icon size="18" color="grey-darken-2">mdi-slack</v-icon>
                Slack community
              </a>
              <a href="mailto:info@buildinghumanetech.com" class="text-body-2 text-grey-darken-2 d-flex align-center gap-2" style="text-decoration: none;">
                <v-icon size="18" color="grey-darken-2">mdi-email</v-icon>
                info@buildinghumanetech.com
              </a>
            </div>
          </v-col>

          <v-col cols="12" md="4" lg="3" class="d-flex flex-column mb-4">
            <p class="mb-3 font-weight-bold text-body-2">Support our work</p>
            <p class="text-body-2 text-grey-darken-2 mb-2">Want to support us? We're all volunteers.</p>
            <a href="https://donate.stripe.com/aEU00Sajl3TPgzm3cg" target="_blank" class="text-body-2 text-grey-darken-2 mb-4 d-flex align-center gap-2" style="text-decoration: none;">
              <v-icon size="18" color="grey-darken-2">mdi-heart</v-icon>
              Donate to HumaneBench
            </a>

            <p class="mb-3 font-weight-bold text-body-2">Sponsor our long-term efforts:</p>
            <a href="mailto:sponsor@buildinghumanetech.com" class="text-body-2 text-grey-darken-2 mb-4 d-flex align-center gap-2" style="text-decoration: none;">
              <v-icon size="18" color="grey-darken-2">mdi-handshake</v-icon>
              sponsor@buildinghumanetech.com
            </a>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center">
            <p class="text-caption text-grey-darken-1">© 2025 Building Humane Tech. All rights reserved.</p>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
export default {
  data() {
    return {
      drawer: false,
    };
  },
};
</script>

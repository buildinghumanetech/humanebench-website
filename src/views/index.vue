<template>
  <div class="pa-8">
    <v-container class="max-w-6xl mx-auto">

      <v-row class="mb-12">
        <v-col cols="12" md="6">
          <h1 class="text-h3 font-weight-bold mb-4">
            A bold headline<br>that delivers
          </h1>
          <p class="text-body-1 text-grey-darken-1 mb-6">
            Go ahead and say just a little more about what you do.
          </p>
          <v-btn 
            color="black" 
            class="text-white text-none"
            size="large"
            rounded="lg"
            @click="$router.push({ name: 'humaneBench' })"
          >
            Call to action
          </v-btn>
        </v-col>

        <v-col cols="12" md="6" class="d-flex flex-column justify-start">
          <div class="d-flex align-center mb-4 pl-32">
            <span class="bg-green-500 text-white font-weight-bold px-4 py-2 rounded-circle mr-4">S</span>
            <img src="../assets/images/icons/openai.png" class="mr-4 h-8 w-auto" />
            <span class="text-body-1 font-weight-medium">OpenAI ChatGPT 5.0</span>
          </div>

          <div class="d-flex align-center mb-4 pl-24">
            <span class="bg-yellow-400 text-black font-weight-bold px-4 py-2 rounded-circle mr-4">A</span>
            <img src="../assets/images/icons/claude.png" class="mr-4 h-8 w-auto" />
            <span class="text-body-1 font-weight-medium">Anthropic Claude 4.5</span>
          </div>

          <div class="d-flex align-center pl-16">
            <span class="bg-orange-400 text-black font-weight-bold px-4 py-2 rounded-circle mr-4">B</span>
            <img src="../assets/images/icons/gemini.png" class="mr-4 h-8 w-auto" />
            <span class="text-body-1 font-weight-medium">Google Gemini 2.5 Pro</span>
          </div>
        </v-col>
      </v-row>

      <h2 class="text-h4 font-weight-bold mb-6">Overview</h2>
      <v-row class="mb-12">
        <v-col cols="12" md="6">
          <p class="text-body-1 text-grey-darken-2">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua.
          </p>
        </v-col>
        <v-col cols="12" md="6">
          <p class="text-body-1 text-grey-darken-2">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
            et dolore magna aliquyam erat, sed diam voluptua.
          </p>
        </v-col>
      </v-row>

      <v-card class="pa-8 elevation-2" rounded="lg">
        <v-row class="align-center">
          <v-col cols="12" md="4" class="d-flex justify-center">
            <img
              src="../assets/images/logos/building_humane_tech.webp"
              class="h-32 w-auto"
            />
          </v-col>
          <v-col cols="12" md="8">
            <h2 class="text-h5 font-weight-semibold mb-3">Our Mission</h2>
            <p class="text-body-1 text-grey-darken-2 mb-4">
              We think humane tech should make you feel connected, cared for, present and fulfilled. We are on a mission
              to help builders create tools with those aspects in mind.
            </p>
            <v-btn 
              color="black" 
              class="text-white text-none"
              rounded="lg"
              href="https://www.buildinghumanetech.com/" 
              target="_blank"
            >
              Check us out
            </v-btn>
          </v-col>
        </v-row>
      </v-card>

    </v-container>
  </div>
</template>

<script lang="ts">
export default {
};
</script>
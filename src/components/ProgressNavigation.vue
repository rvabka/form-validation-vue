<template>
  <div class="flex items-center justify-center w-full pb-6">
    <div class="relative w-full max-w-md flex items-center justify-between">
      <div class="absolute h-1 bg-gray-200 top-4 left-0 right-0 rounded-full"></div>

      <div
        class="absolute h-1 bg-blue-500 top-4 left-0 rounded-full transition-all duration-500 ease-in-out"
        :style="{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }"
      ></div>

      <div v-for="step in totalSteps" :key="step" class="z-10 flex flex-col items-center">
        <div
          :class="[
            'w-8 h-8 flex items-center justify-center rounded-full transition-all duration-500 ease-in-out shadow-md',
            currentStep === step
              ? 'bg-blue-500 text-white scale-110 ring-4 ring-blue-100'
              : currentStep > step
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-500 border-2 border-gray-200',
          ]"
        >
          <span v-if="currentStep > step">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
          <span v-else class="font-medium">{{ step }}</span>
        </div>

        <span
          class="mt-2 text-xs font-medium transition-all pt-2 duration-300"
          :class="currentStep >= step ? 'text-blue-600' : 'text-gray-400'"
        >
          {{ getStepName(step) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProgressNavigation',
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
    totalSteps: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const getStepName = (step: number) => {
      switch (step) {
        case 1:
          return 'Dane osobowe'
        case 2:
          return 'Kontakt'
        case 3:
          return 'Doświadczenie'
        default:
          return `Krok ${step}`
      }
    }

    return {
      getStepName,
    }
  },
})
</script>

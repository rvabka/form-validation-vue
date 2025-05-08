<template>
  <div class="flex items-center justify-center gap-5 w-full pb-4">
    <div
      v-for="step in totalSteps"
      :key="step"
      :class="['h-[2px] rounded-2xl flex-1', currentStep === step ? 'bg-blue-500' : 'bg-blue-200']"
    ></div>
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
})
</script>

<template>
  <div class="flex items-center justify-between pt-5">
    <button
      class="border-2 border-gray-200 text-black p-2 w-24 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      type="button"
      @click="$emit('prev')"
      :disabled="currentStep === 1"
    >
      Wstecz
    </button>

    <button
      v-if="currentStep === totalSteps"
      class="bg-blue-600 text-white p-2 w-24 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      type="button"
      @click="$emit('submit')"
      :disabled="isNextDisabled"
    >
      Wyślij
    </button>

    <button
      v-if="currentStep < totalSteps"
      class="bg-blue-600 text-white p-2 w-24 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      type="button"
      @click="$emit('next')"
      :disabled="isNextDisabled"
    >
      Dalej
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FormNavigation',
  props: {
    currentStep: {
      type: Number,
      required: true,
    },
    totalSteps: {
      type: Number,
      required: true,
    },
    isNextDisabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['prev', 'next', 'submit'],
})
</script>

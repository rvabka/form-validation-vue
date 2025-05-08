<template>
  <div class="flex items-center justify-between pt-5">
    <button
      class="border-2 border-gray-200 text-black p-2 w-28 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center justify-center"
      type="button"
      @click="$emit('prev')"
      :disabled="currentStep === 1"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
      Wstecz
    </button>

    <button
      v-if="currentStep === totalSteps"
      class="bg-green-600 text-white p-2 w-28 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center justify-center"
      type="button"
      @click="$emit('submit')"
      :disabled="isNextDisabled"
    >
      Wyślij
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
      </svg>
    </button>

    <button
      v-if="currentStep < totalSteps"
      class="bg-blue-600 text-white p-2 w-28 rounded-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
      type="button"
      @click="$emit('next')"
      :disabled="isNextDisabled"
    >
      Dalej
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FormNavigation',
  props: {
    currentStep: { type: Number, required: true },
    totalSteps: { type: Number, required: true },
    isNextDisabled: { type: Boolean, default: false },
  },
  emits: ['prev', 'next', 'submit'],
})
</script>
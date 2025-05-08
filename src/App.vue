<template>
  <div class="w-full h-screen flex items-center justify-center">
    <ApplicationForm v-if="!useRouter" />
  </div>
</template>

<script lang="ts">
import ApplicationForm from './views/ApplicationForm.vue'

export default {
  name: 'App',
  components: {
    ApplicationForm,
  },
  data() {
    return {
      useRouter: false,
    }
  },
}
</script>

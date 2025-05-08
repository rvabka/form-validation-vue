<template>
  <div>
    <h2 class="text-black font-medium text-xl text-center pb-6">Dane podstawowe</h2>
    <ProgressNavigation :current-step="currentStep" :total-steps="3" />
    <div class="flex flex-col gap-2">
      <div class="flex flex-col mt-5 gap-2">
        <label for="firstName" class="text-black">Imię</label>
        <input
          id="firstName"
          type="text"
          placeholder="Wpisz swoje imię..."
          :value="formData.firstName"
          @input="updateField('firstName', ($event.target as HTMLInputElement).value)"
          @blur="v$.firstName.$touch()"
          class="bg-gray-200 rounded-md p-2 text-black"
        />
        <span v-for="error in v$.firstName.$errors" :key="error.$uid" class="text-red-500 text-sm">
          {{ error.$message }}
        </span>
      </div>

      <div class="flex flex-col mt-5 gap-2">
        <label for="lastName" class="text-black">Nazwisko</label>
        <input
          id="lastName"
          type="text"
          placeholder="Wpisz swoje nazwisko..."
          :value="formData.lastName"
          @input="updateField('lastName', ($event.target as HTMLInputElement).value)"
          @blur="v$.lastName.$touch()"
          class="bg-gray-200 rounded-md p-2 text-black"
        />
        <span v-for="error in v$.lastName.$errors" :key="error.$uid" class="text-red-500 text-sm">
          {{ error.$message }}
        </span>
      </div>

      <div class="flex flex-col mt-5 gap-2">
        <label for="birthDate" class="text-black">Data urodzenia</label>
        <input
          id="birthDate"
          type="date"
          :value="formData.birthDate"
          :max="maxDate"
          @input="updateField('birthDate', ($event.target as HTMLInputElement).value)"
          @blur="v$.birthDate.$touch()"
          class="bg-gray-200 rounded-md p-2 text-black"
        />
        <span v-for="error in v$.birthDate.$errors" :key="error.$uid" class="text-red-500 text-sm">
          {{ error.$message }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import type { BasicInfo } from '../types'
import type { Validation } from '@vuelidate/core'
import ProgressNavigation from './ProgressNavigation.vue'

export default defineComponent({
  name: 'BasicInfoStep',
  components: {
    ProgressNavigation,
  },
  props: {
    formData: {
      type: Object as PropType<BasicInfo>,
      required: true,
    },
    v$: {
      type: Object as PropType<Validation>,
      required: true,
    },
    currentStep: {
      type: Number,
      required: true,
    },
    totalSteps: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:formData'],
  setup(props, { emit }) {
    const maxDate = computed(() => {
      const today = new Date()
      return today.toISOString().split('T')[0]
    })

    const updateField = (field: keyof BasicInfo, value: string) => {
      emit('update:formData', {
        ...props.formData,
        [field]: value,
      })
    }

    return {
      maxDate,
      updateField,
    }
  },
})
</script>

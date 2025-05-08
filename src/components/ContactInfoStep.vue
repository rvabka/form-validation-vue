<template>
  <div class="form-step">
    <h2 class="text-black font-medium text-xl pb-6 text-center">Dane kontaktowe</h2>
    <ProgressNavigation :current-step="currentStep" :total-steps="3" />
    <div class="flex flex-col gap-2">
      <div class="flex flex-col mt-5 gap-2">
        <label for="phone" class="text-black">Telefon</label>
        <input
          id="phone"
          type="text"
          placeholder="Wpisz numer telefonu..."
          :value="formData.phone"
          @input="updateField('phone', ($event.target as HTMLInputElement).value)"
          @blur="v$.phone.$touch()"
          class="bg-gray-200 rounded-md p-2 text-black"
        />
        <span v-for="error in v$.phone.$errors" :key="error.$uid" class="text-red-500 text-sm">
          {{ error.$message }}
        </span>
      </div>

      <div class="flex flex-col mt-5 gap-2">
        <label for="email" class="text-black">E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="Wpisz adres email..."
          :value="formData.email"
          @input="updateField('email', ($event.target as HTMLInputElement).value)"
          @blur="v$.email.$touch()"
          class="bg-gray-200 rounded-md p-2 text-black"
        />
        <span v-for="error in v$.email.$errors" :key="error.$uid" class="text-red-500 text-sm">
          {{ error.$message }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Validation } from '@vuelidate/core'
import type { ContactInfo } from '../types'
import ProgressNavigation from './ProgressNavigation.vue'

export default defineComponent({
  name: 'ContactInfoStep',
  components: {
    ProgressNavigation,
  },
  props: {
    formData: {
      type: Object as PropType<ContactInfo>,
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
    const updateField = (field: keyof ContactInfo, value: string) => {
      emit('update:formData', {
        ...props.formData,
        [field]: value,
      })
    }

    return {
      updateField,
    }
  },
})
</script>

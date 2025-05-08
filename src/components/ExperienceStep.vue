<template>
  <div class="flex flex-col items-center">
    <h2 class="text-black font-medium text-xl pb-6">Doświadczenie zawodowe</h2>
    <ProgressNavigation :current-step="currentStep" :total-steps="3" />
    <div class="overflow-x-auto py-4">
      <table class="w-full border-collapse mb-4 text-black">
        <thead>
          <tr>
            <th class="border border-gray-300 p-2 bg-gray-100 text-left">Firma</th>
            <th class="border border-gray-300 p-2 bg-gray-100 text-left">Stanowisko</th>
            <th class="border border-gray-300 p-2 bg-gray-100 text-left">Data od</th>
            <th class="border border-gray-300 p-2 bg-gray-100 text-left">Data do</th>
            <th class="border border-gray-300 p-2 bg-gray-100 text-left">Akcje</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(exp, index) in formData" :key="index">
            <td class="border border-gray-300 p-2">
              <input
                type="text"
                :value="exp.company"
                @input="updateField(index, 'company', ($event.target as HTMLInputElement).value)"
                @blur="v$.$each[index]?.company.$touch()"
                class="w-full bg-gray-200 p-1 rounded"
              />
              <span
                v-if="v$.$each[index]?.company.$errors.length"
                class="text-red-500 text-sm block mt-1"
              >
                {{ v$.$each[index]?.company.$errors[0]?.$message }}
              </span>
            </td>
            <td class="border border-gray-300 p-2">
              <input
                type="text"
                :value="exp.position"
                @input="updateField(index, 'position', ($event.target as HTMLInputElement).value)"
                @blur="v$.$each[index]?.position.$touch()"
                class="w-full bg-gray-200 p-1 rounded"
              />
              <span
                v-if="v$.$each[index]?.position.$errors.length"
                class="text-red-500 text-sm block mt-1"
              >
                {{ v$.$each[index]?.position.$errors[0]?.$message }}
              </span>
            </td>
            <td class="border border-gray-300 p-2">
              <input
                type="date"
                :value="exp.dateFrom"
                @input="updateField(index, 'dateFrom', ($event.target as HTMLInputElement).value)"
                @blur="v$.$each[index]?.dateFrom.$touch()"
                :max="exp.dateTo || maxDate"
                class="w-full bg-gray-200 p-1 rounded"
              />
              <span
                v-if="v$.$each[index]?.dateFrom.$errors.length"
                class="text-red-500 text-sm block mt-1"
              >
                {{ v$.$each[index]?.dateFrom.$errors[0]?.$message }}
              </span>
            </td>
            <td class="border border-gray-300 p-2">
              <input
                type="date"
                :value="exp.dateTo"
                @input="updateField(index, 'dateTo', ($event.target as HTMLInputElement).value)"
                @blur="v$.$each[index]?.dateTo.$touch()"
                :min="exp.dateFrom || minDate"
                class="w-full bg-gray-200 p-1 rounded"
              />
              <span
                v-if="v$.$each[index]?.dateTo.$errors.length"
                class="text-red-500 text-sm block mt-1"
              >
                {{ v$.$each[index]?.dateTo.$errors[0]?.$message }}
              </span>
            </td>
            <td class="border border-gray-300 p-2">
              <button
                type="button"
                @click="removeExperience(index)"
                class="bg-red-500 text-white p-1 rounded hover:bg-red-600 cursor-pointer"
              >
                Usuń
              </button>
            </td>
          </tr>
          <tr v-if="formData.length === 0">
            <td colspan="5" class="border border-gray-300 p-2 text-center">
              Brak doświadczenia zawodowego. Dodaj pozycję poniżej.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <button
      type="button"
      @click="addExperience"
      class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
    >
      Dodaj pozycję
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, computed } from 'vue'
import type { Validation } from '@vuelidate/core'
import type { ExperienceItem } from '../types'
import ProgressNavigation from './ProgressNavigation.vue'

export default defineComponent({
  name: 'ExperienceStep',
  components: {
    ProgressNavigation,
  },
  props: {
    formData: {
      type: Array as PropType<ExperienceItem[]>,
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
    const maxDate = computed(() => new Date().toISOString().split('T')[0])
    const minDate = computed(() => {
      const date = new Date()
      date.setFullYear(date.getFullYear() - 100)
      return date.toISOString().split('T')[0]
    })

    const updateField = (index: number, field: keyof ExperienceItem, value: string) => {
      const updated = [...props.formData]
      updated[index] = { ...updated[index], [field]: value }
      emit('update:formData', updated)
    }

    const addExperience = () => {
      emit('update:formData', [
        ...props.formData,
        { company: '', position: '', dateFrom: '', dateTo: '' },
      ])
    }

    const removeExperience = (index: number) => {
      const updated = props.formData.filter((_, i) => i !== index)
      emit('update:formData', updated)
    }

    return {
      maxDate,
      minDate,
      updateField,
      addExperience,
      removeExperience,
    }
  },
})
</script>

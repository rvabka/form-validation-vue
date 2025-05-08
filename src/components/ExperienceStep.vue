<template>
  <div class="form-step animate-fade-in flex flex-col items-center justify-center p-4">
    <h2 class="text-black font-medium text-2xl text-center pb-6">Doświadczenie zawodowe</h2>
    <ProgressNavigation :current-step="currentStep" :total-steps="3" />
    <div class="overflow-x-auto py-4">
      <div v-if="formData.length === 0" class="text-center p-6 bg-gray-50 rounded-lg mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="text-gray-600">Brak doświadczenia zawodowego. Dodaj pozycję poniżej.</p>
      </div>

      <transition-group name="list" tag="div" v-else>
        <div key="table-container" class="w-full border-collapse mb-4 text-black overflow-hidden rounded-lg shadow">
          <table class="w-full">
            <thead>
              <tr>
                <th class="border border-gray-300 p-3 bg-gray-100 text-left">Firma</th>
                <th class="border border-gray-300 p-3 bg-gray-100 text-left">Stanowisko</th>
                <th class="border border-gray-300 p-3 bg-gray-100 text-left">Data od</th>
                <th class="border border-gray-300 p-3 bg-gray-100 text-left">Data do</th>
                <th class="border border-gray-300 p-3 bg-gray-100 text-left">Akcje</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(exp, index) in formData" :key="`exp-${index}`" class="hover:bg-gray-50 transition-colors duration-150">
                <td class="border border-gray-300 p-3">
                  <div class="relative">
                    <input
                      type="text"
                      :value="exp.company"
                      @input="updateField(index, 'company', ($event.target as HTMLInputElement).value)"
                      @blur="v$.$each[index]?.company.$touch()"
                      class="w-full bg-gray-100 p-2 rounded border border-transparent focus:border-blue-500 focus:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <div>
                      <transition-group name="fade">
                        <span
                          v-for="(error, i) in v$.$each[index]?.company.$errors"
                          :key="`company-error-${i}`"
                          class="text-red-500 text-sm block mt-1"
                        >
                          {{ error.$message }}
                        </span>
                      </transition-group>
                    </div>
                  </div>
                </td>
                <td class="border border-gray-300 p-3">
                  <div class="relative">
                    <input
                      type="text"
                      :value="exp.position"
                      @input="updateField(index, 'position', ($event.target as HTMLInputElement).value)"
                      @blur="v$.$each[index]?.position.$touch()"
                      class="w-full bg-gray-100 p-2 rounded border border-transparent focus:border-blue-500 focus:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <div>
                      <transition-group name="fade">
                        <span
                          v-for="(error, i) in v$.$each[index]?.position.$errors"
                          :key="`position-error-${i}`"
                          class="text-red-500 text-sm block mt-1"
                        >
                          {{ error.$message }}
                        </span>
                      </transition-group>
                    </div>
                  </div>
                </td>
                <td class="border border-gray-300 p-3">
                  <div class="relative">
                    <input
                      type="date"
                      :value="exp.dateFrom"
                      @input="updateField(index, 'dateFrom', ($event.target as HTMLInputElement).value)"
                      @blur="v$.$each[index]?.dateFrom.$touch()"
                      :max="exp.dateTo || maxDate"
                      class="w-full bg-gray-100 p-2 rounded border border-transparent focus:border-blue-500 focus:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <div>
                      <transition-group name="fade">
                        <span
                          v-for="(error, i) in v$.$each[index]?.dateFrom.$errors"
                          :key="`dateFrom-error-${i}`"
                          class="text-red-500 text-sm block mt-1"
                        >
                          {{ error.$message }}
                        </span>
                      </transition-group>
                    </div>
                  </div>
                </td>
                <td class="border border-gray-300 p-3">
                  <div class="relative">
                    <input
                      type="date"
                      :value="exp.dateTo"
                      @input="updateField(index, 'dateTo', ($event.target as HTMLInputElement).value)"
                      @blur="v$.$each[index]?.dateTo.$touch()"
                      :min="exp.dateFrom || minDate"
                      class="w-full bg-gray-100 p-2 rounded border border-transparent focus:border-blue-500 focus:bg-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    <div>
                      <transition-group name="fade">
                        <span
                          v-for="(error, i) in v$.$each[index]?.dateTo.$errors"
                          :key="`dateTo-error-${i}`"
                          class="text-red-500 text-sm block mt-1"
                        >
                          {{ error.$message }}
                        </span>
                      </transition-group>
                    </div>
                  </div>
                </td>
                <td class="border border-gray-300 p-3">
                  <button
                    type="button"
                    @click="removeExperience(index)"
                    class="bg-red-500 text-white p-2 rounded hover:bg-red-600 cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-300 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                    </svg>
                    Usuń
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </transition-group>
    </div>

    <div class="text-center mt-4">
      <button
        type="button"
        @click="addExperience"
        class="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 cursor-pointer transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-md flex items-center mx-auto"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Dodaj pozycję
      </button>
    </div>
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

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
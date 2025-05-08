<template>
  <div class="h-[500px] z-10 w-screen flex justify-center rounded-2xl bg-white shadow-xl p-6">
    <form @submit.prevent="handleSubmit" class="w-full h-full flex flex-col justify-between">
      <div class="relative flex-grow overflow-y-auto overflow-x-hidden">
        <transition name="slide" mode="out-in">
          <keep-alive>
            <component
              :is="currentStepComponent"
              :key="currentStep"
              :formData="currentStepData"
              :v$="currentStepValidation"
              :current-step="currentStep"
              :total-steps="3"
              @update:formData="updateCurrentStepData"
            />
          </keep-alive>
        </transition>
      </div>

      <FormNavigation
        :current-step="currentStep"
        :total-steps="3"
        :is-next-disabled="isStepInvalid"
        @prev="prevStep"
        @next="nextStep"
        @submit="handleSubmit"
      />
    </form>
  </div>
</template>

<script lang="ts">
import BasicInfoStep from '@/components/BasicInfoStep.vue'
import FormNavigation from '@/components/FormNavigation.vue'
import ContactInfoStep from '@/components/ContactInfoStep.vue'
import ExperienceStep from '@/components/ExperienceStep.vue'
import { computed, defineComponent, reactive, ref } from 'vue'
import type { ExperienceItem, FormData } from '../types'
import { required, email, helpers } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'

const phoneRegex = /^[0-9]{9,15}$/
const phoneValidator = helpers.regex(phoneRegex)

const pastDateValidator = (value: string) => new Date(value) < new Date()

const dateRangeValidator = (from: string, to: string) => {
  if (!from || !to) return true
  return new Date(from) <= new Date(to)
}

export default defineComponent({
  name: 'MultiStepForm',
  components: {
    BasicInfoStep,
    ContactInfoStep,
    ExperienceStep,
    FormNavigation,
  },
  setup() {
    const currentStep = ref(1)
    const submitted = ref(false)

    const formData = reactive<FormData>({
      basic: {
        firstName: '',
        lastName: '',
        birthDate: '',
      },
      contact: {
        phone: '',
        email: '',
      },
      experience: [],
    })

    const rules = computed(() => ({
      basic: {
        firstName: {
          required: helpers.withMessage('Imię jest wymagane', required),
        },
        lastName: {
          required: helpers.withMessage('Nazwisko jest wymagane', required),
        },
        birthDate: {
          required: helpers.withMessage('Data urodzenia jest wymagana', required),
          pastDate: helpers.withMessage(
            'Data urodzenia nie może być w przyszłości',
            pastDateValidator,
          ),
        },
      },
      contact: {
        phone: {
          required: helpers.withMessage('Numer telefonu jest wymagany', required),
          phone: helpers.withMessage('Nieprawidłowy numer telefonu', phoneValidator),
        },
        email: {
          required: helpers.withMessage('Email jest wymagany', required),
          email: helpers.withMessage('Nieprawidłowy adres email', email),
        },
      },
      experience: {
        $each: helpers.forEach({
          company: {
            required: helpers.withMessage('Nazwa firmy jest wymagana', required),
          },
          position: {
            required: helpers.withMessage('Stanowisko jest wymagane', required),
          },
          dateFrom: {
            required: helpers.withMessage('Data od jest wymagana', required),
            validRange: helpers.withMessage(
              'Data od nie może być późniejsza niż data do',
              (value: string, siblings: ExperienceItem) =>
                !siblings.dateTo || dateRangeValidator(value, siblings.dateTo),
            ),
          },
          dateTo: {
            required: helpers.withMessage('Data do jest wymagana', required),
            validRange: helpers.withMessage(
              'Data do nie może być wcześniejsza niż data od',
              (value: string, siblings: ExperienceItem) =>
                !siblings.dateFrom || dateRangeValidator(siblings.dateFrom, value),
            ),
          },
        }),
      },
    }))

    const v$ = useVuelidate(rules, formData)

    // Use shallowRef for components to avoid deep reactivity
    const currentStepComponent = computed(() => {
      switch (currentStep.value) {
        case 1:
          return BasicInfoStep
        case 2:
          return ContactInfoStep
        case 3:
          return ExperienceStep
        default:
          return BasicInfoStep
      }
    })

    const currentStepData = computed(() => {
      switch (currentStep.value) {
        case 1:
          return formData.basic
        case 2:
          return formData.contact
        case 3:
          return formData.experience
        default:
          return formData.basic
      }
    })

    const currentStepValidation = computed(() => {
      switch (currentStep.value) {
        case 1:
          return v$.value.basic
        case 2:
          return v$.value.contact
        case 3:
          return v$.value.experience
        default:
          return v$.value.basic
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateCurrentStepData = (newData: any) => {
      switch (currentStep.value) {
        case 1:
          formData.basic = newData
          break
        case 2:
          formData.contact = newData
          break
        case 3:
          formData.experience = newData
          break
      }
    }

    const isStepInvalid = computed(() => {
      switch (currentStep.value) {
        case 1:
          return v$.value.basic.$invalid
        case 2:
          return v$.value.contact.$invalid
        case 3:
          return v$.value.experience.$invalid || formData.experience.length === 0
        default:
          return false
      }
    })

    const prevStep = () => {
      if (currentStep.value > 1) {
        currentStep.value--
      }
    }

    const nextStep = async () => {
      const currentStepValidation =
        currentStep.value === 1
          ? v$.value.basic
          : currentStep.value === 2
            ? v$.value.contact
            : v$.value.experience

      const isValid = await currentStepValidation.$validate()

      if (isValid && !(currentStep.value === 3 && formData.experience.length === 0)) {
        if (currentStep.value < 3) {
          currentStep.value++
        }
      }
    }

    const handleSubmit = async () => {
      const isValid = await v$.value.$validate()
      if (isValid && formData.experience.length > 0) {
        submitted.value = true
        console.log('Form submitted:', formData)
      }
    }

    return {
      currentStep,
      formData,
      v$,
      isStepInvalid,
      submitted,
      currentStepComponent,
      currentStepData,
      currentStepValidation,
      updateCurrentStepData,
      prevStep,
      nextStep,
      handleSubmit,
    }
  },
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>

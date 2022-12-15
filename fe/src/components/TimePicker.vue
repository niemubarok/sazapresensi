<template>
  <q-input dense autofocus v-model="val" @update:model-value="handleInput" mask="fulltime" bottom-slots>
    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time v-model="val" with-seconds format24h>
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>

    <template #error>
      {{ props.error }}
    </template>
  </q-input>
</template>

<script setup>
import { ref } from 'vue';


const props = defineProps({
  rulesValue: String,
  error: String,
  modelValue: String
})

const emits = defineEmits(['update:modelValue', 'update:rulesValue'])

const val = ref(props.modelValue)
const rule = ref(props.rulesValue)

const handleInput = () => emits('update:modelValue', val.value)
const handleValidate = () => emits('validate', rule.value)

</script>

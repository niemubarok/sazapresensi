<template>
  <div>
    <q-input dense stack-label v-model="val" @focus="onFocus" @update:model-value="handleInput" mask="fulltime"
      :label="props.label" bottom-slots no-auto-focus>
      <template v-slot:prepend>
        <q-icon name="access_time" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale" v-model="popupModel" no-focus no-refocus>
            <q-time v-model="val" with-seconds format24h flat>
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
  </div>
</template>

<script setup>
import { ref } from 'vue';


const props = defineProps({
  error: String,
  modelValue: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: "label"
  }
})

const popupModel = ref(false)

const emits = defineEmits(['update:modelValue'])

const val = ref(props.modelValue)

const onFocus = () => {
  popupModel.value = !popupModel.value

}

const handleInput = () => emits('update:modelValue', val.value)

</script>

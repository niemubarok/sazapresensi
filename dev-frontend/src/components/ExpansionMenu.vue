<template>
  <!-- content-inset-level="1" -->

  <div>
    <div v-if="hasMultipleLink" expand-icon-class="float-right">
      <q-expansion-item>
        <template #header>
          <q-icon :name="icon" color="grey" size="sm" />
          <q-item-label header class="text-weight-bold text-uppercase">
            {{ title }}
          </q-item-label>
        </template>

        <q-item :to="link.to" class="q-ml-md " v-for="link in props.links" :key="link.text" v-ripple clickable>
          <q-item-section avatar>
            <q-icon color="grey" :name="link.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ link.text }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-expansion-item>
    </div>

    <div v-else>
      <q-expansion-item hide-expand-icon>
        <template #header>
          <!-- <router-link :to="props.link"> -->
          <q-item :to="props.link">

            <q-icon :name="icon" color="grey" size="sm" />
            <q-item-label header class="text-weight-bold text-uppercase">
              {{ title }}
            </q-item-label>
          </q-item>
          <!-- </router-link> -->
        </template>

      </q-expansion-item>
    </div>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

const props = defineProps({

  title: {
    type: String,
    required: true,
  },

  caption: {
    type: String,
    default: "",
  },

  links: {
    default: "#",
  },
  link: {
    default: "#",
  },
  icon: {
    type: String,
    default: "",
  },
  hasMultipleLink: Boolean
})
</script>

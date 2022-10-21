<template>
  <div style="height: fit-content" class="q-pa-xs zoom">
    <transition
      appear
      enter-active-class="animated zoomIn"
      leave-active-class="animated fadeOut"
    >
      <q-card
        :style="
          props.status == 'ontime'
            ? 'border-left: 4px solid green;'
            : 'border-left:4px solid red;'
        "
        style="
          width: 200px;
          border-radius: 8px;
          border-top: 0px;
          border-right: 0px;
          border-bottom: 0px;
        "
        class="q-pr-sm glass shadow-6"
      >
        <q-item>
          <q-item-section avatar>
            <q-avatar class="rounded-borders" style="margin-left: -10px">
              <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label
              style="width: 150px; margin-left: -15px"
              class="textOverflow text-left text-weight-bold"
              >{{ props.name }}</q-item-label
            >
            <!-- <q-separator style="margin-left: -15px" /> -->
            <q-chip
              icon="schedule"
              style="margin-left: -15px"
              caption
              class="text-left bg-transparent"
              dense
              size="sm"
            >
              <!-- <q-icon name="schedule" /> -->
              {{ props.in }}
              <!-- - {{ props.out }} -->
            </q-chip>
          </q-item-section>
        </q-item>
      </q-card>
    </transition>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  in: Number,
  out: String,
  status: String,
});
</script>

<style>
.zoom {
  transition: transform 0.2s;
  /* Animation */
}

.zoom:hover {
  transform: scale(1.6) translateX(-20px);
  /*
     (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  z-index: 100;
}

.textOverflow {
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  text-overflow: ellipsis;
  width: 400px;
}

.glass {
  background: rgba(255, 255, 255, 0.267);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(7.1px);
  -webkit-backdrop-filter: blur(7.1px);
  border: 1px solid rgba(255, 255, 255, 0.34);
}
</style>

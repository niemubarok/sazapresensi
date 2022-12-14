<template>
  <q-page padding>
    <q-card class="q-mt-md" style="border-top: 2px solid #00a1e8">
      <q-table
        table-class="q-mt-md full-width"
        :rows-per-page-options="[10, 20]"
        :columns="columns"
        sort-method="desc"
        :rows="tableRows"
        row-key="name"
        separator="cell"
      >
        <template #top-left>
          <div>
            <q-chip
              square
              size="md"
              class="bg-transparent text-weight-bolder text-grey-9"
            >
              <q-icon size="md" name="event" />
              Master Aktivitas Santri
            </q-chip>
          </div>
        </template>

        <template #top-right>
          <q-chip
            outline
            style="border: 1px solid orange"
            size="sm"
            color="green-9"
          >
            <q-icon name="lightbulb" size="xs" class="text-orange-9" />
            Klik pada kolom untuk edit
          </q-chip>
        </template>

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props"
              ><q-chip class="bg-transparent">
                <span class="text-weight-bolder">{{ col.label }}</span></q-chip
              ></q-th
            >
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr
            :props="props"
            :class="props.pageIndex % 2 == 0 ? 'bg-green-1' : 'bg-grey-1'"
          >
            <q-td key="name" :props="props" style="width: 20px">
              <p class="text-center">{{ props.pageIndex + 1 }}</p>
            </q-td>
            <q-td key="name" class="cursor-pointer" :props="props"
              >{{ props.row.name }}
              <q-tooltip
                anchor="center middle"
                self="center middle"
                class="bg-transparent text-grey-7"
              >
                <!-- <q-chip outline class="bg-grey-1" size="sm" color="green-9"> -->
                <q-icon name="edit" size="xs" />
                <small> Klik untuk edit</small>
                <!-- </q-chip> -->
              </q-tooltip>
              <q-popup-edit
                v-model="props.row.name"
                v-slot="scope"
                persistent
                @save="(value) => update(props.row.id, 'name', value)"
              >
                <q-input
                  v-model="scope.value"
                  dense
                  autofocus
                  counter
                  @keyup.enter="scope.set"
                />
                <div class="float-right">
                  <q-btn
                    size="sm"
                    color="red-9"
                    flat
                    icon="close"
                    @click="scope.cancel"
                  />
                  <q-btn
                    size="sm"
                    color="green-9"
                    flat
                    icon="check"
                    @click="scope.set"
                  />
                </div>
              </q-popup-edit>
            </q-td>
            <q-td key="day" class="cursor-pointer" :props="props"
              >{{ props.row.day }}
              <q-popup-edit
                v-model="props.row.day"
                v-slot="scope"
                persistent
                @save="(value) => update(props.row.id, 'day', value)"
              >
                <!-- <q-input
                  v-model="scope.value"
                  dense
                  autofocus
                  counter
                  @keyup.enter="scope.set"
                /> -->

                <q-select
                  class="q-mb-md"
                  color="grey-3"
                  label-color="orange"
                  v-model="scope.value"
                  :options="dayOptions"
                  label="Hari"
                >
                </q-select>

                <div class="float-right">
                  <q-btn
                    size="sm"
                    color="red-9"
                    flat
                    icon="close"
                    @click="scope.cancel"
                  />
                  <q-btn
                    size="sm"
                    color="green-9"
                    flat
                    icon="check"
                    @click="scope.set"
                  />
                </div>
              </q-popup-edit>
            </q-td>

            <q-td key="jam" :props="props">
              <q-chip
                class="cursor-pointer"
                color="green-3"
                :label="props.row.start"
              >
                <q-popup-edit
                  v-model="props.row.start"
                  v-slot="scope"
                  persistent
                  @save="(value) => update(props.row.id, 'start', value)"
                  :validate="(val) => isValidTime(val)"
                >
                  <q-input
                    dense
                    autofocus
                    v-model="scope.value"
                    mask="fulltime"
                    :rules="[
                      (val) => scope.validate(val) || 'format waktu salah',
                    ]"
                    @keyup.enter="scope.set"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="scope.value" with-seconds format24h>
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>

                  <div class="float-right">
                    <q-btn
                      size="sm"
                      color="red-9"
                      flat
                      icon="close"
                      @click="scope.cancel"
                    />
                    <q-btn
                      :disable="!scope.validate(scope.value)"
                      size="sm"
                      color="green-9"
                      flat
                      icon="check"
                      @click="scope.set"
                    />
                  </div>
                </q-popup-edit>
              </q-chip>
              s/d
              <q-chip
                class="cursor-pointer"
                color="orange-3"
                :label="props.row.end"
              >
                <q-popup-edit
                  v-model="props.row.end"
                  v-slot="scope"
                  persistent
                  @save="(value) => update(props.row.id, 'end', value)"
                  :validate="(val) => isValidTime(val)"
                >
                  <q-input
                    dense
                    autofocus
                    v-model="scope.value"
                    mask="fulltime"
                    :rules="[
                      (val) => scope.validate(val) || 'format waktu salah',
                    ]"
                    @keyup.enter="scope.set"
                  >
                    <template v-slot:append>
                      <q-icon name="access_time" class="cursor-pointer">
                        <q-popup-proxy
                          cover
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-time v-model="scope.value" with-seconds format24h>
                            <div class="row items-center justify-end">
                              <q-btn
                                v-close-popup
                                label="Close"
                                color="primary"
                                flat
                              />
                            </div>
                          </q-time>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>

                  <div class="float-right">
                    <q-btn
                      size="sm"
                      color="red-9"
                      flat
                      icon="close"
                      @click="scope.cancel"
                    />
                    <q-btn
                      size="sm"
                      color="green-9"
                      flat
                      icon="check"
                      @click="scope.set"
                      :disable="!scope.validate(scope.value)"
                    />
                  </div>
                </q-popup-edit> </q-chip
            ></q-td>
            <q-td key="order" class="cursor-pointer" :props="props"
              >{{ props.row.order }}
              <q-popup-edit
                v-model="props.row.order"
                v-slot="scope"
                persistent
                @save="(value) => update(props.row.id, 'order', value)"
              >
                <q-input
                  v-model="scope.value"
                  dense
                  autofocus
                  counter
                  @keyup.enter="scope.set"
                />
                <div class="float-right">
                  <q-btn
                    size="sm"
                    color="red-9"
                    flat
                    icon="close"
                    @click="scope.cancel"
                  />
                  <q-btn
                    size="sm"
                    color="green-9"
                    flat
                    icon="check"
                    @click="scope.set"
                  />
                </div>
              </q-popup-edit>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>

    <!-- //morph -->
    <section>
      <q-btn
        v-morph:btn:mygroup:300.resize="morphGroupModel"
        class="fixed-bottom-right"
        style="margin-bottom: 70px"
        fab
        color="teal-9"
        size="xs"
        icon="add"
        @click="nextMorph"
      >
      </q-btn>

      <q-card
        v-morph:card1:mygroup:500.resize="morphGroupModel"
        class="fixed-bottom-right q-ma-md bg-grey-1"
        style="width: 800px; height: 600px; border-bottom-left-radius: 2em"
      >
        <q-banner class="text-grey-1 bg-teal-9 text-weight-bolder">
          <q-avatar
            size="20px"
            font-size="15px"
            color="teal"
            text-color="grey-2"
            icon="close"
            class="float-right cursor-pointer"
            @click="nextMorph"
          />
          Form Tambah Aktivitas
        </q-banner>

        <q-card-section class="text-h6">
          <q-input
            ref="nameRef"
            class="q-mb-md"
            outlined
            v-model="formModel.name"
            type="text"
            label="Nama Aktivitas"
          />

          <q-select
            class="q-mb-md"
            color="grey-3"
            outlined
            label-color="orange"
            v-model="formModel.day"
            :options="dayOptions"
            label="Hari"
          >
          </q-select>

          <q-input
            filled
            v-model="formModel.start"
            mask="fulltime"
            :rules="['fulltime']"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="formModel.start" with-seconds format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            filled
            v-model="formModel.end"
            mask="fulltime"
            :rules="['fulltime']"
          >
            <template v-slot:append>
              <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy
                  cover
                  transition-show="scale"
                  transition-hide="scale"
                >
                  <q-time v-model="formModel.end" with-seconds format24h>
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            class="q-mb-md"
            outlined
            v-model="formModel.order"
            type="number"
            label="Jam Ke"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            class="absolute-bottom-right text-white q-ma-md"
            color="teal-9"
            label="Simpan"
            @click="nextMorph"
          />
        </q-card-actions>
      </q-card>
    </section>
  </q-page>
</template>

<script setup>
import { useStudentActivitiesStore } from "src/stores/student-activities-store";
import { onBeforeMount, onMounted, ref, computed, nextTick } from "vue";
import { isValidTime, dayName } from "src/utilities/time-util";
import SelectDay from "src/components/SelectDay.vue";

const nameRef = ref(null);
const nextMorphStep = {
  btn: "card1",
  card1: "btn",
};
const morphGroupModel = ref("btn");
const nextMorph = () => {
  nextTick(() => {
    nameRef.value.focus();
  });
  morphGroupModel.value = nextMorphStep[morphGroupModel.value];
};

const day = ref("");
const dayOptions = ["Daily", ...dayName];

const studentActivityStore = useStudentActivitiesStore();
const columns = [
  {
    name: "no",
    label: "NO",
    align: "center",
  },
  {
    name: "name",
    label: "NAMA AKTIVITAS",
    align: "left",
  },
  {
    name: "day",
    label: "HARI",
    align: "center",
  },
  {
    name: "jam",
    label: "JAM",
    align: "center",
  },
  {
    name: "order",
    label: "JAM KE",
    align: "center",
  },
  // {
  //   name: "status",
  //   label: "Status",
  //   align: "center",
  // },
];

const tableRows = computed(() => studentActivityStore.all);

const update = (id, column, value) => {
  studentActivityStore.updateActivity(id, column, value);
  // console.log(value);
};

const formModel = ref({
  name: "",
  day: "",
  start: "",
  end: "",
  order: 0,
});

const isValid = ref(false);

const onChange = (time) => {
  if (isValidTime(time)) {
    isValid.value = true;
  }
  console.log(time);
  // console.log(isValid.value);
};

onBeforeMount(() => {
  studentActivityStore.getAllActivitiesFromServer();
});

onMounted(() => {
  // tableRows.value = useAttendance.attendances;
  // useAttendance.addAttendance();
});
</script>

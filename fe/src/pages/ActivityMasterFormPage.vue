<template>
  <q-page padding>

    <q-card class="q-mt-md" style="border-top:2px solid #00A1E8">
      <q-table table-class="q-mt-md full-width" :rows-per-page-options="[10, 20]" :columns="columns" sort-method="desc"
        :rows="tableRows" row-key="name" separator="cell">
        <template #top-left>
          <div>
            <q-chip square size="md" class="bg-transparent text-weight-bolder text-grey-9">
              <q-icon size="md" name="event" />
              Master Aktivitas Santri
            </q-chip>
          </div>
        </template>

        <template #top-right>
          <q-chip outline style="border:1px solid orange" size="sm" color="green-9">
            <q-icon name="lightbulb" size="xs" class="text-orange-9" />
            Klik pada kolom untuk edit
          </q-chip>
        </template>

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props"><q-chip class="bg-transparent">
                <span class="text-weight-bolder">{{ col.label }}</span></q-chip></q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props" :class="(props.pageIndex % 2 == 0 ? 'bg-green-1' : 'bg-grey-1')">
            <q-td key="name" :props="props" style="width:20px;">
              <p class="text-center">{{ props.pageIndex + 1 }}</p>
            </q-td>
            <q-td key="name" class="cursor-pointer" :props="props">{{ props.row.name }}
              <q-tooltip anchor="center middle" self="center middle" class="bg-transparent text-grey-7">
                <!-- <q-chip outline class="bg-grey-1" size="sm" color="green-9"> -->
                <q-icon name="edit" size="xs" />
                <small> Klik untuk edit</small>
                <!-- </q-chip> -->
              </q-tooltip>
              <q-popup-edit v-model="props.row.name" v-slot="scope" buttons label-cancel="batal" label-set="simpan">
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>

            </q-td>
            <q-td key="day" class="cursor-pointer" :props="props">{{ props.row.day }}
              <q-popup-edit v-model="props.row.day" v-slot="scope" buttons label-cancel="batal" label-set="simpan">
                <q-input v-model="scope.value" dense autofocus counter @keyup.enter="scope.set" />
              </q-popup-edit>
            </q-td>
            <q-td key="jam" :props="props">

              <q-chip class="cursor-pointer" color="green-3" :label="props.row.start">
                <q-popup-edit v-model="props.row.start" v-slot="scope">
                  <q-input v-model="scope.value" dense autofocus counter />
                </q-popup-edit>
              </q-chip> s/d
              <q-chip class="cursor-pointer" color="orange-3" :label="props.row.end">
                <q-popup-edit v-model="props.row.end" v-slot="scope">
                  <q-input v-model="scope.value" dense autofocus counter />
                </q-popup-edit>
              </q-chip></q-td>
            <!-- <q-td key="in" :props="props">{{ props.row.in }}</q-td> -->
            <!-- <q-td key="out" :props="props">{{ props.row.out }}</q-td> -->
            <q-td key="status" :props="props">{{ props.row.status }}</q-td>
          </q-tr>
        </template>
      </q-table>
    </q-card>


    <!-- //morph -->

    <q-btn v-morph:btn:mygroup:300.resize="morphGroupModel" class="fixed-bottom-right" style="margin-bottom:70px;" fab
      color="teal-9" size="xs" icon="add" @click="nextMorph">
    </q-btn>


    <q-card v-morph:card1:mygroup:500.resize="morphGroupModel" class="fixed-bottom-right q-ma-md bg-grey-1"
      style="width: 800px; height:600px ;border-bottom-left-radius: 2em;">
      <q-banner class="text-grey-1 bg-teal-9 text-weight-bolder">
        <q-avatar size="20px" font-size="15px" color="teal" text-color="grey-2" icon="close"
          class="float-right cursor-pointer" @click="nextMorph" />
        Form Tambah Aktivitas
      </q-banner>

      <q-card-section class="text-h6 ">
        <q-input ref="nameRef" class="q-mb-md" outlined v-model="formModel.name" type="text" label="Nama Aktivitas" />
        <q-select class="q-mb-md" color="grey-3" outlined label-color="orange" v-model="formModel.day"
          :options="options" label="Hari">
        </q-select>
        <q-input mask="##:##:##" shadow-text="contoh: 20:30:00" class="q-mb-md" outlined v-model="formModel.start"
          type="text" label="Jam Mulai" />

        <q-input mask="##:##:##" shadow-text="contoh: 20:30:00" class="q-mb-md" outlined v-model="formModel.end"
          type="text" label="Jam Mulai" />
      </q-card-section>


      <q-card-actions align="right">
        <q-btn class="absolute-bottom-right text-white q-ma-md" color="teal-9" label="Simpan" @click="nextMorph" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { useStudentActivitiesStore } from "src/stores/student-activities-store";
import { onBeforeMount, onMounted, ref, computed, nextTick } from "vue"
import { morph } from 'quasar'

const nameRef = ref(null)
const nextMorphStep = {
  btn: 'card1',
  card1: 'btn',
  // card2: 'btn'
}
const morphGroupModel = ref('btn')
const nextMorph = () => {
  nextTick(() => {
    nameRef.value.focus();
  });
  morphGroupModel.value = nextMorphStep[morphGroupModel.value]
}

const prevMorph = () => {
  morphGroupModel.value = 'btn'
}

const day = ref('')
const options = ["Minggu", "Senin", "Selasa"]


const studentActivityStore = useStudentActivitiesStore()
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
  // {
  //   name: "end",
  //   label: "Jam Datang",
  //   align: "center",
  // },
  // {
  //   name: "status",
  //   label: "Status",
  //   align: "center",
  // },
];

const tableRows = computed(() => studentActivityStore.all)

const update = (value) => {
  console.log(value);
}

const formModel = ref({
  name: '',
  day: '',
  start: '',
  end: ''
})

onBeforeMount(() => {
  studentActivityStore.getAllActivitiesFromServer()
})

onMounted(() => {
  // tableRows.value = useAttendance.attendances;
  // useAttendance.addAttendance();
});
</script>

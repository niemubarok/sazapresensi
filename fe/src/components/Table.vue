<template>
    <div>
        <q-card class="q-mt-md ">
            <q-table table-class="q-mt-md full-width window-height" :rows-per-page-options="[10, 20]" :columns="columns"
                :rows="props.tableRows" row-key="name" separator="cell">
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
                        <q-td key="name" :props="props">{{ props.row.name }}
                            <q-popup-edit v-model="props.row.name" v-slot="scope">
                                <q-input v-model="scope.value" dense autofocus counter />
                            </q-popup-edit>

                        </q-td>
                        <q-td key="day" :props="props">{{ props.row.day }}
                            <q-popup-edit v-model="props.row.day" v-slot="scope">
                                <q-input v-model="scope.value" dense autofocus counter />
                            </q-popup-edit>
                        </q-td>
                        <q-td key="jam" :props="props">{{ props.row.start }} - {{ props.row.end }}</q-td>
                        <!-- <q-td key="in" :props="props">{{ props.row.in }}</q-td> -->
                        <!-- <q-td key="out" :props="props">{{ props.row.out }}</q-td> -->
                        <q-td key="status" :props="props">{{ props.row.status }}</q-td>
                    </q-tr>
                </template>
            </q-table>
        </q-card>
    </div>
</template>

<script setup>
const props = defineProps()


</script>

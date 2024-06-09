<script setup>
import AuthenticatedLayout from "../layouts/AuthenticatedLayout.vue";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dropdown from "primevue/dropdown";
import {onMounted, ref} from "vue";
import { useToast } from 'primevue/usetoast';
import axios from "axios";

const toast = useToast();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const product = ref({});
const submitted = ref(false);

const openNew = () => {
  product.value = {};
  submitted.value = false;
  productDialog.value = true;
  getProjects();
};

const editTimesheet = (sheet) => {
  sheet.start_date = isoToDate(sheet.start_date);
  sheet.end_date = isoToDate(sheet.end_date);
  timesheet.value = {...sheet};
  productDialog.value = true;
  getProjects();
  console.log(timesheet)
}

const confirmDeleteProduct = (prod) => {
  timesheet.value = prod;
  deleteProductDialog.value = true;
};

const hideDialog = () => {
  productDialog.value = false;
  timesheet.value = {};
  submitted.value = false;
};

const deleteProduct = async () => {
  await axios.delete(`http://localhost:3000/api/timesheets/${timesheet.value.id}`, {
    headers: {
      'X-API-TOKEN': 'test',
    }
  })
      .then(res => {
        timesheet.value = {};
        toast.add({severity:'success', summary: 'Successful', detail: 'Timesheet Deleted', life: 3000});
      })
      .catch(e => {
        console.log(e)
        toast.add({severity:'error', summary: 'Failed', detail: 'Timesheet Failed to Delete', life: 3000});
      })

  deleteProductDialog.value = false;
  await getTimesheets();
};

const saveTimesheet = async () => {
  if (timesheet?.value.title?.trim()) {
    const data = timesheet.value;
    timesheet.value = {};

    data.project_id = data.project.id;
    data.start_date = dateToString(data.start_date);
    data.end_date = dateToString(data.end_date);

    if (data.id) {
      if (typeof data.start_time == 'object') {
        data.start_time = dateToTime(data.start_time);
      } else {
        data.start_time = data.start_time + ':00';
      }

      if (typeof data.end_time == 'object') {
        data.end_time = dateToTime(data.end_time);
      } else {
        data.end_time = data.end_time + ':00';
      }

      await axios.put(`http://localhost:3000/api/timesheets/${data.id}`, data, {
        headers: {
          "X-API-TOKEN": 'test',
        }
      }).then(response => {
        toast.add({severity:'success', summary: 'Success', detail: 'Success to update Timesheet', life: 3000});
        productDialog.value = false;
      }).catch(e => {
        toast.add({severity:'error', summary: 'Failed', detail: 'Failed to create Timesheet', life: 3000});
        console.log(e.response.data.errors)
      })
    } else {
      data.start_time = dateToTime(data.start_time);
      data.end_time = dateToTime(data.end_time);

      await axios.post("http://localhost:3000/api/timesheets", data, {
        headers: {
          "X-API-TOKEN": 'test',
        }
      }).then(response => {
        toast.add({severity:'success', summary: 'Success', detail: 'Success to create Timesheet', life: 3000});
        productDialog.value = false;
      }).catch(e => {
        toast.add({severity:'error', summary: 'Failed', detail: 'Failed to create Timesheet', life: 3000});
        console.log(e.response.data.errors)
      })
    }

    await getTimesheets();
  }
}

const dateToTime = (date) => {
  // date = new Date(date);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

const dateToString = (date) => {
  date = new Date(date);

  return date.toLocaleDateString('en-CA');
}

const isoToDate = (iso) => {
  let date = new Date(iso);

  let year = date.getFullYear();
  let month = String(date.getMonth() + 1).padStart(2, '0'); // Bulan dimulai dari 0, jadi tambahkan 1
  let day = String(date.getDate()).padStart(2, '0'); // Tambahkan 0 di depan jika perlu

  return `${year}/${month}/${day}`;
}
const timesheet = ref({});

const projects = ref([]);

const project = ref('');

const timesheets = ref([])

onMounted(async () => {
  await getTimesheets();
})

const getProjects = async () => {
  await axios.get('http://localhost:3000/api/projects', {
    headers: {
      "X-API-TOKEN": 'test',
    }
  }).then(res => {
    projects.value = res.data.data;
  }).catch(e => {
    console.log(e)
  })
}

const getTimesheets = async () => {
  await axios.get('http://localhost:3000/api/timesheets', {
    headers: {
      "X-API-TOKEN": 'test',
    }
  }).then(res => {
    console.log(res)
    const data = res.data.data;
    if(data.length > 0) {
      data.map(time => {
        time.start_date = isoToDate(time.start_date);
        time.end_date = isoToDate(time.end_date);
        time.start_time = time.start_time.slice(0, -3);
        time.end_time = time.end_time.slice(0, -3);

        return time;
      })
    }

    timesheets.value = data;
  }).catch(e => {
    console.log(e)
  })
}
</script>

<template>
  <AuthenticatedLayout>
    <template #header>
      <h2 class="font-semibold text-xl text-gray-800 leading-tight">HH Timesheet</h2>
    </template>

    <div class="py-12">
      <div class="max-w-full mx-auto sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div class="p-6 text-gray-900">
            <div class="flex gap-8 font-light">
              <div class="">
                <h5 class="text-xs">Nama Karyawan</h5>
                <h2 class="text-lg">Timothy</h2>
              </div>

              <div class="">
                <h5 class="text-xs">Rate</h5>
                <h2 class="text-lg">Rp 12.000 /jam</h2>
              </div>
            </div>
          </div>

          <div class="p-6 text-gray-900">

            <DataTable class="text-xs" :value="timesheets" size="small" removableSort>
                <template #header>
                  <div class="flex flex-wrap gap-2 items-center justify-between">
                    <div class="m-0 flex items-center gap-2">
                      <h1 class="font-bold">Daftar Kegiatan</h1>
                      <Button label="Tambah Kegiatan" outlined size="small" icon="pi pi-plus-circle" class="medium text-xs" @click="openNew" />
                    </div>
                  </div>
                </template>
                <Column class="p-4" field="title" header="Judul Kegiatan" sortable="" style="width: 20%"></Column>
                <Column field="project.name" header="Nama Proyek" sortable="" style="width: 15%"></Column>
                <Column field="start_date" header="Tanggal Mulai" sortable=""></Column>
                <Column field="end_date" header="Tanggal Berakhir" sortable=""></Column>
                <Column field="start_time" header="Waktu Mulai" sortable=""></Column>
                <Column field="end_time" header="Waktu Berakhir" sortable=""></Column>
                <Column field="duration" header="Durasi" sortable=""></Column>
                <Column field="action" header="Aksi">
                  <template #body="slotProps">
                    <Button icon="pi pi-pencil" outlined class="mr-2" size="small" @click="editTimesheet(slotProps.data)" />
                    <Button icon="pi pi-trash" outlined severity="danger" size="small" @click="confirmDeleteProduct(slotProps.data)" />
                  </template>
                </Column>
              </DataTable>

            <Dialog v-model:visible="productDialog" :style="{width: '720px'}" header="Product Details" :modal="true" class="p-fluid">
              <div class="grid grid-cols-4 gap-2">
                <div class="field col">
                  <label for="start_date" class="text-sm">Tanggal Mulai <span class="text-red-500">*</span></label>
                  <Calendar v-model="timesheet.start_date" dateFormat="yy/mm/dd" />
                </div>
                <div class="field col">
                  <label for="end_date" class="text-sm">Tanggal Berakhir <span class="text-red-500">*</span></label>
                  <Calendar v-model="timesheet.end_date" dateFormat="yy/mm/dd" />
                </div>
                <div class="field col">
                  <label for="start_time" class="text-sm">Jam Mulai <span class="text-red-500">*</span></label>
                  <Calendar id="start_time" v-model="timesheet.start_time" timeOnly />
                </div>
                <div class="field col">
                  <label for="end_time" class="text-sm">Jam Berakhir <span class="text-red-500">*</span></label>
                  <Calendar id="end_time" v-model="timesheet.end_time" timeOnly />
                </div>
              </div>

              <div class="field mt-6">
                <label for="title" class="text-sm">Judul Kegiatan <span class="text-red-500">*</span></label>
                <InputText id="title" v-model.trim="timesheet.title" required="true" autofocus :invalid="submitted && !timesheet.title" />
                <small class="p-error" v-if="submitted && !timesheet.title">Name is required.</small>
              </div>

              <div class="field mt-6">
                <label for="title" class="text-sm">Nama Project <span class="text-red-500">*</span></label>
                <Dropdown
                    v-model="timesheet.project"
                    :options="projects"
                    optionLabel="name"
                    class="w-full md:w-14rem"
                />
              </div>

              <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" text @click="saveTimesheet" />
              </template>
            </Dialog>

            <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
              <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Are you sure you want to delete <b>{{timesheet.title}}</b>?</span>
              </div>
              <template #footer>
                <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false"/>
                <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
              </template>
            </Dialog>

            </div>

        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<style scoped>

</style>
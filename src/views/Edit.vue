<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
        <IonTitle>Edit Daftar Belanja</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true">
      <form @submit.prevent="updateProduk()">
        <IonList>
          <IonItem>
            <IonInput
              id="nama"
              name="nama"
              label="Nama"
              label-placement="stacked"
              placeholder="Isikan Nama Barang"
              v-model="daftarBelanja.nama"
            ></IonInput>
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <IonInput
              id="jumlah"
              name="jumlah"
              label="Jumlah"
              label-placement="stacked"
              placeholder="Isikan Jumlah"
              v-model="daftarBelanja.jumlah"
            ></IonInput>
          </IonItem>
        </IonList>
        <IonList v-if="errors">
          <IonItem v-for="error of errors" color="danger">
            {{ error }}
          </IonItem>
        </IonList>
        <IonButton type="submit" expand="block" class="mt-6">
          Edit Daftar Belanja
        </IonButton>
      </form>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import axios from "axios";
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

onMounted(() => {
  getDaftarBelanja();
});

interface DaftarBelanja {
  nama?: string;
  jumlah?: string;
}

let daftarBelanja = reactive<DaftarBelanja>({});
const errors = ref<[]>([]);
const clearFrom = () => {
  daftarBelanja.nama = "";
  daftarBelanja.jumlah = "";
  errors.value = [];
};

const router = useRouter();
const route = useRoute();

const { id } = route.params;
const notFound = ref<boolean>(true);
const isLoading = ref<boolean>(true);
const getDaftarBelanja = async (): Promise<void> => {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/daftar_belanja/${id}`
  );
  isLoading.value = false;
  const data = response.data;
  if (data.success) {
    notFound.value = false;
    daftarBelanja.nama = data.data.nama;
    daftarBelanja.jumlah = data.data.jumlah;
  } else {
    notFound.value = true;
  }
};

const updateProduk = async (): Promise<void> => {
  const response = await axios.put(
    `http://127.0.0.1:8000/api/daftar_belanja/${id}`,
    daftarBelanja
  );
  const data = response.data;
  if (data.success) {
    router.push("/");
    clearFrom();
  } else {
    errors.value = data.data.kode || data.data.harga || data.data.nama;
  }
};
</script>

<style scoped></style>

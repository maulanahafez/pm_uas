<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
        <IonTitle>Tambah Daftar Belanja</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true">
      <form @submit.prevent="storeProduk()">
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
          Tambah Daftar Belanja
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

interface DaftarBelanja {
  nama?: string;
  jumlah?: string;
}

const daftarBelanja = reactive<DaftarBelanja>({});
const errors = ref<[]>([]);
const clearFrom = () => {
  daftarBelanja.nama = "";
  daftarBelanja.jumlah = "";
  errors.value = [];
};

const router = useRouter();
const storeProduk = async (): Promise<void> => {
  const response = await axios.post(
    `http://127.0.0.1:8000/api/daftar_belanjas/`,
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

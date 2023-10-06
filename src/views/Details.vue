<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton></IonBackButton>
        </IonButtons>
        <IonTitle>Detail Daftar Belanja</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true">
      <template v-if="!isLoading">
        <IonCard v-if="daftarBelanja">
          <IonCardHeader>
            <IonCardTitle>
              {{ daftarBelanja.nama }}
            </IonCardTitle>
            <IonCardSubtitle>
              <kBadge :colors="{ bg: 'bg-green-500' }">
                {{ daftarBelanja.jumlah }}
              </kBadge>
            </IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
        <div v-else class="flex flex-col items-center justify-center">
          <p class="mt-12 text-xl font-bold">404</p>
          <p class="mt-1 text-lg">Not Found</p>
        </div>
      </template>
      <template v-else>
        <div class="flex items-center justify-center mt-40">
          <kPreloader></kPreloader>
        </div>
      </template>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import axios from "axios";
import { kBadge, kPreloader } from "konsta/vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

onMounted(() => {
  getDaftarBelanja();
});

interface Produk {
  id: number;
  nama?: string;
  jumlah?: string;
}

const daftarBelanja = ref<Produk>();
const notFound = ref<boolean>(true);
const isLoading = ref<boolean>(true);

const route = useRoute();
const { id } = route.params;
const getDaftarBelanja = async (): Promise<void> => {
  const response = await axios.get(
    `http://127.0.0.1:8000/api/daftar_belanja/${id}`
  );
  isLoading.value = false;
  const data = response.data;
  if (data.success) {
    notFound.value = false;
    daftarBelanja.value = data.data;
  } else {
    notFound.value = true;
  }
};
</script>

<style scoped></style>

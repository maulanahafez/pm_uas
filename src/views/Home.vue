<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonTitle>Daftar Belanja</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true">
      <template v-if="!isLoading">
        <div v-if="daftarBelanjas?.length">
          <IonCard v-for="item of daftarBelanjas" class="text-center">
            <IonCardHeader>
              <IonCardTitle> {{ item.nama }} </IonCardTitle>
              <IonCardSubtitle>
                <kBadge :colors="{ bg: 'bg-green-500' }">
                  {{ item.jumlah }}
                </kBadge>
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <div class="flex">
                <kButton
                  clear
                  :colors="{
                    textIos: 'text-sky-500',
                    textMaterial: 'text-sky-500',
                  }"
                  @click="router.push(`/detail/${item.id}`)"
                >
                  <IonIcon :icon="eye"></IonIcon>
                  <span class="ml-2">Lihat</span>
                </kButton>
                <kButton
                  clear
                  :colors="{
                    textIos: 'text-green-500',
                    textMaterial: 'text-green-500',
                  }"
                  @click="router.push(`/edit/${item.id}`)"
                >
                  <IonIcon :icon="create"></IonIcon>
                  <span class="ml-2">Edit</span>
                </kButton>
                <kButton
                  clear
                  :colors="{
                    textIos: 'text-red-500',
                    textMaterial: 'text-red-500',
                  }"
                  @click="
                    () => {
                      deleteDaftarBelanja(item.id);
                    }
                  "
                >
                  <IonIcon :icon="trashBin"></IonIcon>
                  <span class="ml-2">Hapus</span>
                </kButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
        <div v-else class="flex items-center justify-center mt-40 px-4">
          <div class="text-xl font-bold">Daftar Belanja Kosong</div>
        </div>
      </template>
      <template v-else>
        <div class="flex items-center justify-center mt-40">
          <kPreloader></kPreloader>
        </div>
      </template>
      <IonFab
        vertical="bottom"
        horizontal="end"
        slot="fixed"
        @click="router.push('/create')"
      >
        <IonFabButton>
          <IonIcon :icon="add"></IonIcon>
        </IonFabButton>
      </IonFab>
    </IonContent>

    <IonAlert
      :is-open="isOpen"
      header="Berhasil"
      message="Berhasil Hapus Data"
      :buttons="alertButtons"
      @didDismiss="setOpen(false)"
    ></IonAlert>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonAlert,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import axios from "axios";
import { add, create, eye, trashBin } from "ionicons/icons";
import { kBadge, kButton, kPreloader } from "konsta/vue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

onMounted(() => {
  getDaftarBelanjas();
});

interface DaftarBelanja {
  id: number;
  nama?: string;
  jumlah?: string;
}

const daftarBelanjas = ref<DaftarBelanja[]>();
const errors = ref<boolean>(false);
const router = useRouter();
const isLoading = ref<boolean>(true);

const getDaftarBelanjas = async (): Promise<void> => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/daftar_belanjas"
    );
    isLoading.value = false;
    const data = response.data;
    daftarBelanjas.value = data.data;
  } catch (error) {
    errors.value = true;
  }
};

const isOpen = ref(false);
const alertButtons = ["OK"];

const setOpen = (state: boolean) => {
  isOpen.value = state;
};

const deleteDaftarBelanja = async (id: number): Promise<void> => {
  try {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/daftar_belanja/${id}`
    );
    const data = response.data;
    if (data.success) {
      getDaftarBelanjas();
      isOpen.value = true;
    }
  } catch (error) {}
};
</script>

<style scoped></style>

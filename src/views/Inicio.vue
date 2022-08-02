<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" class="pa-0">
        <v-img
          max-height="300px"
          width="100%"
          :src="mainBg"
        >
          <v-row justify="center" style="height: 86%;">
            <v-col cols="12" sm="10" md="8" class="text-center center-content">
              <h1 class="white--text">Lokal</h1>
              <span class="subtitle-1 white--text">Sistema de gestión</span>
            </v-col>
          </v-row>
        </v-img>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" class="overfloat-effect">
        <v-row>
          <v-col cols="12">
            <v-card>
              <v-card-title>¿Para qué sirve Lokal?</v-card-title>
              <v-card-text>
                <p>
                  Es unas aplicación orientada a la gestión de un pequeño "negocio". 
                  Trata de gestionar las personas que hay en un local, los grupos de 
                  limpieza para limpiar, precios de productos que se pueden vender, 
                  listado del número de compras que se realizar para la tienda, cálculos
                  de beneficios obtenidos...
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <h1>¿Cómo funciona?</h1>
            <funcionamiento-time-line />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import funcionamientoTimeLine from "@/components/common/home/funcionamientoTimeLine"

export default {
  name: 'Inicio',
  data() {
    return {
      mainBg: require('@/assets/img/home/blue_bg.jpg'),
    }
  },
  components: {
    funcionamientoTimeLine
  }
}
</script>

<style scoped>
.overfloat-effect {
  position: absolute;
  top: 174px;
}
.center-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
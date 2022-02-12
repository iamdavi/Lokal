<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      style="height: 100% !important;"
      fixed
      app
    >
      <v-list>
        <v-list-item link class="text-center user-data-navbar">
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              Nombre usuario
            </v-list-item-title>
            <v-list-item-subtitle>
              Email usuario
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    clipped: true,
    drawer: false,
    items: [
      {
        icon: 'mdi-home',
        title: 'Inicio',
        to: '/'
      },
      {
        icon: 'mdi-account-group',
        title: 'Personas',
        to: '/personas'
      },
      {
        icon: 'mdi-cart',
        title: 'Compras',
        to: '/compras'
      },
      {
        icon: 'mdi-food-drumstick',
        title: 'Productos',
        to: '/productos'
      },
      {
        icon: 'mdi-format-list-bulleted-square',
        title: 'Listas de compra',
        to: '/listas-compra'
      },
    ],
    miniVariant: true,
    right: true,
    rightDrawer: false,
    title: 'Lokal'
  }),
};
</script>

<style>
.v-application--wrap {
  min-height: fit-content;
}
.mxw-20 {
  max-width: 20% !important;
}
.mxw-30 {
  max-width: 30% !important;
}
.mxw-40 {
  max-width: 40% !important;
}
.mxw-50 {
  max-width: 50% !important;
}
.justify-self-start {
  justify-self: start !important;
}
</style>
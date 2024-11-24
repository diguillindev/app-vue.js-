<script setup>
import { RouterLink, RouterView } from 'vue-router' 
</script>

<template>
  <!-- Navbar con diseño de Bootstrap -->
  <nav class="navbar navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand">Navbar</a>
      <!-- Enlaces con estilo personalizado -->
      <RouterLink to="/" class="nav-link">Promedio</RouterLink>
      <RouterLink to="/FormularioRegistro" class="nav-link">Formulario</RouterLink>
    </div>
  </nav>

  <RouterView />
</template>

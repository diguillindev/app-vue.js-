<script setup>
import { ref } from 'vue';

// Variables reactivas
const nombre = ref(null);
const correo = ref(null);
const contraseña = ref(null);
const repetirContraseña = ref(null);
const errors = ref({
  correo: null,
  contraseña: null,
  repetirContraseña: null,
});

// Validación de email
function validEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// Validación del formulario
const checkForm = (e) => {
  e.preventDefault(); // Evitar envío automático

  // Limpiar errores
  errors.value = {
    correo: null,
    contraseña: null,
    repetirContraseña: null,
  };

  // Validar correo
  if (!correo.value) {
    errors.value.correo = "El campo correo es requerido.";
  } else if (!validEmail(correo.value)) {
    errors.value.correo = "Por favor, ingrese un correo electrónico válido.";
  }

  // Validar contraseña
  if (!contraseña.value) {
    errors.value.contraseña = "El campo contraseña es requerido.";
  }

  if (!repetirContraseña.value) {
    errors.value.repetirContraseña = "El campo repetir contraseña es requerido.";
  }

  // Verificar coincidencia de contraseñas
  if (contraseña.value && repetirContraseña.value && contraseña.value !== repetirContraseña.value) {
    errors.value.repetirContraseña = "Las contraseñas no coinciden.";
  }

  // Si no hay errores, continuar
  if (!errors.value.correo && !errors.value.contraseña && !errors.value.repetirContraseña) {
    window.alert("El registro se ha realizado correctamente.");
  }
};
</script>

<template>
  <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
    <form @submit.prevent="checkForm" class="row g-3 p-4" style="padding: 25px; border: 1px solid #ddd; border-radius: 10px; width: 100%; max-width: 600px;">
      
      <!-- Nombre -->
      <div class="col-12 col-md-6">
        <label for="nombre" class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombre"
          v-model="nombre"
          placeholder="Nombre"
          aria-label="Nombre"
        />
      </div>

      <!-- Correo -->
      <div class="col-12 col-md-6">
        <label for="correo" class="form-label">Correo</label>
        <input
          type="text"
          class="form-control"
          id="correo"
          v-model="correo"
          placeholder="Correo"
          aria-label="Correo"
        />
        <p v-if="errors.correo" :style="{ color: 'red' }">
          {{ errors.correo }}
        </p>
      </div>

      <!-- Contraseña -->
      <div class="col-12">
        <label for="contraseña" class="form-label">Contraseña</label>
        <input
          type="password"
          class="form-control"
          id="contraseña"
          v-model="contraseña"
          placeholder="Contraseña"
          aria-label="Contraseña"
        />
        <p v-if="errors.contraseña" :style="{ color: 'red' }">
          {{ errors.contraseña }}
        </p>
      </div>

      <!-- Repetir Contraseña -->
      <div class="col-12">
        <label for="repetirContraseña" class="form-label">Repetir Contraseña</label>
        <input
          type="password"
          class="form-control"
          id="repetirContraseña"
          v-model="repetirContraseña"
          placeholder="Repetir Contraseña"
          aria-label="Repetir Contraseña"
        />
        <p v-if="errors.repetirContraseña" :style="{ color: 'red' }">
          {{ errors.repetirContraseña }}
        </p>
      </div>

      <!-- Botón de Enviar -->
      <div class="col-12 d-flex justify-content-center">
        <button type="submit" class="btn btn-secondary rounded-pill w-100" style="margin-top: 1.7rem;">
          Registrar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      correo: '',
      contraseña: '',
      repetirContraseña: '',
      errors: {}
    };
  },
  methods: {
    checkForm() {
      this.errors = {};

      if (!this.nombre) {
        this.errors.nombre = 'El nombre es requerido.';
      }

      if (!this.correo) {
        this.errors.correo = 'El correo es requerido.';
      } else if (!/\S+@\S+\.\S+/.test(this.correo)) {
        this.errors.correo = 'El correo debe ser válido.';
      }

      if (!this.contraseña) {
        this.errors.contraseña = 'La contraseña es requerida.';
      }

      if (!this.repetirContraseña) {
        this.errors.repetirContraseña = 'Debe repetir la contraseña.';
      } else if (this.contraseña !== this.repetirContraseña) {
        this.errors.repetirContraseña = 'Las contraseñas no coinciden.';
      }

      if (Object.keys(this.errors).length === 0) {
        // Aquí se puede procesar el formulario, como enviarlo al servidor
        alert('Formulario enviado con éxito');
      }
    }
  }
};
</script>

<style scoped>
/* Puedes agregar aquí estilos personalizados si los necesitas */
</style>


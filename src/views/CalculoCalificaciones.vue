<template>
  <div class="d-flex justify-content-center align-items-center" style="min-height: 100vh;">
    <form class="row g-3 p-4" style="padding: 25px; border: 1px solid #ddd; border-radius: 10px; width: 100%; max-width: 600px;">
      <!-- Iterar sobre las notas -->
      <div v-for="(nota, index) in notas" :key="index" class="row g-3 align-items-center">
        <div class="col-auto">
          <label :for="'nota' + (index + 1)" class="col-form-label">Nota {{ index + 1 }}</label>
        </div>
        <div class="col-auto">
          <input
            type="number"
            :id="'nota' + (index + 1)"
            v-model.number="notas[index]"
            class="form-control"
            min="10"
            max="70"
            aria-describedby="notaHelpInline"
          />
        </div>
      </div>

      <!-- Asistencia -->
      <div class="row g-3 align-items-center">
        <div class="col-12 col-md-auto">
          <label for="porcentajeAsist" class="col-form-label">Asist %</label>
        </div>
        <div class="col-12 col-md">
          <input
            type="number"
            v-model.number="porcentajeAsist"
            class="form-control"
            min="0"
            max="100"
            aria-describedby="asistHelpInline"
          />
        </div>
      </div>

      <!-- Botón de Calcular -->
      <div class="row g-3 align-items-center">
        <div class="col-12">
          <button @click="calcularPromedio" type="button" class="btn btn-secondary btn-lg rounded-pill w-100 w-md-auto">
            Calcular
          </button>
        </div>
      </div>

      <!-- Mostrar Promedio -->
      <div v-if="promedio !== null" class="row g-3">
        <div class="col-12">
          <p class="alert alert-info">Promedio: {{ promedio.toFixed(2) }}</p>
        </div>
      </div>

      <!-- Mensajes de Error -->
      <div v-if="errores.length > 0" class="alert alert-danger">
        <ul>
          <li v-for="(error, index) in errores" :key="index">{{ error }}</li>
        </ul>
      </div>

      <!-- Estado de Aprobación -->
      <p v-if="estado !== null" :style="{ color: estado === 'Aprobado' ? 'green' : 'red' }">
        {{ estado }}
      </p>
    </form>
  </div>
</template>

<script>
import { ref, reactive } from "vue";

export default {
  setup() {
    // Arreglo reactivo de notas
    const notas = reactive([0, 0, 0]);
    
    // Variable para el porcentaje de asistencia
    const porcentajeAsist = ref(0);
    
    // Variable para almacenar el promedio calculado
    const promedio = ref(null);

    // Variable para el estado de aprobado o reprobado
    const estado = ref(null);

    // Variable para los errores
    const errores = ref([]);

    // Porcentajes fijos para las notas
    const porcentajes = [0.35, 0.35, 0.30];

    // Función para calcular el promedio 
    const calcularPromedio = () => {
      // Limpiar errores previos y estado
      errores.value = [];
      estado.value = null;

      // Validación de las notas
      if (notas.some((nota) => nota < 10 || nota > 70)) {
        errores.value.push("Porfavor, ingrese valores válidos para las notas y la asistencia");
      }

      // Validación del porcentaje de asistencia
      if (porcentajeAsist.value < 0 || porcentajeAsist.value > 100) {
        errores.value.push("Porfavor, ingrese valores válidos para las notas y la asistencia");
      }

      // Si hay errores, no se calcula el promedio
      if (errores.value.length > 0) {
        return;
      }

      // Calcular el promedio 
      const promedioNotas = notas.reduce((subtotal, nota, index) => {
        const porcentaje = porcentajes[index] || 0;
        return subtotal + nota * porcentaje;
      }, 0);

      // Calcular el promedio final teniendo en cuenta el porcentaje de asistencia
      const promedioFinal = promedioNotas *  + (porcentajeAsist.value / 100);

      // Asignar el promedio calculado
      promedio.value = promedioFinal;

      // Verificar si se aprobó (promedio >= 40 y asistencia >= 80%)
      if (promedioFinal >= 40 && porcentajeAsist.value >= 80) {
        estado.value = "Aprobado";
      } else {
        estado.value = "Reprobado";
      }
    };

    return {
      notas,
      porcentajeAsist,
      promedio,
      errores,
      estado,
      calcularPromedio
    };
  }
};
</script>
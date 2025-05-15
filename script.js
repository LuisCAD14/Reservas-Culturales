let reservas = [];

let editIndex = -1;

document.getElementById('reservaForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const matricula = document.getElementById('matricula').value.trim();
  const actividad = document.getElementById('actividad').value;
  const fecha = document.getElementById('fecha').value;

  // Validación para no permitir campos vacíos
  if (!nombre || !matricula || !actividad || !fecha) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  // Validación para que la matrícula tenga exactamente 8 caracteres alfanuméricos
  const matriculaValida = /^[a-zA-Z0-9]{8}$/.test(matricula);
  if (!matriculaValida) {
    alert("La matrícula debe tener exactamente 8 caracteres alfanuméricos.");
    return;
  }

  // Validación de la fecha que sea actual o futura
  const fechaSeleccionada = new Date(fecha);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (fechaSeleccionada < hoy) {
    alert("La fecha debe ser actual o futura.");
    return;
  }

  const reserva = { nombre, matricula, actividad, fecha };

  if (editIndex === -1) {
    reservas.push(reserva);
  } else {
    reservas[editIndex] = reserva;
    editIndex = -1;
  }

  this.reset();
  mostrarReservas();
});

// Función que muestra todas las reservas registradas en la tabla
function mostrarReservas() {
  const tbody = document.querySelector('#tablaReservas tbody');
  tbody.innerHTML = '';

  reservas.forEach((reserva, index) => {
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td>${reserva.nombre}</td>
      <td>${reserva.matricula}</td>
      <td>${reserva.actividad}</td>
      <td>${reserva.fecha}</td>
      <td>
        <button class="btn btn-sm btn-warning me-2" onclick="editarReserva(${index})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarReserva(${index})">Eliminar</button>
      </td>
    `;

    tbody.appendChild(fila);
  });
}

function editarReserva(index) {
  const reserva = reservas[index];

  document.getElementById('nombre').value = reserva.nombre;
  document.getElementById('matricula').value = reserva.matricula;
  document.getElementById('actividad').value = reserva.actividad;
  document.getElementById('fecha').value = reserva.fecha;

  editIndex = index;
}

// Función para eliminar una reserva
function eliminarReserva(index) {
  if (confirm("¿Estás seguro de eliminar esta reserva?")) {
    reservas.splice(index, 1);
    mostrarReservas();
  }
}


function editarReserva(index) {
  const reserva = reservas[index];
  document.getElementById('nombre').value = reserva.nombre;
  document.getElementById('matricula').value = reserva.matricula;
  document.getElementById('actividad').value = reserva.actividad;
  document.getElementById('fecha').value = reserva.fecha;

  editIndex = index;
}

function eliminarReserva(index) {
  if (confirm("¿Estás seguro de eliminar esta reserva?")) {
    reservas.splice(index, 1);
    mostrarReservas();
  }
}

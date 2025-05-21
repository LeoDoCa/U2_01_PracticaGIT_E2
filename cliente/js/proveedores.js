const BASEURL_PROVEEDORES = 'http://localhost:8080/api/proveedor/';


const proveedores = [
  { id: 1, nombre: 'Juan Pérez', email: 'juanperez@mail.com', telefono: '5522334455' },
  { id: 2, nombre: 'María Gómez', email: 'mariagomez@mail.com', telefono: '5511223344' }
];

const automoviles = [
  { id: 1, marca: 'Toyota', modelo: 'Corolla', placa: 'ABC123', proveedor: { id: 1 } },
  { id: 2, marca: 'Nissan', modelo: 'Versa', placa: 'XYZ789', proveedor: { id: 1 } },
  { id: 3, marca: 'Chevrolet', modelo: 'Onix', placa: 'LMN456', proveedor: { id: 2 } }
];

let proveedorActualId = null;

function validarProveedor(nombre, email, telefono) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const telRegex = /^\d{10}$/;
  return nombre && emailRegex.test(email) && telRegex.test(telefono);
}

document.getElementById('agregarProveedorForm').addEventListener('submit', async e => {
  e.preventDefault();

  const nombre = document.getElementById('provNombre').value.trim();
  const correo = document.getElementById('provEmail').value.trim();
  const telefono = document.getElementById('provTelefono').value.trim();

  if (!validarProveedor(nombre, correo, telefono)) {
    alert('Datos inválidos. Verifica nombre, correo y teléfono.');
    return;
  }

  const nuevoProveedor = { nombre, correo, telefono };

  try {
    const response = await fetch(`${BASEURL_PROVEEDORES}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProveedor),
    });

    if (!response.ok) {
      throw new Error(`Error al guardar proveedor: ${response.statusText}`);
    }

    const proveedorGuardado = await response.json();
    proveedores.push(proveedorGuardado);

    cargarProveedores();
    e.target.reset();
    bootstrap.Modal.getInstance(document.getElementById('agregarProveedorModal')).hide();
    alert('Proveedor agregado correctamente');
  } catch (error) {
    console.error(error);
    alert('Error al guardar el proveedor. Intenta nuevamente.');
  }
});


async function cargarProveedores() {
  const contenedor = document.getElementById('contenedorProveedores');
  contenedor.innerHTML = '';

  try {
    const response = await fetch(BASEURL_PROVEEDORES);
    if (!response.ok) {
      throw new Error('Error al obtener los proveedores');
    }

    const proveedores = await response.json();
    console.log(proveedores);


    proveedores.forEach(prov => {
      const div = document.createElement('div');
      div.className = 'col';

      div.innerHTML = `
        <div class="card w-100 h-100 border-0 shadow-sm">
          <div class="card-header bg-terrary">
            <h5 class="card-title mb-0">${prov.nombre}</h5>
          </div>
          <div class="d-flex flex-wrap justify-content- align-items-center p-3">
            <div class="d-flex gap-4 flex-grow-1 flex-wrap">
              <p class="mb-0"><strong>Email:</strong> ${prov.correo}</p>
              <p class="mb-0"><strong>Teléfono:</strong> ${prov.telefono}</p>
            </div>
            <div class="d-flex gap-2 flex-shrink-0 mt-2 mt-md-0">
              <button class="btn btn-outline-info" data-bs-toggle="modal" data-bs-target="#detallesProveedorModal" onclick="verDetallesProveedor(${prov.id})">
                <i class="fas fa-eye"></i> Detalles
              </button>
              <button class="btn btn-outline-warning" data-bs-toggle="modal" data-bs-target="#editarProveedorModal" onclick="cargarProveedorParaEditar(${prov.id})">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-outline-danger btn-sm" onclick="eliminarProveedor(${prov.id})">
                <i class="fas fa-trash"></i> Eliminar
              </button>
            </div>
          </div>
        </div>
      `;

      contenedor.appendChild(div);
    });
  } catch (error) {
    console.error('Error al cargar los proveedores:', error);
    contenedor.innerHTML = '<p class="text-danger">Error al cargar proveedores.</p>';
  }
}

async function verDetallesProveedor(id) {
  try {
    const proveedorResponse = await fetch(`${BASEURL_PROVEEDORES}${id}`);
    if (!proveedorResponse.ok) throw new Error('No se pudo obtener el proveedor');
    const prov = await proveedorResponse.json();

    document.getElementById('detalleProvNombre').textContent = prov.nombre;
    document.getElementById('detalleProvEmail').textContent = prov.correo;
    document.getElementById('detalleProvTelefono').textContent = prov.telefono;

    const autosResponse = await fetch(`${BASEURL_PROVEEDORES}${id}/automoviles`); // ajusta esta ruta si es distinta
    if (!autosResponse.ok) throw new Error('No se pudieron obtener los automóviles del proveedor');
    const autos = await autosResponse.json();

    const lista = document.getElementById('listaAutosProveedor');
    lista.innerHTML = '';

    if (autos.length === 0) {
      lista.innerHTML = '<li class="list-group-item text-muted">Sin automóviles asociados</li>';
    } else {
      autos.forEach(auto => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${auto.marca} ${auto.modelo} (${auto.placa})`;
        lista.appendChild(li);
      });
    }
  } catch (error) {
    console.error('Error al obtener los detalles del proveedor:', error);
  }
}


async function cargarProveedorParaEditar(id) {
  try {
    const response = await fetch(`${BASEURL_PROVEEDORES}${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener proveedor: ${response.statusText}`);
    }
    const prov = await response.json();

    proveedorActualId = id;
    document.getElementById('editProvNombre').value = prov.nombre;
    document.getElementById('editProvEmail').value = prov.correo;
    document.getElementById('editProvTelefono').value = prov.telefono;

  } catch (error) {
    console.error(error);
    alert('No se pudo cargar la información del proveedor.');
  }
}


document.getElementById('editarProveedorForm').addEventListener('submit', async e => {
  e.preventDefault();

  const nombre = document.getElementById('editProvNombre').value.trim();
  const correo = document.getElementById('editProvEmail').value.trim();
  const telefono = document.getElementById('editProvTelefono').value.trim();

  if (!validarProveedor(nombre, correo, telefono)) {
    alert('Datos inválidos. Verifica nombre, correo y teléfono.');
    return;
  }

  try {
    const response = await fetch(`${BASEURL_PROVEEDORES}${proveedorActualId}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, correo, telefono }),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar proveedor: ${response.statusText}`);
    }

    
    const updatedProv = await response.json();
    const provIndex = proveedores.findIndex(p => p.id === proveedorActualId);
    if (provIndex !== -1) {
      proveedores[provIndex] = updatedProv;
      cargarProveedores();
    }

    bootstrap.Modal.getInstance(document.getElementById('editarProveedorModal')).hide();
    alert('Proveedor actualizado correctamente');

  } catch (error) {
    console.error(error);
    alert('No se pudo actualizar el proveedor.');
  }
});


function eliminarProveedor(id) {
  const prov = proveedores.find(p => p.id === id);
  if (!prov) return;

  document.getElementById('confirmacionMensaje').textContent = `¿Está seguro que desea eliminar al proveedor "${prov.nombre}"?`;

  const confirmarBtn = document.getElementById('confirmarAccionBtn');
  confirmarBtn.onclick = async () => {
    try {
      const response = await fetch(`${BASEURL_PROVEEDORES}${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar proveedor: ${response.statusText}`);
      }

      const index = proveedores.findIndex(p => p.id === id);
      if (index !== -1) {
        proveedores.splice(index, 1);
        cargarProveedores();
      }

      alert('Proveedor eliminado correctamente');
    } catch (error) {
      console.error(error);
      alert('No se pudo eliminar el proveedor.');
    }

    bootstrap.Modal.getInstance(document.getElementById('confirmacionModal')).hide();
  };

  const modal = new bootstrap.Modal(document.getElementById('confirmacionModal'));
  modal.show();
}

document.addEventListener('DOMContentLoaded', () => {
  cargarProveedores();
});
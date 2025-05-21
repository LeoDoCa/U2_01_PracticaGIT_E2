// Datos de prueba
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
  
  // validaciones
  function validarProveedor(nombre, email, telefono) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telRegex = /^\d{10}$/;
    return nombre && emailRegex.test(email) && telRegex.test(telefono);
  }
  
  // guardar proveedor
  document.getElementById('agregarProveedorForm').addEventListener('submit', e => {
    e.preventDefault();
    const nombre = document.getElementById('provNombre').value.trim();
    const email = document.getElementById('provEmail').value.trim();
    const telefono = document.getElementById('provTelefono').value.trim();
  
    if (!validarProveedor(nombre, email, telefono)) {
      alert('Datos inválidos. Verifica nombre, correo y teléfono.');
      return;
    }
  
    const nuevoProveedor = {
      id: Date.now(), nombre, email, telefono
    };
    proveedores.push(nuevoProveedor);
    cargarProveedores();
    e.target.reset();
    bootstrap.Modal.getInstance(document.getElementById('agregarProveedorModal')).hide();
    alert('Proveedor agregado correctamente');
  });
  
  // mostrar 
  function cargarProveedores() {
    const contenedor = document.getElementById('contenedorProveedores');
    contenedor.innerHTML = '';
  
    proveedores.forEach(prov => {
      const div = document.createElement('div');
      div.className = 'col';
  
      div.innerHTML = `
        <div class="card w-100 h-100 border-0 shadow-sm">
          <div class="card-header bg-secondary text-white">
            <h5 class="card-title mb-0">${prov.nombre}</h5>
          </div>
         <div class="d-flex flex-wrap justify-content- align-items-center p-3">
            <div class="d-flex gap-4 flex-grow-1 flex-wrap">
            <p class="mb-0"><strong>Email:</strong> ${prov.email}</p>
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
  }
  
  // ver info
  function verDetallesProveedor(id) {
    const prov = proveedores.find(p => p.id === id);
    if (!prov) return;
  
    document.getElementById('detalleProvNombre').textContent = prov.nombre;
    document.getElementById('detalleProvEmail').textContent = prov.email;
    document.getElementById('detalleProvTelefono').textContent = prov.telefono;
  
    const lista = document.getElementById('listaAutosProveedor');
    lista.innerHTML = '';
    const autos = automoviles.filter(a => a.proveedor.id === id);
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
  }
  
  // cargar datos en modal de editar
  function cargarProveedorParaEditar(id) {
    const prov = proveedores.find(p => p.id === id);
    if (!prov) return;
  
    proveedorActualId = id;
    document.getElementById('editProvNombre').value = prov.nombre;
    document.getElementById('editProvEmail').value = prov.email;
    document.getElementById('editProvTelefono').value = prov.telefono;
  }
  
  // actualizar
  document.getElementById('editarProveedorForm').addEventListener('submit', e => {
    e.preventDefault();
    const nombre = document.getElementById('editProvNombre').value.trim();
    const email = document.getElementById('editProvEmail').value.trim();
    const telefono = document.getElementById('editProvTelefono').value.trim();
  
    if (!validarProveedor(nombre, email, telefono)) {
      alert('Datos inválidos. Verifica nombre, correo y teléfono.');
      return;
    }
  
    const provIndex = proveedores.findIndex(p => p.id === proveedorActualId);
    if (provIndex !== -1) {
      proveedores[provIndex] = { ...proveedores[provIndex], nombre, email, telefono };
      cargarProveedores();
      bootstrap.Modal.getInstance(document.getElementById('editarProveedorModal')).hide();
      alert('Proveedor actualizado correctamente');
    }
  });
  
  // eliminar
  function eliminarProveedor(id) {
    const prov = proveedores.find(p => p.id === id);
    if (!prov) return;

    // confirma
    document.getElementById('confirmacionMensaje').textContent = `¿Está seguro que desea eliminar al proveedor "${prov.nombre}"?`;

    
    const confirmarBtn = document.getElementById('confirmarAccionBtn');
    confirmarBtn.onclick = () => {
        const index = proveedores.findIndex(p => p.id === id);
        if (index !== -1) {
            proveedores.splice(index, 1);
            cargarProveedores();
            alert('Proveedor eliminado correctamente');
        }

        
        bootstrap.Modal.getInstance(document.getElementById('confirmacionModal')).hide();
    };

    const modal = new bootstrap.Modal(document.getElementById('confirmacionModal'));
    modal.show();
  }
  
  // carga proveedores al inicio
  document.addEventListener('DOMContentLoaded', () => {
    cargarProveedores();
  });

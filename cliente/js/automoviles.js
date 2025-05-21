// Función para cargar la lista de proveedores en los formularios
function cargarProveedoresEnFormularios() {
    const selectAgregar = document.getElementById('proveedor');
    const selectEditar = document.getElementById('editProveedor');
    
    // Limpiar opciones existentes excepto la primera predeterminada en agregar
    selectAgregar.innerHTML = '<option value="" selected disabled>Seleccione un proveedor</option>';
    selectEditar.innerHTML = '';
    
    // Agregar cada proveedor como una opción
    proveedores.forEach(proveedor => {
        // Para el formulario de agregar
        const optionAgregar = document.createElement('option');
        optionAgregar.value = proveedor.id;
        optionAgregar.textContent = proveedor.nombre;
        selectAgregar.appendChild(optionAgregar);
        
        // Para el formulario de editar
        const optionEditar = document.createElement('option');
        optionEditar.value = proveedor.id;
        optionEditar.textContent = proveedor.nombre;
        selectEditar.appendChild(optionEditar);
    });
}

// Función para guardar un nuevo automóvil
function guardarNuevoAutomovil() {
    // Obtener valores del formulario
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const color = document.getElementById('color').value;
    const placa = document.getElementById('placa').value;
    const proveedorId = parseInt(document.getElementById('proveedor').value);
    
    // Validación básica
    if (!marca || !modelo || !color || !placa || isNaN(proveedorId)) {
        alert('Por favor, complete todos los campos');
        return;
    }
    
    // Buscar el proveedor seleccionado
    const proveedor = proveedores.find(p => p.id === proveedorId);
    if (!proveedor) {
        alert('Proveedor no encontrado');
        return;
    }
    
    // Crear nuevo ID (en un backend real, esto lo haría el servidor)
    const nuevoId = automoviles.length > 0 
        ? Math.max(...automoviles.map(a => a.id)) + 1 
        : 1;
    
    // Crear nuevo objeto automóvil
    const nuevoAuto = {
        id: nuevoId,
        marca,
        modelo,
        color,
        placa,
        proveedor
    };
    
    // Agregar a la lista de automóviles
    automoviles.push(nuevoAuto);
    
    // Recargar la vista de automóviles
    cargarAutomoviles();
    
    // Cerrar el modal y limpiar el formulario
    document.getElementById('agregarAutoForm').reset();
    document.getElementById('agregarAutoModal').querySelector('.btn-close').click();
    
    // Notificar al usuario
    alert('Automóvil guardado correctamente');
}

// Función para actualizar un automóvil existente
function actualizarAutomovil() {
    // Obtener el ID del automóvil a actualizar
    const autoId = parseInt(document.getElementById('editarAutoForm').dataset.autoId);
    if (isNaN(autoId)) {
        alert('Error: No se ha seleccionado un automóvil');
        return;
    }
    
    // Obtener valores del formulario
    const marca = document.getElementById('editMarca').value;
    const modelo = document.getElementById('editModelo').value;
    const color = document.getElementById('editColor').value;
    const placa = document.getElementById('editPlaca').value;
    const proveedorId = parseInt(document.getElementById('editProveedor').value);
    
    // Validación básica
    if (!marca || !modelo || !color || !placa || isNaN(proveedorId)) {
        alert('Por favor, complete todos los campos');
        return;
    }
    
    // Buscar el proveedor seleccionado
    const proveedor = proveedores.find(p => p.id === proveedorId);
    if (!proveedor) {
        alert('Proveedor no encontrado');
        return;
    }
    
    // Buscar el automóvil a actualizar
    const autoIndex = automoviles.findIndex(a => a.id === autoId);
    if (autoIndex === -1) {
        alert('Automóvil no encontrado');
        return;
    }
    
    // Actualizar el objeto automóvil
    automoviles[autoIndex] = {
        ...automoviles[autoIndex],
        marca,
        modelo,
        color,
        placa,
        proveedor
    };
    
    // Recargar la vista de automóviles
    cargarAutomoviles();
    
    // Cerrar el modal
    document.getElementById('editarAutoModal').querySelector('.btn-close').click();
    
    // Notificar al usuario
    alert('Automóvil actualizado correctamente');
}

// Función para eliminar un automóvil
function eliminarAutomovil() {
    // Obtener el ID del automóvil a eliminar
    const autoId = parseInt(document.getElementById('eliminarAutoModal').dataset.autoId);
    if (isNaN(autoId)) {
        alert('Error: No se ha seleccionado un automóvil');
        return;
    }
    
    // Buscar el índice del automóvil
    const autoIndex = automoviles.findIndex(a => a.id === autoId);
    if (autoIndex === -1) {
        alert('Automóvil no encontrado');
        return;
    }
    
    // Eliminar el automóvil
    automoviles.splice(autoIndex, 1);
    
    // Recargar la vista de automóviles
    cargarAutomoviles();
    
    // Cerrar el modal
    document.getElementById('eliminarAutoModal').querySelector('.btn-close').click();
    
    // Notificar al usuario
    alert('Automóvil eliminado correctamente');
}// Función para cargar datos en el modal de edición
function cargarDatosParaEditar(autoId) {
    // Buscar el automóvil por ID
    const auto = automoviles.find(a => a.id === autoId);
    if (!auto) return;
    
    // Cargar los datos en el formulario de edición
    document.getElementById('editMarca').value = auto.marca;
    document.getElementById('editModelo').value = auto.modelo;
    document.getElementById('editColor').value = auto.color;
    document.getElementById('editPlaca').value = auto.placa;
    document.getElementById('editProveedor').value = auto.proveedor.id;
    
    // Guardar el ID del auto actual para la actualización
    document.getElementById('editarAutoForm').dataset.autoId = autoId;
}

// Función para cargar datos en el modal de eliminación
function cargarDatosParaEliminar(autoId) {
    // Buscar el automóvil por ID
    const auto = automoviles.find(a => a.id === autoId);
    if (!auto) return;
    
    // Mostrar información del auto a eliminar
    document.getElementById('deleteModelText').textContent = `${auto.marca} ${auto.modelo}`;
    document.getElementById('deletePlacaText').textContent = auto.placa;
    
    // Guardar el ID del auto actual para la eliminación
    document.getElementById('eliminarAutoModal').dataset.autoId = autoId;
}

// Función para cargar detalles del automóvil en el modal
function cargarDetallesAuto(autoId) {
    // Buscar el automóvil por ID
    const auto = automoviles.find(a => a.id === autoId);
    if (!auto) return;
    
    // Llenar los campos del modal con los detalles del auto
    document.getElementById('detalleMarca').textContent = auto.marca;
    document.getElementById('detalleModelo').textContent = auto.modelo;
    document.getElementById('detalleColor').textContent = auto.color;
    document.getElementById('detallePlaca').textContent = auto.placa;
    
    document.getElementById('detalleProveedorNombre').textContent = auto.proveedor.nombre;
    document.getElementById('detalleProveedorDireccion').textContent = auto.proveedor.direccion;
    document.getElementById('detalleProveedorTelefono').textContent = auto.proveedor.telefono;
    document.getElementById('detalleProveedorEmail').textContent = auto.proveedor.email;
}// Datos de ejemplo
const automoviles = [
    {
        id: 1,
        marca: 'Toyota',
        modelo: 'Corolla',
        color: 'Blanco',
        placa: 'ABC-123',
        proveedor: {
            id: 1,
            nombre: 'AutoMax',
            direccion: 'Av. Principal #123',
            telefono: '(123) 456-7890',
            email: 'contacto@automax.com'
        }
    },
    {
        id: 2,
        marca: 'Honda',
        modelo: 'Civic',
        color: 'Azul',
        placa: 'XYZ-789',
        proveedor: {
            id: 2,
            nombre: 'CarWorld',
            direccion: 'Calle Central #456',
            telefono: '(123) 555-8901',
            email: 'info@carworld.com' 
        }
    },
    {
        id: 3,
        marca: 'Nissan',
        modelo: 'Sentra',
        color: 'Negro',
        placa: 'DEF-456',
        proveedor: {
            id: 3,
            nombre: 'NissanPro',
            direccion: 'Blvd. Norte #789',
            telefono: '(123) 456-2345',
            email: 'ventas@nissanpro.com'
        }
    }
];

// Lista de proveedores
const proveedores = [
    { id: 1, nombre: 'AutoMax', direccion: 'Av. Principal #123', telefono: '(123) 456-7890', email: 'contacto@automax.com' },
    { id: 2, nombre: 'CarWorld', direccion: 'Calle Central #456', telefono: '(123) 555-8901', email: 'info@carworld.com' },
    { id: 3, nombre: 'NissanPro', direccion: 'Blvd. Norte #789', telefono: '(123) 456-2345', email: 'ventas@nissanpro.com' },
    { id: 4, nombre: 'Toyota Oficial', direccion: 'Avenida Sur #321', telefono: '(123) 777-9090', email: 'ventas@toyotaoficial.com' },
    { id: 5, nombre: 'Honda Motors', direccion: 'Plaza Automotriz #567', telefono: '(123) 888-1234', email: 'servicio@hondamotors.com' }
];

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar los eventos después de que el DOM esté cargado
    inicializarEventos();
    // Cargar automóviles desde los datos de ejemplo
    cargarAutomoviles();
    // Cargar la lista de proveedores en los formularios
    cargarProveedoresEnFormularios();
    fetch("./navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        })
        .catch(error => console.error("Error al cargar el navbar:", error));

});

// Función para inicializar todos los eventos
function inicializarEventos() {
    // Evento para el botón de guardar nuevo automóvil
    document.getElementById('guardarAutoBtn').addEventListener('click', function() {
        guardarNuevoAutomovil();
    });

    // Evento para el botón de actualizar automóvil
    document.getElementById('actualizarAutoBtn').addEventListener('click', function() {
        actualizarAutomovil();
    });

    // Evento para el botón de eliminar automóvil
    document.getElementById('confirmarEliminarBtn').addEventListener('click', function() {
        eliminarAutomovil();
    });

    // Búsqueda de automóviles por marca
    document.getElementById('searchInput').addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        console.log('Buscando marca:', searchText);
        
        // Filtrar automóviles por marca
        const autosFiltrados = automoviles.filter(auto => 
            auto.marca.toLowerCase().includes(searchText)
        );
        
        // Actualizar la visualización de automóviles
        actualizarVistaAutomoviles(autosFiltrados);
    });
}

// Función para cargar automóviles en la página
function cargarAutomoviles() {
    // Limpiar el contenedor de automóviles
    const contenedor = document.getElementById('contenedorAutos');
    contenedor.innerHTML = '';
    
    // Cargar cada automóvil en el contenedor
    automoviles.forEach(auto => {
        contenedor.appendChild(crearTarjetaAuto(auto));
    });
    
    console.log('Automóviles cargados:', automoviles.length);
}

// Función para actualizar la vista de automóviles según el filtro
function actualizarVistaAutomoviles(autos) {
    // Limpiar el contenedor de automóviles
    const contenedor = document.getElementById('contenedorAutos');
    contenedor.innerHTML = '';
    
    // Si no hay resultados, mostrar mensaje
    if (autos.length === 0) {
        const noResultados = document.createElement('div');
        noResultados.className = 'col-12 text-center my-5';
        noResultados.innerHTML = '<h4>No se encontraron automóviles con esa marca</h4>';
        contenedor.appendChild(noResultados);
        return;
    }
    
    // Cargar cada automóvil filtrado en el contenedor
    autos.forEach(auto => {
        contenedor.appendChild(crearTarjetaAuto(auto));
    });
}

// Función para crear una tarjeta de automóvil
function crearTarjetaAuto(auto) {
    const columna = document.createElement('div');
    columna.className = 'col';
    
    columna.innerHTML = `
        <div class="card h-100 border-0 shadow-sm">
            <div class="card-header bg-terrary">
                <h5 class="card-title mb-0">${auto.marca} ${auto.modelo}</h5>
            </div>
            <div class="card-body">
                <ul class="list-group list-group-flush mb-3">
                    <li class="list-group-item d-flex justify-content-between">
                        <strong>Placa:</strong> <span>${auto.placa}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between">
                        <strong>Proveedor:</strong> <span>${auto.proveedor.nombre}</span>
                    </li>
                </ul>
                <div class="d-flex justify-content-between">
                    <button class="btn btn-outline-warning btn-circle" title="Editar" data-bs-toggle="modal" data-bs-target="#editarAutoModal" 
                        onclick="cargarDatosParaEditar(${auto.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-circle" title="Eliminar" data-bs-toggle="modal" data-bs-target="#eliminarAutoModal"
                        onclick="cargarDatosParaEliminar(${auto.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                    <button class="btn btn-outline-info" title="Ver detalles" data-bs-toggle="modal" data-bs-target="#detallesAutoModal"
                        onclick="cargarDetallesAuto(${auto.id})">
                        <i class="fas fa-eye me-1"></i> Ver detalles
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return columna;
}
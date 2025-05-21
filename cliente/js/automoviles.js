const BASEURL = 'http://localhost:8080/api/automoviles/';
const BASEURL_PROVEEDORES = 'http://localhost:8080/api/proveedor/';

async function cargarProveedoresEnFormularios() {
    const selectAgregar = document.getElementById('proveedor');
    const selectEditar = document.getElementById('editProveedor');

    selectAgregar.innerHTML = '<option value="" selected disabled>Seleccione un proveedor</option>';
    selectEditar.innerHTML = '<option value="" selected disabled>Seleccione un proveedor</option>';

    try {
        const response = await fetch(`${BASEURL_PROVEEDORES}`);
        const proveedores = await response.json();
        console.log(proveedores);

        proveedores.forEach(proveedor => {
            const optionAgregar = document.createElement('option');
            optionAgregar.value = proveedor.id;
            optionAgregar.textContent = proveedor.nombre;
            selectAgregar.appendChild(optionAgregar);

            const optionEditar = document.createElement('option');
            optionEditar.value = proveedor.id;
            optionEditar.textContent = proveedor.nombre;
            selectEditar.appendChild(optionEditar);
        });
    } catch (error) {
        console.error('Error al cargar proveedores:', error);
    }
}

async function guardarNuevoAutomovil() {
    const marca = document.getElementById('marca').value;
    const modelo = document.getElementById('modelo').value;
    const color = document.getElementById('color').value;
    const numPlacas = document.getElementById('placa').value;
    const proveedorId = parseInt(document.getElementById('proveedor').value);

    if (!marca || !modelo || !color || !numPlacas || isNaN(proveedorId)) {
        alert('Por favor, complete todos los campos');
        return;
    }

    const proveedor = proveedores.find(p => p.id === proveedorId);
    if (!proveedor) {
        alert('Proveedor no encontrado');
        return;
    }

    const nuevoAuto = {
        marca,
        modelo,
        color,
        numPlacas,
        proveedor
    };

    try {
        const response = await fetch(BASEURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuevoAuto)
        });

        if (!response.ok) {
            throw new Error('Error al guardar el automóvil');
        }

        await cargarAutomoviles();

        document.getElementById('agregarAutoForm').reset();
        document.getElementById('agregarAutoModal').querySelector('.btn-close').click();

        alert('Automóvil guardado correctamente');
    } catch (error) {
        console.error('Error al guardar el automóvil:', error);
        alert('Ocurrió un error al guardar el automóvil. Inténtalo de nuevo.');
    }
}


async function actualizarAutomovil() {
    const autoId = parseInt(document.getElementById('editarAutoForm').dataset.autoId);
    if (isNaN(autoId)) {
        alert('Error: No se ha seleccionado un automóvil');
        return;
    }

    const marca = document.getElementById('editMarca').value;
    const modelo = document.getElementById('editModelo').value;
    const color = document.getElementById('editColor').value;
    const numPlacas = document.getElementById('editPlaca').value;
    const proveedorId = parseInt(document.getElementById('editProveedor').value);

    if (!marca || !modelo || !color || !numPlacas || isNaN(proveedorId)) {
        alert('Por favor, complete todos los campos');
        return;
    }

    const proveedor = proveedores.find(p => p.id === proveedorId);
    if (!proveedor) {
        alert('Proveedor no encontrado');
        return;
    }

    const autoActualizado = {
        id: autoId,
        marca,
        modelo,
        color,
        numPlacas,
        proveedor
    };

    try {
        const response = await fetch(`${BASEURL}${autoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(autoActualizado)
        });

        if (!response.ok) {
            throw new Error('No se pudo actualizar el automóvil');
        }

        await cargarAutomoviles();

        document.getElementById('editarAutoModal').querySelector('.btn-close').click();

        alert('Automóvil actualizado correctamente');

    } catch (error) {
        console.error('Error al actualizar automóvil:', error);
        alert('Error al actualizar el automóvil');
    }
}

async function eliminarAutomovil() {
    const autoId = parseInt(document.getElementById('eliminarAutoModal').dataset.autoId);
    if (isNaN(autoId)) {
        alert('Error: No se ha seleccionado un automóvil');
        return;
    }

    try {
        const response = await fetch(`${BASEURL}${autoId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el automóvil');
        }

        await cargarAutomoviles();

        document.getElementById('eliminarAutoModal').querySelector('.btn-close').click();

        alert('Automóvil eliminado correctamente');

    } catch (error) {
        console.error('Error al eliminar el automóvil:', error);
        alert('Hubo un error al intentar eliminar el automóvil.');
    }
}


async function cargarDatosParaEditar(autoId) {
    try {
        const response = await fetch(`${BASEURL}${autoId}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener el automóvil');
        }

        const auto = await response.json();

        document.getElementById('editMarca').value = auto.marca;
        document.getElementById('editModelo').value = auto.modelo;
        document.getElementById('editColor').value = auto.color;
        document.getElementById('editPlaca').value = auto.numPlacas;

        if (auto.proveedor && auto.proveedor.id) {
            document.getElementById('editProveedor').value = auto.proveedor.id;
        }

        document.getElementById('editarAutoForm').dataset.autoId = autoId;

    } catch (error) {
        console.error('Error al cargar datos del automóvil:', error);
        alert('Error al cargar los datos del automóvil para editar');
    }
}


async function cargarDatosParaEliminar(autoId) {
    try {
        const response = await fetch(`${BASEURL}${autoId}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener la información del auto');
        }

        const auto = await response.json();

        document.getElementById('deleteModelText').textContent = `${auto.marca} ${auto.modelo}`;
        document.getElementById('deletePlacaText').textContent = auto.numPlacas;

        document.getElementById('eliminarAutoModal').dataset.autoId = autoId;

    } catch (error) {
        console.error('Error al cargar los datos del automóvil:', error);
    }
}

async function cargarDetallesAuto(autoId) {
    try {
        const response = await fetch(`${BASEURL}${autoId}`);


        if (!response.ok) {
            throw new Error('Error al obtener detalles del automóvil');
        }

        const auto = await response.json();
        console.log('Detalles del auto:', auto);
        document.getElementById('detalleMarca').textContent = auto.marca;
        document.getElementById('detalleModelo').textContent = auto.modelo;
        document.getElementById('detalleColor').textContent = auto.color;
        document.getElementById('detallePlaca').textContent = auto.numPlacas;

        if (auto.proveedor) {
            document.getElementById('detalleProveedorNombre').textContent = auto.proveedor.nombre || '';
            document.getElementById('detalleProveedorDireccion').textContent = auto.proveedor.apellidos || '';
            document.getElementById('detalleProveedorTelefono').textContent = auto.proveedor.telefono || '';
            document.getElementById('detalleProveedorEmail').textContent = auto.proveedor.correo || '';
        } else {
            console.warn("El auto no tiene proveedor asignado.");
        }

    } catch (error) {
        console.error('Error al cargar los detalles del auto:', error);
    }
}



document.addEventListener('DOMContentLoaded', function () {
    inicializarEventos();
    cargarAutomoviles();
    cargarProveedoresEnFormularios();
    fetch("./navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        })
        .catch(error => console.error("Error al cargar el navbar:", error));

});

function inicializarEventos() {
    document.getElementById('guardarAutoBtn').addEventListener('click', function () {
        guardarNuevoAutomovil();
    });

    document.getElementById('actualizarAutoBtn').addEventListener('click', function () {
        actualizarAutomovil();
    });

    document.getElementById('confirmarEliminarBtn').addEventListener('click', function () {
        eliminarAutomovil();
    });

    document.getElementById('searchInput').addEventListener('input', function () {
        const searchText = this.value.toLowerCase();
        console.log('Buscando marca:', searchText);

        const autosFiltrados = automoviles.filter(auto =>
            auto.marca.toLowerCase().includes(searchText)
        );

        actualizarVistaAutomoviles(autosFiltrados);
    });
}

async function cargarAutomoviles() {
    const contenedor = document.getElementById('contenedorAutos');
    contenedor.innerHTML = '';

    try {
        const response = await fetch(`${BASEURL}`); 
        const automoviles = await response.json();
        console.log('Automóviles cargados:', automoviles);
        automoviles.forEach(auto => {
            contenedor.appendChild(crearTarjetaAuto(auto));
        });

        console.log('Automóviles cargados:', automoviles.length);
    } catch (error) {
        console.error('Error al cargar automóviles:', error);
        contenedor.innerHTML = '<p>Error al cargar los automóviles. Intenta de nuevo más tarde.</p>';
    }
}


function actualizarVistaAutomoviles(autos) {
    const contenedor = document.getElementById('contenedorAutos');
    contenedor.innerHTML = '';

    if (autos.length === 0) {
        const noResultados = document.createElement('div');
        noResultados.className = 'col-12 text-center my-5';
        noResultados.innerHTML = '<h4>No se encontraron automóviles con esa marca</h4>';
        contenedor.appendChild(noResultados);
        return;
    }

    autos.forEach(auto => {
        contenedor.appendChild(crearTarjetaAuto(auto));
    });
}

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
                        <strong>Placa:</strong> <span>${auto.numPlacas}</span>
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
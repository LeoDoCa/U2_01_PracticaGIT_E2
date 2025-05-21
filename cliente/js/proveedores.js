const BASEURL_PROVEEDORES = 'http://localhost:8080/api/proveedor/';
const formulario = document.getElementById("proveedores");
const lista = document.getElementById("lista-proveedores");

// Obtener lista de proveedores
const getProveedores = async () => {
  try {
    const res = await fetch(BASEURL_PROVEEDORES);
    if (!res.ok) throw new Error('Error al obtener proveedores');
    const proveedores = await res.json();
    renderProveedores(proveedores);
  } catch (error) {
    console.error('Error:', error);
    Swal.fire('Error', error.message, 'error');
  }
};

// Renderizar lista
const renderProveedores = (proveedores) => {
  lista.innerHTML = '';
  proveedores.forEach(p => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p><strong>${p.nombres} ${p.apellidos}</strong> - ${p.correo} - ${p.telefono}</p>
      <button onclick="editarProveedor(${p.id})">Editar</button>
      <button onclick="eliminarProveedor(${p.id})">Eliminar</button>
      <hr />
    `;
    lista.appendChild(div);
  });
};

// Enviar formulario (crear o editar)
formulario.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(formulario);
  const id = formData.get("id");
  const method = id ? "PUT" : "POST";
  const url = id ? `${BASEURL_PROVEEDORES}/${id}` : BASEURL_PROVEEDORES;

  const data = {
    nombre: formData.get("nombre"),
    apellidos: formData.get("apellidos"),
    correo: formData.get("correo"),
    telefono: formData.get("telefono")
  };

  try {
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Error al guardar proveedor");

    await getProveedores();
    formulario.reset();
    formulario.id.value = "";

    Swal.fire({
      icon: 'success',
      title: id ? 'Proveedor actualizado' : 'Proveedor creado',
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.error("Error:", error);
    Swal.fire('Error', error.message, 'error');
  }
});

// Editar proveedor
window.editarProveedor = async (id) => {
  try {
    const res = await fetch(`${BASEURL_PROVEEDORES}/${id}`);
    if (!res.ok) throw new Error("No se pudo obtener el proveedor");
    const proveedor = await res.json();

    formulario.id.value = proveedor.id;
    formulario.nombres.value = proveedor.nombres;
    formulario.apellidos.value = proveedor.apellidos;
    formulario.correo.value = proveedor.correo;
    formulario.telefono.value = proveedor.telefono;
  } catch (error) {
    console.error("Error al editar:", error);
    Swal.fire('Error', error.message, 'error');
  }
};

// Eliminar proveedor
window.eliminarProveedor = async (id) => {
  const confirm = await Swal.fire({
    title: '¿Eliminar proveedor?',
    text: 'Esta acción no se puede deshacer',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  });

  if (!confirm.isConfirmed) return;

  try {
    const res = await fetch(`${BASEURL_PROVEEDORES}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("No se pudo eliminar proveedor");

    await getProveedores();

    Swal.fire({
      icon: 'success',
      title: 'Proveedor eliminado',
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.error("Error al eliminar:", error);
    Swal.fire('Error', error.message, 'error');
  }
};

// Inicial
getProveedores();

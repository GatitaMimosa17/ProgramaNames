const tableData = document.getElementById('dataAddTable');
const formContent = document.getElementById('ContenedorForm');
const tbody = tableData.querySelector('tbody');
const form = document.getElementById('addDataForm');
const filterDiv = document.getElementById('content-2');
const addBtn = document.getElementById('add');
const btnShow = document.getElementById('showAdd')
const datos = [];

window.onload = fetch('data.json')
.then(response => response.json())
.then(data => {

    for (const obj of data.users) {
        datos.push(obj);
        const tr = document.createElement('tr');
        tr.innerHTML = `
    <td>${obj.nombre}</td>
    <td>${obj.apellido}</td>
    <td>${obj.edad}</td>
    <td>${obj.email}</td>
  `;
        tbody.appendChild(tr);
    }


});

    

// Función para agregar nuevos datos al archivo JSON
function addData(newData) {

    // Agregar los nuevos datos a la variable que contiene el archivo JSON
    datos.push(newData);


    tbody.innerHTML = '';
    for (const obj of datos) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
                <td>${obj.nombre}</td>
                <td>${obj.apellido}</td>
                <td>${obj.edad}</td>
                <td>${obj.email}</td>
              `;
        tbody.appendChild(tr);
    }

}


// Esconder Lista de Datos
btnShow.addEventListener('click', (event) => {
    event.preventDefault();
    tableData.setAttribute('hidden', true);
    filterDiv.setAttribute('hidden', true);
    formContent.removeAttribute('hidden')
});


// Agregar un evento de clic al botón "Agregar" del formulario
addBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const id = Math.random();
    const nombre = form.querySelector('input[name="Nombre"]').value;
    const apellido = form.querySelector('input[name="Apellido"]').value;
    const edad = form.querySelector('input[name="Edad"]').value;
    const email = form.querySelector('input[name="Email"]').value;
    const newData = {
        id: id,
        nombre: nombre,
        apellido: apellido,
        edad: edad,
        email: email
    };
    console.log(newData)
    addData(newData);
    form.reset();
    tableData.removeAttribute('hidden');
    formContent.setAttribute('hidden', '')
});


function searchData(dataS) {
    const filteredData = datos.filter((users) => {
        return (
            users.nombre.toLowerCase().includes(dataS.toLowerCase()) ||
            users.apellido.toLowerCase().includes(dataS.toLowerCase()) ||
            users.email.toLowerCase().includes(dataS.toLowerCase())
        )
    })

    tbody.innerHTML = ''; // Limpiamos la tabla

    filteredData.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
              <td>${user.nombre}</td>
              <td>${user.apellido}</td>
              <td>${user.edad}</td>
              <td>${user.email}</td>
            `;
        tbody.appendChild(tr);
    });
}

function filterData(type){
    let filterData;

    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    if(type === "M"){
        filterData = datos.filter((users) => {
            return users.edad;
        }).sort((a,b) => {
            return b.edad - a.edad;
        })
    }
    else if(type === "m"){
        filterData = datos.filter((users) => {
            return users.edad;
        }).sort((a,b) => {
            return a.edad - b.edad;
        })
    }
    else{
        filterData = datos; 
    }

    filterData.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
              <td>${user.nombre}</td>
              <td>${user.apellido}</td>
              <td>${user.edad}</td>
              <td>${user.email}</td>
            `;
        tbody.appendChild(tr);
    });

    return;
}

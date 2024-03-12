document.addEventListener("DOMContentLoaded", () => {
    const formularioJS = document.querySelector(".myForm");
    const inputTituloJS = document.querySelector(".myInputTitulo");
    const inputPublicacionJS = document.querySelector("#myTextareaPublicacionID");
    
    formularioJS.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputTitulo = inputTituloJS.value;
        const inputPublicacion = inputPublicacionJS.value;
        const publicacionUnionTyC = { title: inputTitulo, post: inputPublicacion };

        if (inputTitulo && inputPublicacion) {
            fetch("http://localhost:3002/", {
                method: "POST",
                body: JSON.stringify(publicacionUnionTyC),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                alert("Publicación creada correctamente");

                // Redirigir al usuario a index.html después de crear la publicación
                window.location.href = "/frontend/index.html";
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            alert("Debe llenar todos los datos");
        }
    });



    const renderPublicacion = () => {
        divRegistroPadreJS.innerHTML = "";
        divRegistroHijoJS.innerHTML = "";
    
        fetch('http://localhost:3002/', {
            method: "GET"
        })
        .then(response => response.json())
        .then(json => {
            console.log(json);
            json.data.forEach((key) => {
                const { _id: id, title, post } = key;
    
                // Verificar si estás en index.html antes de agregar las publicaciones al DOM
                if (window.location.pathname === '/Reto/index.html') {
                    const btnEditar = document.createElement("button");
                    const btnEliminar = document.createElement("button");
                    const contenedorBtns = document.createElement("div");
                    const articuloTitulo = document.createElement("div");
                    const articuloPublicacion = document.createElement("div");
                    const contenedorPublicacion = document.createElement("div");
    
                    contenedorBtns.className = "myContenedorBtns";
                    articuloTitulo.className = "myContenedorRegistroTitulo";
                    btnEditar.className = "myBtnEditar";
                    btnEliminar.className = "myBtnEliminar";
                    articuloPublicacion.className = "myContenedorRegistroPublicacion";
                    contenedorPublicacion.className = "myContenedorDePost";
    
                    articuloTitulo.textContent = title;
                    articuloPublicacion.textContent = post;
                    btnEliminar.textContent = "Eliminar";
                    btnEditar.textContent = "Editar";
    
                    btnEditar.addEventListener("submit", () => {
                        btnEditarDatos(id, title, post);
                    });
    
                    btnEliminar.addEventListener("click", () => {
                        btnEliminarDatos(id);
                    });
    
                    divRegistroPadreJS.prepend(contenedorPublicacion);
                    contenedorPublicacion.appendChild(articuloTitulo);
                    contenedorPublicacion.appendChild(articuloPublicacion);
                    contenedorPublicacion.appendChild(contenedorBtns);
                    contenedorBtns.appendChild(btnEditar);
                    contenedorBtns.appendChild(btnEliminar);
                }
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };
    

    
//Put
btnEditarDatos = (id, titulo, post) => {
    window.location.href = "/frontend/post.html";
    fetch(`http://localhost:3002/${id}`, {
        method: "PUT"
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Alerta de publicación actualizada correctamente
        alert("Publicación actualizada correctamente");
        // Construir la URL con los parámetros de la publicación
        const url = `./frontend/post.html?id=${id}&titulo=${encodeURIComponent(titulo)}&post=${encodeURIComponent(post)}`;
        // Redireccionar a la página de post.html con los datos de la publicación
       
    })
    .catch(err => console.log(err));
};




//Delete
btnEliminarDatos = (id) => {
    fetch(`http://localhost:3002/${id}`, {
            method: "Delete"
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    renderPublicacion();
}

    renderPublicacion();
});
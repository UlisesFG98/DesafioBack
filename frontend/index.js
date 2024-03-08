document.addEventListener("DOMContentLoaded", () => {
    const formularioJS = document.querySelector(".myForm");
    const divRegistroPadreJS = document.querySelector(".myPublicacionesRegistro");
    const divRegistroHijoJS = document.querySelector(".myPublicacionesRegistroChicas");
    const inputTituloJS = document.querySelector(".myInputTitulo");
    const inputPublicacionJS = document.querySelector("#myTextareaPublicacionID");
    
    formularioJS.addEventListener ("submit", (e) => {
        e.preventDefault();
        let inputTituloJS = document.querySelector(".myInputTitulo").value;
        let inputPublicacionJS = document.querySelector("#myTextareaPublicacionID").value;
        let publicacionUnionTyC = {title : inputTituloJS, post : inputPublicacionJS};

        if(inputTituloJS && inputPublicacionJS) {
            fetch("http://localhost:3001/", {
                method: "Post",
                body: JSON.stringify(publicacionUnionTyC),
                headers: {
                "Content-type": "application/json; charset=UTF-8",
                }
            })
                .then((response) => response.json())
                .then((json) => console.log(json));
            renderPublicacion();
            formularioJS.reset();
        } else {
            alert("Debe llenar todos los datos")
        }
    })

    renderPublicacion = () => {
        divRegistroPadreJS.innerHTML = "";
        divRegistroHijoJS.innerHTML = "";
        
        fetch('http://localhost:3001/', {
                method: "Get"
            })
            .then(response => response.json())
            .then(json => json.data)
            .then(data=>{console.log(data);
            
            data.forEach((key, valor) => {
                let id = key._id;
                let titulo = key.title
                let post = key.post

                const btnEditar = document.createElement("button");
                const btnEliminar = document.createElement("button");
                const contenedorBtns = document.createElement("div");
                const articuloTitulo = document.createElement("div");
                const articuloPublicacion = document.createElement("div");
                const contenedorPublicacion = document.createElement("div");

                contenedorBtns.className = "myContenedorBtns";
                articuloTitulo.className ="myContenedorRegistroTitulo";
                btnEditar.className ="myBtnEditar";
                btnEliminar.className ="myBtnEliminar";
                articuloPublicacion.className ="myContenedorRegistroPublicacion";
                contenedorPublicacion.className = "myContenedorDePost";

                articuloTitulo.textContent = titulo;
                articuloPublicacion.textContent = post;
                btnEliminar.textContent = "Eliminar";
                btnEditar.textContent = "Editar";

                btnEditar.addEventListener("click", () => {
                    btnEditarDatos(id, titulo, post);
                })
        
                btnEliminar.addEventListener("click", () => {
                    btnEliminarDatos(id);
                })

                divRegistroPadreJS.prepend(contenedorPublicacion);
                contenedorPublicacion.appendChild(articuloTitulo);
                contenedorPublicacion.appendChild(articuloPublicacion);
                contenedorPublicacion.appendChild(contenedorBtns);
                contenedorBtns.appendChild(btnEditar);
                contenedorBtns.appendChild(btnEliminar);
            })
        })
    }


//Put
    btnEditarDatos = (id, titulo, post) => {
        fetch(`http://localhost:3001/${id}`, {
                method: "Put"
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        inputTituloJS.value = titulo;
        inputPublicacionJS.value = post;
        renderPublicacion();
    } 


//Delete
    btnEliminarDatos = (id) => {
        fetch(`http://localhost:3001/${id}`, {
                method: "Delete"
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
        renderPublicacion();
    }

/*
// SEARCH EMPIEZA

    inputBusqueda.addEventListener("input", function() {
        const valorBusqueda = inputBusqueda.value.toLowerCase();

        const publicacionesFiltradas = baseDatosLocal.filter(publicacion => {
            return publicacion.valorTitulo.toLowerCase().includes(valorBusqueda) 
        });

        divRegistroPadreJS.innerHTML = "";
        publicacionesFiltradas.forEach((publicacion) => {

            const contenedorPublicacion = document.createElement("div");
            contenedorPublicacion.className = "myContenedorDePost";
            const articuloTitulo = document.createElement("div");
            articuloTitulo.className ="myContenedorRegistroTitulo";
            articuloTitulo.textContent = publicacion.valorTitulo;
            contenedorPublicacion.appendChild(articuloTitulo);
            divRegistroPadreJS.appendChild(contenedorPublicacion);

            const btnEditar = document.createElement("button");
            const btnEliminar = document.createElement("button");
            const contenedorBtns = document.createElement("div");
            contenedorBtns.className = "myContenedorBtns";
            btnEditar.className ="myBtnEditar";
            btnEliminar.className ="myBtnEliminar";
            btnEliminar.textContent = "Eliminar";
            btnEditar.textContent = "Editar";

         
            const articuloPublicacion = document.createElement("div");
            articuloPublicacion.className ="myContenedorRegistroPublicacion";
            articuloPublicacion.textContent = publicacion.valorPublicacion;
            contenedorPublicacion.appendChild(articuloPublicacion);
            divRegistroPadreJS.prepend(contenedorPublicacion);

            contenedorPublicacion.appendChild(contenedorBtns);
            contenedorBtns.appendChild(btnEditar);
            contenedorBtns.appendChild(btnEliminar);
           
        });

    });

// SEARCH FIN


// FILTRO EMPIEZA
    selectFiltrofecha.addEventListener("change", () => {
        const filtro = selectFiltroFecha.value;

        let publicacionesFiltradas = [];

        switch(filtro) {
            case 'semana':
                publicacionesFiltradas = baseDatosLocal.filter(publicacion => {
                    new Date(publicacion.fecha);
                    const hoy = new Date();
                    new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 7);
                    return publicacionesFiltradas = baseDatosLocal;
                });
            case 'semana':
                publicacionesFiltradas = baseDatosLocal.filter(publicacion => {
                    const fechaPublicacion = new Date(publicacion.fecha);
                    const hoy = new Date();
                    const unaSemanaAtras = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 7);
                    return fechaPublicacion = unaSemanaAtras;
                });
                break;
            case 'mes':
                publicacionesFiltradas = baseDatosLocal.filter(publicacion => {
                    const fechaPublicacion = new Date(publicacion.fecha);
                    const hoy = new Date();
                    const esteMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
                    return fechaPublicacion >= esteMes;
                });
                break;
            case 'ano':
                publicacionesFiltradas = baseDatosLocal.filter(publicacion => {
                    const fechaPublicacion = new Date(publicacion.fecha);
                    const hoy = new Date();
                    const esteAno = new Date(hoy.getFullYear(), 0, 1);
                    return fechaPublicacion >= esteAno;
                });
                break;
            default:
                publicacionesFiltradas = baseDatosLocal;
                break;
        }

        divRegistroPadreJS.innerHTML = "";
        publicacionesFiltradas.forEach(publicacion => {
            const contenedorPublicacion = document.createElement("div");
            contenedorPublicacion.className = "myContenedorDePost";
            const articuloTitulo = document.createElement("div");
            articuloTitulo.className ="myContenedorRegistroTitulo";
            articuloTitulo.textContent = publicacion.valorTitulo;
            contenedorPublicacion.appendChild(articuloTitulo);
            divRegistroPadreJS.appendChild(contenedorPublicacion);

            const btnEditar = document.createElement("button");
            const btnEliminar = document.createElement("button");
            const contenedorBtns = document.createElement("div");
            contenedorBtns.className = "myContenedorBtns";
            btnEditar.className ="myBtnEditar";
            btnEliminar.className ="myBtnEliminar";
            btnEliminar.textContent = "Eliminar";
            btnEditar.textContent = "Editar";

            const articuloPublicacion = document.createElement("div");
            articuloPublicacion.className ="myContenedorRegistroPublicacion";
            articuloPublicacion.textContent = publicacion.valorPublicacion;
            contenedorPublicacion.appendChild(articuloPublicacion);
            divRegistroPadreJS.prepend(contenedorPublicacion);

            contenedorPublicacion.appendChild(contenedorBtns);
            contenedorBtns.appendChild(btnEditar);
            contenedorBtns.appendChild(btnEliminar);
        });
    });
// FILTRO TERMINA
    renderPublicacion();
*/
renderPublicacion();
})


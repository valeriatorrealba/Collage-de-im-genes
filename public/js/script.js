function eliminarImagen(imgName) {
    if (confirm("¿Estás seguro de que quieres eliminar esta imagen?")) {
        fetch(`/deleteImg/${imgName}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                // Si la eliminación es exitosa, recargar la página
                location.reload();
            } else {
                // Si hay un error en la eliminación, mostrar un mensaje de error
                console.error('Error al eliminar la imagen');
            }
        })
        .catch(error => console.error('Error en la solicitud DELETE:', error));
    }
}
const socket = io()

const formAgregarProducto = document.getElementById('formulario')

formAgregarProducto.addEventListener('submit', e =>{
    e.preventDefault()
    const Producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    }
    
    socket.emit('newProduct', Producto)
    formAgregarProducto.reset()
    //formAgregarProducto.submit()
    //
})

const email = document.getElementById('mail')
email.addEventListener('change', e =>{
    e.preventDefault()
    document.getElementById('mensaje').disabled = false;
    document.getElementById('enviarMensaje').disabled = false;
})
email.addEventListener('emptied', e =>{
    e.preventDefault()
    document.getElementById('mensaje').disabled = true;
    document.getElementById('enviarMensaje').disabled = true;
    
})

const formularioMensaje = document.getElementById('formularioMensaje')
formularioMensaje.addEventListener('submit', e =>{
    e.preventDefault()
    let date = new Date()
    const Mensaje = {
        mail: document.getElementById('mail').value,
        mensaje: document.getElementById('mensaje').value,
        fecha: [date.toLocaleDateString(), date.toLocaleTimeString()]
    }
    if (Mensaje.mensaje.length > 0 && Mensaje.mail.length > 0){
        socket.emit('newMessage', Mensaje)
        document.getElementById('mensaje').value = ''
    }
})

socket.on('productos', async productos =>{
    const recursoRemoto = await fetch('../templates/productos.ejs')
    const textoPlantilla = await recursoRemoto.text()
    
    const functionTemplate = ejs.compile(textoPlantilla)
    
    const html = functionTemplate({productos})
    
    document.getElementById('productos').innerHTML = html
})

socket.on('mensajes', async mensajes =>{
    const recursoRemoto = await fetch('../templates/chat.ejs')
    const textoPlantilla = await recursoRemoto.text()
    
    const functionTemplate = ejs.compile(textoPlantilla)
    
    const html = functionTemplate({mensajes})
    document.getElementById('mensajes').innerHTML = html

})

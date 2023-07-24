import React from 'react'
import { useState } from "react";
import { Button, Input } from 'reactstrap';
import axios from "axios"

function CreateProduct() {
    const [nombre, setNombre] = useState('');
    const [id_tipo, setTipo] = useState(Number);
    const [cantidad, setCantidad] = useState(Number);
    const [fecha_vencimiento, setFecha] = useState('');
    const [imagen, setImagen] = useState('');
    const [id_farmaceuta, setFarmaceuta] = useState(Number);

    const handleSave = async () => {
        try {
                await axios.post(
                    // 'https://joseportillo.000webhostapp.com/saas/api/articulo.php'
                    'http://localhost/react/Saas/api/articulo.php'
                    , {
                    nombre,
                    id_tipo,
                    cantidad,
                    fecha_vencimiento,
                    imagen,
                    id_farmaceuta
                })
                .then(function(response){
                    console.log(response.data);
                })
                ;
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="row g-3">
            <div className="col-md-12">
                <label for="nombre" className="form-label">
                    Nombre del Producto:
                </label>
                <Input
                    type="text"
                    defaultValue={nombre}
                    onChange={e => setNombre(e.target.value)}
                    className="form-control"
                    id="nombre"
                    maxLength="45"
                    required
                />
            </div>
            <div className="col-md-6">
                <label for="tipo" className="form-label">
                    Tipo de Producto:
                </label>
                <Input
                    type="number"
                    defaultValue={id_tipo}
                    onChange={e => setTipo(e.target.value)}
                    className="form-control"
                    id="tipo"
                    pattern="^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$"
                    required
                />
            </div>
            <div className="col-md-6">
                <label for="cantidad" className="form-label">
                    Cantidad del Producto:
                </label>
                <Input
                    type="number"
                    defaultValue={cantidad}
                    onChange={e => setCantidad(e.target.value)}
                    className="form-control"
                    id="cantidad"
                    pattern="^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$"
                    required
                />
            </div>
            <div className="col-md-6">
                <label for="fechaVencimiento" className="form-label">
                    Fecha de Vencimiento del Producto:
                </label>
                <Input
                    type="text"
                    defaultValue={fecha_vencimiento}
                    onChange={e => setFecha(e.target.value)}
                    className="form-control"
                    id="fechaVencimiento"
                    maxLength="45"
                    required
                />
            </div>
            <div className="col-md-6">
                <label for="Imagen" className="form-label">
                    Imagen del Producto:
                </label>
                <Input
                    type="text"
                    defaultValue={imagen}
                    onChange={e => setImagen(e.target.value)}
                    className="form-control"
                    id="Imagen"
                    required
                />
            </div>
            <div className="col-md-6">
                <label for="farmaceuta" className="form-label">
                    Farmaceuta:
                </label>
                <Input
                    type="number"
                    defaultValue={id_farmaceuta}
                    onChange={e => setFarmaceuta(e.target.value)}
                    className="form-control"
                    id="farmaceuta"
                    pattern="^[0-9]*$"
                    required
                />
            </div>
            <div className="col-12">
                <Button
                    type="button"
                    onClick={handleSave}
                    color="primary"
                >
                    Guardar cambios
                </Button>

            </div>
        </div>
    )
}

export {CreateProduct}
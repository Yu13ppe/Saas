import axios from "axios"
import { useEffect, useState } from "react";
import QR from '../Assets/Images/QR-JP.png';
import {
    Button,
    Alert,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Col,
    Card,
    ButtonGroup,
    CardBody,
    CardSubtitle,
    CardTitle,
    FormGroup,
    UncontrolledPopover,
    PopoverHeader,
    PopoverBody
} from 'reactstrap';
import { Link } from "react-router-dom";
import { XYPlot, XAxis, YAxis, VerticalBarSeries } from 'react-vis';
import { NavBar } from "../Components/Navbar";

function InventarioG() {
    const [nombre, setNombre] = useState('');
    const [id_tipo, setTipo] = useState(Number);
    const [cantidad, setCantidad] = useState(Number);
    const [fecha_vencimiento, setFecha] = useState('');
    const [imagen, setImagen] = useState('');
    const [id_farmaceuta, setFarmaceuta] = useState(Number);

    const [tipos, setTipos] = useState([]);
    const [tipo, setNewType] = useState('');
    const [selectModal, setSelectModal] = useState([]);

    const [product, setProducts] = useState([]);

    const [doctor, setDoctor] = useState([]);
    const [nombre_doc, setNewDoc] = useState('');

    const [error, setError] = useState(false);

    const [conteo, setConteo] = useState([]);

    const [selected, setSelected] = useState(null);

    const [modalType, setModalType] = useState(false);
    const [modalDoc, setModalDoc] = useState(false);
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const toggle2 = () => { setModal2(!modal2) };
    const toggle = () => {
        setModal(!modal)
        if (modal === false) {
            setNombre('')
            setTipo()
            setCantidad()
            setFecha()
            setImagen('')
            setFarmaceuta()
        }
    };
    const toggle1 = () => { setModal1(!modal1) };
    const toggleType = () => { setModalType(!modalType) };
    const toggleDoc = () => { setModalDoc(!modalDoc) };

    const [searchQuery, setSearchQuery] = useState('');

    const filteredProduct = product.filter(product => {
        const fullName = `${product.nombre}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
    });

    const handleSearch = event => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        fetchData();
        fetchTypeData();
        fetchDoctorData();
        fetchCounterData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://lisandrohr.com/JosePortillo/articulo.php');
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTypeData = async () => {
        try {
            const response = await axios.get('https://lisandrohr.com/JosePortillo/tipo.php');
            setTipos(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchDoctorData = async () => {
        try {
            const response = await axios.get('https://lisandrohr.com/JosePortillo/farmaceuta.php');
            setDoctor(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchCounterData = async () => {
        try {
            const response = await axios.get('https://lisandrohr.com/JosePortillo/conteo.php');
            setConteo(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = product => {
        setSelected(product);
        toggle();

        setNombre(product.nombre);
        setTipo(product.id_tipo);
        setCantidad(product.cantidad);
        setFecha(product.fecha_vencimiento);
        setImagen(product.imagen);
        setFarmaceuta(product.id_farmaceuta);
    };

    const handleDelete = async id => {
        try {
            await axios.delete(`https://lisandrohr.com/JosePortillo/articulo.php`, {
                data: { id: id }
            })
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
            fetchData();
            toggle1();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSave = async () => {
        try {
            if (selected) {
                try {
                    const data = {
                        id: selected.id,
                        nombre,
                        id_tipo,
                        cantidad,
                        fecha_vencimiento,
                        imagen,
                        id_farmaceuta
                    };

                    if (nombre === '' || id_tipo === '' || cantidad === '' || fecha_vencimiento === '' || imagen === '' || id_farmaceuta === '') {
                        setError(true)
                    } else {
                        await axios.put(`https://lisandrohr.com/JosePortillo/articulo.php`, data)
                            .then(function (response) {
                                console.log(response.data);
                            });
                        fetchData();
                        toggle();
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {

                if (nombre === '' || id_tipo === '' || cantidad === '' || fecha_vencimiento === '' || imagen === '' || id_farmaceuta === '') {
                    setError(true)
                } else {
                    await axios.post(
                        'https://lisandrohr.com/JosePortillo/articulo.php'
                        , {
                            nombre,
                            id_tipo,
                            cantidad,
                            fecha_vencimiento,
                            imagen,
                            id_farmaceuta
                        })
                        .then(function (response) {
                            console.log(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                    fetchData();
                    toggle();
                }

            }
        } catch (error) {
            console.log(error);
            setError(true)
        }
    }

    const handleSaveType = async () => {
        try {
            await axios.post(
                'https://lisandrohr.com/JosePortillo/tipo.php',
                {
                    tipo
                })
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
            fetchTypeData();
            toggleType();
        } catch (error) {
            console.log(error);
        }
    }

    const handleSaveDoc = async () => {
        try {
            await axios.post(
                'https://lisandrohr.com/JosePortillo/farmaceuta.php',
                {
                    nombre_doc
                })
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });
            fetchDoctorData();
            toggleDoc();
        } catch (error) {
            console.log(error);
        }
    }

    const ChartComponent = ({ conteo }) => {
        const dataForChart = conteo
            .filter(item => item.id_producto === selectModal.id)
            .map(item => ({ x: item.numero_compra, y: item.cantidad_producto }));

        return (
            <XYPlot height={300} width={400}>
                <VerticalBarSeries data={dataForChart} />
                <XAxis />
                <YAxis />
            </XYPlot>
        );
    };


    return (
        <div className=" container">
            <NavBar />

            {/* Busqueda y Creación de Productos */}
            <div className='row  m-5 g-3 align-items-center'>
                <Input
                    type="text"
                    className="form-control"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Buscar Producto..."
                />
                <ButtonGroup>
                    <Col md={5}>
                        <Button
                            type="button"
                            className="btn col-md-12 btn-primary "
                            onClick={toggle}
                        >
                            Agregar Producto
                        </Button>
                    </Col>
                    <Col md={2}></Col>
                    <Col md={5}>
                        <Link to='/BuyProduct'>
                            <Button
                                type="button"
                                className="btn col-md-12 btn-success "
                            >
                                Comprar
                            </Button>
                        </Link>
                    </Col>
                </ButtonGroup>
            </div>

            {/* Tabla de Productos */}
            <div className="cards row m-4">
                {filteredProduct.map(product => (
                    <Col className="col">
                        <Card className='card mt-2 align-items-center'
                            onClick={() => {
                                setSelectModal(product);
                                toggle1();
                            }}>
                            <CardTitle className="text-center mt-3">Stock: {product.cantidad}</CardTitle>
                            <img src={product.imagen} width={150} className="text-center" alt={product.nombre} />
                            <CardBody>
                                <h5 className="text-center">{product.nombre}</h5>
                                <CardSubtitle className="text-center">
                                    {
                                        tipos.map(tipo => (
                                            product.id_tipo === tipo.id ? tipo.tipo : null
                                        ))
                                    }
                                </CardSubtitle>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </div>

            {/* Modal para agregar / Editar Articulo */}
            <Modal className='mt-5' isOpen={modal} size='xl' centered toggle={toggle}>
                <ModalHeader toggle={toggle}>
                    {selected ? 'Editar Producto' : 'Agregar Producto'}

                </ModalHeader>
                <ModalBody>
                    <div className="row g-3">
                        <div className="col-md-12">
                            <label htmlFor="nombre" className="form-label">
                                Nombre del Producto:
                            </label>
                            <Input
                                type="text"
                                defaultValue={nombre}
                                onChange={e => setNombre(e.target.value)}
                                className="form-control"
                                id="nombre"
                                placeholder="Nombre"
                                maxLength="45"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="tipo" className="form-label">
                                Tipo de Producto:
                            </label>
                            <FormGroup row>
                                <Col sm={9}>
                                    <Input
                                        id="tipo"
                                        name="tipo"
                                        type="select"
                                        value={id_tipo}
                                        placeholderText="Tipo"
                                        required
                                        onChange={(e) => setTipo(e.target.value)}
                                    >
                                        <option >Selecciona un Tipo</option>
                                        {tipos.map((tipo) => (
                                            <option key={tipo.id} value={tipo.id}>
                                                {tipo.tipo}
                                            </option>
                                        ))}
                                    </Input>
                                </Col>
                                <Col sm={3}>
                                    <Button
                                        onClick={toggleType}
                                    >Crear Tipo
                                    </Button>
                                </Col>
                            </FormGroup>

                        </div>
                        <div className="col-md-6">
                            <label htmlFor="cantidad" className="form-label">
                                Cantidad del Producto:
                            </label>
                            <Input
                                type="number"
                                defaultValue={cantidad}
                                onChange={e => setCantidad(e.target.value)}
                                className="form-control"
                                id="cantidad"
                                placeholder="Cantidad"
                                pattern="^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}$"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="fechaVencimiento" className="form-label">
                                Fecha de Vencimiento del Producto:
                            </label>
                            <Input
                                className='form-control'
                                id="fechaVencimiento"
                                name="date"
                                defaultValue={fecha_vencimiento}
                                onChange={event => setFecha(event.target.value)}
                                min={fecha_vencimiento}
                                max="2050-12-31"
                                type="date"
                                placeholderText='dd/MM/yyyy'
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="Imagen" className="form-label">
                                Imagen del Producto (URL):
                            </label>
                            <Input
                                type="text"
                                defaultValue={imagen}
                                onChange={e => setImagen(e.target.value)}
                                className="form-control"
                                id="Imagen"
                                placeholder="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="farmaceuta" className="form-label">
                                Farmaceuta:
                            </label>
                            <FormGroup row>
                                <Col sm={9}>
                                    <Input
                                        id="farmaceuta"
                                        name="farmaceuta"
                                        type="select"
                                        value={id_farmaceuta}
                                        required
                                        onChange={(e) => setFarmaceuta(e.target.value)}
                                    >
                                        <option> Selecciona un Famaceuta</option>
                                        {doctor.map((doc) => (
                                            <option key={doc.id} value={doc.id}>
                                                {doc.nombre_doc}
                                            </option>
                                        ))}
                                    </Input>
                                </Col>
                                <Col sm={3}>
                                    <Button
                                        onClick={toggleDoc}
                                    >Agregar Farmaceuta
                                    </Button>
                                </Col>
                            </FormGroup>
                        </div>
                    </div>
                    {error && <Alert className="alert" color="danger">Todos los campos deben ser completados</Alert>}
                </ModalBody>
                <ModalFooter>
                    <Button
                        type="button"
                        onClick={handleSave}
                        color="primary"
                    >
                        Guardar cambios
                    </Button>
                    <Button
                        color="secondary"
                        onClick={toggle}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Modal para Observar la Cartar del Articulo */}
            <Modal className='mt-5' isOpen={modal1} size='l' centered toggle={toggle1}>
                <ModalHeader >
                    <img
                        style={{
                            float: 'right',
                        }}
                        src={QR}
                        width={80}
                        alt="Jose-Portillo"
                        className="float-right"
                    />
                    <FormGroup row>
                        <h5>
                            {selectModal.nombre}
                        </h5>
                        <div
                            className="float-right"
                            style={{
                                fontSize: '12px',
                                color: '#6c757d'
                            }}
                        >
                            Fecha de Vencimiento: {selectModal.fecha_vencimiento}
                        </div>
                        <div
                            className="float-right"
                            style={{
                                fontSize: '12px',
                                color: '#6c757d'
                            }}
                        >
                            Cantidad: {selectModal.cantidad}
                        </div>
                        <div
                            className="float-right"
                            style={{
                                fontSize: '12px',
                                color: '#6c757d'
                            }}
                        >
                            Tipo: {
                                tipos.map(tipo => (
                                    selectModal.id_tipo === tipo.id ? tipo.tipo : null
                                ))
                            }
                        </div>
                        <div
                            className="float-right"
                            style={{
                                fontSize: '12px',
                                color: '#6c757d'
                            }}
                        >
                            Farmaceuta: {
                                doctor.map(doc => (
                                    selectModal.id_farmaceuta === doc.id ? doc.nombre_doc : null
                                ))
                            }
                        </div>
                    </FormGroup>
                </ModalHeader>
                <ModalBody>
                    <Card className="align-items-center"
                        style={{
                            width: '20rem',
                            margin: 'auto'
                        }}
                    >
                        <img
                            className="card-img-top"
                            src={selectModal.imagen}
                            alt={selectModal.nombre}
                        />
                    </Card>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        id="PopoverLegacy1"
                        type="button"
                        onClick={toggle2}
                    >
                        Grafica
                    </Button>
                    {/* <UncontrolledPopover
            placement="top"
            target="PopoverLegacy1"
            trigger="legacy"
          >
            <PopoverHeader className="align-item-centered">
              Gráfica {selectModal.nombre}
            </PopoverHeader>
            <PopoverBody className="align-item-centered ">
              <div style={{ height: '400px', width: '10em' }}>
                <ChartComponent conteo={conteo} />
              </div>
            </PopoverBody>
          </UncontrolledPopover> */}

                    <Modal className='mt-5' isOpen={modal2} size='md' centered toggle={toggle2}>
                        <ModalHeader toggle={toggle2} >Gráfica {selectModal.nombre}</ModalHeader>
                        <ModalBody className="align-item-center">
                            <div className="compra"
                                style={
                                    {
                                        fontSize: '12px',
                                        color: '#121212',
                                        fontWeight: 900,
                                        float: "left",
                                    }
                                }
                            >
                                N# Cantidad de ingreso
                            </div>
                            <ChartComponent conteo={conteo} />
                            <b
                                style={
                                    {
                                        fontSize: '12px',
                                        color: '#333333',
                                        float: "right",
                                        fontWeight: 900,
                                    }
                                }
                            >
                                N# Compra
                            </b>
                        </ModalBody>
                    </Modal>

                    <Button
                        color="danger"
                        id="PopoverLegacy"
                        type="button"
                    >
                        Eliminar
                    </Button>

                    <UncontrolledPopover
                        placement="top"
                        target="PopoverLegacy"
                        trigger="legacy"
                    >
                        <PopoverHeader className="align-item-centered">
                            ¿Estas Segur@ que Quieres Eliminar?
                        </PopoverHeader>
                        <PopoverBody className="align-item-centered">
                            Una vez eliminado no podras volver a obtener este producto, ¿Estas segur@?
                            <Button
                                color="danger"
                                id="PopoverLegacy"
                                type="button"
                                onClick={() => handleDelete(selectModal.id)}
                            >
                                Eliminar
                            </Button>
                        </PopoverBody>
                    </UncontrolledPopover>

                    <Button
                        color="warning"
                        onClick={() => { handleEdit(selectModal) }}
                    >
                        Editar
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => { toggle1(); setSelected(null) }}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Modal para Crear Nuevo tipo de producto */}
            <Modal className='mt-5' isOpen={modalType} size='sm' centered toggle={toggleType}>
                <ModalHeader >Nuevo Tipo de producto</ModalHeader>
                <ModalBody>
                    <div className="row g-3">
                        <div className="col-md-12">
                            <label htmlFor="tipo" className="form-label">
                                Tipo de Producto:
                            </label>
                            <Input
                                type="text"
                                defaultValue={tipo}
                                onChange={e => setNewType(e.target.value)}
                                className="form-control"
                                id="tipo"
                                maxLength="45"
                                required
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={handleSaveType}
                    >
                        Guardar
                    </Button>
                    <Button
                        color="secondary"
                        onClick={toggleType}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

            {/* Modal para Crear Nuevo Farmaceuta */}
            <Modal className='mt-5' isOpen={modalDoc} size='sm' centered toggle={toggleDoc}>
                <ModalHeader>Nuevo Farmaceuta</ModalHeader>
                <ModalBody>
                    <div className="row g-3">
                        <div className="col-md-12">
                            <label htmlFor="tipo" className="form-label">
                                Nombre del Farmaceuta:
                            </label>
                            <Input
                                type="text"
                                defaultValue={nombre_doc}
                                onChange={e => setNewDoc(e.target.value)}
                                className="form-control"
                                id="tipo"
                                maxLength="45"
                                required
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="success"
                        onClick={handleSaveDoc}
                    >
                        Guardar
                    </Button>
                    <Button
                        color="secondary"
                        onClick={toggleDoc}
                    >
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

        </div>
    )
}

export { InventarioG }
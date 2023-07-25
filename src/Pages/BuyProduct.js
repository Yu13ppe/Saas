import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import jsPDF from "jspdf";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Col,
  FormGroup,
  Table
} from 'reactstrap';

function BuyProduct() {
  const [id_producto, setIdProduct] = useState('')
  const [cantidad_producto, setCantidadProduct] = useState('')
  const [id_tipo, setIdType] = useState('')
  const [fecha_vencimiento_producto, setFechaVencimientoProduct] = useState('')
  const [fecha_compra, setFechaCompra] = useState('')
  const [lote, setLote] = useState('')
  const [id_proveedor, setIdProveedor] = useState('')
  const [id_empleado, setIdEmpleado] = useState('')
  const [productos, setProductos] = useState([])
  const [tipos, setTipos] = useState([])
  const [proveedores, setProveedores] = useState([])
  const [empleados, setEmpleados] = useState([])
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const [nombre_emp, setNombre_emp] = useState('')
  const [apellido, setApellido] = useState('')
  const [telefono_emp, setTelefono_emp] = useState('')
  const [direccion, setDireccion] = useState('')
  const [cedula, setCedula] = useState(Number)

  const [nombre_pro, setNombre_pro] = useState('')
  const [correo, setCorreo] = useState('')
  const [rif, setRif] = useState('')
  const [telefono_pro, setTelefono_pro] = useState('')


  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);

  const [showPDF, setShowPDF] = useState(false);

  useEffect(() => {
    const obtenerFechaActual = () => {
      const hoy = new Date();
      const year = hoy.getFullYear();
      const month = String(hoy.getMonth() + 1).padStart(2, '0');
      const day = String(hoy.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // Establecer la fecha actual como el valor por defecto para el input
    setFechaCompra(obtenerFechaActual());

    fetchData();
    fetchData2();
    fetchData3();
    fetchData4();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://lisandrohr.com/JosePortillo/articulo.php');
      setProductos(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchData2 = async () => {
    try {
      const response = await axios.get('https://lisandrohr.com/JosePortillo/tipo.php');
      setTipos(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //

  const fetchData3 = async () => {
    try {
      const response = await axios.get('https://lisandrohr.com/JosePortillo/proveedores.php');
      setProveedores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData4 = async () => {
    try {
      const response = await axios.get('https://lisandrohr.com/JosePortillo/empleado.php');
      setEmpleados(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://lisandrohr.com/JosePortillo/compras.php', {
        id_producto,
        cantidad_producto,
        id_tipo,
        fecha_vencimiento_producto,
        fecha_compra,
        lote,
        id_proveedor,
        id_empleado
      })
        .then(function (response) {
          console.log(response.data);
          setShowPDF(true);
        })
        .catch(function (error) {
          console.log(error);
        });

    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitProveedor = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://lisandrohr.com/JosePortillo/proveedores.php', {
        nombre_pro,
        rif,
        telefono_pro,
        correo
      })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      fetchData3();
      toggle();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitEmpleado = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://lisandrohr.com/JosePortillo/empleado.php', {
        nombre_emp,
        apellido,
        cedula,
        telefono_emp,
        direccion
      })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
      fetchData4();
      toggle2();
    } catch (error) {
      console.log(error);
    }
  };

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000);
    return `0000${randomNumber}`.slice(-10);
  };

  const MyDocument = () => {
    const facturaNumero = generateRandomNumber();
    const controlNumero = generateRandomNumber();
    return (
      <div className="invoice-container">
        <div id="factura">
          <div className="invoice-header">
            <h3 className="invoice-control"> {controlNumero}</h3>
            <h1 className="invoice-number">Factura #{facturaNumero}</h1>
          </div>
          <div className="invoice-body">
            <Table className="invoice-table"
            >
              <thead>
                <tr>
                  <th>
                    Producto
                  </th>
                  <th>
                    Tipo de Producto
                  </th>
                  <th>
                    Fecha de Vencimiento
                  </th>
                  <th>
                    Fecha de compra
                  </th>
                  <th>
                    Lote
                  </th>
                  <th>
                    Proveedor
                  </th>
                  <th>
                    Empleado
                  </th>
                  <th>
                    Cantidad
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td >
                    {productos.map((producto) => (
                      producto.id === id_producto ? producto.nombre : ''
                    ))}
                  </td>
                  <td>
                    {tipos.map((tipo) => (
                      tipo.id === id_tipo ? tipo.tipo : ''
                    ))}
                  </td>
                  <td>
                    {fecha_vencimiento_producto}
                  </td>
                  <td>
                    {fecha_compra}
                  </td>
                  <td>
                    {lote}
                  </td>
                  <td>
                    {proveedores.map((proveedor) => (
                      proveedor.id === id_proveedor ? proveedor.nombre_pro : ''
                    ))}
                  </td>
                  <td>
                    {empleados.map((empleado) => (
                      empleado.id === id_empleado ? <>{empleado.nombre_emp} {empleado.apellido}</> : ''
                    ))}

                  </td>
                  <td>
                    {cantidad_producto}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <Button onClick={generatePDF} className="btn btn-success col-md-12">Generar PDF</Button>
      </div>
    )
  }

  function generatePDF() {
    const codeSection = document.getElementById('factura');
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'pt',
      format: [1700, 2200], // establecer tamaño de la página aquí
      compress: true,
      lineHeight: 1.5,
      fontSize: 10,
      putOnlyUsedFonts: true,
      floatPrecision: 2
    }); // configuración del documento PDF
    doc.text('Este es un texto de ejemplo', 20, 20);
    doc.html(codeSection, {

      callback: function (doc) {
        // Obtener los datos del PDF como una cadena de datos
        const pdfData = doc.output('datauristring');

        // Abrir una nueva ventana del navegador con los datos del PDF
        const newWindow = window.open();
        newWindow.document.write('<iframe width="100%" height="100%" src="' + pdfData + '"></iframe>');
      }
    });
  }

  return (
    <div>
      <div id="container" className="container">
        <div className="row g-3">
          <h1 
          style={{ justifyContent: 'center', marginTop: '1em', color: '#072', backgroundColor: '#fff', padding: '.5em', borderRadius: '10px', display: 'inline-block' }}
          >Compras</h1>
          <form className="col-md-12 form-control" onSubmit={handleSubmit}>
            <FormGroup row>
              <div className="col-md-6">
                <label htmlFor="id_producto">Producto</label>
                <select
                  id="id_producto"
                  className="form-control"
                  onChange={(e) => setIdProduct(e.target.value)}>
                  <option selected>Selecciona un producto</option>
                  {productos.map((producto) => (
                    <option value={producto.id} >{producto.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="cantidad_producto">Cantidad</label>
                <Input
                  type="number"
                  className="form-control"
                  id="cantidad_producto"
                  placeholder="Cantidad"
                  required
                  min={1}
                  max={500}
                  onChange={(e) => setCantidadProduct(e.target.value)} />
              </div>
            </FormGroup>
            <FormGroup row>
              <div className="form-group col-md-6">
                <label htmlFor="id_tipo">Tipo</label>
                <select
                  id="id_tipo"
                  className="form-control"
                  onChange={(e) => setIdType(e.target.value)}>
                  <option selected>Selecciona un tipo</option>
                  {tipos.map((tipo) => (
                    <option value={tipo.id}>{tipo.tipo}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label htmlFor="fecha_vencimiento_producto">Fecha de vencimiento</label>
                <Input
                  className='form-control'
                  id="fechaVencimiento"
                  name="date"
                  defaultValue={fecha_vencimiento_producto}
                  onChange={event => setFechaVencimientoProduct(event.target.value)}
                  min={fecha_vencimiento_producto}
                  max="2050-12-31"
                  type="date"
                  placeholderText='dd/MM/yyyy'
                  required
                />
              </div>
            </FormGroup>
            <FormGroup row>
              <div className="col-md-6">
                <label htmlFor="fecha_compra">Fecha de compra</label>
                <Input
                  className='form-control'
                  id="fecha_compra"
                  name="date"
                  value={fecha_compra}
                  disabled
                  onChange={event => setFechaCompra(event.target.value)}
                  min={fecha_compra}
                  max="2050-12-31"
                  type="date"
                  placeholderText='dd/MM/yyyy'
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lote">Lote</label>
                <Input
                  type="text"
                  className="form-control"
                  id="lote"
                  placeholder="Lote"
                  defaultValue={lote}
                  onChange={(e) => setLote(e.target.value)}
                  required />
              </div>
            </FormGroup>
            <FormGroup row>
              <div className="col-md-6">
                <label htmlFor="id_proveedor">Proveedor</label>
                <FormGroup row>
                  <Col md={8}>
                    <select
                      id="id_proveedor"
                      className="form-control"
                      required
                      onChange={(e) => setIdProveedor(e.target.value)}>
                      <option selected>Selecciona un proveedor</option>
                      {proveedores.map((proveedor) => (
                        <option value={proveedor.id}>{proveedor.nombre_pro}</option>
                      ))}
                    </select>
                  </Col>
                  <Col md={4}>
                    <Button
                      onClick={toggle}
                    >Agregar Proveedor
                    </Button>
                  </Col>
                </FormGroup>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="id_empleado">Empleado</label>
                <FormGroup row>
                  <Col md={8}>
                    <select
                      id="id_empleado"
                      className="form-control"
                      onChange={(e) => setIdEmpleado(e.target.value)}>
                      <option selected>Selecciona un empleado</option>
                      {empleados.map((empleado) => (
                        <option value={empleado.id}>{empleado.nombre_emp} {empleado.apellido}</option>
                      ))}
                    </select>
                  </Col>
                  <Col md={4}>
                    <Button
                      onClick={toggle2}
                    >Agregar Empleado
                    </Button>
                  </Col>
                </FormGroup>
              </div>
            </FormGroup>
            <Button type="submit" className="btn btn-success col-md-12">Comprar</Button>
            <Link to={'/Inventario'} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="button" color="primary" className="btn mt-2 mb-2 col-md-6">Volver al Inventario</Button>
            </Link>
          </form>
        </div>
      </div>

      {/* Modal para agregar proveedor */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Agregar Proveedor</ModalHeader>
        <ModalBody>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="nombre_pro">Nombre</label>
              <Input
                type="text"
                className="form-control"
                id="nombre_pro"
                placeholder="Nombre"
                required
                defaultValue={nombre_pro}
                onChange={(e) => setNombre_pro(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label htmlFor="telefono_pro">Telefono</label>
              <Input
                type="text"
                className="form-control"
                id="telefono_pro"
                placeholder="Telefono"
                required
                defaultValue={telefono_pro}
                onChange={(e) => setTelefono_pro(e.target.value)} />
            </div>
          </div>
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="correo">Correo</label>
              <Input
                type="email"
                className="form-control"
                id="correo"
                placeholder="Correo"
                required
                defaultValue={correo}
                onChange={(e) => setCorreo(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label htmlFor="rif">Rif</label>
              <Input
                type="text"
                className="form-control"
                id="rif"
                placeholder="Rif"
                required
                defaultValue={rif}
                onChange={(e) => setRif(e.target.value)} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmitProveedor} className="btn btn-success col-md-12">Agregar</Button>
          <Button color="secondary" onClick={toggle}>Cerrar</Button>
        </ModalFooter>
      </Modal>

      {/* Modal para agregar Empleado */}
      <Modal isOpen={modal2} toggle={toggle2}>
        <ModalHeader toggle={toggle2}>Agregar Empleado</ModalHeader>
        <ModalBody>
          <div className="row g-3">

            <div className="col-md-6">
              <label htmlFor="nombre_emp">Nombre</label>
              <Input
                type="text"
                className="form-control"
                id="nombre_emp"
                placeholder="Nombre"
                required
                defaultValue={nombre_emp}
                onChange={(e) => setNombre_emp(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label htmlFor="apellido">Apellido</label>
              <Input
                type="text"
                className="form-control"
                id="apellido"
                placeholder="Apellido"
                required
                defaultValue={apellido}
                onChange={(e) => setApellido(e.target.value)} />
            </div>
          </div>
          <div className="row g-3">

            <div className="col-md-6">
              <label htmlFor="telefono_emp">Telefono</label>
              <Input
                type="text"
                className="form-control"
                id="telefono_emp"
                placeholder="Telefono"
                required
                defaultValue={telefono_emp}
                onChange={(e) => setTelefono_emp(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label htmlFor="cedula">Cedula</label>
              <Input
                type="number"
                className="form-control"
                id="cedula"
                placeholder="Cedula"
                required
                defaultValue={cedula}
                onChange={(e) => setCedula(e.target.value)} />
            </div>
          </div>
          <div className="row g-3">
            <div className="col-md-12">
              <label htmlFor="direccion">Direccion</label>
              <Input
                type="text"
                className="form-control"
                id="direccion"
                placeholder="Direccion"
                required
                defaultValue={direccion}
                onChange={(e) => setDireccion(e.target.value)} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmitEmpleado} className="btn btn-success col-md-12">Agregar</Button>
          <Button color="secondary" onClick={toggle2}>Cerrar</Button>
        </ModalFooter>
      </Modal>

      {showPDF ? (
        MyDocument()
      ) : null}

    </div>
  )
}

export { BuyProduct }
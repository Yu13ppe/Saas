import axios from "axios"
import { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import {
  Button,
  // Modal,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  Input,
  Col,
  // Card,
  // CardBody,
  // CardSubtitle,
  // CardTitle,
  FormGroup,
  // UncontrolledPopover,
  // PopoverHeader,
  // PopoverBody
} from 'reactstrap';

function BuyProduct() {
  const [id_producto, setIdProduct] = useState(Number)
  const [cantidad_producto, setCantidadProduct] = useState(Number)
  const [id_tipo, setIdType] = useState(Number)
  const [fecha_vencimiento_producto, setFechaVencimientoProduct] = useState('')
  const [fecha_compra, setFechaCompra] = useState('')
  const [lote, setLote] = useState('')
  const [id_proveedor, setIdProveedor] = useState(Number)
  const [id_empleado, setIdEmpleado] = useState(Number)
  const [productos, setProductos] = useState([])
  const [tipos, setTipos] = useState([])
  const [proveedores, setProveedores] = useState([])
  const [empleados, setEmpleados] = useState([])
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const toggle = () => setModal(!modal);
  const toggle2 = () => setModal2(!modal2);


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
      const response = await axios.get('http://localhost/react/Saas/api/articulo.php/');
      setProductos(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchData2 = async () => {
    try {
      const response = await axios.get('http://localhost/react/Saas/api/tipo.php/');
      setTipos(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  //

  const fetchData3 = async () => {
    try {
      const response = await axios.get('http://localhost/react/Saas/api/proveedores.php/');
      setProveedores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData4 = async () => {
    try {
      const response = await axios.get('http://localhost/react/Saas/api/empleado.php/');
      setEmpleados(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost/react/Saas/api/compras.php/', {
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
        })
        .catch(function (error) {
          console.log(error);
        });
      setCompraCantidades([...compraCantidades, cantidad_producto]);
    } catch (error) {
      console.log(error);
    }
  };

  const [compraCantidades, setCompraCantidades] = useState([]);

  // const renderPdf = () => (
  //   <PDFDownloadLink document={<MyDocument />} fileName="facturacion.pdf">
  //     {({ blob, url, loading, error }) =>
  //       loading ? 'Cargando documento...' : 'Descargar PDF'
  //     }
  //   </PDFDownloadLink>
  // );

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Facturacion</Text>
          {/* Mostrar las cantidades de los productos comprados */}
          {compraCantidades.map((cantidad, index) => (
            <View key={index}>
              <Text>Cantidad: {cantidad}</Text>
            </View>
          ))}
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );





  return (
    <div>
      <div className="container">
        <div className="row g-3">
          <h1>Compras</h1>
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
                  defaultValue={cantidad_producto}
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
                        <option value={proveedor.id}>{proveedor.nombre}</option>
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
                        <option value={empleado.id}>{empleado.nombre} {empleado.apellido}</option>
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
          </form>


        </div>
      </div>

      <PDFDownloadLink document={<MyDocument />} fileName="facturacion.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Cargando documento...' : 'Descargar PDF'
        }
      </PDFDownloadLink>
    </div>
  )
}

export { BuyProduct }
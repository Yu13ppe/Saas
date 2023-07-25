import React, { useEffect, useState } from 'react'
import jsPDF from "jspdf";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  Nav,
} from "reactstrap";
import axios from "axios"

function NavBar(props) {

  const [isReadyForInstall, setIsReadyForInstall] = React.useState(false);
  const [empleados, setEmpleados] = useState([])
  const [proveedor, setProveedores] = useState([])

  const [modal, setModal] = useState(false)
  const [modal1, setModal1] = useState(false)


  const toggle = () => setModal(!modal);
  const toggle1 = () => setModal1(!modal1);


  const [collapsed, setCollapsed] = React.useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (event) => {
      // Prevent the mini-infobar from appearing on mobile.
      event.preventDefault();
      console.log("👍", "beforeinstallprompt", event);
      // Stash the event so it can be triggered later.
      window.deferredPrompt = event;
      // Remove the 'hidden' class from the install button container.
      setIsReadyForInstall(true);
    });
  }, []);

  async function downloadApp() {
    console.log("👍", "butInstall-clicked");
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      // The deferred prompt isn't available.
      console.log("oops, no prompt event guardado en window");
      return;
    }
    // Show the install prompt.
    promptEvent.prompt();
    // Log the result
    const result = await promptEvent.userChoice;
    console.log("👍", "userChoice", result);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    window.deferredPrompt = null;
    // Hide the install button.
    setIsReadyForInstall(false);
  }

  useEffect(() => {
    fetchEmployData();
    fetchProveedorData();
  }, []);

  const fetchEmployData = async () => {
    try {
      const response = await axios.get('https://lisandrohr.com/JosePortillo/empleado.php');
      setEmpleados(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProveedorData = async () => {
    try {
      const response = await axios.get('https://lisandrohr.com/JosePortillo/proveedores.php');
      setProveedores(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  function generatePDF() {
    const codeSection = document.getElementById('listaEmpleados');
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

  function generatePDF2() {
    const codeSection = document.getElementById('listaProveedores');
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
      <Navbar color="faded" light className="navbar">
        <NavbarBrand href="/" className="me-auto">
          <h1 className="title1">Farmacias Saas</h1>
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="botonDesplegable" />
        <Collapse isOpen={!collapsed} navbar className="desplegable">
          <Nav navbar>
            <ul className='buttons'>

              <div onClick={toggle} className="btn btn-success col-md-12">Lista Empleados</div>
              <div className='Divider' />
              <div onClick={toggle1} className="btn btn-success col-md-12">Lista Proveedores</div>
              <div className='Divider' />
              {isReadyForInstall && <li className='btn download-btn' onClick={downloadApp}>Download</li>}
            </ul>
          </Nav>
        </Collapse>
      </Navbar>

      <Modal className='mt-5' isOpen={modal} size='xl' centered toggle={toggle}>
        <ModalHeader toggle={toggle}>Lista Empleados</ModalHeader>
        <ModalBody>
          <div className="invoice-container">
            <div id="listaEmpleados">
              <div className="invoice-header">
                <h1 className="invoice-number">Lista de Empleados</h1>
              </div>
              <div className="invoice-body">
                <Table className="invoice-table"
                >
                  <thead>
                    <tr>
                      <th>
                        Nombre
                      </th>
                      <th>
                        Apellido
                      </th>
                      <th>
                        Cedula
                      </th>
                      <th>
                        Telefono
                      </th>
                      <th>
                        Direccion
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {empleados.map((empleado) => (
                      <tr>
                        <td key={empleado.id}>{empleado.nombre_emp}</td>
                        <td >{empleado.apellido}</td>
                        <td >{empleado.cedula}</td>
                        <td >{empleado.telefono_emp}</td>
                        <td >{empleado.direccion}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div >
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={generatePDF}
          >
            Guardar
          </Button>
          <Button
            color="secondary"
            onClick={toggle}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal className='mt-5' isOpen={modal1} size='xl' centered toggle={toggle1}>
        <ModalHeader toggle={toggle1}>Lista Proveedores</ModalHeader>
        <ModalBody>
          <div className="invoice-container">
            <div id="listaProveedores">
              <div className="invoice-header">
                <h1 className="invoice-number">Lista de Proveedores</h1>
              </div>
              <div className="invoice-body">
                <Table className="invoice-table"
                >
                  <thead>
                    <tr>
                      <th>
                        Nombre
                      </th>
                      <th>
                        Rif
                      </th>
                      <th>
                        Telefono
                      </th>
                      <th>
                        Correo
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {proveedor.map((proveedor) => (
                      <tr>
                        <td key={proveedor.id}>{proveedor.nombre_pro}</td>
                        <td >{proveedor.rif}</td>
                        <td >{proveedor.telefono_pro}</td>
                        <td >{proveedor.correo}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          </div >
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={generatePDF2}
          >
            Guardar
          </Button>
          <Button
            color="secondary"
            onClick={toggle1}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      
    </div>
  )
}

export { NavBar }
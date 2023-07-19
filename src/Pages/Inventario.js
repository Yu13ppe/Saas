import axios from "axios"
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import { Button, Table} from 'reactstrap';

function Inventario() {

    const [product, setProducts] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://joseportillo.000webhostapp.com/saas/api/articulo.php');
            setProducts(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="row m-4 userTable">
            <Table bordered responsive className='userTable'>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Cantidad</th>
                  <th>Fecha Vencimiento</th>
                  <th>Farmaceuta</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {product.map(product => (
                  <tr key={product.id}>
                    <td>{product.nombre}</td>
                    <td>{product.id_tipo}</td>
                    <td>{product.cantidad}</td>
                    <td>{product.fecha_vencimiento}</td>
                    <td>{product.id_farmaceuta}</td>
                    <td>
                      <Button
                        color="primary"
                        // onClick={() => handleEdit(line)}
                      >
                        Editar
                      </Button>
                      <Button
                        color="danger"
                        // onClick={() => handleDelete(line.lin_id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
    )
}

export {Inventario}
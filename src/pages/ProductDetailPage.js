// client/src/pages/ProductDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Container from '../components/Container'; // <-- Importa Container
import { fetchProductById } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';
import Spinner from '../components/Spinner';
import Message from '../components/Message';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
    const { id: productId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Estados locales
    const [qty, setQty] = useState(1);
    const [prescriptionOption, setPrescriptionOption] = useState('no'); // 'no', 'manual', 'upload'
    const [prescriptionData, setPrescriptionData] = useState({
        sph: { od: '', os: '' }, cyl: { od: '', os: '' }, axis: { od: '', os: '' }, add: { od: '', os: '' }, pd: ''
    });
    const [uploading, setUploading] = useState(false);
    const [prescriptionFile, setPrescriptionFile] = useState('');

    // Estados de Redux
    const { selectedProduct: product, selectedProductStatus: status, selectedProductError: error } = useSelector((state) => state.productList);

    useEffect(() => {
        if (!product || product._id !== productId) {
            dispatch(fetchProductById(productId));
        }
    }, [dispatch, productId, product]);

    const handlePrescriptionChange = (e) => {
        const { name, value, dataset } = e.target;
        const { eye } = dataset;
        if (eye) {
            setPrescriptionData(prev => ({ ...prev, [name]: { ...prev[name], [eye]: value } }));
        } else {
            setPrescriptionData(prev => ({ ...prev, [name]: value }));
        }
    };

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('prescription', file);
        setUploading(true);
        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const { data } = await axios.post('/api/upload', formData, config);
            setPrescriptionFile(data.filePath);
            setUploading(false);
        } catch (error) {
            console.error(error);
            setUploading(false);
        }
    };

    const addToCartHandler = () => {
        dispatch(
            addToCart({
                ...product,
                qty,
                prescription: prescriptionOption === 'manual' ? prescriptionData : null,
                prescriptionFile: prescriptionOption === 'upload' ? prescriptionFile : null,
            })
        );
        navigate('/cart');
    };

    if (status === 'loading') return <Spinner />;
    if (status === 'failed') return <Message variant="danger">{error}</Message>;
    if (!product) return <Message variant="info">Producto no encontrado.</Message>;

    return (
        <Container>
            <div className="product-detail-container">
                <Link to="/" className="back-link">Volver a la tienda</Link>
                <div className="product-detail-content">
                    <div className="product-detail-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-detail-info">
                        <h2>{product.name}</h2>
                        <p className="brand">{product.brand}</p>
                        <p className="price">${product.price}</p>
                        <p className="description">{product.description}</p>
                        <div className="status">Estado: {product.stock > 0 ? 'En Stock' : 'Agotado'}</div>
                        
                        {/* --- ESTA ES LA SECCIÓN QUE FALTABA --- */}
                        <div className="prescription-section">
                            <h3>¿Necesitas graduación?</h3>
                            <div className="radio-group">
                                <input type="radio" id="presc_no" name="prescription" value="no" checked={prescriptionOption === 'no'} onChange={(e) => setPrescriptionOption(e.target.value)} />
                                <label htmlFor="presc_no">Comprar solo la montura</label>
                            </div>
                            <div className="radio-group">
                                <input type="radio" id="presc_manual" name="prescription" value="manual" checked={prescriptionOption === 'manual'} onChange={(e) => setPrescriptionOption(e.target.value)} />
                                <label htmlFor="presc_manual">Introducir graduación manualmente</label>
                            </div>
                            <div className="radio-group">
                                <input type="radio" id="presc_upload" name="prescription" value="upload" checked={prescriptionOption === 'upload'} onChange={(e) => setPrescriptionOption(e.target.value)} />
                                <label htmlFor="presc_upload">Subir mi receta</label>
                            </div>

                            {prescriptionOption === 'manual' && (
                                <div className="prescription-form">
                                    <h4>Introduce tu graduación</h4>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Esfera (SPH)</th>
                                                <th>Cilindro (CYL)</th>
                                                <th>Eje (AXIS)</th>
                                                <th>Adición (ADD)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>OD (Derecho)</td>
                                                <td><input type="text" name="sph" data-eye="od" onChange={handlePrescriptionChange} /></td>
                                                <td><input type="text" name="cyl" data-eye="od" onChange={handlePrescriptionChange} /></td>
                                                <td><input type="text" name="axis" data-eye="od" onChange={handlePrescriptionChange} /></td>
                                                <td><input type="text" name="add" data-eye="od" onChange={handlePrescriptionChange} /></td>
                                            </tr>
                                            <tr>
                                                <td>OS (Izquierdo)</td>
                                                <td><input type="text" name="sph" data-eye="os" onChange={handlePrescriptionChange} /></td>
                                                <td><input type="text" name="cyl" data-eye="os" onChange={handlePrescriptionChange} /></td>
                                                <td><input type="text" name="axis" data-eye="os" onChange={handlePrescriptionChange} /></td>
                                                <td><input type="text" name="add" data-eye="os" onChange={handlePrescriptionChange} /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="pd-input">
                                        <label>Distancia Pupilar (PD)</label>
                                        <input type="text" name="pd" onChange={handlePrescriptionChange} placeholder="Ej: 63" />
                                    </div>
                                </div>
                            )}

                            {prescriptionOption === 'upload' && (
                                <div className="upload-form">
                                    <input type="file" onChange={uploadFileHandler} />
                                    {uploading && <Spinner />}
                                    {prescriptionFile && <p>Archivo subido: {prescriptionFile}</p>}
                                </div>
                            )}
                        </div>
                        
                        {product.stock > 0 && (
                            <div className="actions">
                                <div className="quantity">
                                    <label htmlFor="qty">Cantidad:</label>
                                    <select id="qty" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                                        {[...Array(product.stock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>{x + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <button className="add-to-cart-btn" onClick={addToCartHandler}>Añadir a la Cesta</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ProductDetailPage;
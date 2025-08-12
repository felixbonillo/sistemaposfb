import React, { useEffect, useState } from "react"


function ProductFormModal({ isOpen, onClose, onAddProduct }) {
    const [productData, setProductData] = useState({
        name: '',
        priceUSD: '',
        stock: ''
    })

    useEffect(() => {
        if (isOpen) {
            setProductData({ name: '', priceUSD: '', stock: '' }) //Resetea el formulario
        }
    }, [isOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target
        if (name === 'priceUSD' || name === 'stock') {
            setProductData({ ...productData, [name]: Number(value) || '' })
        } else {
            setProductData({ ...productData, [name]: value })
        }
    }
}

export default ProductFormModal
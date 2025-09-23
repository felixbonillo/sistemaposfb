import { useState } from "react";

export function useInventory() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", priceUSD: 500, stock: 3 },
    { id: 2, name: "Mouse", priceUSD: 20, stock: 15 },
  ]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = (product) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? { ...p, ...product } : p))
      );
    } else {
      setProducts((prev) => [...prev, { ...product, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return {
    products: filteredProducts,
    search,
    setSearch,
    isModalOpen,
    setIsModalOpen,
    editingProduct,
    handleAdd,
    handleEdit,
    handleSave,
    handleDelete,
  };
}

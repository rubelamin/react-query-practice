import { useState } from "react";
import AddProduct from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

function App() {
	const [productId, setProductId] = useState(1);
	return (
		<>
			<div className="flex m-2">
				<AddProduct />
				<ProductList productIdProp={setProductId} />
				<ProductDetails id={productId} />
			</div>
		</>
	);
}

export default App;

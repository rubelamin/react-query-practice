/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const retriveProduct = async ({ queryKey }) => {
	const response = await axios.get(
		`http://localhost:3000/${queryKey[0]}/${queryKey[1]}`
	);

	return response.data;
};

export default function ProductDetails({ id }) {
	const {
		data: product,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["products", id],
		queryFn: retriveProduct,
	});

	if (isLoading) return <div>Product details loading...</div>;
	if (error) return <div>details fetching error...</div>;

	return (
		<div className="flex flex-col items-center pl-8 w-1/5">
			<h1 className="text-2xl text-center">Product Details</h1>
			<div className="flex flex-col items-center bg-slate-300 p-4">
				<img
					className="w-2/3 border rounded-full"
					src={product.thumbnail}
					alt={product.title}
				/>
				<h2 className="text-2xl text-blue-600 font-bold my-2">
					{product.title}
				</h2>
				<p>{product.description}</p>
				<p>{product.price}</p>
				<p>{product.rating}</p>
			</div>
		</div>
	);
}

/* eslint-disable react/prop-types */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const retriveProducts = async ({ queryKey }) => {
	const response = await axios.get(
		`http://localhost:3000/${queryKey[0]}?_page=${queryKey[1].page}&_per_page=6`
	);

	return response.data;
};

export default function ProductList({ productIdProp }) {
	const [page, setPage] = useState(1);
	const {
		data: products,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["products", { page }],
		queryFn: retriveProducts,
		staleTime: 2000,
	});

	if (isLoading) return <p>Product data is loading...</p>;

	if (error) return <div>Error occured {error.message}</div>;

	return (
		<div className="flex flex-col justify-center items-center w-3/5">
			<h2 className="text-2xl text-center">Product List</h2>

			<ul className="flex flex-wrap justify-center items-center">
				{products.data &&
					products.data.map((product) => (
						<li
							className="flex flex-col my-2 items-center border rounded-sm"
							key={product.id}
						>
							<img
								className="object-cover h-40 w-52"
								src={product.thumbnail}
								alt={product.title}
							/>
							<div className="flex w-full px-4 py-2 justify-between items-center ">
								<p>{product.title}</p>
								<button
									className="bg-teal-700 border rounded-full text-white px-3 py-1"
									onClick={() => productIdProp(product.id)}
								>
									Show Details
								</button>
							</div>
						</li>
					))}
			</ul>
			<div className="flex">
				{products.prev && (
					<button
						className="m-1 p-1 bg-gray-100 border cursor-pointer rounded-sm "
						onClick={() => setPage(products.prev)}
					>
						Prev
					</button>
				)}
				{products.next && (
					<button
						className="m-1 p-1 bg-gray-100 border cursor-pointer rounded-sm "
						onClick={() => setPage(products.next)}
					>
						Next
					</button>
				)}
			</div>
		</div>
	);
}

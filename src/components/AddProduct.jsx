import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function AddProduct() {
	const queryClient = useQueryClient();

	const [state, setState] = useState({
		title: "",
		description: "",
		price: 0,
		rating: 5,
		thumbnail: "",
	});

	const changeHandler = (e) => {
		const name = e.target.name;
		const value =
			e.target.type === "number"
				? e.target.valueAsNumber
				: e.target.value;

		setState({
			...state,
			[name]: value,
		});
	};

	const mutation = useMutation({
		mutationFn: (newState) =>
			axios.post("http://localhost:3000/products", newState),
		onSuccess: () => {
			queryClient.invalidateQueries(["products"]);
			setState({
				title: "",
				description: "",
				price: 0,
				rating: 5,
				thumbnail: "",
			});
		},
	});

	const submitHandler = (event) => {
		event.preventDefault();
		const newData = { ...state, id: crypto.randomUUID().toString() };

		mutation.mutate(newData);
	};

	if (mutation.isPending) {
		return <span>Submitting...</span>;
	}

	if (mutation.isError) {
		return <span>Error occured: {mutation.error.message}</span>;
	}

	return (
		<div className="m-2 p-2 bg-gray-100 w-1/5 h-1/2">
			<h2 className="text-2xl">Add a product</h2>
			<p className="text-green-800">
				{mutation.isSuccess && "Product Added"}
			</p>
			<form className="flex flex-col" onSubmit={submitHandler}>
				<input
					type="text"
					name="title"
					value={state.title}
					onChange={changeHandler}
					placeholder="Enter a product name"
					className="m-2 p-2  rounded"
				/>

				<textarea
					name="description"
					value={state.description}
					onChange={changeHandler}
					placeholder="Enter a product description"
					className="m-2 p-2  rounded"
				></textarea>
				<input
					type="number"
					name="price"
					value={state.price}
					onChange={changeHandler}
					placeholder="Enter a product price"
					className="m-2 p-2  rounded"
				/>
				{/* <input
					type="number"
					name="rating"
					value={state.rating}
					onChange={changeHandler}
					placeholder="Enter a product rating"
					className="m-2 p-2  rounded"
				/> */}
				<input
					type="text"
					name="thumbnail"
					value={state.thumbnail}
					onChange={changeHandler}
					placeholder="thumbnail url"
					className="m-2 p-2  rounded"
				/>

				{mutation.isLoading ? (
					<p>Submitting...</p>
				) : (
					<button
						className="bg-teal-700 border rounded-full text-white px-3 py-1"
						type="submit"
					>
						Submit
					</button>
				)}
			</form>
		</div>
	);
}

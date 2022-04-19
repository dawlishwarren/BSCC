import { useRouter } from "next/router";
import { useState } from "react";
import { mutate } from "swr";

const Form = ({ formId, businessForm, forNewBusiness = true }) => {
	const router = useRouter();
	const contentType = "application/json";
	const [errors, setErrors] = useState({});
	const [message, setMessage] = useState("");

	const [form, setForm] = useState({
		name: businessForm.name,
	});
};

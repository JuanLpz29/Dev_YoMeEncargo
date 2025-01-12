const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const createVehiculo = async (props) => {
	try {
		const response = await fetch(`${API_URL}/vehiculos`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(props),
		});

		if (!response.ok) {
			throw new Error("Error al registrar el vehículo");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error en la solicitud:", error);
		throw error;
	}
};

export const createUsuario = async (props) => {
	try {
		const response = await fetch(`${API_URL}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"access-control-allow-origin": "*",
			},
			body: JSON.stringify(props),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error || "Error al registrar el usuario");
		}

		return data;
	} catch (error) {
		console.error("Error en la solicitud:", error);
		throw error;
	}
};

export const loginUsuario = async (props) => {
	try {
		const response = await fetch(`${API_URL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(props),
		});

		if (!response.ok) {
			throw new Error("Error al iniciar sesión");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error en la solicitud:", error);
		throw error;
	}
};

export const getUsuario = async (props) => {
	try {
		const response = await fetch(`${API_URL}/usuarios/${props.id}`, {
			method: "GET",
		});

		if (!response.ok) {
			throw new Error("Error al obtener el usuario");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error en la solicitud:", error);
		throw error;
	}
};

export const updateUsuario = async (props) => {
	try {
		const response = await fetch(`${API_URL}/usuarios/${props.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(props),
		});

		if (!response.ok) {
			throw new Error("Error al actualizar el usuario");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error en la solicitud:", error);
		throw error;
	}
};

//Para generar mecanicos en la BD
export const createMecanico = async (formData) => {
	const token = localStorage.getItem("token");
	try {
		const response = await fetch(`${API_URL}/mecanicos`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		});

		if (!response.ok) {
			throw new Error("Error al registrar el mecánico");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error en la solicitud:", error);
		throw error;
	}
};

export const getMecanico = async (id) => {
	const token = localStorage.getItem("token");
	try {
		const response = await fetch(`${API_URL}/mecanicos/${id}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!response.ok) {
			throw new Error("Error al obtener el mecánico");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error en la solicitud:", error);
		throw error;
	}
};

export const getMecanicos = async () => {
	try {
		const response = await fetch(`${API_URL}/mecanicos/with-user`, {
			method: "GET",
		});

		if (!response.ok) {
			throw new Error("Error al obtener los mecánicos");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error en la solicitud:", error);
		throw error;
	}
};

export const getFiles = async (props) => {
	const { type, name } = props;
	try {
		const response = await fetch(`${API_URL}/files/${type}/${name}`, {
			method: "GET",
		});

		if (!response.ok) {
			throw new Error("Error al obtener los archivos");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error en la solicitud:", error);
		throw error;
	}
};

export const createReservation = async (props) => {
	try {
		const response = await fetch(`${API_URL}/reservas`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(props),
		});

		if (!response.ok) {
			throw new Error("Error al crear la reserva");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error en la solicitud:", error);
		throw error;
	}
};

export const createRevision = async (props) => {
	try {
		const response = await fetch(`${API_URL}/revisiones`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(props),
		});

		if (!response.ok) {
			throw new Error("Error al crear la revisión");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error en la solicitud:", error);
		throw error;
	}
};

export const getRevisionesByMecanico = async (id_mecanico) => {
	try {
		const response = await fetch(
			`${API_URL}/revisiones/mecanico/${id_mecanico}`,
			{
				method: "GET",
			}
		);

		if (!response.ok) {
			throw new Error("Error al obtener las revisiones");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error en la solicitud:", error);
		throw error;
	}
};

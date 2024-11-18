export const createVehiculo = async (props) => {
	try {
		const response = await fetch("http://localhost:3000/api/vehiculos", {
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
		const response = await fetch(
			"http://localhost:3000/api/auth/register",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"access-control-allow-origin": "*",
				},
				body: JSON.stringify(props),
			}
		);

		if (!response.ok) {
			throw new Error("Error al registrar el usuario");
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error en la solicitud:", error);
		throw error;
	}
};

export const loginUsuario = async (props) => {
	try {
		const response = await fetch("http://localhost:3000/api/auth/login", {
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
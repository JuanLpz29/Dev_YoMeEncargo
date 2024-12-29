const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const revisionService = {
    async saveReport(reportData: any): Promise<string> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/revisiones`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reportData)
            });

            if (!response.ok) {
                throw new Error('Error al guardar la revisión');
            }

            const { id } = await response.json();
            return id;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    async getRevisionCompartida(id: string): Promise<any> {
        try {
            const response = await fetch(`${API_BASE_URL}/api/revisiones/${id}`);
            if (!response.ok) {
                throw new Error('Error al obtener la revisión');
            }
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    },

    generarURLCompartida(revisionId: number): string {
        return `${window.location.origin}/revision/compartir/${revisionId}`;
    }
};

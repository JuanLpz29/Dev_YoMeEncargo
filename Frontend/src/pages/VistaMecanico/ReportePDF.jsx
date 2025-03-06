import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFDownloadLink} from '@react-pdf/renderer';


// Estilos para el PDF
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        fontFamily: 'Helvetica',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    header: {
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 40,
        color: '#0056b3', // Azul fuerte para el título
    },
    section: {
        marginBottom: 10,
        paddingBottom: 10,
        borderBottom: '1px solid #ccc',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    column: {
        flex: 1,
        marginHorizontal: 5,
    },
    label: {
        fontWeight: 'bold',
        color: '#1E90FF', // Azul claro para las etiquetas
    },
    value: {
        color: '#000', // Negro para las respuestas
    },
    documentItem: {
        marginBottom: 8, // Aumentar el espacio entre los elementos de documentos
    },
    commentsBox: {
        marginTop: 10,
        marginBottom: 0,
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    commentsText: {
        fontSize: 12,
        color: '#333',
    },
    // logoContainer: {
    //     marginTop: 20,
    //     alignItems: 'center',
    // },
    // logo: {
    //     width: 100, // Ajusta el tamaño del logo
    //     height: 'auto', // Mantén la proporción
    // },
});

const ReportePDF = ({ vehicleData }) => (
    <Document>
        <Page style={styles.page}>
            <Text style={styles.header}>Reporte de Inspección YoMeEncargo</Text>

            {/* Información General */}
            <View style={styles.section}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Fecha de inspección:</Text>
                        <Text style={styles.value}>{vehicleData.fechaInspeccion}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Nombre del mecánico:</Text>
                        <Text style={styles.value}>{vehicleData.nombreMecanico}</Text>
                    </View>
                </View>
            </View>

            {/* Datos del Vehículo */}
            <View style={styles.section}>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Marca:</Text>
                        <Text style={styles.value}>{vehicleData.marca}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Modelo:</Text>
                        <Text style={styles.value}>{vehicleData.modelo}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Año:</Text>
                        <Text style={styles.value}>{vehicleData.año}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Combustible:</Text>
                        <Text style={styles.value}>{vehicleData.tipoCombustible}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Transmisión:</Text>
                        <Text style={styles.value}>{vehicleData.transmision}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Tracción:</Text>
                        <Text style={styles.value}>{vehicleData.traccion}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Kilometraje:</Text>
                        <Text style={styles.value}>{vehicleData.kilometraje}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Cilindrada:</Text>
                        <Text style={styles.value}>{vehicleData.cilindrada}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Color:</Text>
                        <Text style={styles.value}>{vehicleData.color}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={styles.column}>
                        <Text style={styles.label}>Tapicería:</Text>
                        <Text style={styles.value}>{vehicleData.tapiceria}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>Número de puertas:</Text>
                        <Text style={styles.value}>{vehicleData.numPuertas}</Text>
                    </View>
                    <View style={styles.column}>
                        <Text style={styles.label}>VIN:</Text>
                        <Text style={styles.value}>{vehicleData.vin}</Text>
                    </View>
                </View>
            </View>

            {/* Documentos */}
            <View style={styles.section}>
                <Text style={[styles.label, styles.documentItem]}>SOAP:</Text>
                <Text style={[styles.value, styles.documentItem]}>
                    Fecha: {vehicleData.soap.fecha} - {vehicleData.soap.vigencia}
                </Text>
                <Text style={[styles.label, styles.documentItem]}>Permiso de Circulación:</Text>
                <Text style={[styles.value, styles.documentItem]}>
                    Fecha: {vehicleData.permisoCirculacion.fecha} - {vehicleData.permisoCirculacion.vigencia}
                </Text>
                <Text style={[styles.label, styles.documentItem]}>Revisión Técnica:</Text>
                <Text style={[styles.value, styles.documentItem]}>
                    Fecha: {vehicleData.revisionTecnica.fecha} - {vehicleData.revisionTecnica.vigencia}
                </Text>
                <Text style={[styles.label, styles.documentItem]}>Emisión de Contaminantes:</Text>
                <Text style={[styles.value, styles.documentItem]}>
                    Fecha: {vehicleData.emisionContaminantes.fecha} - {vehicleData.emisionContaminantes.vigencia}
                </Text>
            </View>

            {/* Estado del Aceite */}
            <View style={styles.section}>
                <Text style={styles.label}>Estado del Aceite:</Text>
                <Text style={styles.value}>Estado: {vehicleData.estadoAceite.estado}  </Text>
                {vehicleData.estadoAceite.observaciones && (
                    <Text style={styles.value}>Observaciones: {vehicleData.estadoAceite.observaciones}</Text>
                )}
            </View>

            {/* Estado de los Frenos */}
            <View style={styles.section}>
                <Text style={styles.label}>Estado de los Frenos:</Text>
                <Text style={styles.value}>Estado: {vehicleData.estadoFrenos.estado}  </Text>
                {vehicleData.estadoFrenos.observaciones && (
                    <Text style={styles.value}>Observaciones: {vehicleData.estadoFrenos.observaciones}</Text>
                )}
            </View>

            {/* Prueba en Ruta */}
            <View style={styles.section}>
                <Text style={styles.label}>Prueba en Ruta:</Text>
                <Text style={styles.value}>Realizada: {vehicleData.pruebaRuta.realizada ? 'Sí' : 'No'}.  </Text>
                {vehicleData.pruebaRuta.observaciones && (
                    <Text style={styles.value}>Observaciones: {vehicleData.pruebaRuta.observaciones}</Text>
                )}
            </View>

            {/* Estado de los Neumáticos */}
            <View style={styles.section}>
                <Text style={styles.label}>Estado de los Neumáticos:</Text>
                <Text style={styles.value}>Estado: {vehicleData.estadoNeumaticos.estado}  </Text>
                {vehicleData.estadoNeumaticos.observaciones && (
                    <Text style={styles.value}>Observaciones: {vehicleData.estadoNeumaticos.observaciones}</Text>
                )}
            </View>

            {/* Comentarios Finales */}
            <View style={styles.section}>
                <Text style={styles.label}>Comentarios Finales:</Text>
                <View style={styles.commentsBox}>
                    <Text style={styles.commentsText}>{vehicleData.comentarios}</Text>
                </View>
            </View>

            {/* Logo al final */}
            {/* <View style={styles.logoContainer}>
                <Image src="/img/logoyme-secondary.svg" style={styles.logo} />
            </View> */}
        </Page>
    </Document>
);

const DownloadLink = ({ vehicleData }) => (
    <PDFDownloadLink
        document={<ReportePDF vehicleData={vehicleData} />}
        fileName="reporte.pdf"
    >
    Descargar PDF
    </PDFDownloadLink>
);

export default DownloadLink;
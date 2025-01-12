import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import Hero from "../components/Hero";
import HeroMecanico from "./VistaMecanico/HeroMecanico";
import FAQs from "../components/FAQs";
import Footer from "../components/footer";


const HomePage = () => {
	const usuario = JSON.parse(localStorage.getItem("usuario"));
	return (
		<>
			<NavBar />
			{usuario?.rol === "MECANICO" ? <HeroMecanico /> : <Hero />}
			<FAQs />
			<Footer />
		</>
	);
};

export default HomePage;
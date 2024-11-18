const Footer = () => {
	return (
		<footer className="bg-black text-white p-8 flex justify-center items-center">
			<div className="flex w-1/6 min-w-40">
				<a href="./">
					<img src="img/logoyme.svg" alt="logo" className="w-full" />
				</a>
			</div>
			<div className="text-center text-xs md:text-sm text-gray-400">
				© 2024 YoMeEncargo S.A. - VALDIVIA - CHILE
			</div>
		</footer>
	);
};

export default Footer;

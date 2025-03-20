const Footer = () => {
    return (
        <footer className="bg-gray-400 text-white py-10 mt-10">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                
                {/* About Section */}
                <div>
                    <h3 className="text-2xl font-bold mb-3">Organic Farm Market</h3>
                    <p className="text-gray-300 text-sm">
                        Fresh & organic products delivered to your doorstep.  
                        Supporting healthy living & sustainable farming.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-xl font-bold mb-3">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-gray-300 transition">Home</a></li>
                        <li><a href="#" className="hover:text-gray-300 transition">Shop</a></li>
                        <li><a href="#" className="hover:text-gray-300 transition">About Us</a></li>
                        <li><a href="#" className="hover:text-gray-300 transition">Contact</a></li>
                    </ul>
                </div>

                {/* Contact Section */}
                <div>
                    <h3 className="text-xl font-bold mb-3">Contact Us</h3>
                    <p className="text-gray-300 text-sm">📍 123 Green Street, Farmville</p>
                    <p className="text-gray-300 text-sm">📞 +1 (234) 567-890</p>
                    <p className="text-gray-300 text-sm">📧 support@organicfarm.com</p>
                </div>
            </div>

            {/* Social Media & Copyright */}
            <div className="mt-8 border-t border-gray-500 pt-4 text-center">
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="#" className="hover:text-gray-300 transition"><i className="fab fa-facebook text-xl"></i></a>
                    <a href="#" className="hover:text-gray-300 transition"><i className="fab fa-twitter text-xl"></i></a>
                    <a href="#" className="hover:text-gray-300 transition"><i className="fab fa-instagram text-xl"></i></a>
                    <a href="#" className="hover:text-gray-300 transition"><i className="fab fa-linkedin text-xl"></i></a>
                </div>
                <p className="text-sm text-gray-300">
                    &copy; {new Date().getFullYear()} Organic Farm Market - All Rights Reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Footer from "./Footer";
import logo from '../assets/FarmNet_logo.png'

const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 1280 }, items: 4 },
    desktop: { breakpoint: { max: 1280, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 768 }, items: 2 },
    mobile: { breakpoint: { max: 768, min: 0 }, items: 1 },
};

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    const brandLogos = [
        `${logo}`,
        `${logo}`,
        `${logo}`,
        `${logo}`,
        `${logo}`
    ];

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/products");
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-lg font-semibold text-gray-600">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 font-sans">
            {/* Hero Carousel */}
            <div className="relative w-full">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    className="w-full h-[60vh]"
                >
                    {products.slice(0, 5).map((product) => (
                        <SwiperSlide key={product._id} className="relative">
                            <div className="relative w-full h-[60vh]">
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-5">
                                    <h1 className="text-5xl font-bold">Welcome to Organic Farm Market</h1>
                                    <p className="mt-2 text-lg">Fresh, Organic & Locally Sourced Products</p> <br />  <br />
                                    <button style={{ border: "2px solid pink", padding: "5px 15px", borderRadius: "50px" }}>SHOP NOW</button>
                                </div>

                            </div>

                        </SwiperSlide>

                    ))}
                </Swiper>
            </div>

            <div style={{ width: "100%", height: "6vh", marginTop: "25px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div style={{ width: "25%", border: "1px solid", padding: "8px", paddingLeft: "25px", paddingRight: "25px" }}>
                    <p>FREE SHIPPING ON ORDERS OVER $200</p>
                </div>
                <div style={{ width: "25%", border: "1px solid", padding: "8px", paddingLeft: "25px", paddingRight: "25px" }}>
                    <p>30 -DAY RETURNS MONEY BACK</p>
                </div>
                <div style={{ width: "25%", border: "1px solid", padding: "8px", paddingLeft: "25px", paddingRight: "25px" }}>
                    <p>24/7 SUPPORT</p>
                </div>
            </div>


            {/* Top Categories Section */}
            <section className="container mx-auto my-8 px-4">
                <h2 className="text-3xl font-bold text-center mb-6">Top Categories</h2>
                <div className="bg-gray-200 shadow-l rounded-xl p-4 mx-auto max-w-6xl">
                    <div className="p-4">
                        <Carousel
                            responsive={responsive}
                            infinite={true}
                            autoPlay={false}
                            autoPlaySpeed={2500}
                            arrows={true}
                            showDots={false}
                            className="py-4"
                        >
                            {[...new Map(products.map((product) => [product.category, product])).values()].map((categoryItem, index) => (
                                <div key={index} className="flex flex-col items-center justify-center">
                                    <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
                                        <img
                                            src={categoryItem.images[0]}
                                            alt={categoryItem.category}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <p className="mt-2 font-semibold text-lg text-center">{categoryItem.category}</p>
                                </div>
                            ))}
                        </Carousel>
                    </div>
                </div>
            </section>


            <section className="container mx-auto px-10">
                <h2 className="text-4xl font-bold text-center mt-12 text-gray-800">✨ Products ✨</h2>

                <Carousel
                    responsive={responsive}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    arrows={true}
                    showDots={true}
                    className="py-4"
                >
                    {products.map((product) => (
                        <div key={product._id} className="px-2">
                            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                                <div className="m-4  border-2 border-gray-100 rounded-lg">
                                    <img
                                        src={product.images[0]}
                                        alt={product.name}
                                        className="w-full h-64 object-cover rounded-t-lg"
                                    />
                                </div>
                                <div className="p-4 text-center">
                                    <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>

                                    <p className="text-green-600 font-semibold text-lg mt-2">${product.price.toFixed(2)}</p>
                                    <button className="mt-4 w-full bg-blue-400 text-white font-bold py-2 rounded-lg hover:bg-blue-500 transition">
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>

            </section>


           {/** About section */}
            <section className="container mx-auto my-10 px-6">
                {/* Heading */}
                <h1 className="text-4xl font-bold text-center mb-6">About FarmNet</h1>

                {/* Content Section */}
                <div className="flex flex-col md:flex-row mx-20 items-center gap-8">
                    {/* Text Content */}
                    <div className="md:w-1/2 text-gray-700">
                        <p className="text-lg leading-relaxed">
                            FarmNet is dedicated to connecting farmers with fresh, organic <br/>
                            produce buyers, ensuring a sustainable and eco-friendly <br/>
                            farming experience. Our platform bridges the gap between <br/>
                            rural farms and urban consumers, making healthy food  <br/>
                            accessible to everyone.
                        </p>
                    </div>

                    {/* Image Section */}
                    <div className="md:w-1/2">
                        <img
                            src="https://foodsafetyhelpline.com/wp-content/uploads/2020/04/Increasing-Need-for-Food-Safety-in-Fruits-and-Vegetables-1024x512.jpg"
                            alt="FarmNet Image"
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Brand Logos Carousel */}
            <div className=" mx-auto p-5">
                <h2 className="text-3xl font-bold text-center my-8">Our Brands</h2>
                <div className="w-90 gap-10 rounded-xl bg-blue-100 h-40 flex flex-row items-center justify-center mx-20">
                    <img src={logo} alt={`logo`} className="w-40 rounded-full" />
                    <img src={logo} alt={`logo`} className="w-40 rounded-full" />
                    <img src={logo} alt={`logo`} className="w-40 rounded-full" />
                    <img src={logo} alt={`logo`} className="w-40 rounded-full" />
                    <img src={logo} alt={`logo`} className="w-40 rounded-full" />
                </div>

            </div>


            {/* Footer */}
            <Footer />
        </div>
    );
};


export default Home;

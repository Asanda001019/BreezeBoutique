import React from 'react';
import backgroundImage from '../assets/image2.jpg'; // Replace with your actual image path

const Home = () => {
    return (
        <div
            className="relative bg-gradient-to-b from-green-50 to-green-100"
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <header className="absolute inset-x-0 top-0 z-10 w-full">
                <div className="px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        <div className="flex-shrink-0">
                            {/* Logo or brand name can go here */}
                        </div>

                        <button
                            type="button"
                            className="inline-flex items-center p-2 text-sm text-white uppercase transition-all duration-200 bg-black lg:hidden focus:bg-gray-800 hover:bg-gray-800"
                        >
                            <svg className="block w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                            <svg className="hidden w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Menu
                        </button>
                    </div>
                </div>
            </header>

            <section className="overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-stretch lg:max-h-[900px] lg:min-h-[900px]">
                    <div className="flex items-center justify-center w-full lg:order-2 lg:w-7/12">
                        <div className="h-full px-4 pt-24 pb-16 sm:px-6 lg:px-24 2xl:px-32 lg:pt-40 lg:pb-14">
                            <div className="flex flex-col justify-between flex-1 h-full">
                                <div>
                                    <h1 className="text-4xl font-bold text-black sm:text-6xl xl:text-7xl">Experience Luxury <br /> Like Never Before</h1>
                                    <p className="mt-6 text-base text-black sm:text-xl">
                                        Discover exceptional accommodations tailored to your needs. From modern amenities to breathtaking views, we ensure your stay is unforgettable.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-full overflow-hidden lg:w-5/12 lg:order-1">
                        <div className="lg:absolute lg:bottom-0 lg:left-0">
                            {/* You can add any additional content or images here */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

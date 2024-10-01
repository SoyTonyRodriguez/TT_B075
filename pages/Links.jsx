import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from './Navigation/Navigation'; 

// InfoCard component to display information with an image
function InfoCard({ title, subtitle, linkText, linkHref, image }) {
    return (
        <div className="info-card bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            {image && <img src={image} alt={title} className="w-full h-40 object-cover rounded-lg mb-4" />}
            <h3 className="text-lg font-bold text-blue-500 mb-2">{title}</h3>
            {subtitle && <p className="text-gray-700 mb-4">{subtitle}</p>}
            <a href={linkHref} className="text-blue-500 font-semibold hover:underline">{linkText}</a>
        </div>
    );
}

// Links component that contains both the navigation and information cards
function Links() {
    // Sample data for each card with images
    const infoData = [
        { title: "Noticia", subtitle: "Mario Barbosa", linkText: "Leer", linkHref: "#", image: "https://via.placeholder.com/300x150" },
        { title: "¿Conoces las condiciones para que acepten tu promoción?", subtitle: "", linkText: "Leer", linkHref: "#", image: "https://via.placeholder.com/300x150" },
        { title: "Noticia", subtitle: "Condiciones Generales para Proceso de promoción docente", linkText: "Leer", linkHref: "#", image: "https://via.placeholder.com/300x150" },
        { title: "¿Sabes las condiciones sobre tutorados para ser válidas?", subtitle: "", linkText: "Leer", linkHref: "#", image: "https://via.placeholder.com/300x150" },
        { title: "Artículo", subtitle: "Liferay", linkText: "Leer", linkHref: "#", image: "https://via.placeholder.com/300x150" },
        { title: "Docentes aceptados durante los procesos de años anteriores", subtitle: "", linkText: "Leer", linkHref: "#", image: "https://via.placeholder.com/300x150" },
        { title: "Historia sobre la promoción docente en el IPN",  linkText: "Leer", linkHref: "#", image: "https://via.placeholder.com/300x150" },
        { title: "Reglamento de promoción docente", subtitle: "", linkText: "Leer", linkHref: "#", image: "https://via.placeholder.com/300x150" },
    ];

    return (
        <div className="min-h-screen bg-cover bg-center">
        {/* navegación fija */}
            <Navigation />
    
            <hr className="border-t-2 border-black my-4" />

            {/* Información Cards Section */}
            <div className="mt-10 px-16 mb-8">
                <h2 className="text-center text-3xl font-bold mb-8">Más información</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {infoData.map((item, index) => (
                        <InfoCard 
                            key={index} 
                            title={item.title} 
                            subtitle={item.subtitle} 
                            linkText={item.linkText} 
                            linkHref={item.linkHref} 
                            image={item.image} // Pass image to each card
                        />
                    ))}
                </div>
            </div>

        </div>
    );
}

export default Links;

import React from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const OfertaCardOfertas = ({ offer }) => {
    const {
        title,
        regularPrice,
        offerPrice,
        startDate,
        endDate,
        couponLimit,
        description,
        imageUrl,
    } = offer;

    const availableCoupons = couponLimit ? Math.max(couponLimit - 0, 0) : "Ilimitado";

    return (
        <div className="flex border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
            <div className="w-1/3">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="w-2/3 p-4 flex flex-col justify-between">
                <div>
                    <h3 className="font-semibold text-lg mb-1 text-gray-800">{title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{description}</p>
                    <p className="text-sm text-gray-600 mb-1">
                        <strong>Precio Regular:</strong> ${regularPrice}
                    </p>
                    <p className="text-sm font-bold text-purple-600 mb-2">
                        Precio Oferta: ${offerPrice}
                    </p>
                    <p className="text-sm text-gray-600">
                        <strong>Vigencia:</strong> {startDate} - {endDate}
                    </p>
                </div>
                <div className="flex justify-end mt-4">
                    <Link
                        to="/ofertas/1"
                        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
                    >
                        Ver Detalles
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OfertaCardOfertas;
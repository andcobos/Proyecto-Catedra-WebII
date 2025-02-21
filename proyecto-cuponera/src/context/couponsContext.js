import { createContext, useState, useContext } from "react";

const CouponsContext = createContext();

export const CouponsProvider = ({ children }) => {
    const [coupons, setCoupons] = useState([
        { id: "ABC123", buyerDUI: "01234567-8", redeemed: false },
        { id: "XYZ789", buyerDUI: "87654321-0", redeemed: false },
    ]);

    const redeemCoupon = (couponCode, userDUI) => {
        setCoupons((prevCoupons) =>
            prevCoupons.map((coupon) =>
                coupon.id === couponCode && coupon.buyerDUI === userDUI && !coupon.redeemed
                    ? { ...coupon, redeemed: true }
                    : coupon
            )
        );

        const foundCoupon = coupons.find((c) => c.id === couponCode);
        if (!foundCoupon) return { success: false, message: "El cupón no existe." };
        if (foundCoupon.redeemed) return { success: false, message: "El cupón ya fue canjeado." };
        if (foundCoupon.buyerDUI !== userDUI) return { success: false, message: "DUI incorrecto." };

        return { success: true, message: "Cupón canjeado con éxito." };
    };

    return (
        <CouponsContext.Provider value={{ coupons, redeemCoupon }}>
            {children}
        </CouponsContext.Provider>
    );
};

export const useCoupons = () => useContext(CouponsContext);

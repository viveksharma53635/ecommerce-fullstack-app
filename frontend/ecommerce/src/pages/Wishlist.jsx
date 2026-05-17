import { useEffect, useState } from "react";

import {
    getWishlist,
    removeWishlist,
    moveToCart,
} from "../services/wishlistService";

function Wishlist() {

    const [wishlist, setWishlist] = useState([]);

    const customerId = 1;

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {

        const res = await getWishlist(customerId);

        setWishlist(res.data);
    };

    // Remove Wishlist Item
    const handleRemove = async (id) => {

        await removeWishlist(id);

        alert("Removed from Wishlist");

        fetchWishlist();
    };

    // Move to Cart
    const handleMoveToCart = async (id) => {

        await moveToCart(id);

        alert("Moved to Cart");

        fetchWishlist();
    };

    return (

        <div className="container mt-5">
            <h2 className="fw-bold mb-4">
                My Wishlist
            </h2>
            <table className="table table-bordered">

                <thead className="table-dark">

                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {wishlist.map((item) => (

                        <tr key={item.wishlistId}>

                            <td>{item.productName}</td>

                            <td>₹{item.price}</td>

                            <td>{item.availability}</td>

                            <td>

                                <button
                                    className="btn btn-success btn-sm me-2"
                                    onClick={() =>
                                        handleMoveToCart(item.wishlistId)
                                    }
                                >
                                    Move to Cart
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        handleRemove(item.wishlistId)
                                    }
                                >
                                    Remove
                                </button>

                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default Wishlist;
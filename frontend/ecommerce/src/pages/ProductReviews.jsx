import {
  useEffect,
  useState
} from "react";

import {
  addReview,
  getProductReviews
} from "../services/reviewService";

function ProductReviews() {

  const [reviews, setReviews] =
    useState([]);

  const [form, setForm] =
    useState({
      productId: "",
      customerId: "",
      rating: "",
      reviewText: "",
    });

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {

    if (!form.productId) return;

    const res =
      await getProductReviews(
        form.productId
      );

    setReviews(res.data);
  };

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await addReview({
      ...form,
      rating: Number(form.rating),
      productId: Number(form.productId),
      customerId: Number(form.customerId),
    });

    alert(
      "Review submitted for approval"
    );

    setForm({
      productId: "",
      customerId: "",
      rating: "",
      reviewText: "",
    });
  };

  return (

    <div className="container mt-5">

      <div className="card p-4 shadow">

        <h2 className="mb-4">
          Product Reviews
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="number"
            name="productId"
            placeholder="Product ID"
            className="form-control mb-2"
            value={form.productId}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="customerId"
            placeholder="Customer ID"
            className="form-control mb-2"
            value={form.customerId}
            onChange={handleChange}
            required
          />

          <select
            name="rating"
            className="form-select mb-2"
            value={form.rating}
            onChange={handleChange}
            required
          >

            <option value="">
              Select Rating
            </option>

            <option value="1">⭐ 1</option>
            <option value="2">⭐⭐ 2</option>
            <option value="3">⭐⭐⭐ 3</option>
            <option value="4">⭐⭐⭐⭐ 4</option>
            <option value="5">⭐⭐⭐⭐⭐ 5</option>

          </select>

          <textarea
            name="reviewText"
            placeholder="Write review"
            className="form-control mb-3"
            rows="4"
            value={form.reviewText}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary">
            Submit Review
          </button>

        </form>

      </div>

      <div className="mt-5">

        <button
          className="btn btn-dark mb-3"
          onClick={fetchReviews}
        >
          Load Reviews
        </button>

        {reviews.map((review) => (

          <div
            key={review.reviewId}
            className="card p-3 mb-3 shadow-sm"
          >

            <h5>
              {"⭐".repeat(review.rating)}
            </h5>

            <p>{review.reviewText}</p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ProductReviews;
import {
  useEffect,
  useState
} from "react";

import {
  getAllReviews,
  approveReview,
  deleteReview
} from "../services/reviewService";

function ReviewDashboard() {

  const [reviews, setReviews] =
    useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {

    const res =
      await getAllReviews();

    setReviews(res.data);
  };

  // Approve Review
  const handleApprove = async (id) => {

    await approveReview(id);

    alert("Review Approved");

    fetchReviews();
  };

  // Delete Review
  const handleDelete = async (id) => {

    if (
      window.confirm(
        "Delete this review?"
      )
    ) {

      await deleteReview(id);

      fetchReviews();
    }
  };

  return (

    <div className="container mt-5">

      <h2 className="mb-4">
        Review Moderation Dashboard
      </h2>

      <table className="table table-bordered">

        <thead className="table-dark">

          <tr>
            <th>Review ID</th>
            <th>Product ID</th>
            <th>Customer ID</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {reviews.map((review) => (

            <tr key={review.reviewId}>

              <td>{review.reviewId}</td>

              <td>{review.productId}</td>

              <td>{review.customerId}</td>

              <td>
                {"⭐".repeat(review.rating)}
              </td>

              <td>{review.reviewText}</td>

              <td>

                {review.status ? (

                  <span className="badge bg-success">
                    Approved
                  </span>

                ) : (

                  <span className="badge bg-warning">
                    Pending
                  </span>
                )}

              </td>

              <td>

                {!review.status && (

                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() =>
                      handleApprove(
                        review.reviewId
                      )
                    }
                  >
                    Approve
                  </button>
                )}

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    handleDelete(
                      review.reviewId
                    )
                  }
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ReviewDashboard;
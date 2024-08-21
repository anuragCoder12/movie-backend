const Review = require('../models/review')
const Products = require('../models/products')

// create new review
const createReview = async(req, res) => {

    try {
        const review = new Review({...req.body, productSlug: req.params.productSlug})
    await review.save()
    const product = await Products.findOne({slug: req.params.productSlug})
  // Add the review ID to the product's reviewIds array
   product.reviewId.push(review._id)
  // Save the updated product
  await product.save();
    res.status(200).json({
        success: true,
        message: "review added successfully",
        data: review
    })
    } catch (error) {
      res.status(400).json({ message: error.message })  
    }
}
// Update the review
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params
  const review = await Review.findOneAndUpdate( { _id: reviewId },  { $set: req.body }, {new: true})
    res.status(200).json({
      success: true,
      message: "got all reviews successfully",
      data: review
    })
  } catch (error) {
  res.status(400).json({message: error.message})  
  }
}
// Delete a review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;

    // Find the review by its ID and delete it
    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Remove the review ID from the product's reviewIds array
    await Products.findOneAndUpdate(
      { slug: req.params.productSlug },
      { $pull: { reviewId: review._id } }
    );

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
    createReview,
    updateReview,
    deleteReview
}

// The $set operator in MongoDB is used to update the value
//  of a field in a document. It allows you to specify the fields
//   that you want to update and the new values for those fields. 
//   When used in an update operation, $set only modifies the fields 
//   you specify without affecting the other fields in the document.



// The $pull operator in MongoDB
//  is used to remove all instances of a specified value from an array.
//   It is useful when you want to delete certain elements from an array field in a document.
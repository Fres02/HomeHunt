import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },

      propertyType: {
        type: String,
        required: true,
        enum: ['House', 'Flat', 'Apartment', 'Villa', 'Other'],
      },
      
      regularPrice: {
        type: Number,
        required: true,
      },

      discountPrice: {
        type: Number,
        required: true,
      },

      floors: {
        type: Number,
        required: true,
      },

      floorNumber: {
        type: Number,
        required: true,
      },

      bathrooms: {
        type: Number,
        required: true,
      },
      bedrooms: {
        type: Number,
        required: true,
      },
      furnished: {
        type: Boolean,
        required: true,
      },
      parking: {
        type: Boolean,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },

      offer: {
        type: Boolean,
        required: true,
      },
      imageUrls: {
        type: Array,
        required: true,
      },

      telephone: {
        type: String,
        required: true,
      },

      contactEmail: {
        type: String,
        required: true,
      },

      userRef: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  
  const Listing = mongoose.model('Listing', listingSchema);
  
  export default Listing;
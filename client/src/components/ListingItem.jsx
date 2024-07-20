import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing }) {

    return (
        <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg w-full sm:w-[330px] overflow-hidden">
          <Link to={`/listing/${listing._id}`} className="block">
            <div className="relative">
              <img
                src={
                  listing.imageUrls[0] ||
                  'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
                }
                alt="listing cover"
                className="h-[320px] sm:h-[220px] w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              {listing.offer && (
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold py-1 px-2 rounded">
                  Offer
                </div>
              )}
            </div>
            <div className="p-4 flex flex-col gap-3">
              <p className="truncate text-lg font-semibold text-slate-700">{listing.name}</p>
              <div className="flex items-center gap-1 text-gray-600">
                <MdLocationOn className="h-4 w-4 text-blue-700" />
                <p className="text-sm truncate">{listing.address}</p>
              </div>
              <p className="text-sm text-blue-700 font-semibold">{listing.propertyType}</p>
              <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>
              <p className="text-slate-500 mt-2 font-semibold text-lg">
                LKR {listing.offer
                  ? listing.discountPrice.toLocaleString('en-US')
                  : listing.regularPrice.toLocaleString('en-US')}
                {listing.type === 'rent' && ' / month'}
              </p>
              <div className="text-slate-700 flex gap-4 text-xs font-bold">
                <div>
                  {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
                </div>
                <div>
                  {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
                </div>
                {listing.floors && (
                  <div>
                    {listing.floors} floors
                  </div>
                )}
                {(listing.propertyType === 'Flat' || listing.propertyType === 'Apartment') && listing.floors > 1 && listing.floorNumber && (
                  <div>
                    Floor: {listing.floorNumber}
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
      );
      
}
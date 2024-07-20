import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import { MdLocationOn } from 'react-icons/md';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked } = e.target;
  
    if (id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: value });
    } else if (id === 'type') {
      setSidebardata({ ...sidebardata, type: value });
    } else if (id === 'parking' || id === 'furnished' || id === 'offer') {
      setSidebardata({
        ...sidebardata,
        [id]: checked,
      });
    } else if (id === 'sort_order') {
      const [sort, order] = value.split('_');
      setSidebardata({ ...sidebardata, sort: sort || 'created_at', order: order || 'desc' });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="p-7 bg-blue-50 shadow-lg rounded-full mb-6">
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6 md:gap-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-1">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Term:</label>
              <input
                type="text"
                id="searchTerm"
                placeholder="Search for properties..."
                className="w-full border rounded-full py-2 px-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sidebardata.searchTerm}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 flex-1">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Type:</label>
                <select
  id="type"
  onChange={handleChange}
  value={sidebardata.type} // Ensure the value is correctly set
  className="w-full border rounded-full py-2 px-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  <option value="all">All</option>
  <option value="rent">Rent</option>
  <option value="sale">Sale</option>
</select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort:</label>
                <select
                  onChange={handleChange}
                  defaultValue="created_at_desc"
                  id="sort_order"
                  className="w-full border rounded-full py-2 px-4 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="regularPrice_desc">Price high to low</option>
                  <option value="regularPrice_asc">Price low to high</option>
                  <option value="createdAt_desc">Latest</option>
                  <option value="createdAt_asc">Oldest</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="parking"
                  className="accent-blue-600 rounded-full"
                  onChange={handleChange}
                  checked={sidebardata.parking}
                />
                <label htmlFor="parking" className="ml-2 text-sm text-gray-700">Parking</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="furnished"
                  className="accent-blue-600 rounded-full"
                  onChange={handleChange}
                  checked={sidebardata.furnished}
                />
                <label htmlFor="furnished" className="ml-2 text-sm text-gray-700">Furnished</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="offer"
                  className="accent-blue-600 rounded-full"
                  onChange={handleChange}
                  checked={sidebardata.offer}
                />
                <label htmlFor="offer" className="ml-2 text-sm text-gray-700">Offer</label>
              </div>
            </div>
            <button className="bg-blue-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105">
              Search
            </button>
          </div>
        </form>
      </div>
      <div className="flex-1 p-7">
        <h1 className="text-3xl font-semibold text-slate-700 mb-5 uppercase">
          See What We Got:
        </h1>
        <div className="flex flex-wrap gap-6">
          {!loading && listings.length === 0 && (
            <p className="text-gray-600 text-center w-full">No property found</p>
          )}
          {loading && <p className="text-gray-600 text-center w-full">Loading...</p>}
          {!loading && listings && listings.map((listing) => (
            <div
              key={listing._id}
              className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-md w-full sm:w-[330px] overflow-hidden"
            >
              <Link to={`/listing/${listing._id}`} className="block">
                <div className="relative">
                  <img
                    src={listing.imageUrls[0] ||
                      'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'}
                    alt="listing cover"
                    className="h-[320px] sm:h-[220px] w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {listing.offer && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold py-1 px-2 rounded-full">
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
                      <div>{listing.floors} floors</div>
                    )}
                    {(listing.propertyType === 'Flat' || listing.propertyType === 'Apartment') && listing.floors > 1 && listing.floorNumber && (
                      <div>Floor: {listing.floorNumber}</div>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-blue-600 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

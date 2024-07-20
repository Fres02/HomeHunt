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
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }

    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';

      const order = e.target.value.split('_')[1] || 'desc';

      setSidebardata({ ...sidebardata, sort, order });
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
  <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
    <div className="p-7 border-b-2 md:border-r-2 bg-blue-50 shadow-md md:min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <label className="whitespace-nowrap font-semibold text-slate-700">Search Term:</label>
          <input
            type="text"
            id="searchTerm"
            placeholder="Search..."
            className="bg-white  border rounded-full p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={sidebardata.searchTerm}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-700">Type:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5 h-5 accent-blue-600"
                onChange={handleChange}
                checked={sidebardata.type === 'all'}
              />
              <span>Rent & Sale</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5 h-5 accent-blue-600"
                onChange={handleChange}
                checked={sidebardata.type === 'rent'}
              />
              <span>Rent</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5 h-5 accent-blue-600"
                onChange={handleChange}
                checked={sidebardata.type === 'sale'}
              />
              <span>Sale</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5 h-5 accent-blue-600"
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-slate-700">Facilities:</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5 h-5 accent-blue-600"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 h-5 accent-blue-600"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </label>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-semibold text-slate-700">Sort:</label>
          <select
            onChange={handleChange}
            defaultValue="created_at_desc"
            id="sort_order"
            className="border rounded-full p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="regularPrice_desc">Price high to low</option>
            <option value="regularPrice_asc">Price low to high</option>
            <option value="createdAt_desc">Latest</option>
            <option value="createdAt_asc">Oldest</option>
          </select>
        </div>
        <button className="bg-blue-600 text-white p-3 rounded-full uppercase hover:bg-blue-700 transition">
          Search
        </button>
      </form>
    </div>
    <div className="flex-1 p-7">
      <h1 className="text-3xl font-semibold text-slate-700 mb-5 uppercase">
        See What We Got:
      </h1>
      <div className="flex flex-wrap gap-6">
        {!loading && listings.length === 0 && (
          <p className="text-xl text-slate-700">No roperty found!</p>
        )}
        {loading && (
          <p className="text-xl text-slate-700 text-center w-full">Loading...</p>
        )}
        {!loading && listings && listings.map((listing) => (
          <div
            key={listing._id}
            className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg w-full sm:w-[330px] overflow-hidden"
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
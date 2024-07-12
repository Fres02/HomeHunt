import React, { useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import {useSelector} from 'react-redux' ;
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function CreateListing() {

  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const [files, setFiles] = useState([])

  const [formData, setFormData] = useState({
    imageUrls : [],
    name:'',
    description:'',
    address:'',
    propertyType: 'House',
    type:'rent',
    floors: 1,
    floorNumber:1,
    bedrooms:1,
    bathrooms:1,
    regularPrice:5000,
    discountPrice:0,
    offer: false,
    parking:false,
    furnished:false,

  });

  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error,setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data);
    };

    fetchListing();
  }, []);

  console.log(formData);



  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7 ){
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for ( let i = 0; i < files.length; i++){
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls)=>{
        setFormData({...formData, imageUrls:formData.imageUrls.concat(urls)});
        setImageUploadError(false);
        setUploading(false);
      }).catch((err) =>{
        setImageUploadError('Image upload failed');
      });
    }

    else{
      setImageUploadError('Only 6 images can be uploaded.');
      setUploading(false);
    }
  };

  const storeImage = async (files) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + files.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, files);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = 
            (snapshot.bytesTransferred/snapshot.totalBytes)*100
            console.log(`Upload is ${progress}% done`);
        },

        (error) =>{
          reject(error);
        },
        () =>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            resolve(downloadURL);
          });
        }
      );
    });
  }

  const handleRemoveImage=(index)=>{
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_,i) => i !==index),
    });
  };


  const handleChange=(e)=>{
    if(e.target.id == 'sale' || e.target.id == 'rent'){
      setFormData({
        ...formData,
        type: e.target.id
      })
    }
    if(e.target.id=='parking' || e.target.id === 'furnished' || e.target.id == 'offer'){
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked
      })
    }
    if(e.target.type == 'number'||e.target.type =='text' || e.target.type =='textarea'){
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      })
    }
    //select property type option
    if (e.target.id === 'propertyType') {
      setFormData({
        ...formData,
        propertyType: e.target.value,
      });
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.listingId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center py-10" style={{ backgroundImage: `url('/imageback.jpg')` }}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full mx-4">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">Update My Property</h1>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 flex-1">
            <input type="text" onChange={handleChange} value={formData.name} placeholder="Title" className="border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" id="name" minLength={5} maxLength={62} required />
            <input type="text" onChange={handleChange} value={formData.description} placeholder="Description" className="border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" id="description" minLength={10} maxLength={200} required />
            <input type="text" onChange={handleChange} value={formData.address} placeholder="Address" className="border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" id="address" required />

            <select id="propertyType" className="border p-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={handleChange} value={formData.propertyType}>
              <option value="House">House</option>
              <option value="Flat">Flat</option>
              <option value="Apartment">Apartment</option>
              <option value="Villa">Villa</option>
              <option value="Other">Other</option>
            </select>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
              <input type="checkbox" onChange={handleChange} checked={formData.type === 'sale'} id="sale" className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
                <span>Sell</span>
              </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" onChange={handleChange} checked={formData.type === 'rent'} id="rent" className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
              <span>Rent</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" onChange={handleChange} checked={formData.parking} id="parking" className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
              <span>Parking Spot</span>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" onChange={handleChange} checked={formData.furnished} id="furnished" className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
                <span>Furnished</span>
              </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" onChange={handleChange} checked={formData.offer} id="offer" className="w-5 h-5 text-indigo-600 focus:ring-indigo-500" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-14">
              <div className="flex items-center gap-2">
                <input type="number" onChange={handleChange} value={formData.floors} id="floors" min="1" max="50" required className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                <span>Floors</span>
              </div>

              {formData.floors > 1 && (formData.propertyType === 'Flat' || formData.propertyType === 'Apartment') && (
              <div className="flex items-center gap-2">
                <input type="number" id="floorNumber" min="1" max={formData.floors} required className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" onChange={handleChange} value={formData.floorNumber} />
                <span>Floor Number</span>
              </div>
              )}
          </div>

          <div className="flex items-center gap-7">
            <div className="flex items-center gap-2">
              <input type="number" onChange={handleChange} value={formData.bedrooms} id="bedrooms" min="1" max="20" required className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <span>Bedrooms</span>
            </div>

            <div className="flex items-center gap-2">
              <input type="number" onChange={handleChange} value={formData.bathrooms} id="bathrooms" min="1" max="20" required className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <span>Bathrooms</span>
            </div>
          </div>

          <div className="flex items-center gap-7">
            <input type="number" onChange={handleChange} value={formData.regularPrice} id="regularPrice" min="5000" className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <div className="flex flex-col items-center">
              <span>Regular Price</span>
            {formData.type === 'rent' && <span className="text-xs text-gray-600">(LKR / month)</span>}
            </div>
          </div>

          {formData.offer && (
          <div className="flex items-center gap-7">
            <input type="number" onChange={handleChange} value={formData.discountPrice} id="discountPrice" min="0" className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <div className="flex flex-col items-center">
                <span>Discount Price</span>
                {formData.type === 'rent' && <span className="text-xs text-gray-600">(LKR / month)</span>}
              </div>
          </div>
          )}
        </div>
      </div>

  <div className="flex flex-col flex-1 gap-4">
    <p className="font-semibold">Images: 
      <span className="font-normal text-gray-600 ml-2">The first image will be the cover (max-6)</span>
    </p>
    <div className="flex gap-4">
      <input onChange={(e) => setFiles(e.target.files)} className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full" type="file" id="images" accept="image/*" multiple />
      <button type="button" onClick={handleImageSubmit} disabled={uploading} className="p-3 text-green-600 border border-green-600 rounded-md uppercase hover:bg-green-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-80">{uploading ? 'Uploading...' : 'Upload'}</button>
    </div>

    <p className="text-red-600 text-sm">{imageUploadError && imageUploadError}</p>

    {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
      <div key={url} className="flex justify-between p-3 border items-center">
        <img src={url} alt="listing image" className="w-20 h-20 object-contain rounded-md" />
        <button type="button" onClick={() => handleRemoveImage(index)} className="p-3 text-red-700 rounded-md uppercase hover:opacity-75">Delete</button>
      </div>
    ))}

    <button disabled={loading || uploading} className="p-3 bg-blue-400 text-white rounded-md uppercase hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-80">{loading ? 'Updating...' : 'Update Property'}</button>
    {error && <p className="text-red-700 text-sm">{error}</p>}
  </div>
</form>

      </div>
    </div>
  );
  
}

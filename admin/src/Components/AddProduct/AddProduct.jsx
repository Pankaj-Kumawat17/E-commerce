// import React, { useState } from 'react'
// import './AddProduct.css'
// import upload_area from '../../assets/upload_area.svg'

// const AddProduct = () => {

//     const [image, setImage] =useState(false);
//     const [productDetails,setproductDetails] = useState({
//       name:"",
//       image:"",
//       category:"women",
//       new_price:"",
//       old_price:""
//     })

//     const imageHandler =(e) =>{
//       setImage(e.target.files[0]);
//     }
//     const changeHandler =(e) =>{
//       setproductDetails({...productDetails,[e.target.name]:e.target.value});
//     }
    
//     const Add_Product = async () =>{
//       console.log(productDetails);
//       let responseData;
//       let product = productDetails;

//       let formData = new FormData();
//       formData.append('product',image);

//       await fetch('http://localhost:4000/upload',{
//         method:'POST',
//         headers:{
//           Accept:'application/json',
//         },
//         body:formData,
//       }).then((resp)=> resp.json()).then((data)=>{responseData=data});

//       if(responseData.success)
//         {
//           product.image = responseData.image_url;
//           console.log(product);
//           await fetch('http://localhost:4000/addproduct',{
//             method:'POST',
//             headers:{
//             Accept:'application/json',
//             'Content-Type':'application/json',
//         },
//         body:JSON.stringify(product),
//           }).then((resp)=> resp.json()).then((data)=>{
//             data.success?alert("Product Added"):alert("Failed")
//           })

//         }
//     }

//   return (
//     <div className='add-product'>
//       <div className="addproduct-itemfield">
//         <p>Product Title</p>
//         <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
//       </div>
//       <div className="addproduct-price">
//         <div className="addproduct-itemfield">
//           <p>Price</p>
//           <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here'  />
//         </div>
//         <div className="addproduct-itemfield">
//           <p>Offer Price</p>
//           <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here'  />
//         </div>
//       </div>
//       <div className="addproduct-itemfield">
//           <p>Product Category</p>
//           <select value={productDetails.category} onChange={changeHandler} name="category" className="addproduct-selector">
//             <option value="women">Women</option>
//             <option value="men">Men</option>
//             <option value="kid">Kid</option>
//           </select>
//         </div>
//         <div className="addproduct-itemfield">
//           <label htmlFor="file-input">
//             <img src={image?URL.createObjectURL(image):upload_area} alt="" className='addproduct-thumbnail-img' />
//           </label>
//           <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
//         </div>
//         <button onClick={()=>{Add_Product}} className='addproduct-btn'>ADD</button>
//     </div>
//   )
// }

// export default AddProduct
import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'women',
    new_price: '',
    old_price: '',
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    try {
      console.log(productDetails);
      let formData = new FormData();
      formData.append('product', image);

      // Upload image
      const responseImage = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!responseImage.ok) {
        throw new Error('Failed to upload image');
      }

      const imageData = await responseImage.json();

      if (!imageData.success) {
        throw new Error('Image upload failed');
      }

      // Update productDetails with the uploaded image URL
      let updatedProduct = { ...productDetails, image: imageData.image_url };

      // Add product
      const responseProduct = await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!responseProduct.ok) {
        throw new Error('Failed to add product');
      }

      const productData = await responseProduct.json();

      if (productData.success) {
        alert('Product Added');
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add product. Please try again later.');
    }
  };

  return (
    <div className='add-product'>
      <div className='addproduct-itemfield'>
        <p>Product Title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type='text'
          name='name'
          placeholder='Type here'
        />
      </div>
      <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type='text'
            name='old_price'
            placeholder='Type here'
          />
        </div>
        <div className='addproduct-itemfield'>
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type='text'
            name='new_price'
            placeholder='Type here'
          />
        </div>
      </div>
      <div className='addproduct-itemfield'>
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name='category'
          className='addproduct-selector'
        >
          <option value='women'>Women</option>
          <option value='men'>Men</option>
          <option value='kid'>Kid</option>
        </select>
      </div>
      <div className='addproduct-itemfield'>
        <label htmlFor='file-input'>
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=''
            className='addproduct-thumbnail-img'
          />
        </label>
        <input onChange={imageHandler} type='file' name='image' id='file-input' hidden />
      </div>
      <button onClick={Add_Product} className='addproduct-btn'>
        ADD
      </button>
    </div>
  );
};

export default AddProduct;

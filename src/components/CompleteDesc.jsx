import { useState, useEffect, use } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Card2 from "./Card2";
import Star from "./Star";
import Button from "./Button";

const CompleteDesc = () => {
  
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null)
  const [orderQuantity, setOrderQuantity] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  // const [id, setId] = useState(0)

  useEffect(() => {

    async function getProducts () {
      const response = await fetch (`https://dummyjson.com/products/${id}`)

      const data = await response.json()

      setProduct(data)
      setCurrentImage(0)

    }
    getProducts();
  }, [id])

  const nextPage = () => navigate(`/desc/${Number(id) + 1}`);
  const prevPage = () => navigate(`/desc/${Number(id) - 1}`); 

  useEffect(() => {
  if (product) {
    setOrderQuantity(product.minimumOrderQuantity);
  }
}, [product]);

  if (!product) return null; // or a spinner/skeleton

  const increaseQuantity = (maxQ) => {
    if (orderQuantity < maxQ) {
      setOrderQuantity(prev => prev + 1)
    }
    else {
      toast.error("Max stock reached");
    }
  }
  const decreaseQuantity = (minQ) => {
    if (orderQuantity > minQ){
      setOrderQuantity(prev => prev -1)
    }
    else {
      toast.error("Please add minimum quantity")
    }
  }

  const moveImageNext = (numImages) => {
    if (numImages === 1) {
      setCurrentImage(0);
    }
    else if (numImages > 1 && currentImage < numImages-1){
      setCurrentImage(currentImage+1)
    }
    else if (numImages >= currentImage){
      setCurrentImage(0);
    }
  }
  const moveImagePrev = (numImages) => {
  if (numImages === 1) {
    setCurrentImage(0);
  }
  else if (currentImage > 0) {
    setCurrentImage(currentImage - 1);
  }
  else {
    setCurrentImage(numImages - 1);
  }
}
  return (
    <>
      <div className="selection:bg-gray-700 selection:text-white">
        {/* {products.map((product) => ( */}
          <div
          className="flex gap-4 items-center w-full p-4">
            <div className="w-[33%] flex flex-col items-center justify-center gap-3">
              <div className="border-2 p-4 rounded-lg border-gray-300">
                <div className="relative ">
                  <button onClick={() => moveImagePrev(product.images.length)}
                    className="border border-gray-400 left-0 shadow-lg absolute top-[50%] -ml-3 rounded-full w-8 flex justify-center items-center backdrop-blur-2xl h-8 transition-all duration-150  hover:bg-white hover:scale-103">
                      <i class="ri-arrow-left-s-line"></i></button>
                  <button onClick={() => moveImageNext(product.images.length)}
                  className="border border-gray-400 shadow-lg absolute right-0 top-[50%] -mr-3 rounded-full w-8  flex justify-center items-center h-8 backdrop-blur-2xl transition-all duration-150  hover:bg-white hover:scale-103 "
                    ><i class="ri-arrow-right-s-line"></i></button>
                  <img className="h-100" src={product.images?.[currentImage]} alt="None" />
                </div>
              
                <div className="flex gap-2 items-center justify-center">
                  {product.images.map((image) => (
                    <img className="border border-gray-300 rounded-lg h-20" src={image} alt="" />
                  ))}
                </div>
              
              </div>

              <div className="flex flex-col items-start border border-gray-300 rounded-lg p-3 gap-2">
                <h1 className="text-md font-bold ">Additional Information</h1>
                <div className="flex items- justify-center ">
                  <Card2 
                  icon={<i class="ri-box-2-line text-2xl"></i>}
                  title={"Shipping Info"}
                  desc={product.shippingInformation}/>


                  <Card2 
                  icon={<i class="ri-shield-check-line text-2xl"></i>}
                  title={"Warranty"}
                  desc={product.warrantyInformation}/>

                  <Card2 
                  icon={<i class="ri-refund-line text-2xl"></i>}
                  title={"Return Policy"}
                  desc={product.returnPolicy}/>

                  <Card2 
                  icon={<i class="ri-file-list-line text-2xl"></i>}
                  title={"Availability"}
                  desc={product.availabilityStatus}/>
                </div>
              </div>
            </div>

            <div className="w-[33%]">
              <div className="flex flex-col  gap-10">
                <div className="flex flex-col gap-3">

                <p className="text-xl font-bold">
                {product.title}
                </p>
                <p className="text-sm font-semibold text-purple-700"><span className="text-black font-medium">Brand: </span>{product.brand}</p>

                <div className="flex items-center gap-1">
                  <Star rating={product.rating} />
                    <span className="font-semibold text-sm ml-1">{product.rating}</span>
                    <span className="text-gray-500 text-sm  font-medium">({product.reviews.length} reviews)</span>
                </div>

                <p className="text-2xl text-purple-700 flex items-center font-bold">${product.price} 
                  <span className="text-xs text-gray-500 line-through ml-4">${(product.price + (product.price*product.discountPercentage/100)).toFixed(2)}</span>
                  <span className="text-xs bg-red-100 text-red-600  ml-4 px-1.5 py-1 rounded">{product.discountPercentage}% OFF</span></p>
                <p className="text-xs pr-30 mb-3">{product.description}</p>
                <p className="text-xs mb-2">
                  
                  {product.availabilityStatus === "In Stock" && <span className="bg-green-200 text-green-700 px-2 py-1 rounded-lg mr-4"><i class="ri-checkbox-circle-line"></i>{product.availabilityStatus}</span>}
                  {product.availabilityStatus === "Low Stock" && <span className="bg-orange-200 text-orange-700 px-2 py-1 rounded-lg mr-4"><i class="ri-indeterminate-circle-line"></i>{product.availabilityStatus}</span>}
                  {product.availabilityStatus === "Out of Stock" && <span className="bg-red-200 text-red-700 px-2 py-1 rounded-lg mr-4"><i class="ri-close-circle-line"></i>{product.availabilityStatus}</span>}   
                  
                  <span className="border px-2 py-1 rounded-lg mr-4 border-gray-400">{product.shippingInformation}</span> 
                  <span className="border px-2 py-1 rounded-lg border-gray-400">{product.warrantyInformation}</span>
                </p>

                <p className="text-xs text-gray-600 "><span className="font-bold text-sm text-black">Quantity</span> (Min Order : {product.minimumOrderQuantity})</p>

                <div className="flex flex-row items-center mb-2 gap-4">
                  {(product.availabilityStatus==="In Stock" || product.availabilityStatus==="Low Stock") && <div className="flex justify-center items-center border border-gray-300 rounded-lg px-2 py-1">
                    <button onClick={() => decreaseQuantity(product.minimumOrderQuantity)} 
                    className="cursor-pointer">
                      <i class="ri-subtract-line"></i></button>
                    <p className="mx-4 font-bold">{orderQuantity}</p>
                    <button onClick={() => increaseQuantity(product.stock)} 
                    className="cursor-pointer"><i class="ri-add-line"></i></button>
                  </div>}

                  {(product.availabilityStatus==="In Stock" || product.availabilityStatus==="Low Stock") && <div className="flex justify-center items-center  bg-purple-700 text-white rounded-lg px-4 py-1 transition-all duration-150 hover:bg-purple-600 cursor-pointer">
                    <i className="ri-shopping-cart-2-line mr-2"></i>
                    <p className="text-sm font-semibold">Add to Cart</p>
                  </div>}

                  <div className="flex justify-center items-center border border-gray-300 rounded-lg px-4 py-1 transition-all cursor-pointer duration-150 hover:text-red-600">
                    <i className="ri-poker-hearts-line mr-2 "></i>
                    <p className="text-sm font-semibold">Add to wishlist</p>
                  </div>
                </div >
                <div className="flex items-center text-sm">
                <p>
                  <span className="text-gray-500 mr-2"><span className="text-black font-bold">SKU:  </span> {product.sku}</span>
                  <span className="text-purple-500 font-semibold mr-2"><span className="text-black">Category: </span>{product.category.charAt(0).toUpperCase() + product.category.slice(1)} </span>
                </p>
                </div>
                <div className="flex items-center text-sm">
                  <span className="font-semibold">Tags:<span className="text-white ">_</span></span>
                  {product.tags.map((tag, index) => (
                    <div key={tag} className="flex">
                      <h2 className="text-purple-500 font-semibold">{tag.charAt(0).toUpperCase() + tag.slice(1)}
                      {index !== product.tags.length - 1 && ", "}
                      </h2>

                    </div>
                  ))}
                </div>


                </div>

                <div className="flex flex-col gap-1 border border-gray-300 p-3 rounded-lg">
                  <p className="font-semibold text-lg mb-2">Meta Information</p>
                  <div className="flex  ">
                    <div className="text-sm font-bold flex flex-col gap-4">
                      <p className="border-b border-gray-300">Created At: </p>
                      <p className="border-b border-gray-300">Updated At: </p>
                      <p className="border-b border-gray-300">BarCode: </p>
                      <p className=" ">Qr Code:</p>
                        
                    </div>

                    <div className="text-sm flex flex-col gap-4 ">
                      <p className="border-b pl-40 pr-3 border-gray-300">{product.meta.createdAt}</p>
                      <p className="border-b pl-40 pr-3 border-gray-300">{product.meta.updatedAt}</p>
                      <p className="border-b pl-40 pr-3 border-gray-300">{product.meta.barcode}</p>
                      <div className="flex items-center gap-2">
                        <img className="h-8 pl-40 -mt-2" src={product.meta.qrCode} alt="qrCode" />
                        <p className="text-xs -mt-2 ">Scan for more details</p></div>
                    </div>


                  </div>
                </div>
              </div>
            </div>

            <div className="w-[33%] flex flex-col gap-4">
              <div className="flex flex-col border border-gray-300 p-3 rounded-lg">
                <h1 className="font-bold text-lg mb-2">Product Details</h1>
                <div className="flex  ">
                  <div className="text-sm font-bold flex flex-col  gap-4">
                    <p className="border-b border-gray-300">Price</p>
                    <p className="border-b border-gray-300">Discount </p>
                    <p className="border-b border-gray-300">Stock </p>
                    <p className="border-b border-gray-300">Weight </p>
                    <p className="border-b border-gray-300 ">Dimensions (W<i class="ri-close-fill"></i>H<i class="ri-close-fill"></i>D)</p>
                    <p className="border-b border-gray-300">Availability Status</p>
                    <p>Return Policy</p>
                  </div>

                  <div className="text-sm flex flex-col gap-4 ">
                    <p className="border-b pl-25 pr-16 border-gray-300">{product.price}</p>
                    <p className="border-b pl-25 pr-16 border-gray-300">{product.discountPercentage}</p>
                    <p className="border-b pl-25 pr-16 border-gray-300">{product.stock}</p>
                    <p className="border-b pl-25 pr-16 border-gray-300">{product.weight} g</p>
                    <p className="border-b pl-25 pr-16 border-gray-300">{product.dimensions.width}<i class="ri-close-fill"></i>{product.dimensions.height}<i class="ri-close-fill"></i>{product.dimensions.depth}</p>
                    <p className="border-b pl-25 pr-16 border-gray-300">{product.availabilityStatus}</p>
                    <p className="pl-25 pr-3">{product.returnPolicy}</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-300 p-3 rounded-lg ">
                <h1 className="font-bold text-lg mb-2">Customer Reviews ({product.reviews.length})</h1>
                <div>
                  <div className="flex flex-col mb-4 pl-4">
                    <p className="text-4xl font-bold">{product.rating}</p>
                    <Star rating={product.rating}/>
                    {product.reviews.length == 1 ? 
                    <p className="text-gray-400 font-sm ">Based on {product.reviews.length} review</p>: 
                    <p className="text-gray-400 text-sm -mt-1">(Based on {product.reviews.length} reviews)</p>}
                  </div>

                </div>


                {product.reviews.map((review) => (
                  <div className="flex flex-row justify-between items-baseline border-t border-gray-200 ">
                    <div className="flex gap-3 items-center ">
                      <div className="h-9 w-9 bg-green-200 text-green-800 font-bold rounded-full flex items-center justify-center">
                        {review.reviewerName.charAt(0)}
                      </div>
                      <div className="flex flex-col w-fit my-2">
                        <p className="text-sm font-bold">{review.reviewerName}</p>
                        <p className="text-xs ">{review.comment}</p>
                      </div>
                    </div>
                    <div className="flex gap-14 items-">
                      <Star rating={review.rating}/>
                      <p className="text-sm font-bold">{review.rating}/5</p>
                    </div>
                  </div>  
                ))}

              </div>
            </div>
          
          </div>
        {/* ))} */}
        <div className="fixed bottom-4 right-0  transform -translate-x-1/2 flex gap-4">
        <Button onClick={prevPage}
        name={"Prev"}/>
        <Button onClick={nextPage}
        name={"Next"}/>
        </div>
      </div>
    </>
  )
}

export default CompleteDesc;
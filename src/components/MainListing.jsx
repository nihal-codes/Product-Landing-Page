import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import Button from "./Button";
import { Link } from "react-router-dom";
import Star from "./Star";


const MainListing = () => {

  const [products, setProducts] = useState([]);

  const [pageNum, setPageNum] = useState(0);

  const [showDesc, setShowDesc] = useState(false);

  useEffect(() => {

    async function getProducts () {
      const response = await fetch(`https://dummyjson.com/products/?limit=28&&skip=${pageNum}`)

      const data = await response.json()

      setProducts(data.products);
    }
    getProducts();
  }, [pageNum])

  const nextPage = () => {
    if (pageNum > 168){
      setPageNum(180)
    }
    else {
      setPageNum(pageNum => pageNum+28)
    }
  }
  const prevPage = () => {
    if (pageNum < 28) {
      setPageNum(0)
    }
    else {
      setPageNum(pageNum => pageNum-28)
    }
  }


  const handleShowDesc = () => {
    setShowDesc(!showDesc)
  }

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 px-6 py-6 selection:text-white selection:bg-gray-700">
        <div className="max-w-7xl mx-auto ">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Products</h1>
            <p className="text-gray-600">Discover amazing deals on quality products</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
            {products.map((product) => (
              <Card  key={product.id}>
                <div className="w-full h-64 overflow-hidden rounded-lg mb-4 bg-gray-100">
                  <img src={product.images?.[0]} alt={product.title}
                  className="h-full w-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>

                <h2 className="font-bold text-lg text-gray-900 line-clamp-1 mb-0.5">{ product.title }</h2>
                <h2 className="text-purple-900 text-sm font-semibold mb-1">{ product.brand }</h2>

                <div className="flex items-center gap-3 mb-1">
                  <p className="text-2xl font-bold text-purple-700">${product.price} </p>
                  <span className="text-sm text-gray-400 line-through font-semibold" >${(product.price + (product.price*product.discountPercentage/100)).toFixed(2)}</span>
                </div>
                
                <div className="flex text-sm items-center justify-start gap-2 mb-2">
                  <Star 
                  rating={product.rating}/>
                  <p className="font-semibold text-gray-700">({product.rating})</p>
                </div>

                <Link to={`/desc/${product.id}`} className="inline-block w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-center">Details</Link>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
        <Button 
        onClick={prevPage}    
        name="← Previous"/>
        <Button 
        onClick={nextPage}
        name="Next →"/>
      </div>
      
    </>
  )
}

export default MainListing
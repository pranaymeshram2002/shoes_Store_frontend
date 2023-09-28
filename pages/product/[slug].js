import ProductDetailCarouse from '@/components/ProductDetailCarouse';
import RelatedProducts from '@/components/RelatedProducts';
import Wrapper from '@/components/Wrapper';
import { addToCart } from '@/store/cartSlice';
import { fetchDataFromApi } from '@/utils/api';
import { getDiscountedPricePercentage } from '@/utils/helper';
import React, { useState } from 'react';
import {IoMdHeartEmpty} from 'react-icons/io';
import ReactMarkdown from 'react-markdown';
import {useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const ProductDetails = ({product,products}) => {
  const [selectedSize, setSelectedSize] = useState();
    const [showError, setShowError] = useState(false);
    const dispatch = useDispatch()
    const p = product?.data?.[0]?.attributes;
    const notify =()=>{
      toast.success('Success.Check your cart', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  return (
    <div className='w-full md:py-20'>
      <ToastContainer/>
        <Wrapper>
            <div className='flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]'>
            {/*left col start*/}
            <div className='w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0'>
                <ProductDetailCarouse images={p.image.data}/>
            </div>
              {/*left end start*/}

                {/*right col start*/}
            <div className='flex-[1]  py-3' >
              {/*Product Title*/}
              <div className=' text-[34px] font-semibold mb-2 leadin'>
                {p.name}

              </div>
              {/*Product Subtitle*/}
              <div className=''>
                {p.subtitle}
              </div>
              {/*Product Price*/}
              <div className="flex items-center">
                            <p className="mr-2 text-lg font-semibold">
                                MRP : &#8377;{p.price}
                            </p>
                            {p.original_price && (
                                <>
                                    <p className="text-base  font-medium line-through">
                                        &#8377;{p.original_price}
                                    </p>
                                    <p className="ml-auto text-base font-medium text-green-500">
                                        {getDiscountedPricePercentage(
                                            p.original_price,
                                            p.price
                                        )}
                                        % off
                                    </p>
                                </>
                            )}
                        </div>
              <div className='font-medium text-md text-black/[0.5]'>
                incl. of taxes
              </div>
              <div className='font-medium text-md text-black/[0.5] mb-20'>
                {`(Also includes all applicable duties)`}

              </div>
           {/*Product Size & Range Start*/}
              <div className='mb-10'>
                {/*Heading Start*/}
                <div className='flex  justify-between mb-2'>
                  <div className='text-md font-semibold'>Select Size</div>
                  <div className='text-md font-medium text-black/[0.5] cursor-pointer'>Select Guide</div>

                </div>
                {/*Heading Start*/}

                {/*Size Grid Start*/}
                <div id="sizeGrid" className='grid grid-cols-3 gap-2'>
                  {p.size.data.map((item,i)=>(
                     <div 
                     onClick={()=>{setSelectedSize(item.size),setShowError(false)}} 
                     key={i} 
                     className={`border rounded-md text-center py-3 font-medium ${item.enabled?'hover:border-black cursor-pointer' :'cursor-not-allowed bg-black/[0.1] opacity-50'}  ${selectedSize == item.size ? "border-black": ""} `}>
                     {item.size}
                   </div>
                  ))}
                  
                  {/* <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
                    UK 6
                  </div>
                  <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
                    UK 7
                  </div>
                  <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
                    UK 8
                  </div>
                  <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
                    UK 9
                  </div>
                  <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
                    UK 10
                  </div>
                  <div className='border rounded-md text-center py-3 font-medium hover:border-black cursor-pointer'>
                    UK 11
                  </div>
                  <div className='cursor-not-allowed border rounded-md text-center py-3 font-medium hover:border-black opacity-50 bg-black/[0.1] '>
                    UK 12
                  </div>
                  <div className='cursor-not-allowed border rounded-md text-center py-3 font-medium hover:border-black opacity-50  bg-black/[0.1] '>
                    UK 13
                  </div> */}
                </div>
                {/*Size Grid end*/}
                
                {/*Size error MSG Selection Message*/}

               { showError && <div className='text-red-600 mt-1'>
                  Size selection is required

                </div>}


              </div>
              {/*Product Size & Range End*/}

              {/*AddTOCart Btn start*/}
              <button 
              onClick={()=>{
                if(!selectedSize){
                  setShowError(true)
                  document.getElementById("sizeGrid").scrollIntoView({
                    block:"center",
                    behavior:"smooth"
                  })
              }
              else{dispatch(
                addToCart({...product?.data?.[0],selectedSize,oneQuantityPrice:p.price})
                ),
              notify()}
              
            }}
               className='w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75'>Add To Cart</button>
                   {/*AddTOCart Btn start*/}
                    {/*Wishlist Btn start*/}
                    <button className='w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10'>
                      Wishlist <IoMdHeartEmpty size={20}/> </button>
                    {/*Wishlist Btn end*/}

                    <div>
                      <div className='text-lg font-bold mb-5'>Product Detail</div>
                      <div className='markdowm text-md mb-5'>
                     <ReactMarkdown>{p.description}</ReactMarkdown>
                      </div>
                      <div className='text-md mb-5'>
                      The lightweight cushioning found in this next generation basketball shoe takes cues from its predecessors. Take flight on the court with timeless style and cloud-like heel support.
                       Declaration of Importer: Direct import by the individual customer

                          Marketed by: Nike Global Trading B.V. Singapore Branch, 30 Pasir Panjang Road, #10-31/32, Mapletree Business City, Singapore 117 440
                      </div>
                    </div>

            </div>
            {/*right col end*/}
            </div>
            <RelatedProducts products={products}/>
        </Wrapper>
    </div>
  )
}

export default ProductDetails;

export async function getStaticPaths() {
  const products = await fetchDataFromApi("/api/products?populate=*");
  const paths = products?.data?.map((p) => ({
      params: {
          slug: p.attributes.slug,
      },
  }));

  return {
      paths,
      fallback: false,
  };
}


export async function getStaticProps({ params: { slug } }) {
  
  const product = await fetchDataFromApi(
      `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );
//here with the help of api 1st we fetch data in same category and expect one product tha we selected using not equal to query 
  //below api used for related product show in related produts section 
  const products = await fetchDataFromApi(
      `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  );

  return {
      props: {
         product,
         products
      },
  };
}
  
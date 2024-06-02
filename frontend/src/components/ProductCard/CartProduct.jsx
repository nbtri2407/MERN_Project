import React from 'react'

const CartProduct = ({item,callback}) => {
  return (
    <div className='flex justify-between items-center '>
      <div className="flex-1 flex">
        <img
          src={item?.productImage?.[0]}
          alt="item"
          className="2xl:w-24  xl:w-44 lg:w-24 md:w-28 w-1/5 border border-black/20 object-scale-down cursor-pointer hover:border-primary transition-all"
        />
        <div className="pl-4">
          <p className="text-lg font-semibold">{item?.productName}</p>
          <p className="text-lg font-semibold">{item?.category?.categoryName}</p>
        </div>
      </div>
    </div>
  )
}

export default CartProduct

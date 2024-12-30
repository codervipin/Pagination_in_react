

type ProductsData = {
    id: number,
    title: string,
    price: number,
    description: string,
    images: string[]
}

const Product = ({ data }: { data: ProductsData }) => {
    const {  title, price, images } = data;
    // console.log(data);
  return (
    <div className="product-card">
      <img src={images[0]} alt={title} loading="lazy" />
      <h2>{title}</h2>
      <p>Price: ${price}</p>
    </div>
  )
}

export default Product
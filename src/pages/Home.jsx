import useProducts from '../hooks/useProducts'
import ProductCard from '../components/ProductCard/ProductCard'

function Home() {
  const { products, loading, error } = useProducts()

  if (loading) return <h3>Loading products...</h3>
  if (error) return <h3>{error}</h3>

  return (
    <div style={styles.grid}>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    padding: '20px'
  }
}

export default Home

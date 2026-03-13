import { useRouter } from "next/router";

const CategoryPage = () => {
  const { query } = useRouter();
  const slug = query.slug;

  return (
    <div>
      <h1>Category Page</h1>

      <p>URL parameter:</p>

      <ul>
        {Array.isArray(slug) ? (
          slug.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>Tidak ada parameter</li>
        )}
      </ul>
    </div>
  );
};

export default CategoryPage;
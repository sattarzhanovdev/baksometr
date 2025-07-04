function CategoryBadge({ category }) {
  return (
    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm shadow">
      {category.emoji} {category.title}
    </span>
  );
}

export default CategoryBadge;

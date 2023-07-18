import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setSelectedBlog } from "../../State/features/RobotSlice";
import { useDispatch } from "react-redux";

const List = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);
  const [sortType, setSortType] = useState("asc");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      name: "Ro1",
      image:
        "https://cdn.dribbble.com/userupload/5604280/file/original-2c47df1b9de0c5e3c67e38c0f2b43b76.jpg?crop=0x0-1080x810",
    },
    {
      id: 2,
      name: "bot2",
      image:
        "https://cdn.dribbble.com/userupload/5604280/file/original-2c47df1b9de0c5e3c67e38c0f2b43b76.jpg?crop=0x0-1080x810",
    },
    {
      id: 3,
      name: "ot3",
      image:
        "https://cdn.dribbble.com/userupload/5604280/file/original-2c47df1b9de0c5e3c67e38c0f2b43b76.jpg?crop=0x0-1080x810",
    },
    {
      id: 4,
      name: "Robot4",
      image:
        "https://cdn.dribbble.com/userupload/5604280/file/original-2c47df1b9de0c5e3c67e38c0f2b43b76.jpg?crop=0x0-1080x810",
    },
  ];

  // Search products based on the query
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  //Search Pagination
  const currentProducts = searchQuery ? filteredProducts : products;
  const currentProductsPage = currentProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(currentProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Sorting
  const handleSort = () => {
    const sortedProducts = currentProducts.slice().sort((a, b) => {
      if (sortType === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setSortType(sortType === "asc" ? "desc" : "asc");
    setFilteredProducts(sortedProducts);
  };
  const editHandler = (item) => {
    dispatch(setSelectedBlog(item));
    navigate("/admin/addproduct");
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Product List</h2>
        <div className="flex justify-end mb-4">
          <Link
            to={"/addRobot"}
            className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </Link>
        </div>
        <div className="flex justify-between mb-4">
          <div>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search products"
              className="bg-gray-900 text-white px-4 py-2 rounded"
            />
          </div>
          <div>
            <button
              className="bg-gray-900 text-white font-bold py-2 px-4 rounded"
              onClick={handleSort}
            >
              Sort by Name {sortType === "asc" ? "▲" : "▼"}
            </button>
          </div>
        </div>
        <table className="w-full text-gray-500 dark:text-gray-400">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left text-white">Sr No</th>
              <th className="px-4 py-2 text-left text-white">Product Name</th>
              <th className="px-4 py-2 text-left text-white">Action</th>
              <th className="px-4 py-2 text-left text-white">Image</th>
            </tr>
          </thead>
          <tbody>
            {currentProductsPage.map((product, index) => (
              <tr key={product.id}>
                <td className="px-2 py-2  text-white">
                  {index + 1 + (currentPage - 1) * productsPerPage}
                </td>
                <td className="px-2 py-2  text-white text-lg">
                  {product.name}
                </td>
                <td className="px-2 py-2">
                  <button
                    className="bg-green-900 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
                    onClick={editHandler}
                  >
                    Edit
                  </button>
                  <button className="bg-red-900 hover:bg-red-500 text-white font-bold py-2 px-4 rounded ml-2">
                    Delete
                  </button>
                </td>
                <td className="px-4 py-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-16 w-16 object-cover"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          <nav className="block">
            <ul className="flex pl-0 rounded list-none flex-wrap">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index}>
                  <button
                    onClick={() => paginate(index + 1)}
                    className={`relative block leading-tight px-3 py-2 text-white bg-gray-900 border border-gray-900 hover:bg-gray-700 mr-2 ${
                      currentPage === index + 1 ? "bg-gray-700" : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default List;

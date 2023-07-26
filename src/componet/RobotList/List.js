import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  clearSelectedBlog,
  deleteRobotApi,
  setSelectedBlog,
} from "../../State/features/RobotSlice";
import { useDispatch, useSelector } from "react-redux";
import { Edit2, Trash } from "feather-icons-react";
import { fetchRobotData } from "../../State/features/RobotSlice";
import Swal from "sweetalert2";
import Login from "../login/Login";

const List = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);
  const [sortOrder, setSortOrder] = useState("asc");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { robotData } = useSelector((state) => state.robots);
  const { accessToken } = useSelector((state) => state.login);
  const products = robotData;

  // Function to display success alert when deleting a product
  const displaySuccessAlert = (id) => {
    // Display a confirmation modal using Swal
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      background: "#000",
      color: "#FFFFFF",
    }).then((result) => {
      if (result.isConfirmed) {
        // Dispatch the deleteRobotApi action to delete the product
        dispatch(deleteRobotApi({ id, accessToken }));
        // Show a success message using Swal
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          background: "#000",
          color: "#fff",
        });
      }
    });
  };

  // Fetch robot data on component mount
  useEffect(() => {
    dispatch(fetchRobotData());
  }, []);

  // Function to handle sorting by product name
  const handleSortByName = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  // Function to sort the products by name based on sortOrder
  const sortProducts = (products) => {
    if (!Array.isArray(products)) return []; // Return an empty array if products is not iterable
    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => {
      const nameA = a.robotName.toLowerCase();
      const nameB = b.robotName.toLowerCase();
      if (nameA < nameB) return sortOrder === "asc" ? -1 : 1;
      if (nameA > nameB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    return sortedProducts;
  };

  // Function to handle search query changes
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.robotName.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchQuery ? filteredProducts : products;
  const sortedProducts = sortProducts(currentProducts); // Sort the products
  const currentProductsPage = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Function to handle product edit
  const editHandler = (id) => {
    const selectedProduct = currentProducts.find(
      (product) => product.id === id
    );
    dispatch(setSelectedBlog(selectedProduct));
    navigate("/addRobot");
  };

  return accessToken === null ? (
    // If user is not logged in, show the login component
    <Login />
  ) : (
    // If user is logged in, show the product list
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 flex items-center justify-center">
          Product List
        </h2>
        <div className="flex justify-between mb-4 sm:mb-4">
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search products"
              className="bg-gray-900 text-white px-4 py-2 rounded m-2 border-white"
            />
          </div>
          <div>
            <Link
              to={"/addRobot"}
              onClick={() => dispatch(clearSelectedBlog())}
              className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 mr-4 rounded"
            >
              Add
            </Link>
          </div>
        </div>
        <table className="w-full text-gray-500 dark:text-gray-400 ml-4">
          {/* Table header */}
          <thead>
            <tr>
              <th
                className="px-4 py-2 text-left text-white cursor-pointer"
                onClick={handleSortByName}
              >
                Sr No
              </th>
              <th
                className="px-4 py-2 text-left text-white cursor-pointer"
                onClick={handleSortByName}
              >
                Product Name{" "}
                {sortOrder === "asc" ? (
                  <span>&#9650;</span>
                ) : (
                  <span>&#9660;</span>
                )}
              </th>
              <th className="px-4 py-2 text-left text-white">Action</th>
              <th className="px-4 py-2 text-left text-white">Image</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows */}
            {currentProductsPage?.map((product, index) => (
              <tr key={product.id}>
                <td className="px-2 py-2 text-white">
                  {index + 1 + (currentPage - 1) * productsPerPage}
                </td>
                <td className="px-2 py-2 text-white text-lg">
                  {product.robotName}
                </td>
                <td className="px-2 py-2 flex items-center">
                  {/* Edit button */}
                  <button
                    className="bg-green-900 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => editHandler(product.id)}
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  {/* Delete button */}
                  <button
                    className="bg-red-900 hover:bg-red-500 text-white font-bold py-2 px-4 rounded"
                    onClick={() => displaySuccessAlert(product.id)}
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </td>
                <td className="px-4 py-2">
                  <img
                    src={`http://localhost:7584/images/${product.imagePath}`}
                    alt={product.name}
                    className="h-16 w-16 object-cover"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center mt-4">
          {/* Pagination */}
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

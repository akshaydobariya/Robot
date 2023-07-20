import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteRobotApi,
  setSelectedBlog,
} from "../../State/features/RobotSlice";
import { useDispatch, useSelector } from "react-redux";
import { Edit2 } from "feather-icons-react";
import { Trash } from "feather-icons-react";
import { fetchRobotData } from "../../State/features/RobotSlice";
import Swal from "sweetalert2";

const List = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(3);
  const [sortType, setSortType] = useState("asc");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("id");
  const { robotData } = useSelector((state) => state.robots);
  const { accessToken } = useSelector((state) => state.login);
  const products = robotData;
  const displaySuccessAlert = (id) => {
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
        dispatch(deleteRobotApi({ id, accessToken }));
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
  useEffect(() => {
    dispatch(fetchRobotData());
  }, [robotData]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter((product) =>
      product.robotName.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = searchQuery ? filteredProducts : products;
  const currentProductsPage = currentProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(currentProducts?.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  const handleSortBy = (column) => {
    if (sortBy === column) {
      // If already sorting by this column, toggle the sort order
      setSortType((prevSortType) => (prevSortType === "asc" ? "desc" : "asc"));
    } else {
      // If sorting by a new column, set it as the current sort column and default sort order to "asc"
      setSortBy(column);
      setSortType("asc");
    }
    setCurrentPage(1); // Reset current page to 1 after changing the sorting

  };

  const handleSort = () => {
    const sortedProducts = [...currentProducts].sort((a, b) => {
      if (sortBy === "id") {
        return sortType === "asc" ? a.id - b.id : b.id - a.id;
      } else if (sortBy === "product_name") {
        const nameA = a.robotName.toLowerCase();
        const nameB = b.robotName.toLowerCase();
        return sortType === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
      return 0;
    });
    setFilteredProducts(sortedProducts);
    setCurrentPage(1);
  };

  const editHandler = (id) => {
    const selectedProduct = currentProducts.find(
      (product) => product.id === id
    );
    dispatch(setSelectedBlog(selectedProduct));
    navigate("/addRobot");
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 ml-4">Product List</h2>
        <div className="flex justify-between mb-4 sm:mb-4"> 
          <div className="flex">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search products"
              className="bg-gray-900 text-white px-4 py-2 rounded"
            />
          </div>
          <div>
            <Link
              to={"/addRobot"}
              className="bg-blue-800 hover:bg-blue-500 text-white font-bold py-2 px-4 mr-4 rounded"
            >
              Add
            </Link>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between mb-4">
          <div>
            <button
              className="bg-gray-900 text-white font-bold py-2 px-4 mr-4 rounded"
              onClick={handleSort}
            >
              Sort by Name {sortType === "asc" ? "▲" : "▼"}
            </button>
          </div>
        </div>
        <table className="w-full text-gray-500 dark:text-gray-400 ml-4">
          <thead>
            <tr>
              <th
                className="px-4 py-2 text-left text-white"
                onClick={() => handleSortBy("id")}
              >
                Sr No {sortBy === "id" ? (sortType === "asc" ? "▲" : "▼") : ""}
              </th>
              <th
                className="px-4 py-2 text-left text-white"
                onClick={() => handleSortBy("product_name")}
              >
                Product Name{" "}
                {sortBy === "product_name"
                  ? sortType === "asc"
                    ? "▲"
                    : "▼"
                  : ""}
              </th>
              <th className="px-4 py-2 text-left text-white">Action</th>
              <th className="px-4 py-2 text-left text-white">Image</th>
            </tr>
          </thead>
          <tbody>
            {currentProductsPage?.map((product, index) => (
              <tr key={product.id}>
                <td className="px-2 py-2 text-white">
                  {index + 1 + (currentPage - 1) * productsPerPage}
                </td>
                <td className="px-2 py-2 text-white text-lg">
                  {product.robotName}
                </td>
                <td className="px-2 py-2 flex items-center">
                  <button
                    className="bg-green-900 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => editHandler(product.id)}
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>

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

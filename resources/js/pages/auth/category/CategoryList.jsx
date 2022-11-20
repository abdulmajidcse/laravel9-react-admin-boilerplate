import AuthPageLayout from "../../../components/layouts/AuthPageLayout";
import Loading from "../../../components/Loading";
import { Link, useSearchParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import {
    useGetAuthUserQuery,
    useAuthGetCategoriesQuery,
} from "../../../features/api/apiSlice";

const CategoryList = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(1);
    const [itemOffset, setItemOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const { data: authUser } = useGetAuthUserQuery();

    const { data: categories, isLoading: isLoadingToGetCategories } =
        useAuthGetCategoriesQuery({
            token: authUser?.data?.token,
            page: searchParams.get("page") ?? 1,
        });

    useEffect(() => {
        setLoading(true);

        if (categories) {
            setPageCount(categories.meta.last_page);
            setItemOffset(categories.meta.from);
            setCurrentPage(categories.meta.current_page - 1);
            setLoading(false);
        }
    }, [categories]);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        setSearchParams({ page: ++event.selected });
    };

    return (
        <>
            <Loading loadingIs={loading || isLoadingToGetCategories} />
            <AuthPageLayout
                leftSection={<h1>Category List</h1>}
                rightSection={
                    <Link
                        to="/auth/categories/create"
                        className="btn btn-primary"
                    >
                        New Category
                    </Link>
                }
            >
                <Table responsive bordered hover>
                    <thead>
                        <tr>
                            <td>SL</td>
                            <td>Name</td>
                            <td>Image</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.data && categories.data.length > 0 ? (
                            categories.data.map((category, index) => (
                                <tr key={`category_id_${category.id}`}>
                                    <td>{itemOffset + index}</td>
                                    <td>{category.name}</td>
                                    <td>
                                        <img
                                            src={`${
                                                import.meta.env.VITE_APP_URL
                                            }/uploads/${category.image}`}
                                            height="100"
                                            alt={category.name}
                                        />
                                    </td>
                                    <td>
                                        <div className="dropdown">
                                            <a
                                                className="d-block"
                                                href="#"
                                                role="button"
                                                id="dropdownMenuLink"
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                <i className="fas fa-align-left" />
                                            </a>
                                            <div
                                                className="dropdown-menu dropdown-menu-right"
                                                aria-labelledby="dropdownMenuLink"
                                            >
                                                <Link
                                                    to={`/auth/categories/${category.id}/edit`}
                                                    className="dropdown-item"
                                                >
                                                    Edit
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={100}
                                    className="text-center text-danger"
                                >
                                    No data available!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ReactPaginate
                    containerClassName="pagination justify-content-end"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    activeClassName="active"
                    activeLinkClassName="active disabled"
                    disabledClassName="disabled"
                    disabledLinkClassName="disabled"
                    previousClassName="page-item"
                    nextClassName="page-item"
                    previousLinkClassName="page-link"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    previousLabel="&laquo;"
                    nextLabel="&raquo;"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    forcePage={currentPage}
                    renderOnZeroPageCount={null}
                />
            </AuthPageLayout>
        </>
    );
};

export default CategoryList;

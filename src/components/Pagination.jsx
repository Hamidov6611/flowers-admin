import React from 'react'
import ReactPaginate from 'react-paginate'

export default function Pagination({ page, size, elements, handlePageClick, formSubmit }) {
    return (
        <div className="d-flex align-items-center justify-content-between" style={{ flexWrap: "wrap-reverse" }}>
            <form onSubmit={formSubmit}>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <div className="col-lg-6">
                        <input className="form-control" type="text" defaultValue={1}
                            style={{ height: "50px" }} />
                    </div>

                    <div className="col-lg-6">
                        <button className="btn btn-primary"
                            type='submit'
                            style={{ height: "50px", width: "100%" }}>
                            переключить на
                        </button>
                    </div>
                </div>
            </form>

            <div style={{ paddingTop: "4px" }}>
                <ReactPaginate
                    previousLabel="<<"
                    nextLabel=">>"
                    pageCount={elements / size}
                    breakLabel="..."
                    className="paginate"
                    activeClassName="active"
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    forcePage={page}
                    onPageActive={1}
                />
            </div>
        </div>
    )
}

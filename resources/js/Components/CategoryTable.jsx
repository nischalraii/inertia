import React, { useState } from 'react';

// Utility function to paginate data
const paginate = (array, page_size, page_number) => {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
};

const Table = ({ items, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10); // Number of items per page

    // Filter items based on search term
    const filteredItems = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Get paginated items based on the current page
    const paginatedItems = paginate(filteredItems, pageSize, currentPage);

    // Calculate total pages
    const totalPages = Math.ceil(filteredItems.length / pageSize);


    return (
        <div className="container mx-auto p-4">
            {/* Header with Search Input */}
            <div className="flex justify-between mb-4">
                <div>
                    <h2 className="text-xl font-semibold">Categories</h2>
                </div>
                <div>
                    <input
                        type="text"
                        className="border border-gray-300 p-2 rounded"
                        placeholder="Search by title"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left w-1/12">SN</th>
                            <th className="py-3 px-6 text-left w-3/12">Name</th>
                            <th className="py-3 px-6 text-left w-3/12">Description</th>
                            <th className="py-3 px-6 text-left w-2/12">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {paginatedItems.length > 0 ? (
                            paginatedItems.map((item, index) => (
                                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-100">
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        {(currentPage - 1) * pageSize + index + 1}
                                    </td>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{item.name}</td>
                                    <td className="py-3 px-6 text-left whitespace-nowrap">{item.description}</td> 
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        {/* Edit and Delete actions */}
                                        <button
                                            className="text-blue-600 hover:text-blue-900"
                                            onClick={() => onEdit(item.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="text-red-600 hover:text-red-900 ml-4"
                                            onClick={() => onDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center py-3">
                                    No posts found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-between items-center">
                <div>
                    <button
                        className="px-4 py-2 bg-gray-200 rounded mr-2"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-200 rounded"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
                <div>
                    Page {currentPage} of {totalPages}
                </div>
            </div>
        </div>
    );
};

export default Table;

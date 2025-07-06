import React, { useState } from 'react';
import { filters } from '../constants/filter.js';


export const FilterButtons = ({ onFilterChange }) => {
    const [selectedFilter, setSelectedFilter] = useState('All');

    const handleFilterClick = (filter) => {
        setSelectedFilter(filter);
        onFilterChange(filter);
    };

    return (
        <div className="w-ful py-3">
            <div className="max-w-3xl mx-auto">
                <div className="relative">

                    <div
                        id="filter-container"
                        className="flex space-x-3 overflow-x-auto scrollbar-hide scroll-smooth rounded-lg"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => handleFilterClick(filter)}
                                className={`flex-shrink-0 px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition-all duration-200 whitespace-nowrap ${selectedFilter === filter
                                    ? 'bg-gray-900 text-white shadow-sm'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

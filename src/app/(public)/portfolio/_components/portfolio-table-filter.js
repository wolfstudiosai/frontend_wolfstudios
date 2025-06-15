'use client';

import TableFilterBuilder from '/src/components/common/table-filter-builder';
import { useEffect, useMemo } from 'react';

const extractMeta = (metaArray) => {
    const map = {};
    metaArray.forEach((item) => {
        const key = Object.keys(item)[0];
        map[key] = item[key];
    });
    return map;
};

export const PortfolioTableFilter = ({ metaData, filters, setFilters, handleFilterApply }) => {
    const metaMap = useMemo(() => extractMeta(metaData), [metaData]);
    const columnOptions = useMemo(() => Object.keys(metaMap), [metaMap]);

    // useEffect(() => {
    //     if (filters.length === 0 && columnOptions.length > 0) {
    //         setFilters([
    //             {
    //                 key: columnOptions[0],
    //                 type: metaMap[columnOptions[0]].type,
    //                 operator: '',
    //                 value: '',
    //                 gate: '',
    //             }
    //         ]);
    //     }
    // }, [columnOptions, filters, metaMap]);


    return (
        <TableFilterBuilder metaMap={metaMap} filters={filters} setFilters={setFilters} handleFilterApply={handleFilterApply} />
    );
}
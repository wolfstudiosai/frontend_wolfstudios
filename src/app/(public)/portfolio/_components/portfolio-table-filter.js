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

export const PortfolioTableFilter = ({ metaData, filters, setFilters }) => {
    const metaMap = useMemo(() => extractMeta(metaData), [metaData]);
    const columnOptions = useMemo(() => Object.keys(metaMap), [metaMap]);

    useEffect(() => {
        if (filters.length === 0 && columnOptions.length > 0) {
            setFilters([
                { column: columnOptions[0], condition: '', value: '', operator: '' },
            ]);
        }
    }, [columnOptions, filters]);

    return (
        <TableFilterBuilder metaMap={metaMap} filters={filters} setFilters={setFilters} />
    );
}
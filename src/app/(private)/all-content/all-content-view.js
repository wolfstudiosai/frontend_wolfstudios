'use client';

import { PageContainer } from '@/components/container/PageContainer';
import { PageHeader } from '@/components/core/page-header';
import React from 'react';

import { sliderToGridColsCoverter } from '@/utils/helper';
import { AllContentCardView } from './_component/all-content-card-view';
import AllContentListView from './_component/all-content-list-view';
import { getContentList } from './_lib/all-content.actions';

export const AllContentView = () => {
    const [loading, setLoading] = React.useState(false);
    const [isFetching, setIsFetching] = React.useState(false);
    const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 100 });
    const [totalRecords, setTotalRecords] = React.useState(0);
    const [data, setData] = React.useState([]);
    const [filters, setFilters] = React.useState({
        COL: 4,
        TAG: [],
        FILTER: [],
        SORTING: [],
        VIEW: 'grid',
        ADD: false
    });

    async function fetchList(paginateData = pagination) {
        setLoading(true);

        try {
            const response = await getContentList({
                page: paginateData.pageNo,
                rowsPerPage: paginateData.limit,
            });

            if (response.success) {
                setData(response.data);
                setTotalRecords(response.totalRecords);
            }
        } catch (error) {
            console.error('Error fetching campaigns:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleFilterChange = (type, value) => {
        setFilters((prev) => ({ ...prev, [type]: value }));
    };

    const refreshListView = async () => {
        const response = await getCampaignGroupListAsync({
            page: 1,
            rowsPerPage: 10,
        });

        if (response.success) {
            setData(response.data);
            setTotalRecords(response.totalRecords);
        }
    };

    React.useEffect(() => {
        fetchList(pagination);
    }, [pagination]);

    return (
        <PageContainer>
            <PageHeader
                title="Contents"
                values={filters}
                onFilterChange={handleFilterChange}
                showFilters={false}
                showColSlider={true}
                totalRecords={totalRecords}
            />
            {filters.VIEW === 'grid' ? (
                <AllContentCardView data={data} loading={loading} columns={sliderToGridColsCoverter(filters.COL)} />
            ) : (
                <AllContentListView setPagination={setPagination} totalRecords={totalRecords} data={data} setData={setData} loading={loading} fetchList={fetchList} />
            )}
            {/* <ManageCampaignRightPanel
        view="EDIT"
        width="70%"
        data={defaultCampaign}
        fetchList={refreshListView}
        open={filters.ADD}
        onClose={() => setFilters((prev) => ({ ...prev, ADD: false }))}
      /> */}
        </PageContainer>
    );
};

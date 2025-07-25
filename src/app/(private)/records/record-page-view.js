'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';

import { PageContainer } from '/src/components/container/PageContainer';

import { CustomTab } from '../../../components/core/custom-tab';
import { paths } from '../../../paths';
import AllContentListView from '../../(private)/all-content/_component/all-content-list-view';
import { CampaignListView } from '../../(public)/campaign/_components/campaign-listview';
import { PartnerListView } from '../../(public)/partner/_components/partner-listview';
import { PortfolioListView } from '../../(public)/portfolio/_components/portfolio-listview';
import { ProductionListView } from '../../(public)/production/_components/production-listview';
import { useSettings } from '/src/hooks/use-settings';

const tabs = [
  { label: 'Campaign', value: 'campaign' },
  { label: 'Portfolio', value: 'portfolio' },
  { label: 'Production', value: 'production' },
  { label: 'Partner', value: 'partner' },
  { label: 'Content', value: 'content' },
];

export default function RecordPageView() {
  const router = useRouter();
  const { setBreadcrumbs } = useSettings();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlTab = searchParams.get('tab');

    if (!urlTab && tab === '') {
      setTab('campaign');
      router.push('?tab=campaign');
    } else if (urlTab && urlTab !== tab) {
      setTab(urlTab);
    }
  }, [searchParams]);

  const handleChange = (_event, newValue) => {
    setTab(newValue);
    router.push(`?tab=${newValue}`);
  };

  useEffect(() => {
    setBreadcrumbs([
      { title: 'Dashboard', href: paths.private.overview },
      { title: 'Records', href: '' },
    ]);
  }, []);

  return (
    <PageContainer>
      <Box mb={1}>
        <CustomTab tabs={tabs} handleChange={handleChange} value={tab} />
      </Box>

      {tab === 'campaign' && <CampaignListView />}
      {tab === 'portfolio' && <PortfolioListView />}
      {tab === 'production' && <ProductionListView />}
      {tab === 'partner' && <PartnerListView />}
      {tab === 'content' && <AllContentListView />}
    </PageContainer>
  );
}

import React from 'react';
import CommingSoon from '@/components/coming-soon/comming-soon';
import { TabContainer } from '@/components/tabs/tab-container';

export const CampaignTabView = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  return (
    <TabContainer
      tabs={[
        'Gather Rates',
        'Review Rates',
        'Approved for Campaign offer',
        'In Negotiation',
        'Awaiting Shipment',
        'Awaiting Deliverables',
        'Content Review',
        'Awaiting Partner Post',
        'Approved for Payment',
        'Complete',
        'Not Approved',
        'All Partners',
      ]}
      value={selectedTab}
      onTabChange={(e, value) => setSelectedTab(value)}
    />
  );
};

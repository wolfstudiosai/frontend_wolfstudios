
import { config } from '@/config';
import ManagePartnerByCampaign from './_components/manage-parners-by-campaign';

export const metadata = { title: `Dashboard | Needs Offer/ Approval | ${config.site.name}` };

export default function Page() {

    return (
        <ManagePartnerByCampaign />
    );
}

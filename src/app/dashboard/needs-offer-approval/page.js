
import { config } from '@/config';
import ManageOfferApproval from './_components/manage-offer-approval';

export const metadata = { title: `Dashboard | Needs Offer/ Approval | ${config.site.name}` };

export default function Page() {

    return (
        <ManageOfferApproval />
    );
}

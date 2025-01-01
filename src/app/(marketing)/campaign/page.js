
import { config } from '@/config';
import { Container } from '@mui/material';
import { CampaignView } from './campaign-view';

export const metadata = { title: config.site.name, description: "Campaigns list page" };

export default function Page() {
    

    return (
        <Container maxWidth="xl">
            <CampaignView/>
        </Container>
    );
}

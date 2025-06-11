import { PageContainer } from '/src/components/container/PageContainer';

import { ContentPerformance } from './_components/content-performance';
import { Facilities } from './_components/facilities';
import { PartnerMatrix } from './_components/partner-matrix';

// export const metadata = { title: `Analytics | Dashboard | ${config.site.name}` };

export default function Page() {
    return (
        <PageContainer>
            <ContentPerformance />
            <PartnerMatrix />
            <Facilities />
        </PageContainer>
    );
}
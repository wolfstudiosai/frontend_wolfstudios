import { CardTitle } from "/src/components/cardTitle/CardTitle";
import { PageContainer } from "/src/components/container/PageContainer";
import { config } from "/src/config";
import { ManageReport } from "../_components/ManageReport";

export const metadata = { title: `Create Record | ${config.site.name}` };

export default function Page() {

    return (
        <PageContainer>
            <CardTitle title="Create Record" />
            <ManageReport />
        </PageContainer>
    )
}
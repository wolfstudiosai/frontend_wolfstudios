import { CardTitle } from "/src/components/cardTitle/CardTitle";
import { PageContainer } from "/src/components/container/PageContainer";
import { config } from "/src/config";
import { ManageReport } from "../_components/ManageReport";

export const metadata = { title: `Create Record | ${config.site.name}` };

export default function Page({ params }) {
    const { id } = params

    return (
        <PageContainer>
            <CardTitle title="Update Record" />
            <ManageReport id={id} />
        </PageContainer>
    )
}
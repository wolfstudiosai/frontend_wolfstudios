import { CardTitle } from "@/components/cardTitle/CardTitle";
import { PageContainer } from "@/components/container/PageContainer";
import { config } from "@/config";
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
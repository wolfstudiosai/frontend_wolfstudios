import PageLoader from "@/components/loaders/PageLoader";
import Grid from "@mui/material/Grid2";
import { ContentCard } from "./content-card";

export const AllContentCardView = ({ data, loading, columns }) => {
    return (
        <PageLoader loading={loading} error={null} >
            <Grid container spacing={2} columns={{ xs: 24 }}>
                {
                    data?.map((content) => (
                        <Grid key={content.id} size={{ xs: 12, md: columns }}>
                            <ContentCard content={content} />
                        </Grid>
                    ))
                }
            </Grid>
        </PageLoader>

    )
};
import { Box } from "@mui/material"
import { Dialog } from "../dialog/Dialog";
import React from "react";

export const ImageViewerWithDialog = ({ url, alt = "image", height = "100%", width = "100%" }) => {
    const [imagePreviewDialog, setImagePreviewDialog] = React.useState(false);
    return (
        <Box>
            <Box
                component={"img"}
                src={url} alt={alt}
                height={height}
                width={width}
                onClick={() => setImagePreviewDialog(true)}
            />
            {
                imagePreviewDialog && (
                    <Dialog
                        title="Image Previewer"
                        open={imagePreviewDialog}
                        onClose={() => setImagePreviewDialog(false)}
                    >
                        <Box
                            component={"img"}
                            src={url} alt={alt}
                            height={height}
                            width={width}
                            onClick={() => setImagePreviewDialog(true)}
                        />
                    </Dialog>
                )
            }
        </Box>
    )
}
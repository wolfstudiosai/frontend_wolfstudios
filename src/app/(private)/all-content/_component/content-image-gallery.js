import { useMediaQuery, useTheme, Dialog, IconButton } from "@mui/material";
import { useState } from "react";
import { Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";

const images = [
    { src: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?w=600", alt: "Image 1" },
    { src: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=600", alt: "Image 2" },
    { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600", alt: "Image 3" },
    { src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=600", alt: "Image 4" },
    { src: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?w=600", alt: "Image 5" },
    { src: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=600", alt: "Image 6" },
    { src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", alt: "Image 7" },
    { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600", alt: "Image 8" },
    { src: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600", alt: "Image 9" },
    { src: "https://images.unsplash.com/photo-1502764613149-7f1d229e230f?w=600", alt: "Image 10" },
    { src: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?w=600", alt: "Image 11" },
    { src: "https://images.unsplash.com/photo-1531177071318-82a0a2c41639?w=600", alt: "Image 12" },
    { src: "https://images.unsplash.com/photo-1539887544858-83d5e1b0d0df?w=600", alt: "Image 13" },
    { src: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=600", alt: "Image 14" },
    { src: "https://images.unsplash.com/photo-1522205408450-add114ad53fe?w=600", alt: "Image 15" },
    { src: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=600", alt: "Image 16" },
];

export const ContentImageGallery = () => {
    const [showAll, setShowAll] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const displayedImages = showAll ? images : images.slice(0, 8);

    const handleOpenModal = (image) => {
        setSelectedImage(image);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedImage(null);
    };

    return (
        <Box mb={5}>
            <Grid container spacing={2}>
                {displayedImages.map((item, index) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                        <Box
                            onClick={() => handleOpenModal(item)}
                            sx={{ cursor: "pointer", width: "100%", position: "relative", paddingTop: "66.66%" }}
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "6px",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                }}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="outlined" onClick={() => setShowAll((prev) => !prev)}>
                    {showAll ? "Show Less" : "View All"}
                </Button>
            </Box>

            {/* Modal */}
            <Dialog
                open={openModal}
                onClose={handleCloseModal}
                fullWidth
                sx={{
                    "& .MuiDialog-paper": {
                        backgroundColor: "transparent",
                        boxShadow: "none",
                    },
                }}
            >
                <Box
                    position="relative"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    height="100%"
                    p={2}
                >
                    <IconButton
                        onClick={handleCloseModal}
                        sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            color: "white",
                            zIndex: 10,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {selectedImage && (
                        <Image
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            width={1600}
                            height={900}
                            style={{
                                width: "100%",
                                height: "80vh",
                                objectFit: "contain",
                                borderRadius: "8px",
                            }}
                        />
                    )}
                </Box>
            </Dialog>
        </Box>
    );
};
import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { Box, Button, ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";

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
    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.down("sm"));
    const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

    let cols = 4;
    if (isXs) cols = 2;
    else if (isSm) cols = 3;
    else if (isMdUp) cols = 4;

    const displayedImages = showAll ? images : images.slice(0, 8);

    return (
        <Box>
            <ImageList variant="masonry" cols={cols} gap={8}>
                {displayedImages.map((item, index) => (
                    <ImageListItem key={index}>
                        <Image
                            src={item.src}
                            alt={item.alt}
                            width={600}
                            height={400}
                            style={{ width: "100%", display: "block", borderRadius: "6px", objectFit: "cover" }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>

            <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="outlined" onClick={() => setShowAll((prev) => !prev)}>
                    {showAll ? "Show Less" : "View All"}
                </Button>
            </Box>
        </Box>
    );
};
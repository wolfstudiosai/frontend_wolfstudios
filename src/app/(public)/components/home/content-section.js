import Image from "next/image";
import { ChevronRight, ArrowRight, Circle } from "lucide-react";
import { Button, Box, Typography, TextField, Card, CardContent, IconButton } from "@mui/material";

export default function ContentSection() {
    return (
        <Box sx={{ width: "100%", bgcolor: "background.paper", py: 8 }}>
            <Box sx={{ maxWidth: "1200px", mx: "auto", display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: 4 }}>
                {/* Left Sidebar - Specifications */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 2 }}>
                    <Box>
                        <Typography variant="h4" fontWeight="bold">+500</Typography>
                        <Typography variant="body2" color="text.secondary">Positive reviews</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                            {[...Array(5)].map((_, index) => (
                                <Circle key={index} size={16} style={{ color: "black", marginRight: 4 }} />
                            ))}
                            <Typography variant="body2">4.8</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ borderTop: 1, borderColor: "divider", pt: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                            <Typography variant="subtitle2" fontWeight="bold">Specifications TYPE PRO</Typography>
                            <IconButton size="small">
                                VIEW ALL <ChevronRight size={16} style={{ marginLeft: 4 }} />
                            </IconButton>
                        </Box>
                        {["MODEL: KEYBOARD PRO", "DISPLAY: COLOR OLED DISPLAY", "AI: MACHINE LEARNING ALGORITHMS"].map((item, index) => (
                            <Box key={index} sx={{ borderTop: 1, borderColor: "divider", py: 1, display: "flex", justifyContent: "space-between" }}>
                                <Typography variant="body2" color="text.secondary">{item.split(": ")[0]}</Typography>
                                <Typography variant="body2" fontWeight="medium">{item.split(": ")[1]}</Typography>
                            </Box>
                        ))}
                    </Box>

                    <Button fullWidth variant="contained" color="primary" sx={{ borderRadius: "24px", py: 2 }}>GO TO THE STORE</Button>
                </Box>

                {/* Center - Product Image */}
                <Box sx={{ position: "relative", textAlign: "center" }}>
                    <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eBhNC0HdoxyWGhqFXvJgf2bOPRfV8m.png"
                        alt="TYPE PRO Keyboard"
                        layout="intrinsic"
                        width={400}
                        height={400}
                        priority
                    />
                    <Box sx={{ position: "absolute", top: 50, left: "50%", transform: "translateX(-50%)", width: "80%", bgcolor: "white", p: 1, borderRadius: "50px", display: "flex", alignItems: "center" }}>
                        <TextField placeholder="Enter your email" variant="standard" fullWidth sx={{ flex: 1, px: 1 }} />
                        <Button variant="contained" size="small">Subscribe</Button>
                    </Box>
                </Box>

                {/* Right - Features */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 2 }}>
                    <Typography variant="subtitle2" color="primary">#CoreCollection</Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        {["00", "01", "02", "03"].map((num, index) => (
                            <Box key={index} sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: index === 0 ? "black" : "gray.200", color: index === 0 ? "white" : "black", display: "flex", alignItems: "center", justifyContent: "center" }}>{num}</Box>
                        ))}
                    </Box>
                    <Card>
                        <CardContent>
                            <Image
                                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-eBhNC0HdoxyWGhqFXvJgf2bOPRfV8m.png"
                                alt="Keyboard detail"
                                width={300}
                                height={150}
                                style={{ width: "100%", borderRadius: 8 }}
                            />
                        </CardContent>
                    </Card>
                    <Typography variant="h6" fontWeight="bold">MULTILINGUAL SUPPORT</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Our keyboard supports many languages thanks to AI. Dictate a message and the keyboard will automatically translate it into the desired language.
                    </Typography>

                    <Button fullWidth variant="contained" color="primary" endIcon={<ArrowRight size={16} />}>CONTACT US</Button>
                </Box>
            </Box>
        </Box>
    );
}

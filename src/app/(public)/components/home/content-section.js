"use client"

import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material"
import { FadeIn } from "../../../../components/animation/fade-in"

import { Iconify } from "/src/components/iconify/iconify"

export function ContentSection() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")) // 0-600px
  // const isTablet = useMediaQuery(theme.breakpoints.down("md")) // 0-900px
  // const isSmallLaptop = useMediaQuery(theme.breakpoints.down("lg")) // 0-1200px

  return (
    <Stack direction="column" gap={3} sx={{ px: { xs: 2, sm: 3, md: 4 }, py: 4 }}>
      <FadeIn>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "flex-start", md: "center" },
            gap: { xs: 2, md: 4 },
            flexWrap: "wrap",
            display: "none",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "1.8rem", sm: "2rem", md: "2.2rem" },
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              color: "text.primary",
            }}
          >
            Project Drop
          </Typography>
          <Typography
            fontSize={{ xs: 16, md: 18 }}
            sx={{ color: "text.main", mt: 1, width: { xs: "100%", md: "70%" } }}
          >
            Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
            visuals that captivate audiences, evoke emotion, and leave a lasting impact.
          </Typography>
        </Box>
      </FadeIn>

      {/* Main content row - Convert to column on mobile/tablet */}
      <Stack
        direction={{ xs: "column", lg: "row" }}
        gap={2}
        sx={{
          "& > *": {
            maxWidth: { md: "100%", lg: "auto" },
          },
        }}
      >
        {/* Left Column - Full width on mobile/tablet */}
        <Stack
          direction="column"
          gap={3}
          justifyContent="space-between"
          sx={{
            width: { xs: "100%", md: "48%", lg: "30%" },
            border: "1px solid",
            borderColor: "divider",
            p: { xs: 2, sm: 3 },
            order: { xs: 2, md: 1, lg: 1 },
            alignSelf: { md: "flex-start" },
            height: { md: "auto" },
          }}
        >
          <Stack direction="column" gap={1}>
            <Stack direction="row" gap={2} justifyContent={{ xs: "center", sm: "flex-start" }}>
              <Box
                component="img"
                src="https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66fceb82b74027628836d005_66f6664e6c10316b602127e7_DSC09046-2.jpeg"
                sx={{
                  width: { xs: "140px", sm: "160px", md: "180px" },
                  height: { xs: "180px", sm: "200px", md: "220px" },
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
            </Stack>
            <Stack direction="row" gap={1} alignItems="center" justifyContent={{ xs: "center", sm: "flex-start" }}>
              <Rating name="read-only" value={3.5} readOnly size={isMobile ? "small" : "medium"} />
              <Typography variant="caption">4.5</Typography>
            </Stack>
            <Stack direction="column" justifyContent="flex-end" alignItems={{ xs: "center", sm: "flex-start" }}>
              <Typography variant="h4" sx={{ fontWeight: "semibold", fontSize: { xs: "1.5rem", sm: "2rem" } }}>
                +500
              </Typography>
              <Typography>Positive reviews</Typography>
            </Stack>
          </Stack>
          <Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              sx={{
                fontWeight: "medium",
                textTransform: "uppercase",
                fontSize: { xs: "0.8rem", sm: "1rem" },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Specifications itype pro
            </Typography>
              <Button
                variant="text"
                endIcon={<Iconify icon="mdi:arrow-top-right" />}
                size={isMobile ? "small" : "medium"}
              >
                Send
              </Button>
            </Stack>
            {["MODEL: KEYBOARD PRO", "DISPLAY: COLOR OLED DISPLAY", "AI: MACHINE LEARNING ALGORITHMS"].map(
              (item, index) => (
                <Box
                  key={index}
                  sx={{
                    borderTop: 1,
                    borderColor: "divider",
                    py: 1,
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: { xs: isMobile ? "column" : "row", sm: "row" },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      fontSize: { xs: "0.8rem", sm: "0.9rem" },
                      textAlign: { xs: isMobile ? "center" : "left", sm: "left" },
                    }}
                  >
                    {item.split(": ")[0]}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight="medium"
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "0.7rem", sm: "0.8rem" },
                      mt: { xs: isMobile ? 0.5 : 0, sm: 0 },
                      textAlign: { xs: isMobile ? "center" : "right", sm: "right" },
                    }}
                  >
                    {item.split(": ")[1]}
                  </Typography>
                </Box>
              ),
            )}
            <Stack
              direction="row"
              gap={2}
              alignItems="center"
              sx={{ mt: 2 }}
              justifyContent={{ xs: "center", sm: "flex-start" }}
            >
              <Button
                variant="contained"
                size={isMobile ? "small" : "medium"}
                fullWidth
                sx={{
                  borderRadius: "20px",
                  textTransform: "uppercase",
                  fontSize: { xs: "0.7rem", sm: "0.8rem" },
                  maxWidth: { xs: "80%", sm: "100%" },
                }}
              >
                Go to the store
              </Button>
              <IconButton size="small" sx={{ border: "1px solid", borderColor: "divider", borderRadius: "50%" }}>
                <Iconify icon="mdi:favourite-border" />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>

        {/* Middle Column - Full width on mobile/tablet */}
        <Stack
          sx={{
            width: { xs: "100%", md: "100%", lg: "40%" },
            position: "relative",
            minHeight: { xs: "350px", sm: "400px", md: "500px", lg: "600px" },
            order: { xs: 1, md: 3, lg: 2 },
            maxWidth: { sm: "600px", md: "100%" },
            mx: { xs: "auto", lg: 0 },
            marginBottom: { md: 2 },
          }}
        >
          <Box
            component="img"
            src="https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66fceb82b74027628836d005_66f6664e6c10316b602127e7_DSC09046-2.jpeg"
            sx={{
              width: "100%",
              height: { xs: "350px", sm: "400px", md: "500px", lg: "600px" },
              objectFit: "cover",
              objectPosition: "center",
              zIndex: 9,
              borderRadius: { xs: "8px", sm: "8px", md: "8px", lg: "0" },
            }}
          />
          <Stack
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              right: 0,
              p: { xs: 2, sm: 3, md: 4 },
              left: 0,
              zIndex: 10,
              justifyContent: "space-between",
            }}
          >
            <Stack direction="column" justifyContent="space-around" alignItems="center" sx={{ flexGrow: 1, my: 2 }}>
              {[
                "Built-in artificial intelligence",
                "Built-in artificial intelligence",
                "Built -in artificial intelligence",
              ].map((item, index) => (
                <Stack
                  key={index}
                  direction="row"
                  alignItems="center"
                  gap={1}
                  sx={{
                    bgcolor: "rgba(255, 255, 255, 0.2)",
                    width: "fit-content",
                    pr: 1.2,
                    backdropFilter: "blur(5px)",
                    color: "white",
                    borderRadius: "30px",
                    ml: {
                      xs: index % 2 !== 0 ? 4 : 0,
                      sm: index % 2 !== 0 ? 8 : 0,
                      md: index % 2 !== 0 ? 12 : 0,
                      lg: index % 2 !== 0 ? 16 : 0,
                    },
                  }}
                >
                  <Iconify
                    icon="radix-icons:dot-filled"
                    sx={{
                      bgcolor: "rgba(255, 255, 255, 0.2)",
                      backdropFilter: "blur(2px)",
                      borderRadius: "50%",
                      width: { xs: 18, sm: 20, md: 22 },
                      height: { xs: 18, sm: 20, md: 22 },
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: { xs: "0.7rem", sm: "0.75rem", md: "0.8rem" },
                      color: "black",
                    }}
                  >
                    {item}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Box
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(5px)",
                p: { xs: 0.5, sm: 1 },
                borderRadius: "50px",
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: isMobile ? "column" : "row", sm: "row" },
                gap: { xs: isMobile ? 1 : 0, sm: 0 },
              }}
            >
              <TextField
                placeholder="Enter your email"
                variant="standard"
                fullWidth
                sx={{
                  flex: 1,
                  px: 1,
                  "& .MuiInputBase-input": {
                    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  },
                }}
              />
              <Button
                variant="contained"
                size="small"
                sx={{
                  borderRadius: "30px",
                  fontSize: { xs: "0.7rem", sm: "0.8rem" },
                  width: { xs: isMobile ? "90%" : "auto", sm: "auto" },
                  my: { xs: isMobile ? 1 : 0, sm: 0 },
                }}
                endIcon={<Iconify icon="si:double-arrow-right-fill" />}
              >
                Subscribe
              </Button>
            </Box>
          </Stack>
        </Stack>

        {/* Right Column - Full width on mobile/tablet */}
        <Stack
          sx={{
            width: { xs: "100%", md: "48%", lg: "30%" },
            border: "1px solid",
            borderColor: "divider",
            p: { xs: 2, sm: 3 },
            order: { xs: 3, md: 2, lg: 3 },
            alignSelf: { md: "flex-start" },
            height: { md: "auto" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "0.9rem", sm: "1rem" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            #CoreCollection
          </Typography>
          {/* Stepper Section */}
          <Box display="flex" gap={1} justifyContent={{ xs: "center", sm: "flex-start" }}>
            {["00", "01", "02", "03"].map((step, index) => (
              <Chip
                key={index}
                label={step}
                variant={index === 0 ? "filled" : "soft"}
                size="small"
                sx={{
                  borderRadius: "20px",
                  px: 1,
                  fontSize: { xs: "0.7rem", sm: "0.8rem" },
                }}
              />
            ))}
          </Box>

          {/* Image */}
          <CardMedia
            component="img"
            image="https://cdn.prod.website-files.com/66836d311a49ad62d048361e/66fceb82b74027628836d005_66f6664e6c10316b602127e7_DSC09046-2.jpeg"
            alt="Keyboard"
            sx={{
              width: { xs: "60%", sm: "65%", md: "70%" },
              height: { xs: "100px", sm: "110px", md: "130px" },
              objectFit: "cover",
              my: 2,
              mx: { xs: "auto", sm: 0, md: "0" },
              borderRadius: "4px",
            }}
          />

          {/* Text Content */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            MULTILINGUAL SUPPORT
          </Typography>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            gap={{ xs: 2, sm: 3 }}
            alignItems={{ xs: "center", sm: "flex-end" }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              mt={1}
              sx={{
                fontSize: { xs: "0.75rem", sm: "0.8rem", md: "0.875rem" },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Our keyboard supports many languages thanks to AI. Dictate a message and the keyboard will automatically
              translate it into the desired language.
            </Typography>
            <IconButton
              size="small"
              sx={{
                backgroundColor: "grey.800",
                color: "white",
                borderRadius: "50%",
                "&:hover": { backgroundColor: "grey.900" },
                alignSelf: { xs: "center", sm: "flex-end" },
                flexShrink: 0,
              }}
            >
              <Iconify icon="gg:arrow-bottom-right" />
            </IconButton>
          </Stack>

          <Divider sx={{ border: "2px solid", borderColor: "grey.800", my: 3 }} />

          {/* Contact Section */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            gap={{ xs: 2, sm: 1 }}
            alignItems={{ xs: "center", sm: "flex-start" }}
          >
            <AvatarGroup max={3} sx={{ justifyContent: { xs: "center", sm: "flex-start" } }}>
              <Avatar src="https://via.placeholder.com/40" sx={{ width: 30, height: 30 }} />
              <Avatar src="https://via.placeholder.com/40" sx={{ width: 30, height: 30 }} />
              <Avatar src="https://via.placeholder.com/40" sx={{ width: 30, height: 30 }} />
            </AvatarGroup>
            <Stack direction="column" gap={1} alignItems={{ xs: "center", sm: "flex-start" }}>
              <Typography fontSize={{ xs: 12, sm: 14 }} fontWeight="bold" textAlign={{ xs: "center", sm: "left" }}>
                Write to us and our manager will contact you shortly
              </Typography>
              <Box sx={{ display: "flex", justifyContent: { xs: "center", sm: "flex-start" }, width: "100%" }}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{
                    mt: 2,
                    borderRadius: "20px",
                    px: 3,
                    fontSize: { xs: "0.7rem", sm: "0.8rem" },
                  }}
                >
                  CONTACT US
                  <Typography component="span" sx={{ ml: 2 }}>
                    »
                  </Typography>
                </Button>
              </Box>
            </Stack>
          </Stack>

          {/* Footer Links */}
          <Stack
            direction="row"
            justifyContent="center"
            gap={1}
            sx={{
              mt: { xs: 2, sm: "auto" },
              p: 2,
              flexWrap: "wrap",
            }}
          >
            {["• Delivery", "• Reviews", "• Services", "• Contact"].map((item, index) => (
              <Chip
                key={index}
                label={item}
                size="small"
                variant="soft"
                sx={{
                  fontSize: { xs: 10, sm: 12 },
                  m: { xs: "2px", sm: 0 },
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
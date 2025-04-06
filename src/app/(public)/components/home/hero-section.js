"use client"

import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useEffect, useState } from "react"

import { FadeIn } from "/src/components/animation/fade-in"

export const HeroSection = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [boxSize, setBoxSize] = useState(isMobile ? 100 : 50)
  const [boxHeight, setBoxHeight] = useState(isMobile ? 100 : 60)

  useEffect(() => {
    const handleScroll = () => {
      // Don't apply scroll effects on mobile
      if (isMobile) return

      const scrollPosition = window.scrollY
      const maxScroll = 500

      const newWidth = Math.min(100, Math.max(50, 50 + (scrollPosition / maxScroll) * 50))
      const newHeight = Math.min(100, Math.max(60, 60 + (scrollPosition / maxScroll) * 40))

      setBoxSize(newWidth)
      setBoxHeight(newHeight)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  // Update sizes when screen size changes
  useEffect(() => {
    setBoxSize(isMobile ? 100 : 50)
    setBoxHeight(isMobile ? 100 : 60)
  }, [isMobile])

  return (
    <>
      {/* Main Video Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "25rem", sm: "30rem", md: "35rem" },
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
          }}
        >
          <source src="/videos/hero_bg.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(45, 45, 45, 0.1), rgba(78, 64, 57, 0.6))",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: "10%", md: "5%" },
            left: { xs: "5%", md: "2%" },
            color: "#fff",
            width: { xs: "90%", md: "90%" },
            maxWidth: "1020px",
            textAlign: "left",
          }}
        >
          <FadeIn>
            <Typography fontSize={{ xs: "1.5rem", sm: "2rem", md: "3.2rem" }} fontWeight={600} gutterBottom>
              Wolf Studios® – Every Shoot Tells a Story.
            </Typography>

            <Typography fontSize={{ xs: "1rem", sm: "1.2rem", md: "1.3rem" }}>
              Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
              visuals that captivate audiences, evoke emotion, and leave a lasting impact.
            </Typography>
          </FadeIn>
        </Box>
      </Box>

      {/* second part */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          position: "relative",
          width: "100%",
          minHeight: { xs: "auto", md: `${boxHeight}vh` },
          overflow: "hidden",
          zIndex: 2,
        }}
      >
        {/* <motion.div
          initial={{ scaleX: 0, scaleY: 0, originX: 1, originY: 1 }}
          animate={{ scaleX: 1, scaleY: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "var(--mui-palette-background-secondaryBackground)",
            zIndex: -1,
          }}
        />
        <FadeIn>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ width: '40%', minWidth: '40%', p: 4, pb: 2, color: 'text.primary' }}
          >
            Product Drop
          </Typography>
          <Typography
            fontSize={{ xs: '1rem', md: '1.3rem' }}
            fontWeight={'semibold'}
            sx={{ width: '40%', minWidth: '40%', p: 4, pt: 0, color: 'text.primary' }}
            gutterBottom
          >
            Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
            visuals that captivate audiences, evoke emotion, and leave a lasting impact.
          </Typography>
        </FadeIn> */}

        {/* Text Content */}
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            minWidth: { xs: "100%", md: "40%" },
            p: { xs: 3, md: 4 },
            order: { xs: 2, md: 1 },
            zIndex: 1,
          }}
        >
          <FadeIn>
            <Typography variant="h4" fontWeight="bold" sx={{ color: "text.primary", mb: 2 }}>
              Product Drop
            </Typography>
            <Typography
              fontSize={{ xs: "1rem", md: "1.3rem" }}
              fontWeight={"semibold"}
              sx={{ color: "text.primary" }}
              gutterBottom
            >
              Driven by the art of storytelling, we collaborate with brands, creators, and agencies to craft compelling
              visuals that captivate audiences, evoke emotion, and leave a lasting impact.
            </Typography>
          </FadeIn>
        </Box>

        {/* Video Container */}
        <Box
          sx={{
            position: { xs: "relative", md: "absolute" },
            right: 0,
            top: 0,
            width: { xs: "100%", md: `${boxSize}%` },
            height: { xs: "300px", sm: "400px", md: `${boxHeight}vh` },
            minHeight: { xs: "300px", sm: "400px", md: `${boxHeight}vh` },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "width 0.3s ease, min-height 0.3s ease",
            order: { xs: 1, md: 2 },
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
            }}
          >
            <source src="/videos/hero_bg.mp4" type="video/mp4" />
          </video>
        </Box>
      </Stack >
    </>
  )
}


'use client';

import React, { useState } from 'react';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Chip,
    Divider,
    IconButton,
    LinearProgress,
    linearProgressClasses,
    Paper,
    Tab,
    Tabs,
    Typography,
    useTheme
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {
    TrendingUp,
    TrendingDown,
    AttachMoney,
    People,
    Visibility,
    Message,
    Instagram,
    YouTube,
    Facebook,
    LinkedIn,
    Language,
    Email,
    Phone,
    CalendarToday,
    Star,
    BarChart,
    PieChart,
    ShowChart,
    Room,
    Business,
    LocalOffer,
    Description,
    Link as LinkIcon,
    CameraAlt,
    MusicNote,
    Headset,
    OpenInNew,
    CheckCircle,
    Cancel,
    CreditCard,
    ShoppingCart,
    TrackChanges,
    Work,
    EmojiEvents,
    Image as ImageIcon,
    Receipt,
    AssignmentTurnedIn,
    Settings,
    ShowChart as ShowChartIcon,
    X as XIcon,
    CrisisAlert as CrisisAlertIcon
} from '@mui/icons-material';
import Image from 'next/image';

const partnerData = {
    id: "58c1cf64-5e28-4bd5-b186-faed3c6309b9",
    name: "kimberlyratzell",
    totalROI: 700,
    totalExpense: 897,
    shippingFBAFeeGiftedPartners: 150,
    paypalFee: 315,
    amazonReferralFee: 450,
    instagram: "https://www.instagram.com/jackson.mccarter/?hl=en",
    thumbnailImage: "https://cdn.pixabay.com/photo/2019/05/02/10/50/bird-4173109_1280.jpg",
    profileStatus: ["Active"],
    linkedinConnections: 4,
    youtubeFollowing: 120,
    snapchatFollowing: 321,
    xFollowing: 5,
    pinterestFollowing: 300,
    tiktokFollowing: 6,
    facebookFollowing: 3,
    instagramFollowing: 1,
    website: "slack.com",
    medium: "https://medium.com/@janesmith",
    soundcloud: "https://soundcloud.com/janesmith",
    spotify: "https://open.spotify.com/artist/janesmith",
    openToGifting: true,
    mailingAddress: "wolf@gmail.com",
    previousCollabExpense: 7500,
    totalProductCOGExpense: 23,
    shippingExpense: 250,
    oneOffExpense: 21,
    currentStatus: ["Inactive", "Pending"],
    occupation: "Content Creator",
    paymentLink: "https://payment.com/janesmith",
    client: "client",
    notes: "notes",
    facebook: "facebook.com/johndoe",
    linkedin: "https://linkedin.com/in/janesmith",
    phone: "01303359122",
    pinterest: "pinterest.com/johndoe",
    podcast: "anchor.fm/johndoe",
    partner360Rate: 0,
    refusalReason: "Nam ad exercitation",
    snapchat: "@johndoe_snap",
    tiktok: "https://www.tiktok.com/@kat._.tlyn",
    twitch: "twitch.tv/johndoe",
    x: "@johndoe_x",
    youtube: "youtube.com/johndoe",
    revoAmazonOrderConfirmationNumber: "",
    amazonReviewLink: "",
    amazonReviewCupper: "",
    amazonReviewThePill: "",
    amazonStorefront: "",
    campaignMonth: [],
    deliverables: "",
    googleDriveFiles: "drive",
    revoIGPost: "",
    journeyStep: "Onboarding",
    partnerIGRate: 0,
    partnerTTRate: 0,
    partnerYTRate: 0,
    amountPaid: 10500,
    totalContributedEngagementByContent: 390,
    totalAudience: 0,
    platformDeliverables: [],
    platforms: [],
    revosOffer: "",
    remainingCredits: 21,
    ttPost: "",
    ugcPaymentStatus: "Paid",
    email: "demo1@gmail.com",
    ugcRetainerAmount: 21,
    ugcTikTokLink: "",
    revoUGCArmyTTUsernameAndPW: "",
    whatsapp: "+1-555-987-6543",
    ytPost: "",
    partnerPostViews: 310,
    sourcedFrom: ["jfls"],
    estimatedTaxes: 2500,
    fbaXLevanta: 0,
    amazonOrderTotal: 0,
    contracts: ["https://cdn.pixabay.com/photo/2025/04/30/13/05/cat-9569386_1280.jpg"],
    amazonTax: 0,
    amazonKickback: 0,
    monthSourced: "July 2025",
    secondPaymentDate: "2025-07-31",
    clientStatus: "Active",
    affiliatePlatform: ["dsafdffa"],
    receipts: ["https://cdn.pixabay.com/photo/2025/04/30/13/05/cat-9569386_1280.jpg"],
    bookingLink: "calendly.com/johndoe",
    ageBracket: ["12-21"],
    hourlyRate: 250,
    partnerGallery: ["https://cdn.pixabay.com/photo/2025/04/30/13/05/cat-9569386_1280.jpg"],
    linktree: "https://www.linktree.com/",
    partnerUGCRate: 0,
    mediaKit: ["https://cdn.pixabay.com/photo/2025/04/30/13/05/cat-9569386_1280.jpg"],
    auditedJan2025: true,
    revosCounteroffer: "",
    amazonReviewWalkingPadPro: "",
    amazonReviewWalkingPadStandard: "",
    amazonReviewOil: "",
    amazonReviewSoothingCream: "",
    amazonReviewBeautyWand: "",
    openToWhitelisting: false,
    levantaID: 78,
    impactID: 87,
    shareasaleID: 89,
    auditedJune2025: false,
    isFeatured: true,
    stakeholders: [{ name: "United States" }],
    contentHQ: [{ name: "kimberlyratzell" }],
    profileCategory: [],
    portfolios: [],
    states: [{ name: "Portugal" }],
    cities: [{ name: "Wayne" }],
    services: [],
    caseStudies: [{ name: "Executive Styles" }],
    productionHQ: [{ name: "Club REVO II" }],
    products: [],
    countries: [{ name: "Palau" }],
    retailPartners: [],
    destinations: [{ name: "McWay Falls, Big Sur, CA" }],
    tags: [{ name: "Zeroto1 Affiliates" }],
    contributedCampaigns: [],
    proposedCampaigns: [],
    productionHQ2: [{ name: "Club REVO II" }],
}

const socialPlatforms = [
    {
        name: "Instagram",
        followers: partnerData.instagramFollowing,
        icon: Instagram,
        color: "#E1306C",
        url: partnerData.instagram,
    },
    {
        name: "YouTube",
        followers: partnerData.youtubeFollowing,
        icon: YouTube,
        color: "#FF0000",
        url: partnerData.youtube,
    },
    // {
    //     name: "TikTok",
    //     followers: partnerData.tiktokFollowing,
    //     icon: Tiktok,
    //     color: "bg-black",
    //     url: partnerData.tiktok,
    // },
    {
        name: "Facebook",
        followers: partnerData.facebookFollowing,
        icon: Facebook,
        color: "#1877F2",
        url: partnerData.facebook,
    },
    {
        name: "LinkedIn",
        followers: partnerData.linkedinConnections,
        icon: LinkedIn,
        color: "#0077B5",
        url: partnerData.linkedin,
    },
    {
        name: "Pinterest",
        followers: partnerData.pinterestFollowing,
        icon: PieChart,
        color: "#BD081C",
        url: partnerData.pinterest,
    },
    {
        name: "Snapchat",
        followers: partnerData.snapchatFollowing,
        icon: CameraAlt,
        color: "#FFFC00",
        url: partnerData.snapchat,
    },
    {
        name: "X (Twitter)",
        followers: partnerData.xFollowing,
        icon: XIcon,
        color: "#010101",
        url: partnerData.x,
    },
]

const financialMetrics = [
    { label: "Total ROI", value: partnerData.totalROI, change: "+12%", trend: "up", icon: TrendingUp },
    { label: "Total Expense", value: partnerData.totalExpense, change: "-5%", trend: "down", icon: TrendingDown },
    { label: "Amount Paid", value: partnerData.amountPaid, change: "+8%", trend: "up", icon: AttachMoney },
    { label: "Hourly Rate", value: partnerData.hourlyRate, change: "0%", trend: "neutral", icon: BarChart },
]

const platformRates = [
    { platform: "Instagram", rate: partnerData.partnerIGRate, icon: Instagram },
    // { platform: "TikTok", rate: partnerData.partnerTTRate, icon: Activity },
    { platform: "YouTube", rate: partnerData.partnerYTRate, icon: YouTube },
    { platform: "UGC", rate: partnerData.partnerUGCRate, icon: CameraAlt },
    { platform: "360", rate: partnerData.partner360Rate, icon: Language },
]

const amazonReviews = [
    { product: "Cupper", review: partnerData.amazonReviewCupper },
    { product: "The Pill", review: partnerData.amazonReviewThePill },
    { product: "Walking Pad Pro", review: partnerData.amazonReviewWalkingPadPro },
    { product: "Walking Pad Standard", review: partnerData.amazonReviewWalkingPadStandard },
    { product: "Oil", review: partnerData.amazonReviewOil },
    { product: "Soothing Cream", review: partnerData.amazonReviewSoothingCream },
    { product: "Beauty Wand", review: partnerData.amazonReviewBeautyWand },
    { product: 'Amazon Review Link', review: partnerData.amazonReviewLink },
    { product: 'Amazon Storefront', review: partnerData.amazonStorefront },
    { product: 'Amazon Order Confirmation Number', review: partnerData.revoAmazonOrderConfirmationNumber },
]

const affiliateIDs = [
    { platform: "Levanta", id: partnerData.levantaID, icon: CrisisAlertIcon },
    { platform: "Impact", id: partnerData.impactID, icon: TrendingUp },
    { platform: "ShareASale", id: partnerData.shareasaleID, icon: ShoppingCart },
]

const PartnerAnalyticsViewV2 = () => {
    const theme = useTheme();

    return (
        <Box sx={{ minHeight: '100vh', mb: 2 }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                {/* Header Section */}
                <Card sx={{
                    position: 'relative',
                    overflow: 'hidden',
                    background: 'background.default',
                    borderRadius: 0,
                    border: '1px solid var(--mui-palette-divider)',
                }}>
                    <CardContent sx={{ p: 2 }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: { xs: 'flex-start', md: 'center' },
                            gap: 3
                        }}>
                            <Box sx={{ position: 'relative' }}>
                                <Avatar sx={{
                                    width: 150,
                                    height: 150,
                                    borderRadius: 0,
                                    border: '4px solid rgba(255, 255, 255, 0.2)'
                                }}>
                                    <img
                                        src={partnerData.thumbnailImage || '/placeholder.svg'}
                                        alt={partnerData.name}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    {partnerData.name.slice(0, 2).toUpperCase()}
                                </Avatar>
                                {partnerData.isFeatured && (
                                    <Box sx={{
                                        position: 'absolute',
                                        top: -8,
                                        right: -8,
                                        backgroundColor: 'primary.main',
                                        color: 'primary.contrastText',
                                        borderRadius: '50%',
                                        height: 24,
                                        width: 24,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Star sx={{ fontSize: 16 }} />
                                    </Box>
                                )}
                            </Box>

                            <Box sx={{ flex: 1 }}>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: { xs: 'column', md: 'row' },
                                    alignItems: { xs: 'flex-start', md: 'center' },
                                    gap: 2,
                                    mb: 2
                                }}>
                                    <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
                                        {partnerData.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                        {partnerData.profileStatus.map((status) => (
                                            <Chip
                                                key={status}
                                                label={status}
                                                sx={{
                                                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                                    color: theme.palette.common.white
                                                }}
                                            />
                                        ))}
                                        {partnerData.currentStatus.map((status) => (
                                            <Chip
                                                key={status}
                                                label={status}
                                                variant="outlined"
                                                sx={{
                                                    borderColor: 'rgba(255, 255, 255, 0.3)',
                                                    color: theme.palette.common.white
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Box>

                                <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                                    {partnerData.occupation}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.75, mb: 2 }}>
                                    Journey Step: {partnerData.journeyStep}
                                </Typography>

                                <Grid container spacing={2} sx={{ mb: 2 }}>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Email fontSize="small" />
                                            <Typography variant="body2">{partnerData.email}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Phone fontSize="small" />
                                            <Typography variant="body2">{partnerData.phone}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Message fontSize="small" />
                                            <Typography variant="body2">{partnerData.whatsapp}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Language fontSize="small" />
                                            <Typography variant="body2">{partnerData.website}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Room fontSize="small" />
                                            <Typography variant="body2">{partnerData.mailingAddress}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <CalendarToday fontSize="small" />
                                            <Typography variant="body2">{partnerData.monthSourced}</Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>

                {/* Quick Stats Cards */}
                <Grid container spacing={2}>
                    {financialMetrics.map((metric) => {
                        const Icon = metric.icon;
                        // const trendColor =
                        //     metric.trend === "up" ? "success.main" :
                        //         metric.trend === "down" ? "error.main" : "text.secondary";

                        return (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={metric.label}>
                                <Card sx={{ borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                                    <CardContent sx={{ p: 3 }}>
                                        <Box sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between'
                                        }}>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary">
                                                    {metric.label}
                                                </Typography>
                                                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                                                    ${metric.value.toLocaleString()}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 0.5,
                                                        // color: trendColor
                                                    }}
                                                >
                                                    <Icon sx={{ fontSize: 14 }} />
                                                    {metric.change}
                                                </Typography>
                                            </Box>
                                            <Box sx={{
                                                p: 1.5,
                                                borderRadius: '50%',
                                                // backgroundColor:
                                                //     metric.trend === "up" ? "success.light" :
                                                //         metric.trend === "down" ? "error.light" : "action.hover"
                                            }}>
                                                <Icon sx={{
                                                    fontSize: 24,
                                                    // color: trendColor
                                                }} />
                                            </Box>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>

                {/* Overview Section */}
                <Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                        Overview
                    </Typography>
                    <Grid container spacing={2}>
                        {/* Social Media Reach */}
                        <Grid item size={{ xs: 12, sm: 6 }}>
                            <Card sx={{
                                height: '100%',
                                borderRadius: 0,
                                border: '1px solid var(--mui-palette-divider)',
                            }}>
                                <CardHeader
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <People />
                                            <Typography variant="h6">Social Media Reach</Typography>
                                        </Box>
                                    }
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        {socialPlatforms.map((platform) => {
                                            const Icon = platform.icon;
                                            const maxFollowers = Math.max(...socialPlatforms.map((p) => p.followers));
                                            const percentage = maxFollowers > 0 ? (platform.followers / maxFollowers) * 100 : 0;

                                            return (
                                                <Box key={platform.name} sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                                                    <Box sx={{
                                                        p: 1.5,
                                                        borderRadius: 1,
                                                        backgroundColor: platform.color,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <Icon sx={{ color: 'common.white', fontSize: 20 }} />
                                                    </Box>
                                                    <Box sx={{ flex: 1 }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                                {platform.name}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary">
                                                                {platform.followers.toLocaleString()}
                                                            </Typography>
                                                        </Box>
                                                        <LinearProgress
                                                            variant="determinate"
                                                            value={percentage}
                                                            sx={{
                                                                height: 4,
                                                                borderRadius: 2,
                                                                [`&.${linearProgressClasses.colorPrimary}`]: {
                                                                    backgroundColor: platform.color,
                                                                },
                                                                [`& .${linearProgressClasses.bar}`]: {
                                                                    borderRadius: 5,
                                                                    backgroundColor: `${platform.color}33`,
                                                                },
                                                            }}
                                                        />
                                                    </Box>
                                                    {platform.url && (
                                                        <IconButton
                                                            size="small"
                                                            component="a"
                                                            href={platform.url}
                                                            target="_blank"
                                                            sx={{ color: 'text.secondary' }}
                                                        >
                                                            <OpenInNew fontSize="small" />
                                                        </IconButton>
                                                    )}
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Quick Links */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                                <CardHeader
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LinkIcon />
                                            <Typography variant="h6">Quick Links</Typography>
                                        </Box>
                                    }
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        {partnerData.linktree && (
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                <Typography variant="body2">Linktree</Typography>
                                                <IconButton
                                                    size="small"
                                                    component="a"
                                                    href={partnerData.linktree}
                                                    target="_blank"
                                                >
                                                    <OpenInNew fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        )}
                                        {partnerData.bookingLink && (
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                <Typography variant="body2">Booking</Typography>
                                                <IconButton
                                                    size="small"
                                                    component="a"
                                                    href={partnerData.bookingLink}
                                                    target="_blank"
                                                >
                                                    <OpenInNew fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        )}
                                        {partnerData.paymentLink && (
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                <Typography variant="body2">Payment</Typography>
                                                <IconButton
                                                    size="small"
                                                    component="a"
                                                    href={partnerData.paymentLink}
                                                    target="_blank"
                                                >
                                                    <OpenInNew fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        )}
                                        {partnerData.medium && (
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                <Typography variant="body2">Medium</Typography>
                                                <IconButton
                                                    size="small"
                                                    component="a"
                                                    href={partnerData.medium}
                                                    target="_blank"
                                                >
                                                    <OpenInNew fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        )}
                                        {partnerData.spotify && (
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                <Typography variant="body2">Spotify</Typography>
                                                <IconButton
                                                    size="small"
                                                    component="a"
                                                    href={partnerData.spotify}
                                                    target="_blank"
                                                >
                                                    <MusicNote fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        )}
                                        {partnerData.soundcloud && (
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                <Typography variant="body2">SoundCloud</Typography>
                                                <IconButton
                                                    size="small"
                                                    component="a"
                                                    href={partnerData.soundcloud}
                                                    target="_blank"
                                                >
                                                    <Headset fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        )}
                                        {partnerData.podcast && (
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                <Typography variant="body2">Podcast</Typography>
                                                <IconButton
                                                    size="small"
                                                    component="a"
                                                    href={partnerData.podcast}
                                                    target="_blank"
                                                >
                                                    <Headset fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        )}
                                        {partnerData.twitch && (
                                            <Box sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                            }}>
                                                <Typography variant="body2">Twitch</Typography>
                                                <IconButton
                                                    size="small"
                                                    component="a"
                                                    href={partnerData.twitch}
                                                    target="_blank"
                                                >
                                                    <OpenInNew fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Performance Metrics */}
                        <Grid item size={{ xs: 12, sm: 6 }}>
                            <Card sx={{ borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                                <CardHeader
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <ShowChart />
                                            <Typography variant="h6">Performance Metrics</Typography>
                                        </Box>
                                    }
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                    Total Audience
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {partnerData.totalAudience.toLocaleString()}
                                                </Typography>
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={75}
                                                sx={{ height: 4, borderRadius: 2 }}
                                            />
                                        </Box>

                                        <Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                    Engagement
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {partnerData.totalContributedEngagementByContent}
                                                </Typography>
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={85}
                                                sx={{ height: 4, borderRadius: 2 }}
                                            />
                                        </Box>

                                        <Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                    Post Views
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {partnerData.partnerPostViews}
                                                </Typography>
                                            </Box>
                                            <LinearProgress
                                                variant="determinate"
                                                value={65}
                                                sx={{ height: 4, borderRadius: 2 }}
                                            />
                                        </Box>

                                        <Divider sx={{ my: 2 }} />

                                        <Grid container spacing={2} sx={{ textAlign: 'center' }}>
                                            <Grid size={{ xs: 6 }}>
                                                <Typography variant="h5" color="primary.main" sx={{ fontWeight: 'bold' }}>
                                                    {partnerData.remainingCredits}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Remaining Credits
                                                </Typography>
                                            </Grid>
                                            <Grid size={{ xs: 6 }}>
                                                <Typography variant="h5" color="primary.main" sx={{ fontWeight: 'bold' }}>
                                                    {partnerData.openToGifting ? "Yes" : "No"}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Open to Gifting
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Platform Rates */}
                        <Grid item size={{ xs: 12, sm: 6 }}>
                            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                                <CardHeader
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <CreditCard />
                                            <Typography variant="h6">Platform Rates</Typography>
                                        </Box>
                                    }
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        {platformRates.map((platform) => {
                                            const Icon = platform.icon;
                                            return (
                                                <Paper
                                                    key={platform.platform}
                                                    sx={{
                                                        p: 2,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        backgroundColor: 'action.hover'
                                                    }}
                                                >
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Icon sx={{ color: 'text.secondary', fontSize: 24 }} />
                                                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                                            {platform.platform}
                                                        </Typography>
                                                    </Box>
                                                    <Chip
                                                        label={`$${platform.rate}`}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Paper>
                                            );
                                        })}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                </Box>

                {/* Social Media Section */}
                <Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                        Social Media
                    </Typography>
                    <Grid container spacing={2}>
                        {socialPlatforms.map((platform) => {
                            const Icon = platform.icon;
                            return (
                                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={platform.name}>
                                    <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                                        <CardContent sx={{ p: 3 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
                                                <Box sx={{
                                                    p: 2,
                                                    borderRadius: 1,
                                                    backgroundColor: platform.color,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                    <Icon sx={{ color: 'common.white', fontSize: 24 }} />
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="h6">{platform.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {platform.followers.toLocaleString()} followers
                                                    </Typography>
                                                </Box>
                                                {platform.url && (
                                                    <IconButton
                                                        size="small"
                                                        component="a"
                                                        href={platform.url}
                                                        target="_blank"
                                                    >
                                                        <OpenInNew fontSize="small" />
                                                    </IconButton>
                                                )}
                                            </Box>

                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography variant="body2">Engagement Rate</Typography>
                                                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                        {Math.floor(Math.random() * 10 + 2)}%
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography variant="body2">Avg. Reach</Typography>
                                                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                        {(platform.followers * 1.2).toLocaleString()}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography variant="body2">Content Score</Typography>
                                                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                        {Math.floor(Math.random() * 20 + 80)}/100
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>

                {/* Financial Section */}
                <Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                        Financial Information
                    </Typography>
                    <Grid container spacing={2}>
                        {/* Revenue Breakdown */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                                <CardHeader title="Revenue & Expenses" />
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Paper sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            boxShadow: 'none',
                                        }}>
                                            <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                                Total ROI
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                                ${partnerData.totalROI}
                                            </Typography>
                                        </Paper>

                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2">Amount Paid</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                    ${partnerData.amountPaid.toLocaleString()}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2">Total Expenses</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                    ${partnerData.totalExpense}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2">Shipping Expense</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                    ${partnerData.shippingExpense}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2">PayPal Fee</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                    ${partnerData.paypalFee}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2">Amazon Referral Fee</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                    ${partnerData.amazonReferralFee}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2">Shipping FBA Fee</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                    ${partnerData.shippingFBAFeeGiftedPartners}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2">Previous Collab Expense</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                    ${partnerData.previousCollabExpense.toLocaleString()}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2">Product COG Expense</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                    ${partnerData.totalProductCOGExpense}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Typography variant="body2">One-off Expense</Typography>
                                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                    ${partnerData.oneOffExpense}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Payment Information */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                                <CardHeader title="Payment Details" />
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body2">Hourly Rate</Typography>
                                            <Chip
                                                label={`$${partnerData.hourlyRate}/hr`}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </Box>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body2">UGC Payment Status</Typography>
                                            <Chip
                                                label={partnerData.ugcPaymentStatus}
                                                color={partnerData.ugcPaymentStatus === "Paid" ? "primary" : "error"}
                                                size="small"
                                            />
                                        </Box>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body2">UGC Retainer Amount</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                ${partnerData.ugcRetainerAmount}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body2">Client Status</Typography>
                                            <Chip
                                                label={partnerData.clientStatus}
                                                variant="outlined"
                                                size="small"
                                            />
                                        </Box>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Typography variant="body2">Second Payment Date</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                {partnerData.secondPaymentDate || "Not set"}
                                            </Typography>
                                        </Box>

                                        <Divider sx={{ my: 1 }} />

                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                Estimated Taxes
                                            </Typography>
                                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                                                ${partnerData.estimatedTaxes}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Affiliate Platform IDs */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                                <CardHeader
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <TrackChanges />
                                            <Typography variant="h6">Affiliate Platform IDs</Typography>
                                        </Box>
                                    }
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        {affiliateIDs.map((affiliate) => {
                                            const Icon = affiliate.icon;
                                            return (
                                                <Paper
                                                    key={affiliate.platform}
                                                    sx={{
                                                        p: 2,
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        backgroundColor: 'action.hover',
                                                        borderRadius: 1
                                                    }}
                                                >
                                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                        <Icon sx={{ color: 'text.secondary', fontSize: 24 }} />
                                                        <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                                                            {affiliate.platform}
                                                        </Typography>
                                                    </Box>
                                                    <Chip
                                                        label={affiliate.id || "Not set"}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                </Paper>
                                            );
                                        })}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* FBA & Amazon Financial */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                                <CardHeader title="Amazon Financial Details" />
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">FBA x Levanta</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                ${partnerData.fbaXLevanta}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Amazon Order Total</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                ${partnerData.amazonOrderTotal}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Amazon Tax</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                ${partnerData.amazonTax}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <Typography variant="body2">Amazon Kickback</Typography>
                                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                ${partnerData.amazonKickback}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* Amazon Section */}
                <Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                        Amazon Information
                    </Typography>
                    <Grid container spacing={2}>
                        {/* Amazon Reviews */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                                <CardHeader
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Star />
                                            <Typography variant="h6">Amazon Product Reviews</Typography>
                                        </Box>
                                    }
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        {amazonReviews.map((review) => (
                                            <Paper
                                                key={review.product}
                                                sx={{
                                                    elevation: 0,
                                                    boxShadow: 'none',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                }}
                                            >
                                                <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                                    {review.product}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {review.review ? review.review : "N/A"}
                                                    </Typography>
                                                </Box>
                                            </Paper>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* Content Section */}
                <Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                        Content & Media
                    </Typography>
                    <Grid container spacing={2}>
                        {/* Media Files */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                                <CardHeader
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <ImageIcon />
                                            <Typography variant="h6">Media & Files</Typography>
                                        </Box>
                                    }
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <Box>
                                            <Typography variant="body1" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <ImageIcon fontSize="small" />
                                                Media Kit ({partnerData.mediaKit.length})
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {partnerData.mediaKit.map((file, index) => (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            borderRadius: 1,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            overflow: 'hidden'
                                                        }}>
                                                        <Image src={file} alt={file} width={50} height={50} objectFit="cover" />
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography variant="body1" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CameraAlt fontSize="small" />
                                                Partner Gallery ({partnerData.partnerGallery.length})
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {partnerData.partnerGallery.map((file, index) => (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            borderRadius: 1,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            overflow: 'hidden'
                                                        }}>
                                                        <Image src={file} alt={file} width={50} height={50} objectFit="cover" />
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography variant="body1" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Receipt fontSize="small" />
                                                Receipts ({partnerData.receipts.length})
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {partnerData.receipts.map((receipt, index) => (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            borderRadius: 1,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            overflow: 'hidden'
                                                        }}>
                                                        <Image src={receipt} alt={receipt} width={50} height={50} objectFit="cover" />
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography variant="body1" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <AssignmentTurnedIn fontSize="small" />
                                                Contracts ({partnerData.contracts.length})
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                                {partnerData.contracts.map((contract, index) => (
                                                    <Box
                                                        key={index}
                                                        sx={{
                                                            borderRadius: 1,
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            overflow: 'hidden'
                                                        }}>
                                                        <Image src={contract} alt={contract} width={50} height={50} objectFit="cover" />
                                                    </Box>
                                                ))}
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Content Details */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                                <CardHeader
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Description />
                                            <Typography variant="h6">Content & Deliverables</Typography>
                                        </Box>
                                    }
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Deliverables
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {partnerData.deliverables || "No deliverables specified"}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Google Drive Files
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {partnerData.googleDriveFiles || "No files specified"}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Revo's Offer
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {partnerData.revosOffer || "No offer specified"}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Revo's Counteroffer
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {partnerData.revosCounteroffer || "No counteroffer specified"}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                UGC Army TT Credentials
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {partnerData.revoUGCArmyTTUsernameAndPW || "Not provided"}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Refusal Reason
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {partnerData.refusalReason || "No refusal reason"}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Notes
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {partnerData.notes || "No notes available"}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* Details Section */}
                <Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                        Detailed Information
                    </Typography>
                    <Grid container spacing={2}>
                        {/* Location & Demographics */}
                        <Grid item size={{ xs: 12, md: 6 }}>
                            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                                <CardHeader
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Room />
                                            <Typography variant="h6">Location & Demographics</Typography>
                                        </Box>
                                    }
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <Box>
                                            <Typography variant="body1" sx={{ mb: 0.5 }}>
                                                Countries
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {partnerData.countries.map((country, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={country.name}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                ))}
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography variant="body1" sx={{ mb: 0.5 }}>
                                                States
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {partnerData.states.map((state, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={state.name}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                ))}
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography variant="body1" sx={{ mb: 0.5 }}>
                                                Cities
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {partnerData.cities.map((city, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={city.name}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                ))}
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography variant="body1" sx={{ mb: 0.5 }}>
                                                Age Bracket
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {partnerData.ageBracket.map((age, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={age}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                ))}
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography variant="body1" sx={{ mb: 0.5 }}>
                                                Destinations
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {partnerData.destinations.map((destination, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={destination.name}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                ))}
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Business Details */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                                <CardHeader
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Business />
                                            <Typography variant="h6">Business & Partnerships</Typography>
                                        </Box>
                                    }
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Stakeholders
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {partnerData.stakeholders.map((stakeholder, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={stakeholder.name}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                ))}
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Content HQ
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {partnerData.contentHQ.map((hq, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={hq.name}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                ))}
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Production HQ
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {partnerData.productionHQ.map((hq, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={hq.name}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                ))}
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Production HQ 2
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {partnerData.productionHQ2.map((hq, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={hq.name}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                ))}
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Case Studies
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {partnerData.caseStudies.map((study, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={study.name}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                ))}
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Retail Partners
                                            </Typography>
                                            {partnerData.retailPartners.length > 0 ? (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {partnerData.retailPartners.map((partner, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={partner.name}
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    ))}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    No retail partners
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Tags & Categories */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                                <CardHeader
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <LocalOffer />
                                            <Typography variant="h6">Tags & Categories</Typography>
                                        </Box>
                                    }
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Tags
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {partnerData.tags.map((tag, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={tag.name}
                                                        color="primary"
                                                        size="small"
                                                    />
                                                ))}
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Profile Category
                                            </Typography>
                                            {partnerData.profileCategory.length > 0 ? (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {partnerData.profileCategory.map((category, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={category.name}
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    ))}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    No categories assigned
                                                </Typography>
                                            )}
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Services
                                            </Typography>
                                            {partnerData.services.length > 0 ? (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {partnerData.services.map((service, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={service.name}
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    ))}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    No services listed
                                                </Typography>
                                            )}
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Products
                                            </Typography>
                                            {partnerData.products.length > 0 ? (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {partnerData.products.map((product, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={product.name}
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    ))}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    No products listed
                                                </Typography>
                                            )}
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Sourced From
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {partnerData.sourcedFrom.map((source, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={source}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                ))}
                                            </Box>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Affiliate Platforms
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                {partnerData.affiliatePlatform.map((platform, index) => (
                                                    <Chip
                                                        key={index}
                                                        label={platform}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                ))}
                                            </Box>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* Status & Audit Information */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                                <CardHeader
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Settings />
                                            <Typography variant="h6">Status & Audit Information</Typography>
                                        </Box>
                                    }
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                            <Typography variant="body2">Open to Whitelisting</Typography>
                                            <Chip
                                                label={partnerData.openToWhitelisting ? "Yes" : "No"}
                                                color={partnerData.openToWhitelisting ? "primary" : "default"}
                                                size="small"
                                            />
                                        </Box>

                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                            <Typography variant="body2">Audited Jan 2025</Typography>
                                            <Chip
                                                label={partnerData.auditedJan2025 ? "Yes" : "No"}
                                                color={partnerData.auditedJan2025 ? "primary" : "default"}
                                                size="small"
                                            />
                                        </Box>

                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                            <Typography variant="body2">Audited June 2025</Typography>
                                            <Chip
                                                label={partnerData.auditedJune2025 ? "Yes" : "No"}
                                                color={partnerData.auditedJune2025 ? "primary" : "default"}
                                                size="small"
                                            />
                                        </Box>

                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                            <Typography variant="body2">Client</Typography>
                                            <Typography variant="body2">
                                                {partnerData.client || "Not assigned"}
                                            </Typography>
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Campaign Months
                                            </Typography>
                                            {partnerData.campaignMonth.length > 0 ? (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {partnerData.campaignMonth.map((month, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={month}
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    ))}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    No campaign months
                                                </Typography>
                                            )}
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Platform Deliverables
                                            </Typography>
                                            {partnerData.platformDeliverables.length > 0 ? (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {partnerData.platformDeliverables.map((deliverable, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={deliverable}
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    ))}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    No platform deliverables
                                                </Typography>
                                            )}
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Platforms
                                            </Typography>
                                            {partnerData.platforms.length > 0 ? (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {partnerData.platforms.map((platform, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={platform}
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    ))}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    No platforms specified
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>

                {/* Campaigns Section */}
                <Box>
                    <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                        Campaign Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Card sx={{ height: '100%', borderRadius: 0, border: '1px solid var(--mui-palette-divider)' }}>
                                <CardHeader
                                    title={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Work />
                                            <Typography variant="h6">Campaign Information</Typography>
                                        </Box>
                                    }
                                />
                                <CardContent>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Contributed Campaigns
                                            </Typography>
                                            {partnerData.contributedCampaigns.length > 0 ? (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {partnerData.contributedCampaigns.map((campaign, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={campaign.label}
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    ))}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    No contributed campaigns
                                                </Typography>
                                            )}
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Proposed Campaigns
                                            </Typography>
                                            {partnerData.proposedCampaigns.length > 0 ? (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {partnerData.proposedCampaigns.map((campaign, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={campaign.label}
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    ))}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    No proposed campaigns
                                                </Typography>
                                            )}
                                        </Box>

                                        <Box>
                                            <Typography variant="body2" sx={{ mb: 0.5 }}>
                                                Portfolios
                                            </Typography>
                                            {partnerData.portfolios.length > 0 ? (
                                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                                    {partnerData.portfolios.map((portfolio, index) => (
                                                        <Chip
                                                            key={index}
                                                            label={portfolio.label}
                                                            variant="outlined"
                                                            size="small"
                                                        />
                                                    ))}
                                                </Box>
                                            ) : (
                                                <Typography variant="body2" color="text.secondary">
                                                    No portfolios
                                                </Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
};

export default PartnerAnalyticsViewV2;
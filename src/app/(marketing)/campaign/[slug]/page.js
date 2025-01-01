
import { config } from '@/config';
import { Container } from '@mui/material';
import { CampaignDetailsView } from './campaign-details-view';

export const metadata = { title: config.site.name, description: "Campaigns list page" };

export default function Page({ params: { slug } }) {
    const tempData = {
        campaign_title: "Revo Massage Gun",
        description: "This read aims to dissect the anatomy of the hook, offering insights into its multifaceted role in capturing and sustaining attention.",
        details: {
            date: "November 18, 2024",
            compensation: "Social Media",
            deliverables: "15 mins"
        },
        author: {
            name: "Combina Key",
            title: "Director of Partnerships",
            profile_image: "path/to/author-image.jpg"
        },
        article: {
            title: "Why the Hook Matters More Than Ever",
            content: "In the saturated landscape of social media, where content is abundant and attention spans are dwindling, one element often goes overlooked yet holds immense power: The Hook. It's not merely a catchy intro; it's the linchpin of any successful social media strategy. The hook serves as the gateway to meaningful engagement and action, acting as the first impression that can either captivate or lose your audience in a split second. It's the bait that captures your audience's attention, the siren song that keeps them engaged, and the linchpin of any successful social media campaign. Yet, despite its importance, the hook remains one of the most undervalued players in the social media game.",
            button_text: "Join",
            button_action: "join_link"
        },
        images: [
            "path/to/image1.jpg",
            "path/to/image2.jpg",
            "path/to/image3.jpg",
            "path/to/image4.jpg",
            "path/to/image5.jpg"
        ],
        videos: [
            {
                title: "Short Title",
                url: "https://youtube.com/embed/videoId1",
                description: "Lorem ipsum dolor sit amet consectetur. Nisl proin non tincidunt nisi. Nunc mi natoque fusce vitae ul sit sed amet bibendum. Accumsan dis leo mauris."
            },
            {
                title: "Short Title",
                url: "https://youtube.com/embed/videoId2",
                description: "Lorem ipsum dolor sit amet consectetur. Nisl proin non tincidunt nisi. Nunc mi natoque fusce vitae ul sit sed amet bibendum. Accumsan dis leo mauris."
            },
            {
                title: "Short Title",
                url: "https://youtube.com/embed/videoId3",
                description: "Lorem ipsum dolor sit amet consectetur. Nisl proin non tincidunt nisi. Nunc mi natoque fusce vitae ul sit sed amet bibendum. Accumsan dis leo mauris."
            }
        ],
        social_share: {
            comments_icon: "path/to/commentsIcon.svg",
            share_icon: "path/to/shareIcon.svg",
            facebook_icon: "path/to/facebookIcon.svg"
        }
    }

    return (
        <Container maxWidth="xl">
            <CampaignDetailsView data={tempData} />
        </Container>
    );
}

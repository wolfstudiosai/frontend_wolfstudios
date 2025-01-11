import { Container } from '@mui/material';

import { config } from '/src/config';

import { ContentView } from './content-view';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  const tempData = {
    campaign_title: 'CREATORS DESTROY FEATHERS SOFA IN DTLA',
    description:
      'The Wolves LA and Altered State Productions transformed a simple product test into a captivating narrative for Valyou Furniture. Engaging top influencers to challenge the Feathers Sofas claims, the campaign seamlessly blended real-world tests with high-definition visuals. A testament to strategic storytelling, this collaboration resonates as a masterclass in innovative advertising.',
    details: {
      date: 'November 18, 2024',
      category: 'Partnerships',
      reading_time: '4 mins',
    },
    author: {
      name: 'Combina Key',
      title: 'Founder of The Wolves LA, Director of Partnerships and Productions.',
      profile_image: 'path/to/author-image.jpg',
    },
    tags: [
      {
        tag: 'Walking Pad',
        profile: 'Ashlee H.',
        product: 'Revo Walking Pad',
        image: 'https://picsum.photos/300/200?random=1',
        video: 'https://youtube.com/embed/walkingPadVideo1',
      },
      {
        tag: 'Feathers Sofa',
        profile: 'John D.',
        product: 'Feathers Sofa',
        image: 'https://picsum.photos/300/200?random=2',
        video: 'https://youtube.com/embed/sofaChallengeVideo1',
      },
      {
        tag: 'Gaming Chair',
        profile: 'Emily R.',
        product: 'Ultimate Gaming Chair',
        image: 'https://picsum.photos/300/200?random=3',
        video: 'https://youtube.com/embed/gamingChairVideo1',
      },
      {
        tag: 'Smart Desk',
        profile: 'Michael T.',
        product: 'Ergonomic Smart Desk',
        image: 'https://picsum.photos/300/200?random=4',
        video: 'https://youtube.com/embed/smartDeskVideo1',
      },
      {
        tag: 'Electric Bike',
        profile: 'Sophia L.',
        product: 'Urban Electric Bike',
        image: 'https://picsum.photos/300/200?random=5',
        video: 'https://youtube.com/embed/electricBikeVideo1',
      },
      {
        tag: 'Noise-Canceling Headphones',
        profile: 'James W.',
        product: 'ProSound Noise-Canceling Headphones',
        image: 'https://picsum.photos/300/200?random=6',
        video: 'https://youtube.com/embed/headphonesVideo1',
      },
      {
        tag: 'Portable Projector',
        profile: 'Olivia P.',
        product: 'CinemaLite Portable Projector',
        image: 'https://picsum.photos/300/200?random=7',
        video: 'https://youtube.com/embed/projectorVideo1',
      },
    ],
  };

  return (
    <Container maxWidth="xl">
      <ContentView data={tempData} />
    </Container>
  );
}

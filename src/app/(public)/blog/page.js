import { config } from '/src/config';

import { BlogView } from './blog-view';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <BlogView />
  );
}

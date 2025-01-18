
import { MainView } from './main-view';
import { config } from '/src/config';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <>
      <MainView />
    </>
  );
}

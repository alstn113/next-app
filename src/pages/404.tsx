import TabLayout from '@/components/Layouts/TabLayout';
import { NextPage } from 'next';
import Link from 'next/link';

const NotFound: NextPage = () => {
  return (
    <TabLayout>
      <h1>NOT FOUND</h1>
      <h3>
        <Link href="/">
          <a>GO TO HOME</a>
        </Link>
      </h3>
    </TabLayout>
  );
};

export default NotFound;

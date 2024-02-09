import { fetchAllAcounts } from '@/app/home/application/home.service';
import { AccountProps } from '@/app/home/domain/account';
import { AccountMapper } from '@/app/home/infrastructure/account.mapper';
import HomePage from '@/app/home/presentation/pages/HomePage';
import Head from 'next/head';

export async function getServerSideProps(context: any) {
  const { query } = context;
  const { username } = query;
  const { accounts } = await fetchAllAcounts(username);
  return {
    props: {
      data: accounts,
      username
    },
  };
}


export default function home({ data, username }: { data: AccountProps[], username: string }) {
  const domainData = data.map(AccountMapper.toDomain);
  return (
    <>
      <Head>
        <title>Piggy | Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage data={domainData} username={username} />
    </>
  )
}

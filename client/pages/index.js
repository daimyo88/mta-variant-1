import { useEffect } from 'react';
import { useRouter } from 'next/router';

import useUser from '../hooks/useUser';
import GlobalLoader from '../components/loaders/GlobalLoader';

export default function Index() {

  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if(user.data && !user.data?._id) {
      router.push('/login');
    } else if(user.data && user.data?._id){
      router.push('/admin');
    }
  },[user]);

  return (
    <GlobalLoader />
  )
}

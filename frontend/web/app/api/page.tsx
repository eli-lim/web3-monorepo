import { ReactElement } from 'react';
import { T } from '../trpc';

export default async function Page(): Promise<ReactElement> {
  const users = await T.rpc.userList.query();
  return (
    <div>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}

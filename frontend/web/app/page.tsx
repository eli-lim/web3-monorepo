import { Children, ReactElement, ReactNode } from 'react';
import Link from 'next/link';
import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';

export default async function Page(): Promise<ReactElement> {
  return (
    <div className="min-h-screen min-w-full flex items-center justify-center">
      <div className="flex flex-col gap-2">
        <p>Turbo-charged fullstack web3 monorepo</p>
        <p>Optimized for developer experience</p>
        <p>
          Navigate to&nbsp;
          <Link href="/chain" className="font-semibold text-blue-500">
            /chains
          </Link>
          &nbsp;to see the following in action:
        </p>

        <div>
          <Progress>
            <div>connect a wallet</div>
            <div>
              call a <Emph>smartcontract</Emph>
            </div>
            <div>
              see the event propagate to the <Emph>server</Emph>
            </div>
          </Progress>
        </div>

        <p className="text-sm">Built with</p>
        <div className="flex items-center gap-3 bg-white rounded-2xl p-2">
          {/* Repo */}
          <img src="/turborepo.svg" className="h-6" />
          <img src="/ts.png" className="h-6" />

          {/* Back */}
          <img src="/trpc.png" className="h-6" />
          <img src="/prisma.svg" className="h-6" />

          {/* Front */}
          <img src="/tailwind.png" className="h-6" />
          <img src="/next.svg" className="h-6" />

          {/* Contracts */}
          <img src="/foundry.png" className="h-6" />
        </div>
      </div>
    </div>
  );
}

function Emph(props: { children: ReactNode }): ReactElement {
  return (
    <span className="text-purple-400 font-semibold">{props.children}</span>
  );
}

function Progress(props: { children: ReactNode }): ReactElement {
  return (
    <div>
      {Children.map(props.children, (child, index) => (
        <ProgressItem key={index} index={index}>
          {child}
        </ProgressItem>
      ))}
    </div>
  );
}

function ProgressItem(props: {
  children: ReactNode;
  index: number;
}): ReactElement {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center">
        <div className="h-2 w-px bg-purple-500" />
        <CheckCircleIcon className="w-4 text-purple-500" />
        <div className="h-2 w-px bg-purple-500" />
      </div>
      {props.children}
    </div>
  );
}

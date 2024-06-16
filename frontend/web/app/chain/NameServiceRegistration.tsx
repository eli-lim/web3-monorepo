'use client';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { useWriteNameServiceRegister } from '@repo/contracts-react';
import {
  useAccount,
  useChainId,
  useClient,
  useTransactionConfirmations,
} from 'wagmi';
import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { Deployments } from '@repo/contracts-deployments';
import { Address, Hash, isAddress } from 'viem';
import { generatePrivateKey, privateKeyToAddress } from 'viem/accounts';
import clsx from 'clsx';
import CheckCircleIcon from '@heroicons/react/24/outline/CheckCircleIcon';
import { getTransactionCount } from 'viem/actions';

/**
 * Example of a component that reads from the NameService contract.
 */
export default function NameServiceComponent(): ReactElement {
  const register = useWriteNameServiceRegister();
  const chainId = useChainId();
  const client = useClient();
  const account = useAccount();

  const [name, setName] = useState<string>('vitalik');
  const [address, setAddress] = useState<Address>(
    '0xd8da6bf26964af9d7eed9e03e53415d37aa96045',
  );
  const [txHash, setTxHash] = useState<Hash | undefined>();
  const [error, setError] = useState<string | undefined>();

  const fireRegistrationTx = useCallback(async () => {
    if (!address || !isAddress(address)) {
      setError('An EVM address is required');
      return;
    }

    const nonce = await getTransactionCount(client!, {
      address: account.address!,
    });

    setTxHash(
      await register.writeContractAsync({
        address: Deployments[chainId]!.nameService.address,
        args: [name!, address!],
        nonce: nonce ?? 0,
      }),
    );
  }, [register]);

  const generateAddress = useCallback(() => {
    setAddress(privateKeyToAddress(generatePrivateKey()));
  }, []);

  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-semibold">Name Service</h1>
      <div
        className={clsx(
          'flex gap-1 items-center border rounded',
          error ? 'border-red-500' : 'border-blue-500',
        )}
      >
        <button
          className="border-r border-gray-800 shadow-blue-300 py-1 px-2"
          onClick={generateAddress}
        >
          <ArrowPathIcon className="w-4 text-white transition-colors hover:text-blue-500" />
        </button>
        <div className="flex flex-col">
          <input
            className="text-sm py-1 px-2 w-[372px] font-mono"
            type="text"
            placeholder="vitalik.eth"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className="text-sm py-1 px-2 w-[372px] font-mono"
            type="text"
            placeholder="0x..."
            value={address}
            onChange={(e) => {
              setAddress(e.target.value as Address);
            }}
          />
        </div>
        <button
          className="border-l border-gray-800 shadow-blue-300 py-1 px-2 hover:text-blue-500 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={fireRegistrationTx}
          disabled={!account.isConnected}
        >
          Register
        </button>
      </div>
      {error && <div className="text-xs text-red-500">{error}</div>}
      {txHash && <TransactionDetails txHash={txHash} />}
    </div>
  );
}

function TransactionDetails(props: { txHash: Hash }): ReactElement {
  const confirmations = useTransactionConfirmations({
    hash: props.txHash,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      confirmations.refetch();
    }, 1000);
    return () => clearInterval(interval);
  }, [confirmations]);

  const isConfirmed = confirmations.data && confirmations.data >= 6;

  return (
    <div className="mt-2 flex flex-col gap-2">
      <code className="text-xs">Tx: {props.txHash}</code>
      {isConfirmed ? (
        <Confirmed />
      ) : (
        <Confirming confirmations={confirmations.data ?? 0n} />
      )}
    </div>
  );
}

function Confirmed(): ReactElement {
  return (
    <div className="text-xs flex items-center gap-1 text-green-400 font-semibold">
      <CheckCircleIcon className="w-5" />
      <span>Confirmed</span>
    </div>
  );
}

function Confirming(props: { confirmations: bigint }): ReactElement {
  return (
    <div className="text-xs flex items-center gap-2">
      <ArrowPathIcon className="animate-spin w-5" />
      <span>Confirming...</span>
      <span>{props.confirmations.toLocaleString()} Confirmations</span>
    </div>
  );
}

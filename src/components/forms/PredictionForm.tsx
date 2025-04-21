'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FAIRYRING_ENV, PUBLIC_ENVIRONMENT } from '@/constant/env';
import { useClient } from '@/hooks/fairyring/useClient';
import { useKeysharePubKey } from '@/hooks/fairyring/useKeysharePubKey';
import { getCurrentBlockHeight } from '@/services/fairyring/block';
import { encryptSignedTx, signOfflineWithCustomNonce } from '@/services/fairyring/sign';
import { Amount } from '@/types/fairyring';
import { useAccount } from 'graz';
import { useEffect, useState } from 'react';

export default function PredictionForm() {
  const [prediction, setPrediction] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const client = useClient();

  const { data: account } = useAccount();
  const { data: pubkey } = useKeysharePubKey();

  useEffect(() => {
    const hasSubmitted = localStorage.getItem('btc-prediction-submitted'); // ! should get from api, reset if it's another prediction period
    if (hasSubmitted) setSubmitted(true);
  }, []);

  const submitOnChain = async (request: { prediction: number; startBlock: number }): Promise<void> => {
    if (!account) return;

    const address = account.bech32Address;
    const currentBlockHeight = await getCurrentBlockHeight();

    const SUBMIT_ANSWER_DEADLINE = 400000; // ! UPDATE
    const targetHeight = currentBlockHeight + SUBMIT_ANSWER_DEADLINE; // ! correct targetHeight?

    console.log(targetHeight);
    let nonceUsing = 0;

    const {
      data: { pepNonce },
    } = await client.FairyringPep.query.queryPepNonce(address);

    const {
      data: { encryptedTxArray },
    } = await client.FairyringPep.query.queryEncryptedTxAll();

    let userSent = 0;
    if (encryptedTxArray != null) {
      for (let i = 0; i < encryptedTxArray.length; i++) {
        if (encryptedTxArray[i] == null) {
          continue;
        }
        const nowEArr = encryptedTxArray[i].encryptedTx;
        if (nowEArr == null) {
          continue;
        }
        for (let j = 0; j < nowEArr.length; j++) {
          if (nowEArr[j].creator == address) {
            userSent++;
          }
        }
      }
    }

    if (!pepNonce?.nonce) {
      nonceUsing = userSent;
    } else {
      nonceUsing = parseInt(pepNonce.nonce) + userSent;
    }

    const amount: Array<Amount> = [{ amount: '1', denom: 'ufairy' }];

    const payload: { amount: Array<Amount>; toAddress: string; fromAddress: string } = {
      amount,
      toAddress: PUBLIC_ENVIRONMENT.NEXT_PUBLIC_FAUCET_ADDRESS!,
      fromAddress: address,
    };

    const memoObj = {
      memo: request,
      payload: payload,
    };
    const memo = JSON.stringify(memoObj);

    const sendMsg = client.CosmosBankV1Beta1.tx.msgSend({
      value: payload,
    });

    // try {
    const signed = await signOfflineWithCustomNonce(
      address,
      FAIRYRING_ENV.rpcURL,
      FAIRYRING_ENV.chainID,
      [sendMsg],
      {
        amount: [
          {
            denom: 'ufairy',
            amount: '0',
          },
        ],
        gas: '500000',
      },
      memo,
      nonceUsing,
    );

    let keysharePubKeyForEncryption: string;

    const obPubKey = pubkey as {
      activePubKey: { expiry: unknown; publicKey: unknown };
      queuedPubKey: { publicKey: unknown };
    };

    const expiry = obPubKey?.activePubKey?.expiry;
    if (expiry && Number(expiry) - targetHeight > 0) {
      keysharePubKeyForEncryption = obPubKey?.activePubKey?.publicKey as string;
    } else {
      keysharePubKeyForEncryption = obPubKey?.queuedPubKey?.publicKey as string;
    }

    const encryptedHex = await encryptSignedTx(keysharePubKeyForEncryption, targetHeight, signed);
    const txResult = await client.FairyringPep.tx.sendMsgSubmitEncryptedTx({
      value: {
        creator: address,
        data: encryptedHex,
        targetBlockHeight: targetHeight,
      },
      fee: {
        amount: [
          {
            denom: 'ufairy',
            amount: '0',
          },
        ],
        gas: '500000',
      },
    });

    console.log(txResult);
    if (txResult.code) {
      throw new Error(txResult.rawLog);
    }

    // toast.success('Successfully encrypted your answer!');
    // } catch (error) {
    // toast.error(getErrorMessage(error));
    //   throw error
    // }
  };

  const handleSubmit = async () => {
    // TODO: use ibe.ts to encrypt the prediction and submit
    setIsSending(true);

    try {
      await submitOnChain({ prediction: parseFloat(prediction), startBlock: 0 });
      localStorage.setItem('btc-prediction-submitted', 'true');
      setSubmitted(true);
    } catch (error) {
      console.error('failed to submit', error);
      localStorage.removeItem('btc-prediction-submitted');
      setSubmitted(false);
    } finally {
      setIsSending(false);
    }
  };

  if (submitted) return <div className="text-green-500">✅ Prediction submitted!</div>;

  return (
    <div className="w-full gap-2 flex">
      <Input
        placeholder="Enter your BTC price prediction"
        value={prediction}
        onChange={(e) => setPrediction(e.target.value)}
        type="number"
      />
      <Button onClick={handleSubmit} disabled={!prediction || isSending}>
        {isSending ? 'Submiting' : 'Submit Prediction'}
      </Button>
    </div>
  );
}

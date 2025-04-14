import { PUBLIC_ENVIRONMENT } from '@/constant/env';

import { BlockInfoResponse } from '@/types/fairyring';

export const getBlockInfo = async (): Promise<BlockInfoResponse> => {
  const blockInfoRes = await fetch(`${PUBLIC_ENVIRONMENT.NEXT_PUBLIC_TENDERMINT_URL}/block`);
  const blockInfo: BlockInfoResponse = await blockInfoRes.json();
  return blockInfo;
};

export const getCurrentBlockHeight = async (): Promise<number> => {
  const blockInfo = await getBlockInfo();
  const lastCommitHeight = blockInfo.result.block.last_commit.height;
  const currentHeight = Number(lastCommitHeight) + 1;
  return currentHeight;
};

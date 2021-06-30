import { BaseAsset, ApplyAssetContext, ValidateAssetContext } from 'lisk-sdk';

export interface HelloMessage {
	hello: { message: string };
}
export class MessageAsset extends BaseAsset {
	public name = 'message';
	public id = 0;

	// Define schema for asset
	public schema = {
		$id: 'helloWorld/message-asset',
		title: 'MessageAsset transaction asset for helloWorld module',
		type: 'object',
		required: ["message"],
		properties: {
			message: {
				dataType: 'string',
				fieldNumber: 1,
			},
		}
	};

	public validate({ asset }: ValidateAssetContext<{ message: string }>): void {
		if (!asset.message || typeof asset.message !== 'string' || asset.message.length > 64) {
			throw new Error(
				'Invalid "asset.message" defined on transaction: A string value no longer than 64 characters is expected'
			);
		}
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	public async apply({ asset, transaction, stateStore }: ApplyAssetContext<{ message: string }>): Promise<void> {
		const senderAccount = await stateStore.account.get<HelloMessage>(transaction.senderAddress);

		senderAccount.hello.message = asset.message;
		await stateStore.account.set<HelloMessage>(senderAccount.address, senderAccount);
	}
}

import { OperationsToKeep, TypesToKeep } from '@ikhokha/typings/types'
import  saveRemoteSchema from '@ikhokha/lib/cli-tools/save-remote-schema'
import minimist = require('minimist');

const operationsToKeep: OperationsToKeep = {
	Query: ['collections', 'productTypes', 'products'],
	Mutation: [
		'checkoutCreate',
		'checkoutDiscountCodeApplyV2',
		'checkoutDiscountCodeRemove',
		'checkoutEmailUpdateV2',
		'checkoutGiftCardApply',
		'checkoutGiftCardRemoveV2',
		'checkoutGiftCardsAppend',
		'checkoutLineItemsAdd',
		'checkoutLineItemsRemove',
		'checkoutLineItemsUpdate',
		'checkoutLineItemsReplace',
		'checkoutShippingAddressUpdateV2',
		'checkoutCompleteFree',
		'checkoutCompleteWithCreditCardV2',
		'checkoutCompleteWithTokenizedPaymentV2'
	]
}


const typesToKeep: TypesToKeep = []

const argv: minimist.ParsedArgs = minimist(process.argv)

saveRemoteSchema(argv['url'], argv['token'], argv['path'], argv['token-key'], operationsToKeep, typesToKeep).catch((err): void => {
	console.log(err)
})

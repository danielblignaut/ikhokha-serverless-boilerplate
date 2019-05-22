import { OperationsToKeep, TypesToKeep } from '@ikhokha/typings/types'
import  saveRemoteSchema from '@ikhokha/lib/cli-tools/save-remote-schema'
import minimist = require('minimist');

const operationsToKeep: OperationsToKeep = {
	Query: [
		// queries to keep
		'products'

		
	],
	Mutation: [
		// mutations to keep
		'checkoutAttributesUpdateV2',
		'checkoutCreate',
		'checkoutDiscountCodeApplyV2',
		'checkoutDiscountCodeRemove',
		'checkoutEmailUpdateV2',
		'checkoutGiftCardRemoveV2',
		'checkoutGiftCardsAppend',
		'checkoutShippingAddressUpdateV2',
		'checkoutShippingLineUpdate'
	]
}


const typesToKeep: TypesToKeep = [
	// general types
	'QueryRoot',
	'Mutation',
	// productTypes query types
	'StringEdge',

	// products query types
	'ProductSortKeys',
	'ProductConnection',
	'PageInfo',
	'ProductEdge',
	'Product',
	'Node',
	'ID',
	'String',
	'Boolean',
	'URL',
	'Int',
	'Float',
	'HasMetafields',
	'CollectionConnection',
	'CollectionEdge',
	'Collection',
	'PageInfo',
	'DateTime',
	'HTML',
	'ProductImageSortKeys',
	'CropRegion',
	'ImageConnection',
	'ImageEdge',
	'Image',
	'ImageContentType',
	'Metafield',
	'MetafieldParentResource',
	'ProductVariant',
	'MetafieldValueType',
	'MetafieldConnection',
	'MetafieldEdge',

	'ProductOption',
	'ProductPriceRange',
	'MoneyV2',
	'SelectedOptionInput',
	'ProductVariant',
	'Money',
	'CurrencyCode',
	'ProductVariantPricePairConnection',
	'ProductVariantPricePairEdge',
	'ProductVariantPricePair',
	'ProductVariantSortKeys',
	'ProductVariantConnection',

	// checkoutCompleteFree mutation types
	'Checkout',
	'AppliedGiftCard',
	'AvailableShippingRates',
	'ShippingRate',
	'Attribute',
	// 'Customer',
	
	'DiscountApplicationConnection',
	'DiscountApplicationEdge',
	'DiscountApplication',
	'DiscountApplicationAllocationMethod',
	'DiscountApplicationTargetSelection',
	'DiscountApplicationTargetType',
	'PricingValue',
	'PricingPercentageValue',
	'DiscountCodeApplication',
	'ManualDiscountApplication',
	'ScriptDiscountApplication',
	'AutomaticDiscountApplication',
	'CheckoutLineItemConnection',
	'CheckoutLineItemEdge',
	'CheckoutLineItem',
	'DiscountAllocation',
	'Order',
	'OrderLineItemConnection',
	'OrderLineItemEdge',
	'OrderLineItem',
	'MailingAddressConnection',
	'MailingAddressEdge',
	'MailingAddress',
	'CountryCode',
	'CheckoutErrorCode',
	'DisplayableError',
	'UserError',

	// checkoutAttributesUpdateV2
	'CheckoutAttributesUpdateV2Input',
	'AttributeInput',
	'CheckoutAttributesUpdateV2Payload',

	// checkoutCreate
	'CheckoutCreateInput',
	'CheckoutLineItemInput',
	'CheckoutCreatePayload',

	// checkoutDiscountApplyV2
	'CheckoutUserError',
	'CheckoutErrorCode',
	'CheckoutDiscountCodeApplyV2Payload',

	//checkoutDiscountCodeRemove
	'CheckoutDiscountCodeRemovePayload',

	//checkoutGiftCardRemoveV2
	'CheckoutGiftCardRemoveV2Payload',

	//checkoutGiftCardsAppend
	'CheckoutGiftCardsAppendPayload',



	// checkoutShippingAddressUpdateV2
	'MailingAddressInput',
	'CheckoutShippingAddressUpdateV2Payload',

	//checkoutShippingLineUpdate
	'CheckoutShippingLineUpdatePayload',

	//CheckoutEmailUpdateV2
	'CheckoutEmailUpdateV2Payload',

]

const argv: minimist.ParsedArgs = minimist(process.argv)

saveRemoteSchema(argv['url'], argv['token'], argv['path'], argv['token-key'], operationsToKeep, typesToKeep).catch((err): void => {
	console.log(err)
})

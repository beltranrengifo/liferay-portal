/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

export const defaultComponentProps = {
	categorySelectorURL: 'http://localhost:8080/categorySelectorURL',
	componentId: null,
	disabled: false,
	groupIds: ['20121', '20123'],
	locale: {
		ISO3Country: 'USA',
		ISO3Language: 'eng',
		country: 'US',
		displayCountry: 'United States',
		displayLanguage: 'English',
		displayName: 'English (United States)',
		displayScript: '',
		displayVariant: '',
		extensionKeys: '[]',
		language: 'en',
		script: '',
		unicodeLocaleAttributes: '[]',
		unicodeLocaleKeys: '[]',
		variant: '',
	},
	namespace: '_com_liferay_asset_list_web_portlet_AssetListPortlet_',
	portletId: 'com_liferay_asset_list_web_portlet_AssetListPortlet',
	portletNamespace: '_com_liferay_asset_list_web_portlet_AssetListPortlet_',
	rules: [
		{
			queryAndOperator: true,
			queryContains: true,
			queryValues: '',
			selectedItems: [],
			type: 'assetTags',
		},
	],
	tagSelectorURL: 'http://localhost:8080/tagSelectorURL',
	vocabularyIds: ['20132', '43057', '20133', '20130'],
};

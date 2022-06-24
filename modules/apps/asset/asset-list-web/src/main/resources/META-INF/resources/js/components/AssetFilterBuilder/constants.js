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

export const DEFAULT_RULE = {
	queryAndOperator: true,
	queryContains: true,
	queryValues: '',
	selectedItems: [],
	type: 'assetTags',
};

export const QUERY_AND_OPERATOR_OPTIONS = [
	{
		label: Liferay.Language.get('all'),
		value: true,
	},
	{
		label: Liferay.Language.get('any'),
		value: false,
	},
];

export const QUERY_CONTAINS_OPTIONS = [
	{
		label: Liferay.Language.get('contains'),
		value: true,
	},
	{
		label: Liferay.Language.get('does-not-contain'),
		value: false,
	},
];

const RULE_TYPE_CATEGORY = {
	label: Liferay.Language.get('categories'),
	value: 'assetCategories',
};

export const RULE_TYPE_KEYWORD = {
	label: Liferay.Language.get('keywords'),
	value: 'keywords',
};

const RULE_TYPE_TAG = {
	label: Liferay.Language.get('tags'),
	value: 'assetTags',
};

export const RULE_TYPE_OPTIONS = [
	RULE_TYPE_CATEGORY,
	RULE_TYPE_KEYWORD,
	RULE_TYPE_TAG,
];

export const SELECTED_ITEMS_KEY_NAME = 'selectedItems';

export const DEFAULT_RULE_CONJUNCTION = 'and';

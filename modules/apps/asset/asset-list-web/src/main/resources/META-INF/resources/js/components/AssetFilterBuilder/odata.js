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

import {DEFAULT_RULE_CONJUNCTION, RULE_TYPE_KEYWORD} from './constants';

const _getRuleQueryFromItemSelector = ({
	selectedItems,
	type,
	useAndOperator,
	useNotOperator,
}) => {
	if (useAndOperator) {
		const operator = useNotOperator ? 'ne' : 'eq';

		const DEFAULT_AND_QUERY = `${type} ${operator} ''`;

		return (
			selectedItems
				.map((item) => {
					return `(${type} ${operator} '${item?.value || item}')`;
				})
				.join(` ${DEFAULT_RULE_CONJUNCTION} `) || DEFAULT_AND_QUERY
		);
	}
	else {
		const query = `(${type} in (${selectedItems
			.map((item) => `'${item.value}'`)
			.join(', ')}))`;

		return useNotOperator ? `(not${query})` : query;
	}
};

const _getRuleQueryFromTextInput = ({
	queryValues,
	type,
	useAndOperator,
	useNotOperator,
}) => {
	const keywords = queryValues
		.split(/\s?[, ]\s?/)
		.filter(Boolean)
		.map((keyword) => keyword.replace(/'/g, "''"))
		.join(', ');

	const operator = useAndOperator ? 'all' : 'any';

	const query = `(${type}/${operator}(k:contains(k, '${keywords}')))`;

	return useNotOperator ? `(not${query})` : query;
};

const buildQueryString = ({rules, updateStateCallback}) => {
	updateStateCallback(
		rules
			.map((rule) => {
				const {
					queryAndOperator,
					queryContains,
					queryValues,
					selectedItems,
					type,
				} = rule;

				const useAndOperator = queryAndOperator.toString() === 'true';
				const useNotOperator = queryContains.toString() === 'false';

				return type === RULE_TYPE_KEYWORD.value
					? _getRuleQueryFromTextInput({
							queryValues,
							type,
							useAndOperator,
							useNotOperator,
					  })
					: _getRuleQueryFromItemSelector({
							selectedItems,
							type,
							useAndOperator,
							useNotOperator,
					  });
			})
			.join(` ${DEFAULT_RULE_CONJUNCTION} `)
	);
};

export {buildQueryString};

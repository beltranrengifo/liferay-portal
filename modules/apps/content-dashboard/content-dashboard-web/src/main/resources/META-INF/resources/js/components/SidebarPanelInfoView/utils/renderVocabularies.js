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

/**
 * Returns the count of total categories in a collections of vocabularies
 * @param {array} vocabularies A collection of vocabularies from a Content Dashboard Item.
 * @returns {number} The total sum of every categories array inside each vocabulary
 */
const getCategoriesCountFromVocabularies = (vocabularies) =>
	vocabularies.reduce((total, {categories}) => total + categories.length, 0);

/**
 * Divides the item vocabularies in two arrays, interal and public ones
 * @param {array} vocabularies A collection of vocabularies from a Content Dashboard Item.
 * @returns {array[][]} An array containing two arrays
 */
const getVocabulariesByVisibility = (vocabularies) => {
	return Object.values(vocabularies).reduce(
		([internalVocabularies, publicVocabularies], vocabulary) => {
			(vocabulary.isPublic
				? publicVocabularies
				: internalVocabularies
			).push(vocabulary);

			return [internalVocabularies, publicVocabularies];
		},
		[[], []]
	);
};

export {getCategoriesCountFromVocabularies, getVocabulariesByVisibility};

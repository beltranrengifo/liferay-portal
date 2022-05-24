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

import PropTypes from 'prop-types';

const actionType = PropTypes.shape({
	data: PropTypes.shape({
		confirmationMessage: PropTypes.string,
		method: PropTypes.oneOf(['delete', 'get', 'patch', 'post']),
		permissionKey: PropTypes.string,
		successMessage: PropTypes.string,
	}),
	href: PropTypes.string,
	icon: PropTypes.string,
	label: PropTypes.string.isRequired,
	method: PropTypes.oneOf(['delete', 'get', 'patch', 'post']),
	onClick: PropTypes.string,
	target: PropTypes.oneOf([
		'async',
		'headless',
		'inlineEdit',
		'link',
		'modal',
		'modal-full-screen',
		'modal-lg',
		'modal-permissions',
		'modal-sm',
		'sidePanel',
	]),
});

export const itemActionsBasePropTypes = {
	actions: PropTypes.arrayOf(actionType),
	itemData: PropTypes.object,
	itemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

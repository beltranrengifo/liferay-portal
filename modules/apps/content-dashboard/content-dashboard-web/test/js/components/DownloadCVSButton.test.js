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

import {cleanup, fireEvent, render} from '@testing-library/react';
import React from 'react';

import '@testing-library/jest-dom/extend-expect';

import DownloadCVSButton from '../../../src/main/resources/META-INF/resources/js/components/DownloadCVSButton';

const getComponent = () => {
	return <DownloadCVSButton />;
};

describe('DownloadCVSButton', () => {
	afterEach(() => {
		cleanup();
	});

	it('renders a DownloadCVSButton component...', () => {
		const {getByText} = render(getComponent());

		expect(getByText('csv')).toBeInTheDocument();
	});

	it('...with the proper initial UI state', async () => {
		const {container, getByTitle} = render(getComponent());

		const {className: btnClassName} = getByTitle(
			'download-your-data-in-a-csv-file'
		);

		expect(
			getByTitle('download-your-data-in-a-csv-file')
		).toBeInTheDocument();
		expect(btnClassName).toContain(
			'btn-outline-borderless btn-outline-secondary'
		);

		expect(
			container.getElementsByClassName('lexicon-icon-download').length
		).toBe(1);
	});

	it('...with the proper loading UI state', async () => {
		const {container, getByText} = render(getComponent());
		const csvButton = getByText('csv');

		fireEvent(
			csvButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(getByText('generating-csv')).toBeInTheDocument();

		expect(
			container.getElementsByClassName('loading-animation').length
		).toBe(1);
	});

	it('...with the proper restored UI state after cancel', async () => {
		const {container, getByText, getByTitle} = render(getComponent());
		const csvButton = getByText('csv');

		fireEvent(
			csvButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		const cancelButton = getByTitle('cancel-csv');

		expect(cancelButton).toBeInTheDocument();
		expect(
			container.getElementsByClassName('lexicon-icon-times-circle').length
		).toBe(1);

		fireEvent(
			cancelButton,
			new MouseEvent('click', {
				bubbles: true,
				cancelable: true,
			})
		);

		expect(getByText('csv')).toBeInTheDocument();
		expect(
			container.getElementsByClassName('loading-animation').length
		).toBe(0);
	});
});

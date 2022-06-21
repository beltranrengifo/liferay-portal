/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * The contents of this file are subject to the terms of the Liferay Enterprise
 * Subscription License ("License"). You may not use this file except in
 * compliance with the License. You can obtain a copy of the License by
 * contacting Liferay, Inc. See the License for the specific language governing
 * permissions and limitations under the License, including but not limited to
 * distribution rights of the Software.
 */

import {fireEvent, render} from '@testing-library/react';
import React from 'react';

import ConnectToAC from '../../../src/main/resources/META-INF/resources/js/components/ConnectToAC';

import '@testing-library/jest-dom/extend-expect';

const testProps = {
	analyticsCloudTrialURL: 'https://localhost/',
	analyticsURL: 'https://localhost/',
	hideAnalyticsReportsPanelURL: 'https://localhost/',
	isAnalyticsConnected: true,
	pathToAssets: '/',
};

const renderComponent = (props) => {
	return render(<ConnectToAC {...testProps} {...props} />);
};

describe('ConnectToAC', () => {
	it('renders a link to analytics cloud in order to connect with our site when analytics is connected', () => {
		const {container, getByText} = renderComponent();

		expect(getByText('sync-to-analytics-cloud')).toBeInTheDocument();
		expect(getByText('open-analytics-cloud')).toBeInTheDocument();

		const link = container.querySelectorAll('a');
		expect(link.length).toBe(1);
		expect(link[0].href).toBe(testProps.analyticsURL);
	});

	it('renders a link to start free trial of AC when analytics is not connected', () => {
		const {container, getByText} = renderComponent({
			isAnalyticsConnected: false,
		});

		expect(
			getByText('connect-to-liferay-analytics-cloud')
		).toBeInTheDocument();
		expect(getByText('start-free-trial')).toBeInTheDocument();

		const link = container.querySelectorAll('a');
		expect(link.length).toBe(2);

		expect(link[0].href).toBe(testProps.analyticsCloudTrialURL);
		expect(link[1].href).toBe('');
	});
});

describe('ConnectToAC component allows user to hide the module', () => {
	beforeEach(() => {
		window.submitForm = jest.fn();
		document.hrefFm = (
			<form
				action="#"
				aria-hidden="true"
				className="hide"
				id="hrefFm"
				method="post"
				name="hrefFm"
			>
				<span></span>

				<button hidden="" type="submit">
					Hidden
				</button>
			</form>
		);
	});

	it('by rendering a link which will submit a form', () => {
		const {getByText} = renderComponent({
			isAnalyticsConnected: false,
		});

		const discardModuleLink = getByText('do-not-show-me-this-again');
		expect(discardModuleLink).toBeInTheDocument();

		fireEvent.click(discardModuleLink);
		expect(window.submitForm).toHaveBeenCalled();
	});

	it('by rendering a link which will not submit the form if any param is missing', () => {
		document.hrefFm = null;

		const {getByText} = renderComponent({
			isAnalyticsConnected: false,
		});

		fireEvent.click(getByText('do-not-show-me-this-again'));
		expect(window.submitForm).not.toHaveBeenCalled();
	});
});

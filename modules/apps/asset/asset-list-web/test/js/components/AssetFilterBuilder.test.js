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

import AssetFilterBuilder from '../../../src/main/resources/META-INF/resources/js/components/AssetFilterBuilder/index';
import {buildQueryString} from '../../../src/main/resources/META-INF/resources/js/components/AssetFilterBuilder/odata';
import {defaultComponentProps} from '../mocks/assetFilterBuilderProps';

const _getComponent = (props) => {
	return render(<AssetFilterBuilder {...defaultComponentProps} {...props} />);
};

describe('AssetFilterBuilder', () => {
	beforeEach(() => {
		window.fetch = jest.fn().mockReturnValue({
			then(data = {}) {
				return data;
			},
		});

		window.Liferay.Util.objectToFormData = jest.fn();

		global.console = {
			...console,
			warn: jest.fn(),
		};
	});

	afterEach(() => {
		jest.restoreAllMocks();
		cleanup();
	});

	it('shows a default initial rule', () => {
		const {getByDisplayValue, getByText} = _getComponent();

		expect(getByDisplayValue('contains')).toBeInTheDocument();
		expect(getByDisplayValue('all')).toBeInTheDocument();
		expect(getByDisplayValue('tags')).toBeInTheDocument();
		expect(getByText('select')).toBeInTheDocument();
	});

	it('calls the fetch methods on first mount', () => {
		_getComponent();

		expect(window.Liferay.Util.objectToFormData).toHaveBeenCalled();
		expect(window.fetch).toHaveBeenCalled();
	});

	it('shows the add rule button which adds a new rule on click', () => {
		const {container, getAllByText} = _getComponent();

		const addRuleButton = container.querySelector(
			'button[type=button].form-builder-rule-add-condition'
		);
		expect(addRuleButton).toBeInTheDocument();

		fireEvent.click(addRuleButton);
		expect(getAllByText('contains').length).toBe(2);
	});

	it('shows the delete rule button which deletes the rule on click', () => {
		const {container, getAllByText} = _getComponent();

		const addRuleButton = container.querySelector(
			'button[type=button].form-builder-rule-add-condition'
		);
		expect(addRuleButton).toBeInTheDocument();

		fireEvent.click(addRuleButton);
		fireEvent.click(addRuleButton);

		expect(getAllByText('contains').length).toBe(3);

		let deleteButtons = container.querySelectorAll(
			'.container-trash button'
		);
		expect(deleteButtons.length).toBe(3);

		fireEvent.click(deleteButtons[2]);

		expect(getAllByText('contains').length).toBe(2);

		deleteButtons = container.querySelectorAll('.container-trash button');
		expect(deleteButtons.length).toBe(2);

		fireEvent.click(deleteButtons[1]);

		expect(getAllByText('contains').length).toBe(1);

		deleteButtons = container.querySelectorAll('.container-trash button');
		expect(deleteButtons.length).toBe(1);
	});

	it('renders a hidden input with the proper initial query', () => {
		const {getByDisplayValue} = _getComponent();

		const defaultQuery = buildQueryString({
			rules: defaultComponentProps.rules,
		});

		const odataHiddenInput = getByDisplayValue(defaultQuery);

		expect(odataHiddenInput).toBeInTheDocument();
		expect(odataHiddenInput).not.toBeVisible();
	});

	it('renders a hidden input whose value responds to user interaction, using tags', () => {
		const {getByDisplayValue, getByLabelText} = _getComponent({
			rules: [
				{
					queryAndOperator: true,
					queryContains: true,
					queryValues: 'acapulco,food,travel',
					selectedItems: [
						{
							label: 'acapulco',
							value: 'acapulco',
						},
						{
							label: 'food',
							value: 'food',
						},
						{
							label: 'travel',
							value: 'travel',
						},
					],
					type: 'assetTags',
				},
			],
		});

		expect(
			getByDisplayValue(
				"(assetTags eq 'acapulco') and (assetTags eq 'food') and (assetTags eq 'travel')"
			)
		).toBeInTheDocument();

		fireEvent.change(getByDisplayValue('contains'), {
			target: {value: false},
		});
		expect(
			getByDisplayValue(
				"(assetTags ne 'acapulco') and (assetTags ne 'food') and (assetTags ne 'travel')"
			)
		).toBeInTheDocument();

		fireEvent.change(getByDisplayValue('all'), {
			target: {value: false},
		});
		expect(
			getByDisplayValue(
				"(not(assetTags in ('acapulco', 'food', 'travel')))"
			)
		).toBeInTheDocument();

		fireEvent.click(getByLabelText('Remove travel'));
		fireEvent.click(getByLabelText('Remove food'));
		expect(
			getByDisplayValue("(not(assetTags in ('acapulco')))")
		).toBeInTheDocument();

		fireEvent.change(getByDisplayValue('tags'), {
			target: {value: 'assetCategories'},
		});
		expect(
			getByDisplayValue('(not(assetCategories in ()))')
		).toBeInTheDocument();
	});

	it('renders a hidden input whose value responds to user interaction, using categories', () => {
		const {getByDisplayValue, getByLabelText} = _getComponent({
			rules: [
				{
					queryAndOperator: true,
					queryContains: true,
					queryValues: '42931,42934,42937',
					selectedItems: [
						{
							label: 'Frontend',
							value: 42931,
						},
						{
							label: 'Backend',
							value: 42934,
						},
						{
							label: 'QA',
							value: 42937,
						},
					],
					type: 'assetCategories',
				},
			],
		});

		expect(
			getByDisplayValue(
				"(assetCategories eq '42931') and (assetCategories eq '42934') and (assetCategories eq '42937')"
			)
		).toBeInTheDocument();

		fireEvent.change(getByDisplayValue('all'), {
			target: {value: false},
		});

		expect(
			getByDisplayValue(
				"(assetCategories in ('42931', '42934', '42937'))"
			)
		).toBeInTheDocument();

		fireEvent.click(getByLabelText('Remove QA'));
		fireEvent.click(getByLabelText('Remove Backend'));
		expect(
			getByDisplayValue("(assetCategories in ('42931'))")
		).toBeInTheDocument();
	});

	it('renders a hidden input whose value responds to user interaction, using keywords', () => {
		const {getByDisplayValue} = _getComponent({
			rules: [
				{
					queryAndOperator: true,
					queryContains: true,
					queryValues: 'winter',
					selectedItems: 'winter',
					type: 'keywords',
				},
			],
		});

		expect(
			getByDisplayValue("(keywords/all(k:contains(k, 'winter')))")
		).toBeInTheDocument();

		fireEvent.change(getByDisplayValue('winter'), {
			target: {value: 'winter summer'},
		});
		expect(
			getByDisplayValue(
				"(keywords/all(k:contains(k, 'winter') and contains(k, 'summer')))"
			)
		).toBeInTheDocument();

		fireEvent.change(getByDisplayValue('all'), {
			target: {value: false},
		});

		expect(
			getByDisplayValue(
				"(keywords/any(k:contains(k, 'winter') and contains(k, 'summer')))"
			)
		).toBeInTheDocument();

		fireEvent.change(getByDisplayValue('contains'), {
			target: {value: false},
		});

		expect(
			getByDisplayValue(
				"(not(keywords/any(k:contains(k, 'winter') and contains(k, 'summer'))))"
			)
		).toBeInTheDocument();
	});
});

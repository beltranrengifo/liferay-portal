<%--
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
--%>

<%@ include file="/init.jsp" %>

<%
FDSSampleDisplayContext fdsSampleDisplayContext = (FDSSampleDisplayContext)request.getAttribute(FDSSampleWebKeys.FDS_SAMPLE_DISPLAY_CONTEXT);
%>

<section id="<portlet:namespace />fdsSample">
	<clay:container-fluid
		cssClass="container-fluid container-fluid-max-xl my-4"
	>
		<ul class="nav nav-underline" role="tablist">
			<li class="nav-item">
				<a aria-controls="navUnderlineMultiple" aria-selected="true" class="active nav-link" data-toggle="tab" href="#navUnderlineMultiple" id="navUnderlineMultipleTab" role="tab">
					Multiple selection
				</a>
			</li>
			<li class="nav-item">
				<a aria-controls="navUnderlineSingle" aria-selected="false" class="nav-link" data-toggle="tab" href="#navUnderlineSingle" id="navUnderlineSingleTab" role="tab">
					Single selection
				</a>
			</li>
		</ul>
	</clay:container-fluid>

	<div class="tab-content">
		<div aria-labelledby="navUnderlineMultipleTab" class="active fade show tab-pane" id="navUnderlineMultiple" role="tabpanel">
			<form action="<%= fdsSampleDisplayContext.getPortletURL() %>" method="post" name="fm">
				<input name="<%= Constants.CMD %>" type="hidden" value="<%= Constants.DELETE %>" />
				<input name="redirect" type="hidden" value="<%= String.valueOf(fdsSampleDisplayContext.getPortletURL()) %>" />

				<frontend-data-set:headless-display
					additionalProps='<%=
						HashMapBuilder.<String, Object>put(
							"greeting", "Hello"
						).build()
					%>'
					apiURL="<%= fdsSampleDisplayContext.getAPIURL() %>"
					bulkActionDropdownItems="<%= fdsSampleDisplayContext.getBulkActionDropdownItems() %>"
					customViewsEnabled="<%= true %>"
					fdsActionDropdownItems="<%= fdsSampleDisplayContext.getFDSActionDropdownItems() %>"
					formId="fm"
					id="<%= FDSSampleFDSNames.FDS_SAMPLES %>"
					itemsPerPage="<%= 20 %>"
					namespace="<%= liferayPortletResponse.getNamespace() %>"
					pageNumber="<%= 1 %>"
					portletURL="<%= liferayPortletResponse.createRenderURL() %>"
					propsTransformer="js/SampleFDSPropsTransformer"
					selectedItemsKey="id"
					selectionType="multiple"
					style="fluid"
				/>
			</form>
		</div>

		<div aria-labelledby="navUnderlineSingleTab" class="fade tab-pane" id="navUnderlineSingle" role="tabpanel">
			<form action="<%= fdsSampleDisplayContext.getPortletURL() %>" method="post" name="fm">
				<input name="<%= Constants.CMD %>" type="hidden" value="<%= Constants.DELETE %>" />
				<input name="redirect" type="hidden" value="<%= String.valueOf(fdsSampleDisplayContext.getPortletURL()) %>" />

				<frontend-data-set:headless-display
					additionalProps='<%=
						HashMapBuilder.<String, Object>put(
							"greeting", "Hello"
						).build()
					%>'
					apiURL="<%= fdsSampleDisplayContext.getAPIURL() %>"
					bulkActionDropdownItems="<%= fdsSampleDisplayContext.getBulkActionDropdownItems() %>"
					customViewsEnabled="<%= true %>"
					fdsActionDropdownItems="<%= fdsSampleDisplayContext.getFDSActionDropdownItems() %>"
					formId="fm"
					id="<%= FDSSampleFDSNames.FDS_SAMPLES %>"
					itemsPerPage="<%= 20 %>"
					namespace="<%= liferayPortletResponse.getNamespace() %>"
					pageNumber="<%= 1 %>"
					portletURL="<%= liferayPortletResponse.createRenderURL() %>"
					propsTransformer="js/SampleFDSPropsTransformer"
					selectedItemsKey="id"
					selectionType="single"
					style="fluid"
				/>
			</form>
		</div>
	</div>
</section>

<script type="text/javascript">
	const tabNavItemLinks = document.querySelectorAll(
		'#<portlet:namespace />fdsSample .nav .nav-link'
	);
	const tabContentItems = document.querySelectorAll(
		'#<portlet:namespace />fdsSample .tab-content .tab-pane'
	);

	Array.from(tabNavItemLinks).forEach((tabNavItemLink) => {
		tabNavItemLink.addEventListener('click', (event) => {
			event.preventDefault();
			Array.from(tabNavItemLinks).forEach((tabNavItemLink) => {
				tabNavItemLink.classList.remove('active');
			});
			Array.from(tabContentItems).forEach((tabContentItem) => {
				tabContentItem.classList.remove('active', 'show');
			});

			const clickedTabNavItemLink = event.currentTarget;

			clickedTabNavItemLink.classList.add('active');
			document
				.getElementById(
					clickedTabNavItemLink.getAttribute('href').replace('#', '')
				)
				.classList.add('active', 'show');
		});
	});
</script>
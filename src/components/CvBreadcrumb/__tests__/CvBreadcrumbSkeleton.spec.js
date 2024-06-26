/**
 * NOTE: This test needs to be converted to use the new library `@testing-library/vue`. See CvCheckbox test for example.
 */
import { shallowMount } from '@vue/test-utils';
import { carbonPrefix } from '../../../global/settings';

import CvBreadcrumbSkeleton from '../CvBreadcrumbSkeleton.vue';
import CvBreadcrumbSkeletonItem from '../CvBreadcrumbSkeletonItem.vue';
describe('CvBreadcrumbSkeleton', () => {
  it('CvBreadcrumbSkeleton - default', () => {
    const wrapper = shallowMount(CvBreadcrumbSkeleton);

    const tag = wrapper.find('div');
    expect(tag.classes()).toContain(`${carbonPrefix}--breadcrumb`);
    expect(tag.classes()).toContain(`${carbonPrefix}--skeleton`);
    expect(tag.classes()).not.toContain(
      `${carbonPrefix}--breadcrumb--no-trailing-slash`
    );
  });

  it('CvBreadcrumbSkeleton - noTrailingSlash', () => {
    const wrapper = shallowMount(CvBreadcrumbSkeleton, {
      props: {
        noTrailingSlash: true,
      },
    });

    const tag = wrapper.find('div');
    expect(tag.classes()).toContain(
      `${carbonPrefix}--breadcrumb--no-trailing-slash`
    );
  });
});

describe('CvBreadcrumbSkeletonItem', () => {
  it('CvBreadcrumbItem - default', () => {
    const wrapper = shallowMount(CvBreadcrumbSkeletonItem);

    const divTag = wrapper.find('div');
    expect(divTag.classes()).toContain(`${carbonPrefix}--breadcrumb-item`);

    const spanTag = wrapper.find('span');
    expect(spanTag.classes()).toContain(`${carbonPrefix}--link`);
  });
});

/**
 * NOTE: This test needs to be converted to use the new library `@testing-library/vue`. See CvCheckbox test for example.
 */
import { mount, shallowMount } from '@vue/test-utils';
import { carbonPrefix } from '../../../global/settings';

import { CvToastNotification, CvNotificationConsts } from '..';

describe('CvToastNotification', () => {
  it('CvToastNotification - default', () => {
    const wrapper = mount(CvToastNotification);

    expect(new Set(wrapper.classes())).toEqual(
      new Set([
        'cv-notification',
        `${carbonPrefix}--toast-notification`,
        `${carbonPrefix}--toast-notification--info`,
      ])
    );
  });

  it('CvToastNotification - kind', async () => {
    const wrapper = mount(CvToastNotification);

    const divTag = wrapper.find('div');
    for (const kind of CvNotificationConsts.notificationKinds) {
      await wrapper.setProps({ kind });
      expect(new Set(divTag.classes())).toEqual(
        new Set([
          'cv-notification',
          `${carbonPrefix}--toast-notification`,
          `${carbonPrefix}--toast-notification--${kind}`,
        ])
      );
    }
  });

  it('CvToastNotification - kind validator', () => {
    for (const kind of CvNotificationConsts.notificationKinds) {
      expect(CvToastNotification.props.kind.validator(kind)).toEqual(true);
    }

    expect(
      CvToastNotification.props.kind.validator('any other string')
    ).toEqual(false);
  });

  it('CvToastNotification - icon', async () => {
    const wrapper = mount(CvToastNotification);

    for (const kind of CvNotificationConsts.notificationKinds) {
      await wrapper.setProps({ kind });
      expect(wrapper.vm.icon).toEqual(
        CvNotificationConsts.notificationIcons[kind]
      );
    }
  });

  it('CvToastNotification - low contrast', () => {
    const wrapper = mount(CvToastNotification, {
      props: { lowContrast: true },
    });

    const divTag = wrapper.find('div');
    expect(divTag.classes()).toContain(
      `${carbonPrefix}--toast-notification--low-contrast`
    );
  });

  it('CvToastNotification - title, subtitle and caption', () => {
    const TITLE = 'Some kind of unique title';
    const SUBTITLE = 'And an equally unique sub title!';
    const CAPTION =
      'Believe me, you wont believe how unique this caption is...';

    const wrapper = mount(CvToastNotification, {
      props: {
        title: TITLE,
        subTitle: SUBTITLE,
        caption: CAPTION,
      },
    });

    expect(wrapper.text()).toContain(TITLE);
    expect(wrapper.text()).toContain(SUBTITLE);
    expect(wrapper.text()).toContain(CAPTION);
  });

  it('CvToastNotification - close event', async () => {
    const wrapper = mount(CvToastNotification);

    const closeButton = wrapper.find(
      `button.${carbonPrefix}--toast-notification__close-button`
    );
    await closeButton.trigger('click');

    expect(wrapper.emitted().close).toBeTruthy();
  });

  test.each([
    ['default', `${carbonPrefix}--toast-notification__details`],
    ['title', `${carbonPrefix}--toast-notification__title`],
    ['subtitle', `${carbonPrefix}--toast-notification__subtitle`],
    ['caption', `${carbonPrefix}--toast-notification__caption`],
  ])('Renders %s slot content', async (slotName, immediateParentClass) => {
    const SlotTestId = slotName;
    const wrapper = shallowMount(CvToastNotification, {
      slots: {
        [slotName]: `<div test-id="${SlotTestId}">Test</div>`,
      },
    });

    const defaultSlotContent = wrapper.find(
      `.${immediateParentClass} > [test-id=${SlotTestId}]`
    );

    expect(defaultSlotContent.exists()).toBe(true);
  });
});

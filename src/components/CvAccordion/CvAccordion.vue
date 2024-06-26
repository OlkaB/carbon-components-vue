<template>
  <ul
    data-accordion
    :class="[
      `cv-accordion ${carbonPrefix}--accordion`,
      {
        [`${carbonPrefix}--accordion--${align}`]: align,
        [`${carbonPrefix}--accordion--${size}`]: size,
      },
    ]"
  >
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'CvAccordion',
};
</script>

<script setup>
import { computed, provide, reactive } from 'vue';
import { carbonPrefix } from '../../global/settings';
import { alignConsts, sizeConsts } from './consts';

defineProps({
  /**
   * Specify the alignment of the accordion heading title and chevron.
   */
  align: {
    type: String,
    default: '',
    validator: val => alignConsts.includes(val),
  },
  /**
   * Specify the size of the Accordion
   */
  size: {
    type: String,
    default: '',
    validator: val => sizeConsts.includes(val),
  },
});

const emit = defineEmits({
  /**
   * Triggers when state of an accordion item changes
   */
  change: payload => {
    return (
      typeof payload?.change?.id === 'string' &&
      typeof payload?.change?.open === 'boolean' &&
      Array.isArray(payload?.state)
    );
  },
});

const items = reactive(new Map());
const state = computed({
  get() {
    return Array.from(items).map(item => ({
      id: item[0], // key
      open: item[1].open, // value
    }));
  },
  set(newStates) {
    newStates.forEach(newState => {
      const item = items.get(newState.id);
      if (item?.open !== newState.open) {
        item.toggleOpen();
      }
    });
  },
});

defineExpose({ state });

// Functions provided to CvAccordionItem
provide('registerItem', (itemCvId, item) => {
  items.set(itemCvId, item);
});
provide('deregisterItem', itemCvId => {
  items.delete(itemCvId);
});

/**
 * @typedef {Object} AccordionChangeElement
 * @property {string} id
 * @property {boolean} open
 */

/**
 * @typedef {Object} AccordionChangeEvent
 * @property {AccordionChangeElement} change
 * @property {Array<AccordionChangeElement>} state
 * @param ev
 */
provide('onAccItemChange', (clickedItemCvId, open) => {
  items.get(clickedItemCvId).open = open;
  emit('change', {
    change: { id: clickedItemCvId, open },
    state: state.value,
  });
});
</script>

<style lang="scss"></style>

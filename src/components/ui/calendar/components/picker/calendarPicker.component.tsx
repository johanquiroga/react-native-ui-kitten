/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  View,
  ViewProps,
  StyleProp,
} from 'react-native';
import { StyleType } from '@kitten/theme';
import {
  CalendarPickerRow,
  CalendarPickerRowElement,
} from './calendarPickerRow.component';
import {
  CalendarPickerCell,
  CalendarPickerCellElement,
  CalendarPickerCellProps,
} from './calendarPickerCell.component';
import { CalendarDateInfo } from '../../type';

interface ComponentProps<D> extends ViewProps {
  data: CalendarDateInfo<D>[][];
  isItemSelected: (item: CalendarDateInfo<D>) => boolean;
  isItemDisabled: (item: CalendarDateInfo<D>) => boolean;
  isItemToday: (item: CalendarDateInfo<D>) => boolean;
  onSelect?: (item: CalendarDateInfo<D>) => void;
  renderItem: (item: CalendarDateInfo<D>, style: StyleType) => React.ReactElement;
  shouldItemUpdate?: (props: CalendarPickerCellProps<D>, nextProps: CalendarPickerCellProps<D>) => boolean;
  rowStyle?: StyleProp<ViewProps>;
}

export type CalendarPickerProps<D> = ComponentProps<D>;
export type CalendarPickerElement<D> = React.ReactElement<CalendarPickerProps<D>>;

export class CalendarPicker<D> extends React.Component<CalendarPickerProps<D>> {

  private get rangedArray (): CalendarDateInfo<D>[] {
    const { data } = this.props;

    return [].concat(...data).filter((item: CalendarDateInfo<D>) => {
      return item.range;
    });
  }

  private isFirstRangeItem = (item: CalendarDateInfo<D>, range: CalendarDateInfo<D>[]): boolean => {
    return range.indexOf(item) === 0;
  };

  private isLastRangeItem = (item: CalendarDateInfo<D>, range: CalendarDateInfo<D>[]): boolean => {
    return range.indexOf(item) === range.length - 1;
  };

  private renderCellElement = (item: CalendarDateInfo<D>, index: number): CalendarPickerCellElement<D> => {
    const isFirstRangeItem: boolean = this.isFirstRangeItem(item, this.rangedArray);
    const isLastRangeItem: boolean = this.isLastRangeItem(item, this.rangedArray);

    return (
      <CalendarPickerCell
        key={index}
        date={item}
        selected={this.props.isItemSelected(item)}
        disabled={this.props.isItemDisabled(item)}
        bounding={item.bounding}
        today={this.props.isItemToday(item)}
        range={item.range}
        firstRangeItem={isFirstRangeItem}
        lastRangeItem={isLastRangeItem}
        onSelect={this.props.onSelect}
        shouldComponentUpdate={this.props.shouldItemUpdate}>
        {this.props.renderItem}
      </CalendarPickerCell>
    );
  };

  private renderRowElement = (item: CalendarDateInfo<D>[], index: number): CalendarPickerRowElement<D> => {
    const { rowStyle } = this.props;

    return (
      <CalendarPickerRow
        style={rowStyle}
        key={index}
        data={item}
        renderItem={this.renderCellElement}
      />
    );
  };

  public render(): React.ReactElement<ViewProps> {
    const { data, renderItem, ...restProps } = this.props;

    return (
      <View
        {...restProps}>
        {data.map(this.renderRowElement)}
      </View>
    );
  }
}

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  CalendarRange,
  RangeDatepicker,
  RangeDatepickerElement,
  RangeDatepickerProps,
} from '@ui-kitten/components';

type RangeDatepickerShowcaseProps = Omit<RangeDatepickerProps, 'onSelect'>;

export const RangeDatepickerShowcase = (props: RangeDatepickerShowcaseProps): RangeDatepickerElement => {

  const [range, setRange] = React.useState<CalendarRange<Date>>({});

  return (
    <RangeDatepicker
      {...props}
      style={styles.datepicker}
      range={range}
      onSelect={setRange}
    />
  );
};

const styles = StyleSheet.create({
  datepicker: {
    marginBottom: 20,
  },
});

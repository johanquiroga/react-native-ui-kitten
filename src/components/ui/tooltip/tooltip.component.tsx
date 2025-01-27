/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import React from 'react';
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  styled,
  StyledComponentProps,
  StyleType,
} from '@kitten/theme';
import {
  Text,
  TextElement,
} from '../text/text.component';
import { IconElement } from '../icon/icon.component';
import {
  Popover,
  PopoverElement,
  PopoverProps,
} from '../popover/popover.component';
import { ModalPresentingBased } from '../support/typings';

type IconProp = (style: StyleType) => IconElement;
type WrappingElement = React.ReactElement;

type PopoverContentProps = Omit<PopoverProps, 'content'>;

interface ComponentProps extends PopoverContentProps, ModalPresentingBased {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  icon?: IconProp;
  children: WrappingElement;
}

export type TooltipProps = StyledComponentProps & ComponentProps;
export type TooltipElement = React.ReactElement<TooltipProps>;

/**
 * `Tooltip` displays informative text when users focus on or tap an element.
 *
 * @extends React.Component
 *
 * @property {string} text - Determines the text of the tooltip
 *
 * @property {StyleProp<TextStyle>} textStyle - Customizes text style.
 *
 * @property {(style: StyleType) => ReactElement} icon - Determines icon of the component.
 *
 * @property {ReactElement} children - Determines the element "above" which popover will be shown.
 *
 * @property {boolean} visible - Determines whether popover is visible or not.
 *
 * @property {string | PopoverPlacement} placement - Determines the placement of the popover.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Default is `bottom`.
 *
 * @property {number} indicatorOffset - Determines the offset of indicator (arrow).
 * @property {StyleProp<ViewStyle>} indicatorStyle - Determines style of indicator (arrow).
 *
 * @property {Omit<PopoverProps, 'content'>} ...PopoverProps - Any props applied to Popover component,
 * excluding `content`.
 *
 * @property {ModalPresentingBased} ...ModalProps - Any props applied to Modal component.
 *
 * @overview-example TooltipSimpleUsage
 *
 * @overview-example TooltipWithIcon
 *
 * @overview-example TooltipPlacement
 *
 * @example TooltipWithExternalSourceIcon
 *
 * @example TooltipInlineStyling
 */
export class TooltipComponent extends React.Component<TooltipProps> {

  static styledComponentName: string = 'Tooltip';

  static defaultProps: Partial<TooltipProps> = {
    indicatorOffset: 8,
  };

  private getComponentStyle = (source: StyleType): StyleType => {
    const {
      indicatorBackgroundColor,
      iconWidth,
      iconHeight,
      iconMarginHorizontal,
      iconTintColor,
      textMarginHorizontal,
      textFontSize,
      textFontFamily,
      textLineHeight,
      textColor,
      ...containerParameters
    } = source;

    return {
      container: containerParameters,
      content: {},
      indicator: {
        backgroundColor: indicatorBackgroundColor,
      },
      icon: {
        width: iconWidth,
        height: iconHeight,
        marginHorizontal: iconMarginHorizontal,
        tintColor: iconTintColor,
      },
      text: {
        marginHorizontal: textMarginHorizontal,
        fontFamily: textFontFamily,
        fontSize: textFontSize,
        lineHeight: textLineHeight,
        color: textColor,
      },
    };
  };

  private renderTextElement = (style: TextStyle): TextElement => {
    const { text, textStyle } = this.props;

    return (
      <Text
        key={1}
        style={[style, styles.text, textStyle]}>
        {text}
      </Text>
    );
  };

  private renderIconElement = (style: ImageStyle): IconElement => {
    const iconElement: IconElement = this.props.icon(style);

    return React.cloneElement(iconElement, {
      key: 0,
      style: [style, styles.icon, iconElement.props.style],
    });
  };

  private renderContentElementChildren = (style: StyleType): React.ReactNodeArray => {
    const { icon } = this.props;

    return [
      icon && this.renderIconElement(style.icon),
      this.renderTextElement(style.text),
    ];
  };

  private renderPopoverContentElement = (style: StyleType): React.ReactElement<ViewProps> => {
    const { content, ...childrenStyle } = style;

    const contentChildren: React.ReactNode = this.renderContentElementChildren(childrenStyle);

    return (
      <View style={[content, styles.content]}>
        {contentChildren}
      </View>
    );
  };

  public render(): PopoverElement {
    const { themedStyle, style, indicatorStyle, children, ...derivedProps } = this.props;
    const { container, indicator, ...componentStyle } = this.getComponentStyle(themedStyle);

    const contentElement: TextElement = this.renderPopoverContentElement(componentStyle);

    return (
      <Popover
        {...derivedProps}
        style={[container, styles.container, style]}
        indicatorStyle={[indicator, indicatorStyle]}
        content={contentElement}>
        {children}
      </Popover>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  content: {
    flexDirection: 'row',
  },
  indicator: {},
  icon: {},
  text: {
    alignSelf: 'center',
  },
});

export const Tooltip = styled<TooltipProps>(TooltipComponent);

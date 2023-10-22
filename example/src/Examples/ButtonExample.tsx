import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import {
  Button,
  List,
  ElevatedButton,
  ContainedButton,
  TextButton,
  OutlinedButton,
  NewButton,
} from 'react-native-paper';

import { useExampleTheme, useExampleNewTheme } from '..';
import ScreenWrapper from '../ScreenWrapper';

const ButtonExample = () => {
  const theme = useExampleNewTheme();

  const color = theme.colors.inversePrimary;

  return (
    <ScreenWrapper>
      <List.Section title={`Text button ${theme.isV3 ? '(text)' : ''}`}>
        <View style={styles.row}>
          <Button onPress={() => {}} style={styles.button}>
            Default
          </Button>
          <TextButton onPress={() => {}} style={styles.button}>
            Default
          </TextButton>
          <Button textColor={color} onPress={() => {}} style={styles.button}>
            Custom
          </Button>
          <TextButton
            textColor={color}
            onPress={() => {}}
            style={styles.button}
          >
            Custom
          </TextButton>
          <Button disabled onPress={() => {}} style={styles.button}>
            Disabled
          </Button>
          <TextButton disabled onPress={() => {}} style={styles.button}>
            Disabled
          </TextButton>
          <Button icon="camera" onPress={() => {}} style={styles.button}>
            Icon
          </Button>
          <TextButton icon="camera" onPress={() => {}} style={styles.button}>
            Icon
          </TextButton>
          <Button loading onPress={() => {}} style={styles.button}>
            Loading
          </Button>
          <TextButton loading onPress={() => {}} style={styles.button}>
            Loading
          </TextButton>
          <Button
            icon="camera"
            onPress={() => {}}
            style={styles.button}
            contentStyle={styles.flexReverse}
          >
            Icon right
          </Button>
          <TextButton
            icon="camera"
            onPress={() => {}}
            style={styles.button}
            contentStyle={styles.flexReverse}
          >
            Icon right
          </TextButton>
        </View>
      </List.Section>
      {theme.isV3 && (
        <List.Section title="Contained-tonal button (tonal)">
          <View style={styles.row}>
            <Button
              mode="contained-tonal"
              onPress={() => {}}
              style={styles.button}
            >
              Default
            </Button>
            <ContainedButton
              mode="contained-tonal"
              onPress={() => {}}
              style={styles.button}
            >
              Default
            </ContainedButton>
            <Button
              mode="contained-tonal"
              buttonColor={color}
              onPress={() => {}}
              style={styles.button}
            >
              Custom
            </Button>
            <ContainedButton
              mode="contained-tonal"
              buttonColor={color}
              onPress={() => {}}
              style={styles.button}
            >
              Custom
            </ContainedButton>
            <Button
              mode="contained-tonal"
              disabled
              onPress={() => {}}
              style={styles.button}
            >
              Disabled
            </Button>
            <ContainedButton
              mode="contained-tonal"
              disabled
              onPress={() => {}}
              style={styles.button}
            >
              Disabled
            </ContainedButton>
            <Button
              mode="contained-tonal"
              icon="camera"
              onPress={() => {}}
              style={styles.button}
            >
              Icon
            </Button>
            <ContainedButton
              mode="contained-tonal"
              icon="camera"
              onPress={() => {}}
              style={styles.button}
            >
              Icon
            </ContainedButton>
            <Button
              mode="contained-tonal"
              loading
              onPress={() => {}}
              style={styles.button}
            >
              Loading
            </Button>
            <ContainedButton
              mode="contained-tonal"
              loading
              onPress={() => {}}
              style={styles.button}
            >
              Loading
            </ContainedButton>
            <Button
              mode="contained-tonal"
              icon="camera"
              onPress={() => {}}
              style={styles.button}
              contentStyle={styles.flexReverse}
            >
              Icon right
            </Button>
            <ContainedButton
              mode="contained-tonal"
              icon="camera"
              onPress={() => {}}
              style={styles.button}
              contentStyle={styles.flexReverse}
            >
              Icon right
            </ContainedButton>
          </View>
        </List.Section>
      )}
      <List.Section title={`Outlined button ${theme.isV3 ? '(outlined)' : ''}`}>
        <View style={styles.row}>
          <Button mode="outlined" onPress={() => {}} style={styles.button}>
            Default
          </Button>
          <OutlinedButton onPress={() => {}} style={styles.button}>
            Default
          </OutlinedButton>
          <Button
            mode="outlined"
            textColor={color}
            onPress={() => {}}
            style={styles.button}
          >
            Custom
          </Button>
          <OutlinedButton
            textColor={color}
            onPress={() => {}}
            style={styles.button}
          >
            Custom
          </OutlinedButton>
          <Button
            mode="outlined"
            disabled
            onPress={() => {}}
            style={styles.button}
          >
            Disabled
          </Button>
          <OutlinedButton disabled onPress={() => {}} style={styles.button}>
            Disabled
          </OutlinedButton>
          <Button
            mode="outlined"
            icon="camera"
            onPress={() => {}}
            style={styles.button}
          >
            Icon
          </Button>
          <OutlinedButton
            icon="camera"
            onPress={() => {}}
            style={styles.button}
          >
            Icon
          </OutlinedButton>
          <Button
            mode="outlined"
            loading
            onPress={() => {}}
            style={styles.button}
          >
            Loading
          </Button>
          <OutlinedButton loading onPress={() => {}} style={styles.button}>
            Loading
          </OutlinedButton>
          <Button
            mode="outlined"
            icon="camera"
            onPress={() => {}}
            style={styles.button}
            contentStyle={styles.flexReverse}
          >
            Icon right
          </Button>
          <OutlinedButton
            icon="camera"
            onPress={() => {}}
            style={styles.button}
            contentStyle={styles.flexReverse}
          >
            Icon right
          </OutlinedButton>
        </View>
      </List.Section>
      <List.Section title={`Contained button ${theme.isV3 ? '(filled)' : ''}`}>
        <View style={styles.row}>
          <Button mode="contained" onPress={() => {}} style={styles.button}>
            Default
          </Button>
          <ContainedButton
            mode="contained"
            onPress={() => {}}
            style={styles.button}
          >
            Default
          </ContainedButton>
          <Button
            mode="contained"
            buttonColor={color}
            onPress={() => {}}
            style={styles.button}
          >
            Custom
          </Button>
          <ContainedButton
            mode="contained"
            buttonColor={color}
            onPress={() => {}}
            style={styles.button}
          >
            Custom
          </ContainedButton>
          <Button
            mode="contained"
            disabled
            onPress={() => {}}
            style={styles.button}
          >
            Disabled
          </Button>
          <ContainedButton
            mode="contained"
            disabled
            onPress={() => {}}
            style={styles.button}
          >
            Disabled
          </ContainedButton>
          <Button
            mode="contained"
            icon="camera"
            onPress={() => {}}
            style={styles.button}
          >
            Icon
          </Button>
          <ContainedButton
            mode="contained"
            icon="camera"
            onPress={() => {}}
            style={styles.button}
          >
            Icon
          </ContainedButton>
          <Button
            mode="contained"
            loading
            onPress={() => {}}
            style={styles.button}
          >
            Loading
          </Button>
          <ContainedButton
            mode="contained"
            loading
            onPress={() => {}}
            style={styles.button}
          >
            Loading
          </ContainedButton>
          <Button
            mode="contained"
            icon="camera"
            onPress={() => {}}
            style={styles.button}
            contentStyle={styles.flexReverse}
          >
            Icon right
          </Button>
          <ContainedButton
            mode="contained"
            icon="camera"
            onPress={() => {}}
            style={styles.button}
            contentStyle={styles.flexReverse}
          >
            Icon right
          </ContainedButton>
        </View>
      </List.Section>
      {theme.isV3 && (
        <List.Section title={'Elevated button (elevated)'}>
          <View style={styles.row}>
            <Button mode="elevated" onPress={() => {}} style={styles.button}>
              Default
            </Button>
            <ElevatedButton onPress={() => {}} style={styles.button}>
              Default
            </ElevatedButton>
            <Button
              mode="elevated"
              buttonColor={color}
              onPress={() => {}}
              style={styles.button}
            >
              Custom
            </Button>
            <ElevatedButton
              buttonColor={color}
              onPress={() => {}}
              style={styles.button}
            >
              Custom
            </ElevatedButton>
            <Button
              mode="elevated"
              disabled
              onPress={() => {}}
              style={styles.button}
            >
              Disabled
            </Button>
            <ElevatedButton disabled onPress={() => {}} style={styles.button}>
              Disabled
            </ElevatedButton>
            <Button
              mode="elevated"
              icon="camera"
              onPress={() => {}}
              style={styles.button}
            >
              Icon
            </Button>
            <ElevatedButton
              icon="camera"
              onPress={() => {}}
              style={styles.button}
            >
              Icon
            </ElevatedButton>
            <Button
              mode="elevated"
              loading
              onPress={() => {}}
              style={styles.button}
            >
              Loading
            </Button>
            <ElevatedButton loading onPress={() => {}} style={styles.button}>
              Loading
            </ElevatedButton>
            <Button
              mode="elevated"
              icon="camera"
              onPress={() => {}}
              style={styles.button}
              contentStyle={styles.flexReverse}
            >
              Icon right
            </Button>
            <ElevatedButton
              icon="camera"
              onPress={() => {}}
              style={styles.button}
              contentStyle={styles.flexReverse}
            >
              Icon right
            </ElevatedButton>
          </View>
        </List.Section>
      )}
      <List.Section title="Custom">
        <View style={styles.row}>
          <Button
            mode="outlined"
            icon={{
              uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400',
            }}
            onPress={() => {}}
            style={styles.button}
          >
            Remote image
          </Button>
          <OutlinedButton
            icon={{
              uri: 'https://avatars0.githubusercontent.com/u/17571969?v=3&s=400',
            }}
            onPress={() => {}}
            style={styles.button}
          >
            Remote image
          </OutlinedButton>
          <Button
            mode="outlined"
            icon={require('../../assets/images/favorite.png')}
            onPress={() => {}}
            style={styles.button}
          >
            Required asset
          </Button>
          <OutlinedButton
            icon={require('../../assets/images/favorite.png')}
            onPress={() => {}}
            style={styles.button}
          >
            Required asset
          </OutlinedButton>
          <Button
            mode="outlined"
            icon={({ size }) => (
              <Image
                source={require('../../assets/images/chameleon.jpg')}
                style={{ width: size, height: size, borderRadius: size / 2 }}
                accessibilityIgnoresInvertColors
              />
            )}
            onPress={() => {}}
            style={styles.button}
          >
            Custom component
          </Button>
          <OutlinedButton
            icon={({ size }) => (
              <Image
                source={require('../../assets/images/chameleon.jpg')}
                style={{ width: size, height: size, borderRadius: size / 2 }}
                accessibilityIgnoresInvertColors
              />
            )}
            onPress={() => {}}
            style={styles.button}
          >
            Custom component
          </OutlinedButton>
          <Button
            icon="heart"
            mode="outlined"
            onPress={() => {}}
            style={styles.button}
            labelStyle={[styles.fontStyles, theme.isV3 && styles.md3FontStyles]}
          >
            Custom Font
          </Button>
          <OutlinedButton
            icon="heart"
            onPress={() => {}}
            style={styles.button}
            labelStyle={[styles.fontStyles, theme.isV3 && styles.md3FontStyles]}
          >
            Custom Font
          </OutlinedButton>
        </View>

        <View style={styles.row}>
          <Button
            mode="contained"
            onPress={() => {}}
            style={styles.flexGrow1Button}
          >
            flex-grow: 1
          </Button>
          <ContainedButton
            mode="contained"
            onPress={() => {}}
            style={styles.flexGrow1Button}
          >
            flex-grow: 1
          </ContainedButton>
        </View>
        <View style={styles.row}>
          <Button
            mode="contained"
            onPress={() => {}}
            style={styles.width100PercentButton}
          >
            width: 100%
          </Button>
        </View>
        <View style={styles.row}>
          <ContainedButton
            mode="contained"
            onPress={() => {}}
            style={styles.width100PercentButton}
          >
            width: 100%
          </ContainedButton>
        </View>
      </List.Section>
      <List.Section title="Compact">
        <View style={styles.row}>
          {(
            [
              'text',
              'outlined',
              'contained',
              'elevated',
              'contained-tonal',
            ] as const
          ).map((mode) => {
            return (
              <Button
                key={mode}
                mode={mode}
                compact
                onPress={() => {}}
                style={styles.button}
                icon="camera"
              >
                Compact {mode}
              </Button>
            );
          })}
        </View>
        <View style={styles.divider} />
        <View style={styles.row}>
          {(
            [
              'text',
              'outlined',
              'contained',
              'elevated',
              'contained-tonal',
            ] as const
          ).map((mode) => {
            return (
              <NewButton
                key={mode}
                mode={mode}
                compact
                onPress={() => {}}
                style={styles.button}
                icon="camera"
              >
                Compact {mode}
              </NewButton>
            );
          })}
        </View>
      </List.Section>
      <List.Section title="Specific Theme">
        <View style={styles.row}>
          <ElevatedButton
            onPress={() => {}}
            style={styles.button}
            theme={{
              elevatedButtonTheme: { initialElevation: 6, endElevation: 12 },
            }}
            icon="camera"
          >
            Elevated Theme
          </ElevatedButton>
          <TextButton
            onPress={() => {}}
            style={styles.button}
            theme={{
              textButtonTheme: { textColor: { base: 'red', disabled: 'gray' } },
            }}
            icon="camera"
          >
            Text Theme
          </TextButton>
        </View>
      </List.Section>
      <View style={styles.footer} />
    </ScreenWrapper>
  );
};

ButtonExample.title = 'Button';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  // eslint-disable-next-line react-native/no-color-literals
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
  },
  button: {
    margin: 4,
  },
  flexReverse: {
    flexDirection: 'row-reverse',
  },
  md3FontStyles: {
    lineHeight: 32,
  },
  fontStyles: {
    fontWeight: '800',
    fontSize: 24,
  },
  flexGrow1Button: {
    flexGrow: 1,
    marginTop: 10,
  },
  width100PercentButton: {
    width: '100%',
    marginTop: 10,
  },
  footer: {
    height: 100,
  },
});

export default ButtonExample;

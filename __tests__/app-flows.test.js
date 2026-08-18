import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import App from '../App';

jest.mock('@expo/vector-icons/Ionicons', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return { __esModule: true, default: ({ name, ...props }) => <Text {...props}>{name}</Text> };
});

const openTab = label => fireEvent.press(screen.getByLabelText(`${label} tab`));
const openConnection = () => fireEvent.press(screen.getByLabelText('Open Haley and Ari Connection'));
const openAccount = () => fireEvent.press(screen.getByLabelText('Open account'));

describe('Bonus Human cohesive product flows', () => {
  test('uses four-tab navigation and lands existing users on Connections', () => {
    render(<App />);
    expect(screen.getByText('People you’re building with')).toBeTruthy();
    ['Discover', 'Connections', 'Pets', 'Feed'].forEach(label => expect(screen.getByLabelText(`${label} tab`)).toBeTruthy());
    expect(screen.queryByLabelText('Profile tab')).toBeNull();
    expect(screen.getByText('● Meet & Greet')).toBeTruthy();
  });

  test('users without an active Connection land on Discover', () => {
    render(<App initialConnection={{ active: false, stage: 0, event: null, recurring: null, endReason: '' }} />);
    expect(screen.getByText('Find their people.')).toBeTruthy();
  });

  test('Connection card opens Overview rather than Chat', () => {
    render(<App />);
    openConnection();
    expect(screen.getByText('Mike, Haley & Ari, and Zuki')).toBeTruthy();
    expect(screen.getByText('Plan the first Meet & Greet')).toBeTruthy();
    expect(screen.queryByPlaceholderText('Message Haley & Ari…')).toBeNull();
  });

  test('Connection detail toggles between Overview and Chat', () => {
    render(<App />);
    openConnection();
    fireEvent.press(screen.getByLabelText('Chat Connection tab'));
    expect(screen.getByPlaceholderText('Message Haley & Ari…')).toBeTruthy();
    fireEvent.press(screen.getByLabelText('Overview Connection tab'));
    expect(screen.getByText('Plan the first Meet & Greet')).toBeTruthy();
  });

  test('Connection stage skipping and backtracking are reversible', () => {
    render(<App />);
    openConnection();
    fireEvent.press(screen.getByText('Skip to Trial Visits'));
    expect(screen.getByText('Try time together with Zuki')).toBeTruthy();
    fireEvent.press(screen.getByText('Back to Meet & Greet'));
    expect(screen.getByText('Plan the first Meet & Greet')).toBeTruthy();
  });

  test('Meet & Greet scheduling accepts date and times and records chat activity', () => {
    render(<App />);
    openConnection();
    fireEvent.press(screen.getByText('Schedule Meet & Greet'));
    fireEvent.changeText(screen.getByLabelText('Visit date'), 'Saturday, August 22');
    fireEvent.changeText(screen.getByLabelText('Start time'), '10:00 AM');
    fireEvent.changeText(screen.getByLabelText('End time'), '11:30 AM');
    fireEvent.press(screen.getByText('Send request'));
    expect(screen.getByText('Saturday, August 22 · 10:00 AM–11:30 AM')).toBeTruthy();
    fireEvent.press(screen.getByLabelText('Chat Connection tab'));
    expect(screen.getByText(/requested a Meet & Greet: Saturday, August 22/)).toBeTruthy();
  });

  test('Pet Owner can confirm a requested event and shared state updates', () => {
    render(<App />);
    openConnection();
    fireEvent.press(screen.getByText('Schedule Meet & Greet'));
    fireEvent.press(screen.getByText('Send request'));
    fireEvent.press(screen.getByText('Confirm as Mike'));
    expect(screen.getByText('Confirmed')).toBeTruthy();
    fireEvent.press(screen.getByLabelText('Chat Connection tab'));
    expect(screen.getByText('Mike confirmed the Meet & Greet.')).toBeTruthy();
  });

  test('Regular Bonus Human stage offers one-off and recurring scheduling', () => {
    render(<App />);
    openConnection();
    fireEvent.press(screen.getByText('Skip to Trial Visits'));
    fireEvent.press(screen.getByText('Move to Regular Bonus Human'));
    expect(screen.getByText('Request a one-off visit')).toBeTruthy();
    fireEvent.press(screen.getByText('Manage recurring schedule'));
    fireEvent.changeText(screen.getByLabelText('Recurring day'), 'Wednesday');
    fireEvent.press(screen.getByText('Save recurring schedule'));
    expect(screen.getByText('Every Wednesday · 7:00 PM–9:00 PM')).toBeTruthy();
  });

  test('Discover removes mode and photo-role overlays', () => {
    render(<App />);
    openTab('Discover');
    expect(screen.getByText('Find their people.')).toBeTruthy();
    expect(screen.getByText('Haley & Ari')).toBeTruthy();
    expect(screen.queryByText(/mode · viewing/i)).toBeNull();
    expect(screen.queryByText('BONUS HUMANS')).toBeNull();
  });

  test('detailed Discover profiles browse the filtered result set and preserve decisions', () => {
    render(<App />);
    openTab('Discover');
    fireEvent.press(screen.getByText('View profile'));
    expect(screen.getByText('1 of 2')).toBeTruthy();
    fireEvent.press(screen.getByText('Interested'));
    fireEvent.press(screen.getByText('Next →'));
    expect(screen.getByText('Jordan')).toBeTruthy();
    fireEvent.press(screen.getByText('← Previous'));
    expect(screen.getByText('Undo interested')).toBeTruthy();
  });

  test('filter edits apply only after Done', () => {
    render(<App />);
    openTab('Discover');
    fireEvent.press(screen.getByLabelText('Schedule filter'));
    fireEvent.press(screen.getByLabelText('Thursday PM'));
    expect(screen.queryByText('Schedule · 1')).toBeNull();
    fireEvent.press(screen.getByText('Done'));
    expect(screen.getByText('Schedule · 1')).toBeTruthy();
    expect(screen.getByText('Haley & Ari')).toBeTruthy();
  });

  test('dismissing a filter discards staged changes', () => {
    render(<App />);
    openTab('Discover');
    fireEvent.press(screen.getByLabelText('Experience filter'));
    fireEvent.press(screen.getByText('Senior dog care'));
    fireEvent.press(screen.getByLabelText('Cancel filter changes'));
    expect(screen.queryByText('Experience · 1')).toBeNull();
    fireEvent.press(screen.getByLabelText('Experience filter'));
    expect(screen.getByLabelText('Senior dog care').props.accessibilityState.selected).toBe(false);
  });

  test('Connections tabs have no lifetime counters', () => {
    render(<App />);
    expect(screen.getByText('Interested')).toBeTruthy();
    expect(screen.getByText('Passed')).toBeTruthy();
    expect(screen.queryByText(/Interested \d/)).toBeNull();
    expect(screen.queryByText(/Passed \d/)).toBeNull();
  });

  test('Pets is role-specific and remains available in Bonus Human mode', () => {
    render(<App />);
    openAccount();
    fireEvent.press(screen.getByLabelText('Mode'));
    fireEvent.press(screen.getByText('Bonus Human'));
    fireEvent.press(screen.getByLabelText('Go back'));
    fireEvent.press(screen.getByLabelText('Go back'));
    openTab('Pets');
    expect(screen.getByText('PETS IN YOUR CONNECTIONS')).toBeTruthy();
    expect(screen.getByText('Connected through Mike')).toBeTruthy();
    expect(screen.queryByText('PETS YOU OWN')).toBeNull();
  });

  test('pet page separates Profile from the practical Care Guide', () => {
    render(<App />);
    openTab('Pets');
    fireEvent.press(screen.getByText('Zuki'));
    expect(screen.getByText('What Zuki needs')).toBeTruthy();
    fireEvent.press(screen.getByText('Care Guide'));
    ['Today’s routine', 'Medication', 'Emergency contacts', 'Veterinary information'].forEach(text => expect(screen.getByText(text)).toBeTruthy());
    expect(screen.queryByText('Connection stage')).toBeNull();
  });

  test('Account opens as a hub and development UI is absent', () => {
    render(<App />);
    openAccount();
    ['Mode', 'Edit profile', 'Manage pets', 'Settings', 'Help', 'About'].forEach(label => expect(screen.getByLabelText(label)).toBeTruthy());
    expect(screen.queryByText('UI Gallery (Dev)')).toBeNull();
    expect(screen.queryByText('Development')).toBeNull();
  });

  test('filter-related profile attributes are editable and use shared Discover data', () => {
    render(<App />);
    openAccount();
    fireEvent.press(screen.getByLabelText('Mode'));
    fireEvent.press(screen.getByText('Bonus Human'));
    fireEvent.press(screen.getByLabelText('Go back'));
    fireEvent.press(screen.getByLabelText('Edit profile'));
    fireEvent.changeText(screen.getByLabelText('Profile bio'), 'Mike is ready to build one thoughtful connection.');
    fireEvent.press(screen.getByLabelText('Profile Wednesday PM'));
    fireEvent.press(screen.getByLabelText('Profile experience Behavioral needs'));
    fireEvent.press(screen.getByLabelText('Profile home House'));
    fireEvent.press(screen.getByText('Save profile'));
    fireEvent.press(screen.getByLabelText('Go back'));
    fireEvent.press(screen.getByLabelText('Go back'));
    openTab('Discover');
    expect(screen.getByText('Mike is ready to build one thoughtful connection.')).toBeTruthy();
  });

  test('ending a Connection requires confirmation and optional feedback', () => {
    render(<App />);
    openConnection();
    fireEvent.press(screen.getByText('End Connection'));
    expect(screen.getByText('Are you sure?')).toBeTruthy();
    fireEvent.press(screen.getByText("Availability didn't work"));
    fireEvent.press(screen.getAllByText('End Connection')[1]);
    expect(screen.getByText('This Connection has ended')).toBeTruthy();
  });

  test('Feed posting remains functional', () => {
    render(<App />);
    openTab('Feed');
    fireEvent.changeText(screen.getByPlaceholderText('Share a Zuki update…'), 'Zuki enjoyed a sunny nap.');
    fireEvent.press(screen.getByText('↑'));
    expect(screen.getByText('Zuki enjoyed a sunny nap.')).toBeTruthy();
  });
});
